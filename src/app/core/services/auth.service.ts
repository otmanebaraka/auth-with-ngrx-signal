import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token_key = 'token';
  
  saveToken(token: string) {
    localStorage.setItem(this.token_key, token);
  }

  getToken() {
    return localStorage.getItem(this.token_key);
  }

  removeToken() {
    localStorage.removeItem(this.token_key);
  }
}
