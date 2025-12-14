import { AfterViewInit, ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { env } from '../../../../../env/env';

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
export class TurnstileContainer implements AfterViewInit {
  private widgetId!: string;

  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.isDarkMode();

  readonly token = signal<string>('');
  tokenGenerated = output<string>();

  ngAfterViewInit(): void {
    this.widgetId = turnstile.render('#turnstile', {
      //sitekey: '0x4AAAAAABiXIlAgVL2xQnjE',
      sitekey: env.siteKey,
      theme: this.isDarkMode ? 'dark' : 'light',
      callback: (token: string) => {
        // Run outside current CD cycle to prevent NG0100
        setTimeout(() => {
          this.token.set(token);
          this.tokenGenerated.emit(token);
        });
      },
    });
  }

  getToken(): string {
    return turnstile.getResponse(this.widgetId);
  }

  isExpired(): boolean {
    return turnstile.isExpired(this.widgetId);
  }

  reset(): void {
    turnstile.reset(this.widgetId);
    this.token.set('');
  }

  remove(): void {
    turnstile.remove(this.widgetId);
    this.token.set('');
  }

}
