
// carousel.component.ts
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-caurosel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caurosel.html',
  styleUrls: ['./caurosel.css']
})

export class Caurosel implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  @ViewChild('carouselInner') carouselInner!: ElementRef;

  currentIndex = 0;
  totalSlides = 5;
  private interval: any;
  private isTransitioning = false;
  private touchStartX = 0;
  private touchEndX = 0;

  slides = [
    {
      category: 'Floral Collection',
      title: 'Bloom Essence',
      description: 'A delicate blend of jasmine, rose, and lily of the valley for the modern woman.',
      imageUrl: 'https://us.florislondon.com/cdn/shop/files/More_info_Red_Rose.jpg?v=1739195182&width=1500' // Floral
    },
    {
      category: 'Oriental Collection',
      title: 'Golden Hour',
      description: 'Rich notes of amber, vanilla, and exotic spices captivate the senses.',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0766/8183/8904/files/photo_2025-05-27_01-00-15.jpg?v=1748296860' // Oriental
    },
    {
      category: 'Fresh Collection',
      title: 'Verdant Mist',
      description: 'Crisp green notes with citrus and mint refresh and revitalize your spirit.',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/green-fragrance-1-1671053525.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*' // Fresh/Green
    },
    {
      category: 'Woody Collection',
      title: 'Forest Whisper',
      description: 'Earthy notes of sandalwood, cedar, and vetiver connect you with nature.',
      imageUrl: 'https://parfumexquis.com/cdn/shop/articles/preview_809087b0-e1f2-4789-b8b0-3307deedb164.jpg?v=1755842397&width=2000' // Woody
    },
    {
      category: 'Niche Collection',
      title: 'Rare Essence',
      description: 'Exquisite ingredients from around the world create a unique olfactory experience.',
      imageUrl: 'https://ads-perfumes.com/wp-content/uploads/2025/09/Exclusive-Niche-Perfume-Houses.jpg' // Niche
    }
  ];

  constructor(private renderer: Renderer2) {}


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      clearInterval(this.interval);
    }
  }


  updateCarousel(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    const translateX = -this.currentIndex * 100;
    this.renderer.setStyle(this.carouselInner.nativeElement, 'transform', `translateX(${translateX}%)`);

    setTimeout(() => {
      this.isTransitioning = false;
    }, 1200);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel();
    this.resetInterval();
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
    this.resetInterval();
  }

  private startAutoSlide(): void {
    this.interval = setInterval(() => this.nextSlide(), 4000);
  }

  private resetInterval(): void {
    clearInterval(this.interval);
    this.startAutoSlide();
  }


  // Touch/Swipe Support
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (isPlatformBrowser(this.platformId)) {
      this.touchStartX = event.changedTouches[0].screenX;
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    if (isPlatformBrowser(this.platformId)) {
      this.touchEndX = event.changedTouches[0].screenX;
      this.handleSwipe();
    }
  }

  private handleSwipe(): void {
    const deltaX = this.touchEndX - this.touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  // Keyboard Navigation
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (isPlatformBrowser(this.platformId)) {
      if (event.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (event.key === 'ArrowRight') {
        this.nextSlide();
      }
    }
  }

  // Pause on tab hidden
  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (document.hidden) {
        clearInterval(this.interval);
      } else {
        this.startAutoSlide();
      }
    }
  }

  // Handle resize gracefully
  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateCarousel(); // Re-apply current position without transition glitch
    }
  }
}