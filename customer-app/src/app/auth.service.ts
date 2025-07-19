import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private authUrl = 'https://localhost:7053/api/auth/authenticate';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password }).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getRole(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return null;
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken['role'] || null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
