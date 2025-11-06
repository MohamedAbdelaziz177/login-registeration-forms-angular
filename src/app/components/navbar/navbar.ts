import {Component, HostListener} from '@angular/core';
import {RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMenuOpen = false;
  isLoggedIn = false; // Change this based on your auth state
  showUserDropdown = false;
  userName = 'John Doe';
  userAvatar = ''; // Add user avatar URL if available

  ngOnInit() {
    // Initialize auth state - replace with your actual auth logic
    this.checkAuthState();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Close dropdown when clicking outside
    if (this.showUserDropdown) {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu')) {
        this.showUserDropdown = false;
      }
    }
  }

  checkAuthState() {
    // Replace with your actual authentication check
    // this.isLoggedIn = this.authService.isLoggedIn();
    // this.userName = this.authService.getUserName();
    // this.userAvatar = this.authService.getUserAvatar();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  getUserInitials(): string {
    return this.userName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
  }

  onLogout() {
    // Implement your logout logic
    this.isLoggedIn = false;
    this.showUserDropdown = false;
    this.isMenuOpen = false;
    document.body.style.overflow = '';

    // this.authService.logout();
    // this.router.navigate(['/login']);
  }

  // Close mobile menu when navigating
  closeMobileMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }
}
