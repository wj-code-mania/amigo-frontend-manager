import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  data = {};
  tag = 'amigo';

  constructor(private _router: Router) {
    this.load();
  }

  save() {
    localStorage.setItem(this.tag, JSON.stringify(this.data));
  }

  destroy() {
    localStorage.removeItem(this.tag);
    this.load();
  }

  load() {
    try {
      const info = localStorage.getItem(this.tag);
      this.data = JSON.parse(info);
    } catch (e) {
      this.data = {};
    }

    if (!this.data) {
      this.data = {};
    }
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
  }

  get(key) {
    if (this.data.hasOwnProperty(key)) {
      return this.data[key];
    } else {
      return false;
    }
  }

  logout() {
    this.destroy();
    this.set('username', null);
    this.set('token', null);
    localStorage.removeItem('token');
    this._router.navigateByUrl('/login');
  }

  isValid() {
    // return !!localStorage.getItem('token');
    this.load();
    const token = this.data['token'];
    const accountType = this.data['accountType'];
    if (token && accountType == "amigoManager") {
      return true;
    } else {
      return false;
    }

  }

  getToken() {
    this.load();
    return this.data['token'];
    // return localStorage.getItem('token');
  }
}
