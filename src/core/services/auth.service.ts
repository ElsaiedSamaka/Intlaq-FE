import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api_url = environment.api_url;

  // TODO: Right now we are using a BehaviorSubject to store the signed in status of the user
  // This is not the best way to do this, but it is the easiest way to get started
  // We will need to change this public property to a private property
  private signedin$ = new BehaviorSubject<boolean>(false);
  private USER$ = new BehaviorSubject<any>(null);
  public currentUser$ = this.USER$.asObservable();
  setCurrentUser(user: any): void {
    this.USER$.next(user);
  }

  getCurrentUser(): any {
    return this.USER$.value;
  }
  constructor(private http: HttpClient) {}
  // emailAvailable will be called whenever the user types in the email field
  // we will send the email to the server and check if it is available
  emailAvailable(email: string) {
    return this.http.post<any>(`${this.api_url}/api/auth/username`, {
      email: email,
    });
  }
  // signup will be called when the user submits the signup form
  // we will send the user's credentials to the server
  signup(
    firstname: string,
    lastname: string,
    nationalID: string,
    email: string,
    experienceYears:number,
    phonenumber: string,
    biography: string,
    birthdate: any,
    city: string,
    experienceLevel: string,
    programingLanguages: any[],
    password: string,
    passwordConfirmation: string,
    userType:string,
    rememberMe: boolean
  ) {
    return this.http
      .post<any>(
        `${this.api_url}/api/auth/signup`,
        {
          firstname: firstname,
          lastname: lastname,
          nationalID: nationalID,
          email: email,
          experienceYears:experienceYears,
          phonenumber: phonenumber,
          biography: biography,
          birthdate: birthdate,
          city: city,
          experienceLevel: experienceLevel,
          programingLanguages:programingLanguages,
          password: password,
          passwordConfirmation: passwordConfirmation,
          userType:userType,
          rememberMe: rememberMe,
        },
        { withCredentials: true }
      )
      .pipe(
        tap((newUser) => {
          this.signedin$.next(true);
          this.setCurrentUser(newUser);
        })
      );
  }
  // checkAuth will be called whenever our app component is initialized
  // we can use this to check if the user is authenticated
  checkAuth() {
    return this.http.get<any>(`${this.api_url}/api/auth/signedin`).pipe(
      tap(({ authentication }) => {
        this.signedin$.next(authentication);
      })
    );
  }
  // signout will be called when the user clicks the signout button
  // we will send a request to the server to sign the user out
  signout() {
    return this.http.post<any>(`${this.api_url}/api/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
        this.setCurrentUser(null);
      })
    );
  }
  // signin will be called when the user submits the signin form
  // we will send the user's credentials to the server
  signin(email: string, password: string, rememberMe: boolean) {
    return this.http
      .post<any>(
        `${this.api_url}/api/auth/signin`,
        {
          email: email,
          password: password,
          rememberMe: rememberMe,
        },
        { withCredentials: true }
      )
      .pipe(
        tap((existingUser) => {
          this.signedin$.next(true);
          this.setCurrentUser(existingUser);
        })
      );
  }
  // update password
  updatePassword(data: any): Observable<any> {
    return this.http.put(`${this.api_url}/api/auth/update-password`, data, {
      withCredentials: true,
    });
  }
  // update avatar
  updateAvatar(data: any): Observable<any> {
    return this.http
      .put(`${this.api_url}/api/auth/update-avatar`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((updatedUser) => {
          this.setCurrentUser(updatedUser);
        })
      );
  }
  googleLogin() {
    window.location.href = `${this.api_url}/api/auth/google`;
    this.signedin$.next(true);
  }
  facebookLogin() {
    return this.http.get(`${this.api_url}/api/auth/facebook`).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }
}
