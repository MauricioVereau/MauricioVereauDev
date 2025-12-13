import { Component, input } from '@angular/core';
import { TechCategoryModel } from '../../../../core/models/tech-icons';
import { TechIcons } from "../tech-icons/tech-icons";


@Component({
  selector: 'tech-category',
  imports: [TechIcons],
  templateUrl: './tech-category.html'
})
export class TechCategory {
  data = input.required<TechCategoryModel>();
}
