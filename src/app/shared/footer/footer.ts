import { Component, computed } from '@angular/core';
import { TranslatePipe } from '../../core/pipe/TranslatePipe.pipe';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html'
})
export class Footer {
  protected readonly currentYear = computed(() => new Date().getFullYear());
}
