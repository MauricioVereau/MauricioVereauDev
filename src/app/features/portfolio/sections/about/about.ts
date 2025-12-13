import { Component } from '@angular/core';
import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe],
  templateUrl: './about.html'
})
export class About {

}
