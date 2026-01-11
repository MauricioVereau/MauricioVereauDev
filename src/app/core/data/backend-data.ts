import { BackendProject } from "../models/backend-projects";

export const BACKEND: BackendProject[] = [
  {
    title: 'ApiEcommerce',
    description: 'projects.project4.desc',
    tech: ['.Net', 'Docker', 'SqlServer'],
    projectUrl: 'https://github.com/MauricioVereau/Curso-.Net8-Docker',
    repoUrl: 'https://github.com/MauricioVereau/Curso-.Net8-Docker',
  },
  {
    title: 'Clean Architecture .Net',
    description: 'projects.project5.desc',
    tech: ['.Net', 'Docker', 'SqlServer'],
    projectUrl: 'https://github.com/MauricioVereau/eventos-backend-clean-architecture',
    repoUrl: 'https://github.com/MauricioVereau/eventos-backend-clean-architecture',
  },
    {
    title: 'Starbucks Api',
    description: 'projects.project6.desc',
    tech: ['.Net', 'Clean Architecture', 'Azure'],
    projectUrl: 'https://appdev-app-dev-we-starbucks-api.azurewebsites.net/swagger/index.html',
    repoUrl: '',
  },
];
