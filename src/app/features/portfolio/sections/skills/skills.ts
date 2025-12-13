import { Component } from '@angular/core';
import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';
import { TECH_DATA } from '../../../../core/data/tech-data';
import { TechCategory } from "../../components/tech-category/tech-category";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [TranslatePipe, TechCategory],
  templateUrl: './skills.html'
})
export class Skills {
  techData = TECH_DATA;
}
