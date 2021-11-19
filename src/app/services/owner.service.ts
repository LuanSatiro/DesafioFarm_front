import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Owner, BuildOwner } from '../models/Owner';
import { Farm, BuildFarm } from './../models/Farm'

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private endPoint;

  constructor(private http: HttpClient) {
    this.http = http;
    this.endPoint = 'http://localhost:3000/';
  }

  list():  Observable<{owners: Owner[]}> {
    const options = {
      headers: new HttpHeaders(),
      observe: 'response' as 'body'
    };
    return this.http.get(this.endPoint + 'owners', options).pipe(
      map((response: any) => {
          return{
            owners: response.body.map(owner => BuildOwner(owner))
          };
      })
    );
  }
}