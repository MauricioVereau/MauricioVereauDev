import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnDestroy, output, signal } from '@angular/core';
import { env } from '../../../../../env/env';
import { ThemeService } from '../../../../core/services/theme.service';

declare const turnstile: {
  render: (container: string | HTMLElement, options: {
    sitekey: string;
    theme: string;
    callback?: (token: string) => void;
  }) => string;
  getResponse: (widgetId: string) => string;
  isExpired: (widgetId: string) => boolean;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

@Component({
  selector: 'turnstile-container',
  imports: [],
  template:
    `
  <div class="flex flex-wrap justify-center text-center">
      <div id="turnstile"></div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TurnstileContainer implements AfterViewInit, OnDestroy {
  private widgetId!: string;

  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.isDarkMode;

  readonly token = signal<string>('');
  tokenGenerated = output<string>();

  ngAfterViewInit(): void {
    // Ensure we don't render if already rendered (safety check)
    if (this.widgetId) return;

    this.widgetId = turnstile.render('#turnstile', {
      sitekey: '0x4AAAAAABiXIlAgVL2xQnjE',
      theme: this.isDarkMode() ? 'dark' : 'light',
      callback: (token: string) => {
        this.token.set(token);
        this.tokenGenerated.emit(token);
      }
    });
  }

  ngOnDestroy(): void {
    this.remove();
  }

  getToken(): string {
    return turnstile.getResponse(this.widgetId);
  }

  isExpired(): boolean {
    return turnstile.isExpired(this.widgetId);
  }

  reset(): void {
    if (this.widgetId) {
      turnstile.reset(this.widgetId);
    }
    this.token.set('');
  }

  remove(): void {
    if (this.widgetId) {
      turnstile.remove(this.widgetId);
      this.widgetId = undefined as any;
    }
    this.token.set('');
  }

}
