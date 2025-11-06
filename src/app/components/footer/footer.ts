import {Component, HostListener} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  newsletterEmail = '';
  isBackToTopVisible = false;

  ngOnInit() {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    this.isBackToTopVisible = window.scrollY > 300;
  }

  onNewsletterSubmit() {
    if (this.newsletterEmail) {
      console.log('Newsletter subscription:', this.newsletterEmail);
      // Implement your newsletter subscription logic here
      alert('Thank you for subscribing to our newsletter!');
      this.newsletterEmail = '';
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
