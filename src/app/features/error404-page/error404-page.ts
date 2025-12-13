import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/pipe/TranslatePipe.pipe';

@Component({
  selector: 'error404-page',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './error404-page.html'
})
export default class Error404Page {

}
