import { Component, inject, NgZone, OnInit, signal, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'typed-text',
  templateUrl: './typed-text.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypedText implements OnInit {

  private typingTimeoutId: number | null = null;
  private cursorIntervalId: number | null = null;

  texts = signal<string[]>([
    'Software Developer',
    'Angular .NET  Docker  Azure',
    'Clean Code & Clean Architecture',
    'Passionate about Technology',
  ]);

  typedText = signal('');
  currentTextIndex = signal(0);
  currentCharIndex = signal(0);
  isDeleting = signal(false);
  isTypingPaused = signal(false);

  showCursor = signal(true);

  // Velocidades
  typingSpeed = 60;
  deletingSpeed = 35;
  pauseDuration = 1500;
  cursorBlinkSpeed = 500;

  private ngZone = inject(NgZone);// posible innecesario
  private cdr = inject(ChangeDetectorRef); // posible innecesario

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.startTypingLoop();
      this.startCursorBlink();
    });
  }


  private startTypingLoop(): void {
    const loop = () => {
      if (this.isTypingPaused()) {
        return;
      }

      const texts = this.texts();
      if (!texts.length) return;

      const currentIndex = this.currentTextIndex();
      const fullText = texts[currentIndex];

      const charIndex = this.currentCharIndex();
      const deleting = this.isDeleting();

      if (!deleting && charIndex <= fullText.length) {
        // Escribiendo
        this.typedText.set(fullText.substring(0, charIndex));
        this.currentCharIndex.set(charIndex + 1);
        this.cdr.detectChanges(); // Local update only // posible innecesario

        // Pausa al final del texto
        if (charIndex === fullText.length) {
          this.typingTimeoutId = window.setTimeout(() => {
            this.isDeleting.set(true);
            this.cdr.detectChanges(); // posible innecesario
            loop();
          }, this.pauseDuration);
          return;
        }
      } else if (deleting && charIndex >= 0) {
        // Borrando
        this.typedText.set(fullText.substring(0, charIndex));
        this.currentCharIndex.set(charIndex - 1);
       // this.cdr.detectChanges(); // posible innecesario

        // Cuando termina de borrar, pasar al siguiente texto
        if (charIndex === 0) {
          this.isDeleting.set(false);
          this.currentTextIndex.set((currentIndex + 1) % texts.length);

         // this.cdr.detectChanges(); // posible innecesario

          // Pausa breve antes de empezar a escribir el siguiente
          this.typingTimeoutId = window.setTimeout(() => {
            this.currentCharIndex.set(0);
           // this.cdr.detectChanges(); // posible innecesario
            loop();
          }, 300);
          return;
        }
      }

      const delay = deleting ? this.deletingSpeed : this.typingSpeed;
      this.typingTimeoutId = window.setTimeout(loop, delay);
    };

    loop();
  }

  private startCursorBlink(): void {
    this.cursorIntervalId = window.setInterval(() => {
      if (this.isTypingPaused()) {
        this.showCursor.set(true);
        this.cdr.detectChanges(); // posible innecesario
        return;
      }

      // Si no hay texto, que el cursor se mantenga visible
      if (!this.typedText()) {
        this.showCursor.set(true);
      } else {
        this.showCursor.update((prev) => !prev);
      }
      this.cdr.detectChanges(); // posible innecesario
    }, this.cursorBlinkSpeed);
  }

  restartTyping(): void {
    this.isTypingPaused.set(false);
    this.typedText.set('');
    this.currentCharIndex.set(0);
    this.isDeleting.set(false);
    this.cdr.detectChanges(); // posible innecesario

    if (this.typingTimeoutId !== null) {
      clearTimeout(this.typingTimeoutId);
    }

    this.ngZone.runOutsideAngular(() => {
      this.startTypingLoop();
    });
  }

  pauseTyping(): void {
    this.isTypingPaused.set(true);

    if (this.typingTimeoutId !== null) {
      clearTimeout(this.typingTimeoutId);
    }
  }
}
