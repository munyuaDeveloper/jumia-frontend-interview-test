import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserData} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public baseUrl = environment.API_SERVICE_URL;

  constructor(private http: HttpClient,) { }

  getData(param?: any) {
    return this.http.get<any>(this.baseUrl, {params: param})
  }
}