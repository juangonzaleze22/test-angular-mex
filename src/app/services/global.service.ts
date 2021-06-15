import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employees, formEmployee } from '../models/employees';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  

  api: string = 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/';
  author: string = '/JuanGonzalez'

  constructor(
    private _http : HttpClient,
    
  ) { }

  getService(service: string){
    return this._http.get(this.api + service + this.author);
  }

  postService(service: string, data: formEmployee){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
 
    return this._http.post(this.api+service + this.author, data, {headers: headers});
  }

  getGroupById(service: string, group: any){
    return this._http.get(this.api + service + this.author + group);
  }
}
