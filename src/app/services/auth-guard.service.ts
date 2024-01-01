// auth-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // Replace this logic with your actual authentication mechanism
  isAuthenticated = false;

  constructor(private router: Router) {}

  canActivate(): boolean {
    let cred = localStorage.getItem('creds')
    console.log('cred :', cred);
    if (cred) {
      return true; // User is authenticated, allow access to the route
    } else {
      // User is not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
