import { Injectable, signal, computed } from '@angular/core';
import es from '../../../assets/i18n/es.json';
import en from '../../../assets/i18n/en.json';

export type LangCode = 'es' | 'en';

type Dictionary = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLang = signal<LangCode>('es');

  private dictionaries: Record<LangCode, Dictionary> = {
    es: es as Dictionary,
    en: en as Dictionary,
  };

  // Diccionario activo
  readonly dict = computed<Dictionary>(() => {
    return this.dictionaries[this.currentLang()];
  });

  get lang(): LangCode {
    return this.currentLang();
  }

  setLang(lang: LangCode) {
    if (this.currentLang() === lang) return;
    this.currentLang.set(lang);
    document.documentElement.lang = lang;
  }

  toggleLang() {
    this.setLang(this.currentLang() === 'es' ? 'en' : 'es');
  }

  t(key: string): string {
    const d = this.dict();
    return d[key] ?? key;
  }

  langLabel(): string {
    return this.t('lang.code');
  }
}
