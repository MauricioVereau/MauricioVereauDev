import { Component } from '@angular/core';
import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';

@Component({
  selector: 'badge-hello',
  imports: [TranslatePipe],
  templateUrl: './badge-hello.html'
})
export class BadgeHello {

}
