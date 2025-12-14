import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';
import { SendEmailService } from '../../../../core/services/send-message.service';
import { Message } from '../../../../core/models/message';
import { TurnstileContainer } from "../turnstile-container/turnstile-container";

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

  @ViewChild(TurnstileContainer) turnstileComp!: TurnstileContainer;

  private fb = inject(FormBuilder);
  private sendEmailService = inject(SendEmailService);

  turnstileToken = signal<string | null>(null);
  showTurnstile = signal<boolean>(false);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[0-9\s\+\-]*$/)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  // UI state
  isSubmitting = false;
  isSubmitted = false;
  hasError = false;

  // ===============================
  // Submit
  // ===============================
  submit(): void {
    this.markAllAsTouched();

    if (this.contactForm.invalid || this.isSubmitting) return;

    // Show Turnstile to get the token
    this.showTurnstile.set(true);
  }

  private sendForm(payload: Message): void {
    this.isSubmitting = true;
    this.hasError = false;
    this.isSubmitted = false;

    this.sendEmailService.sendMessageWeb(payload)
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.isSubmitted = true;
          this.resetFormFull();
          // Hide Turnstile and clear token
          this.showTurnstile.set(false);
          this.turnstileToken.set(null);

          // Hide success message after delay
          setTimeout(() => {
            this.isSubmitted = false;
          }, 2000);
        },
        error: () => {
          this.isSubmitting = false;
          this.hasError = true;
          // Hide Turnstile to allow retry if needed, or keep it? 
          // If we hide it, they have to click submit again to generate a new token.
          this.showTurnstile.set(false);
          this.turnstileToken.set(null);

          setTimeout(() => {
            this.hasError = false;
          }, 3000);
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
