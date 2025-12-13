import { Component, input } from '@angular/core';
import { BackendProject } from '../../../../core/models/backend-projects';
import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';

@Component({
  selector: 'backend-projects',
  imports: [TranslatePipe],
  templateUrl: './backend-projects.html'
})
export class BackendProjects {
  projects = input<BackendProject[]>([]);
}
