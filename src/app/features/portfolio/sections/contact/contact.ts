import { Component } from '@angular/core';
import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';
import { FormMessage } from "../../components/form-message/form-message";

@Component({
  selector: 'app-contact',
  imports: [TranslatePipe, FormMessage],
  templateUrl: './contact.html'
})
export class Contact {
}
