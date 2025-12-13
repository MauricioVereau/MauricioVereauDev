import { Component, signal, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { TranslationService } from '../../core/services/translation.service';
import { TranslatePipe } from '../../core/pipe/TranslatePipe.pipe';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.html'
})
export class Navbar {

  ts = inject(TranslationService);
  themeService = inject(ThemeService);

  isMobileMenuOpen = signal(false);

  // Exponer el signal del servicio directamente (sin llamarlo, solo la referencia) esto para acciones como IF en el HTML
  isDarkMode = this.themeService.isDarkMode;

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  toggle() {
    this.ts.toggleLang();
  }
}
