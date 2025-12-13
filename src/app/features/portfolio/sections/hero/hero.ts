import { Component, inject } from '@angular/core';
import { BadgeHello } from "../../components/badge-hello/badge-hello";
import { TypedText } from "../../components/typed-text/typed-text";
import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';
import { TranslationService, LangCode } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe, BadgeHello, TypedText],
  templateUrl: './hero.html',
})
export class Hero {
  translate = inject(TranslationService);

  downloadCV(): void{
    const lang = this.translate.lang

    const cvPath = lang === 'en'? 'assets/cv/MauricioVereau-EN.pdf':'assets/cv/MauricioVereau-ES.pdf';

    const link = document.createElement('a');
    link.href = cvPath;
    link.download = lang === 'en' ? 'MauricioVereau-EN.pdf': 'MauricioVereau-ES.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
