import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public baseUrl = environment.API_SERVICE_URL;

  constructor(private http: HttpClient,) { }

  getUsers(param?: any) {
    return this.http.get<any>(this.baseUrl, {params: param})
  }
}
