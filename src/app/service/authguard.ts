import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './authservice';
import { ServerService } from '../service/server';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(
    private authService: AuthService, 
    public serverService: ServerService,
    public server: ServerService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isValid()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
