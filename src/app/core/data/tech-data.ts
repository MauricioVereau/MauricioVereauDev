import { TechCategoryModel } from "../models/tech-icons";

export const TECH_DATA: TechCategoryModel[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: [
      { name: 'TypeScript', icon: 'assets/img/tech-icons/TypeScript.svg', glowClass: 'glow-typescript' },
      { name: 'Angular', icon: 'assets/img/tech-icons/Angular.svg', glowClass: 'glow-angular' },
      { name: 'HTML5', icon: 'assets/img/tech-icons/HTML5.svg', glowClass: 'glow-html5' },
      { name: 'CSS3', icon: 'assets/img/tech-icons/CSS3.svg', glowClass: 'glow-css3' },
      { name: 'Tailwind', icon: 'assets/img/tech-icons/TailwindCSS.svg', glowClass: 'glow-tailwind' },
      { name: 'Bootstrap', icon: 'assets/img/tech-icons/Bootstrap.svg', glowClass: 'glow-bootstrap' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    items: [
      { name: '.NET +8', icon: 'assets/img/tech-icons/NETcore.svg', glowClass: 'glow-dotnetcore' },
      { name: 'Spring', icon: 'assets/img/tech-icons/Spring.svg', glowClass: 'glow-spring' },
      { name: 'Python', icon: 'assets/img/tech-icons/python.svg', glowClass: 'glow-python' },
      { name: 'MySQL', icon: 'assets/img/tech-icons/MySQL.svg', glowClass: 'glow-mysql' },
      { name: 'MongoDB', icon: 'assets/img/tech-icons/MongoDB.svg', glowClass: 'glow-mongodb' },
      { name: 'SQL Server', icon: 'assets/img/tech-icons/MicrosoftSQLServer.svg', glowClass: 'glow-sqlserver' }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & Tools',
    items: [
      { name: 'Git', icon: 'assets/img/tech-icons/Git.svg', glowClass: 'glow-git' },
      { name: 'Azure', icon: 'assets/img/tech-icons/Microsoft-Azure.svg', glowClass: 'glow-azure' },
      { name: 'Postman', icon: 'assets/img/tech-icons/Postman.svg', glowClass: 'glow-postman' },
      { name: 'Docker', icon: 'assets/img/tech-icons/Docker.svg', glowClass: 'glow-docker' },
      { name: 'Jira', icon: 'assets/img/tech-icons/Jira.svg', glowClass: 'glow-jira' },
      { name: 'Cloudflare', icon: 'assets/img/tech-icons/Cloudflare.svg', glowClass: 'glow-cloudflare' }
    ]
  }
];
