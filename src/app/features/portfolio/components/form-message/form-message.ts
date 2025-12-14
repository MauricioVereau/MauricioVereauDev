import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';
import { SendEmailService } from '../../../../core/services/send-message.service';
import { Message } from '../../../../core/models/message';
import { TurnstileContainer } from "../turnstile-container/turnstile-container";
import { delay } from 'rxjs';

declare global {
  interface Window {
    turnstile: any;
  }
}

@Component({
  selector: 'form-message',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, TurnstileContainer],
  templateUrl: './form-message.html',
})
export class FormMessage {

  fb = inject(FormBuilder);
  sendEmailService = inject(SendEmailService);

  turnstileToken = signal<string | null>(null);
  showTurnstile = signal<boolean>(false);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[0-9\s\+\-]*$/)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  // UI state
  isSubmitting = signal<boolean>(false);
  isSubmitted = signal<boolean>(false);
  hasError = signal<boolean>(false);

  // ===============================
  // Submit
  // ===============================
  submit(): void {
    this.markAllAsTouched();

    if (this.contactForm.invalid || this.isSubmitting()) return;

    // Show Turnstile to get the token
    this.showTurnstile.set(true);
  }

  private sendForm(payload: Message): void {
    this.isSubmitting.set(true);
    this.hasError.set(false);
    this.isSubmitted.set(false);

    this.sendEmailService.sendMessageWeb(payload)
      .pipe(
        delay(2000)
      )
      .subscribe({
        next: (resp) => {
          console.log('SendEmailService OK', resp);
          this.isSubmitted.set(true);
          this.isSubmitting.set(false);      // <- mover aquí
          this.showTurnstile.set(false);
          this.turnstileToken.set(null);
          this.resetFormFull();
        },
        error: (err) => {
          console.error('SendEmailService ERROR', err);
          this.hasError.set(true);
          this.isSubmitting.set(false);      // <- y aquí en error
          this.showTurnstile.set(false);
          this.turnstileToken.set(null);
          this.resetFormFull();
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

  private resetFormFull(): void {
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


  // ===============================
  // Generar Turnstile
  // ===============================
  onTokenGenerated(token: string) {
    this.turnstileToken.set(token);

    // Automatically send form once token is generated
    const payload: Message = {
      ...this.contactForm.value,
      turnstileToken: token,
    };

    this.sendForm(payload);
  }
}
