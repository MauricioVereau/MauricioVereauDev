import { Component } from '@angular/core';
import { Hero } from "./sections/hero/hero";
import { About } from "./sections/about/about";
import { Skills } from "./sections/skills/skills";
import { Projects } from "./sections/projects/projects";
import { Contact } from "./sections/contact/contact";
import { Certifications } from "./sections/certifications/certifications";

@Component({
  selector: 'app-portfolio',
  imports: [Hero, Skills, Projects, Contact, About, Certifications],
  templateUrl: './portfolio.html'
})
export default class Portfolio {

}
