// tech-icons.model.ts
export interface TechItem {
  name: string;
  icon: string;
  glowClass: string;   // glow-javascript, glow-angular, etc.
}

export interface TechCategoryModel {
  id: 'frontend' | 'backend' | 'devops';
  title: string;
  items: TechItem[];
}


