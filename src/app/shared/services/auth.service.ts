import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { fbAuthResponse, User } from '../interfaces';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }


  getUser(): Observable<any> {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`,{idToken:this.token});
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
      user
    );
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found');
        break;
    }

    return throwError(error);
  }
  private setToken(response: fbAuthResponse | null) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
