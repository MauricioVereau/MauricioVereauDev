import { Component } from '@angular/core';
import { BadgeHello } from "../../components/badge-hello/badge-hello";
import { TypedText } from "../../components/typed-text/typed-text";
import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe, BadgeHello, TypedText],
  templateUrl: './hero.html',
})
export class Hero {

}
