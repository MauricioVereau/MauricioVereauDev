import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

@Pipe({
  name: 't',
  standalone: true,
  pure: false // para reaccionar al cambio de idioma
})
export class TranslatePipe implements PipeTransform {
  constructor(private ts: TranslationService) {}

  transform(key: string): string {
    return this.ts.t(key);
  }
}
