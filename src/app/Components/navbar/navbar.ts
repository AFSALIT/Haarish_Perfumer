
// navbar.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']  // assuming you renamed to .component.css
})

export class Navbar implements OnInit {
  private platformId = inject(PLATFORM_ID);
  shownav = false;
  isDesktop = true;
  activeDropdown: string | null = null;
  mobileDropdowns: { [key: string]: boolean } = {
    collections: false
    // add more if you have multiple dropdowns in mobile
  };

  cartScale = false;


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      if (this.isDesktop) {
        this.closeMobileMenu();
      }
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const navbar = document.querySelector('.navbar') as HTMLElement;
      if (navbar) {
        const scroll = window.pageYOffset;
        navbar.style.boxShadow = scroll > 100
          ? '0 4px 40px rgba(0, 0, 0, 0.2)'
          : '0 4px 30px rgba(0, 0, 0, 0.15)';
      }
    }
  }


  private checkScreenSize(): void {
    this.isDesktop = window.innerWidth > 768;
  }

  // Desktop dropdown (hover)
  openDropdown(dropdown: string): void {
    if (this.isDesktop) {
      this.activeDropdown = dropdown;
    }
  }

  closeDropdown(): void {
    if (this.isDesktop) {
      this.activeDropdown = null;
    }
  }

  // Mobile menu toggle
  toggleMobileMenu(): void {
    this.shownav = !this.shownav;
    if (this.shownav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      this.mobileDropdowns = { collections: false }; // reset mobile dropdowns
    }
  }

  closeMobileMenu(): void {
    this.shownav = false;
    document.body.style.overflow = '';
    this.mobileDropdowns = { collections: false };
  }

  // Mobile dropdown toggle
  toggleMobileDropdown(key: string): void {
    if (!this.isDesktop) {
      this.mobileDropdowns[key] = !this.mobileDropdowns[key];
    }
  }

  // Cart click animation (pure class toggle)
  onCartClick(): void {
    this.cartScale = true;
    setTimeout(() => this.cartScale = false, 300);
  }
}