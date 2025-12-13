import { Component } from '@angular/core';
import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';

@Component({
  selector: 'app-contact',
  imports: [TranslatePipe],
  templateUrl: './contact.html'
})
export class Contact {

}
