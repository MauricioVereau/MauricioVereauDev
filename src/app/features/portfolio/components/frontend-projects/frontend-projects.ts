import { Component, input } from '@angular/core';
import { FrontendProject } from '../../../../core/models/frontend-projects';
import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';

@Component({
  selector: 'frontend-projects',
  imports: [TranslatePipe],
  templateUrl: './frontend-projects.html'
})
export class FrontendProjects {
  projects = input<FrontendProject[]>([]);
}
