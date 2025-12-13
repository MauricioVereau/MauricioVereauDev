import { Component, computed } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html'
})
export class Footer {
  protected readonly currentYear = computed(() => new Date().getFullYear());
}
