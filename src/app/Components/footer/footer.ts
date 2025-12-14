
import { Component, AfterViewInit, ElementRef, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer implements AfterViewInit, OnInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  constructor() {}

  ngOnInit(): void {
    // SSR-safe initialization only in browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
  }

  // --------------------
  // Modal Open / Close
  // --------------------
  openModal(type: string): void {
    // SSR protection
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const modal = this.el.nativeElement.querySelector(`#${type}Modal`) as HTMLElement | null;

    if (!modal) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal(type: string): void {
    // SSR protection
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const modal = this.el.nativeElement.querySelector(`#${type}Modal`) as HTMLElement | null;

    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --------------------
  // Lifecycle
  // --------------------
  ngAfterViewInit(): void {
    // All DOM operations only in browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Click outside modal
    const overlays = this.el.nativeElement.querySelectorAll('.modal-overlay');

    overlays.forEach((overlay: HTMLElement) => {
      overlay.addEventListener('click', (e: Event) => {
        if (e.target === overlay) {
          const modalId = overlay.id.replace('Modal', '');
          this.closeModal(modalId);
        }
      });
    });

    // Escape key close
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const activeModals = this.el.nativeElement.querySelectorAll('.modal-overlay.active');

        activeModals.forEach((modal: HTMLElement) => {
          const modalId = modal.id.replace('Modal', '');
          this.closeModal(modalId);
        });
      }
    });

    // Newsletter submit
    const newsletterForm = this.el.nativeElement.querySelector(
      '.newsletter-form'
    ) as HTMLFormElement | null;

    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const emailInput = this.el.nativeElement.querySelector(
          '.newsletter-input'
        ) as HTMLInputElement | null;

        if (emailInput?.value) {
          this.showSuccessToast();
          emailInput.value = '';
        }
      });
    }

    // Smooth scroll footer links
    const footerLinks = this.el.nativeElement.querySelectorAll('.footer-links a');

    footerLinks.forEach((link: HTMLAnchorElement) => {
      link.addEventListener('click', (e: Event) => {
        const href = link.getAttribute('href');

        if (href?.startsWith('#')) {
          e.preventDefault();
          const target = this.el.nativeElement.querySelector(href) as HTMLElement | null;

          if (target) {
            window.scrollTo({
              top: target.offsetTop,
              behavior: 'smooth',
            });
          }
        }
      });
    });
  }

  // --------------------
  // Success Toast
  // --------------------
  showSuccessToast(): void {
    // SSR protection
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const successMsg = document.createElement('div');

    Object.assign(successMsg.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #d4af37, #f4e4c1)',
      color: '#1a1a1a',
      padding: '15px 25px',
      borderRadius: '5px',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      zIndex: '1000',
      transform: 'translateY(100px)',
      opacity: '0',
      transition: 'all 0.3s ease',
    });

    successMsg.textContent = 'Thank you for subscribing!';
    document.body.appendChild(successMsg);

    setTimeout(() => {
      successMsg.style.transform = 'translateY(0)';
      successMsg.style.opacity = '1';
    }, 100);

    setTimeout(() => {
      successMsg.style.transform = 'translateY(100px)';
      successMsg.style.opacity = '0';

      setTimeout(() => {
        document.body.removeChild(successMsg);
      }, 300);
    }, 3000);
  }
}
