import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import {IUser, IUserRequest, UserResponse} from "./IUser";
import {ProductResponse} from "../product/product";
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  sendUser = (request: IUserRequest): Observable<UserResponse> => {
    return this.httpClient.post<UserResponse>(`${apiUrl}/user`, request);
  }

  getAllUsers = (): Observable<UserResponse> => {
    return  this.httpClient.get<UserResponse>(`${apiUrl}/users`);
  }

  login(user: IUser) : Observable<any> {
    return this.httpClient.post<any>(apiUrl + "/login", user).pipe(
      tap((response) => {


        if(response.statusCode !== 200) return;

        const token = response.data.token;
        // localStorage.setItem('token', btoa(JSON.stringify(response.data.token)));
        localStorage.setItem('token', token);
        localStorage.setItem('user', btoa(JSON.stringify(response.data.user)));
        this.router.navigate(['home']);
      }));
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
  get obterUsuarioLogado(): IUser | null {
    const usuario = localStorage.getItem('usuario');
    return usuario
      ? JSON.parse(atob(usuario))
      : null;
  }

  get idUser(): string | null {
    const usuario = localStorage.getItem('usuario');
    return usuario
      ? (JSON.parse(atob(usuario)) as IUser).id
      : null;
  }

  get tokenUser(): string | null {
    const token = localStorage.getItem('token');
    return token
      ? JSON.parse(atob(token))
      : null;
  }
  get logged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }


}
