import { Component } from '@angular/core';
import { FrontendProjects } from "../../components/frontend-projects/frontend-projects";
import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';
import { BackendProjects } from "../../components/backend-projects/backend-projects";
import { FRONTEND } from '../../../../core/data/frontend-data';
import { BACKEND } from '../../../../core/data/backend-data';

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, FrontendProjects, BackendProjects],
  templateUrl: './projects.html'
})
export class Projects {
  frontend = FRONTEND;
  backend = BACKEND;
}
