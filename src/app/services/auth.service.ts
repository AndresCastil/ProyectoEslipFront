import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap,map } from 'rxjs';
import { UserStorageService } from './user-storage.service';

const BASIC_URL = "http://localhost:5000/";
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   constructor(private http: HttpClient,
              private userStorageService: UserStorageService) { }

  login(username: string, password: string): any {
    const data = {username,password}
    return this.http.post(BASIC_URL + 'login', data).pipe(
      tap(_ => console.log('User Authentication')),
      map((res:any) => {
        console.log("res is ervice", res);
   
        this.userStorageService.saveToken(res.token);
        return res;
      }));
  }

  getUserByUsername(username: string): any {
    return this.http.get(BASIC_URL + `users/${username}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  registerUser(user): any {
    return this.http.post(BASIC_URL + `register`, user)
  }

  getHotels(city): any {
    return this.http.get(BASIC_URL + `api/hotelByCity/${city}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getCities(): any {
    return this.http.get(BASIC_URL + `api/cities`)
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

}
