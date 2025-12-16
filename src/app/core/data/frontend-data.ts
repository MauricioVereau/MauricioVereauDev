import { FrontendProject } from "../models/frontend-projects";

export const FRONTEND: FrontendProject[] = [
  {
    title: 'Hoteles Italia',
    //description: 'Plataforma de comercio electrónico completa con carrito de compras, pagos con Stripe y panel de administración.',
    description: 'projects.project1.desc',
    imageUrl: 'https://api.microlink.io/?url=https://hoteles-italia.pages.dev/&screenshot=true&meta=false&embed=screenshot.url',
    tech: ['Angular 20', 'Cloudflare', 'Tailwind CSS'],
    projectUrl: 'https://hotelesitaliachiclayo.com',
    repoUrl: 'https://github.com/italiahoteles-chiclayo/HotelesItaliaChiclayo.git',
  },
  {
    title: 'Application Countries',
    description: 'projects.project2.desc',
    imageUrl: 'https://api.microlink.io/?url=https://apppaisesv2.pages.dev/&screenshot=true&meta=false&embed=screenshot.url',
    tech: ['Angular', 'REST Countries API', 'Tailwind CSS'],
    projectUrl: 'https://apppaisesv2.pages.dev/',
    repoUrl: 'https://github.com/MauricioVereau/AppPaisesV2.git',
  },
  {
    title: 'Web Bussiness',
    description: 'projects.project3.desc',
    imageUrl: 'https://api.microlink.io/?url=https://bienesraices-mauriciovereau.netlify.app/&screenshot=true&meta=false&embed=screenshot.url',
    tech: ['Html, css', 'JavaScript', 'Netlify'],
    projectUrl: 'https://bienesraices-mauriciovereau.netlify.app/',
    repoUrl: '#',
  }
];
