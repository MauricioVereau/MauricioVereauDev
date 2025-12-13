import { Component, input, signal, computed, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Certificate } from './../../../../core/models/certificates';
import { TranslatePipe } from '../../../../core/pipe/TranslatePipe.pipe';

@Component({
  selector: 'carousel-certifications',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './carousel-certifications.html',
})
export class CarouselCertifications implements OnInit, OnDestroy {
  items = input<Certificate[]>([]);
  currentIndex = signal(0);

  // autoplay
  private autoplayId: number | null = null;
  readonly autoplayInterval = 4000;

  // responsive: items por vista
  visibleCount = signal(1); // mobile por defecto

  readonly totalItems = computed(() => this.items().length);

  // “páginas” totales (número de posiciones de dot)
  readonly totalPages = computed(() => {
    const total = this.totalItems();
    const perView = this.visibleCount();
    if (!total || !perView) return 0;
    return Math.max(1, Math.ceil(total / perView));
  });

  // translateX por página, no por item individual
  get translateX(): string {
    return `translate3d(-${this.currentIndex() * 100}%, 0, 0)`;
  }

  ngOnInit(): void {
    this.updateVisibleCount();
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleCount();
  }

  private updateVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1024) {
      // lg: 3 por vista
      this.visibleCount.set(3);
    } else if (width >= 768) {
      // md: 2 por vista
      this.visibleCount.set(2);
    } else {
      this.visibleCount.set(1);
    }

    // aseguramos que currentIndex esté dentro de rango de páginas
    const pages = this.totalPages();
    if (this.currentIndex() >= pages) {
      this.currentIndex.set(pages - 1);
    }
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    if (!this.totalPages()) return;

    this.autoplayId = window.setInterval(() => {
      this.next();
    }, this.autoplayInterval);
  }

  private stopAutoplay(): void {
    if (this.autoplayId !== null) {
      clearInterval(this.autoplayId);
      this.autoplayId = null;
    }
  }

  next(): void {
    const pages = this.totalPages();
    if (!pages) return;
    this.currentIndex.set((this.currentIndex() + 1) % pages);
  }

  prev(): void {
    const pages = this.totalPages();
    if (!pages) return;
    this.currentIndex.set((this.currentIndex() - 1 + pages) % pages);
  }

  goTo(index: number): void {
    const pages = this.totalPages();
    if (!pages) return;
    if (index < 0 || index >= pages) return;
    this.currentIndex.set(index);
  }

  isActiveDot(index: number): boolean {
    return this.currentIndex() === index;
  }
}
