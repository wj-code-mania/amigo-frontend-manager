import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ManagerConfig } from '../config/manager.config';
import { AuthService } from './authservice';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private http: HttpClient,
    public authService: AuthService
  ) {}

  baseUrl = ManagerConfig.endPoints.server;

  get(apiUrl: string, authRequired = false) {

    var headers = new HttpHeaders({
      'Authorization': this.authService.getToken() 
    });
    var options = { headers: headers };

    if(authRequired){
      return this.http.get<any>(this.baseUrl + apiUrl, options);
    }else{
      return this.http.get<any>(this.baseUrl + apiUrl);
    }
  }

  post(apiUrl: string, content: any, authRequired = false) { 

    var headers = new HttpHeaders({
      'Authorization': this.authService.getToken() 
    });
    var options = { headers: headers };
 
    if(authRequired){
      return this.http.post(this.baseUrl + apiUrl, content, options);
    }else{
      return this.http.post(this.baseUrl + apiUrl, content);
    }
  }

  put(apiUrl: string, content: any, authRequired = false) {

    var headers = new HttpHeaders({
      'Authorization': this.authService.getToken() 
    });
    var options = { headers: headers };

    if(authRequired){
      return this.http.put(this.baseUrl + apiUrl, content, options);
    }else{
      return this.http.put(this.baseUrl + apiUrl, content);
    }
  }

  delete(apiUrl: string, authRequired = false) {

    var headers = new HttpHeaders({
      'Authorization': this.authService.getToken() 
    });
    var options = { headers: headers };

    if(authRequired){
      return this.http.delete(this.baseUrl + apiUrl, options);
    }else{
      return this.http.delete(this.baseUrl + apiUrl);
    }
  }

}
