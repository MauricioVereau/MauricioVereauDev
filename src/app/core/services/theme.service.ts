import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal para el estado del tema oscuro
  readonly isDarkMode = signal<boolean>(false);

  constructor() {
    // Inicializar el tema desde localStorage o preferencia del sistema
    const initialDarkMode = this.initializeTheme();
    this.isDarkMode.set(initialDarkMode);
    
    // Aplicar el tema inmediatamente
    this.applyTheme(initialDarkMode);
    
    // Efecto para aplicar el tema cuando cambie el signal
    effect(() => {
      this.applyTheme(this.isDarkMode());
    });
  }

  private initializeTheme(): boolean {
    // Verificar preferencia guardada en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    } else {
      // Usar preferencia del sistema
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode.update(value => {
      const newValue = !value;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      return newValue;
    });
  }

  private applyTheme(isDark: boolean): void {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }
}