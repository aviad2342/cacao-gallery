import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticatedUser } from './authenticatedUser.model';

export interface AuthResponseData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  token: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private authuser = new BehaviorSubject<AuthenticatedUser>(null);
  private activeLogoutTimer: any;

  get userIsAuthenticated() {
    return this.authuser.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this.authuser.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this.authuser.asObservable().pipe(
      map(user => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  get user() {
    return this.authuser.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {}


  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `http://aviadbenhayun.com:3200/auth/login`,
        { email, password }
      )
      .pipe(tap(
        this.setUserData.bind(this)
        ));
  }

  autoLogin() {
    const user = this.getAuthData();
    if (user.tokenDuration < 0) {
          return null;
        }
    this.authuser.next(user);
    this.autoLogout(user.tokenDuration);
    return !!user;
  }

  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.authuser.next(null);
    this.clearAuthData();
  }


  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }


  // private setAuthTimer(duration: number) {
  //   this.tokenTimer = setTimeout(() => {
  //     this.logout();
  //   }, duration * 1000);
  // }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000);
    const user = new AuthenticatedUser(
      userData.userId,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.profilePicture,
      userData.token,
      expirationTime
    );
    userData.expiresIn = expirationTime.toISOString();
    this.authuser.next(user);
    this.autoLogout(user.tokenDuration);
    this.saveAuthData(userData);
  }

  private saveAuthData(data: AuthResponseData) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('expiration', data.expiresIn);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('lastName', data.lastName);
    localStorage.setItem('email', data.email);
    localStorage.setItem('profilePicture', data.profilePicture);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('profilePicture');
  }

  private getAuthData() {
    const token          = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId         = localStorage.getItem('userId');
    const firstName      = localStorage.getItem('firstName');
    const lastName       = localStorage.getItem('lastName');
    const email          = localStorage.getItem('email');
    const profilePicture = localStorage.getItem('profilePicture');
    const user = new AuthenticatedUser(
      userId,
      firstName,
      lastName,
      email,
      profilePicture,
      token,
      new Date(expirationDate)
    );
    if (!token || !expirationDate) {
      return;
    }
    return user;
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }

}
