import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { of, switchMap, throwError, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  http = inject(HttpClient);
  api = environment.apiUrl;

  login(email: string, password: string) {
    
    // mock login
    return timer(1000).pipe(
      switchMap(() => (
        (email === 'user@example.com' && password === 'password') ? of({token: 'valid-token'}) : throwError(() => ({error: 'Invalid credentials'}))
      ))
    )

    // return this.http.post(`${this.api}/login`, {email, password});
  }

  checkToken(token: string) {

    // mock check token
    return timer(1000).pipe(
      switchMap(() => (
        (token === 'valid-token') ? of({}) : throwError(() => ({error: 'Invalid token'}))
      ))
    )

    //return this.http.post(`${this.api}/check-token`, {token});
  }

  logout() {

    // mock logout
    return timer(1000).pipe(
      switchMap(() => (
        of({})
      ))
    )

    // return this.http.post(`${this.api}/logout`, {});
  }
}
