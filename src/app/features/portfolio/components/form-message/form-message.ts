import { Component, inject, OnDestroy, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';
import { SendEmailService } from '../../../../core/services/send-message.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { Message } from '../../../../core/models/message';

declare global {
  interface Window {
    turnstile: any;
  }
}

@Component({
  selector: 'form-message',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './form-message.html',
})
export class FormMessage {
  private fb = inject(FormBuilder);
  private sendEmailService = inject(SendEmailService);
  private themeService = inject(ThemeService);
  private destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      const isDark = this.isDarkMode();
      if (this.showTurnstile) {
        this.renderTurnstile();
      }
    });
  }

  isDarkMode = this.themeService.isDarkMode;

  // UI state
  isSubmitting = false;
  isSubmitted = false;
  hasError = false;

  // Turnstile
  showTurnstile = false;
  turnstileToken = '';
  turnstileWidgetId: any;
  turnstileError = false;

  // Form
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[0-9\s\+\-]*$/)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    turnstileToken: ['']
  });



  // ===============================
  // Submit
  // ===============================
  submit(): void {
    this.markAllAsTouched();

    if (this.contactForm.invalid || this.isSubmitting) return;

    // Si no tenemos token y no se está mostrando el turnstile, lo mostramos
    if (!this.turnstileToken) {
      this.showTurnstile = true;
      this.initTurnstileWithRetry();
      return;
    }

    const payload: Message = {
      ...this.contactForm.value,
      turnstileToken: this.turnstileToken
    };
    console.log('Form payload:', payload);

    this.sendForm(payload);
  }

  private sendForm(payload: Message): void {
    this.isSubmitting = true;
    this.hasError = false;

    this.sendEmailService
      .sendMessageWeb(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.isSubmitted = true;
          this.resetForm();
          this.showTurnstile = false;
          setTimeout(() => (this.isSubmitted = false), 3000);
        },
        error: () => {
          this.isSubmitting = false;
          this.hasError = true;
        },
      });
  }

  // ===============================
  // Helpers
  // ===============================
  private markAllAsTouched(): void {
    Object.values(this.contactForm.controls).forEach(control =>
      control.markAsTouched()
    );
  }

  private resetForm(): void {
    this.contactForm.reset();
  }

  showError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (!control?.errors) return '';

    if (control.hasError('required')) return 'contact.form.required';
    if (control.hasError('email')) return 'contact.form.invalidEmail';
    if (control.hasError('minlength')) return 'contact.form.minLength';
    if (control.hasError('pattern')) return 'contact.form.invalidPattern';

    return 'contact.form.invalidField';
  }

  private initTurnstileWithRetry(attempt: number = 0): void {
    const MAX_ATTEMPTS = 5;
    const RETRY_DELAY = 500;

    if (attempt >= MAX_ATTEMPTS) {
      console.warn('Turnstile no se pudo cargar después de varios intentos');
      this.turnstileError = true;
      return;
    }

    if (typeof window.turnstile === 'undefined') {
      setTimeout(() => this.initTurnstileWithRetry(attempt + 1), RETRY_DELAY);
      return;
    }

    this.renderTurnstile();
  }

  private renderTurnstile(): void {
    // Pequeño delay para asegurar que el DOM se actualizó si acabamos de hacer showTurnstile = true
    setTimeout(() => {
      const container = document.getElementById('turnstile-container');
      if (!container) return;

      container.innerHTML = '';

      if (this.turnstileWidgetId && window.turnstile) {
        try {
          window.turnstile.remove(this.turnstileWidgetId);
        } catch (e) { /* ignore */ }
      }

      try {
        this.turnstileWidgetId = window.turnstile.render(container, {
          sitekey: '0x4AAAAAABiXIlAgVL2xQnjE',
          theme: this.isDarkMode() ? 'dark' : 'light',
          size: 'normal',
          callback: (token: string) => {
            this.turnstileToken = token;
            this.contactForm.get('turnstileToken')?.setValue(token);
            this.turnstileError = false;
            this.submit();
          },
          'error-callback': () => {
            this.turnstileError = true;
          }
        });
      } catch (error) {
        console.error('Error al renderizar Turnstile:', error);
        this.turnstileError = true;
      }
    });
  }
}
