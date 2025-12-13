import { Component } from '@angular/core';
import { CarouselCertifications } from "../../components/carousel-certifications/carousel-certifications";

import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';
import { CERTIFICATES } from '../../../../core/data/cert-data';

@Component({
  selector: 'app-certifications',
  imports: [CarouselCertifications, TranslatePipe],
  templateUrl: './certifications.html'
})
export class Certifications {
  certificates = CERTIFICATES;
}
