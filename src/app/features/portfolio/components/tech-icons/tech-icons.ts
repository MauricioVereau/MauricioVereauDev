import { Component, input } from '@angular/core';
import { TechCategoryModel, TechItem } from '../../../../core/models/tech-icons';
import { NgClass } from '@angular/common';

type CategoryId = TechCategoryModel['id'];
@Component({
  selector: 'tech-icons',
  templateUrl: './tech-icons.html',
  imports: [NgClass],
})
export class TechIcons {

  tech = input.required<TechItem>();

}
