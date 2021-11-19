import { Injectable } from '@angular/core'
import { Farm, BuildFarm } from './../models/Farm'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class FarmService {
  private endPoint;

  constructor(private http: HttpClient) {
    this.http = http;
    this.endPoint = 'http://localhost:3000/';
  }

  create(farm: any) {
    const options = {
      headers: new HttpHeaders(),
      observe: 'response' as 'body'
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return  this.http.post('http://localhost:3000/farms/', farm, options).subscribe( () => {
      alert('Salvo!');
    })
  }

  read(id: number): Observable<Farm> {
    const options = {
      headers: new HttpHeaders(),
      observe: 'response' as 'body'
    };
    return this.http.get(`${this.endPoint}farms/${id}`, options).pipe(
      map((consumptions: any) => {
        return BuildFarm(consumptions.body);
    }));
  }

  update(id: number, farm: Farm) {
    return  this.http.put(`http://localhost:3000/farms/${id}`, farm).subscribe( () => {
      alert('Salvo!');
    })
  }

  delete(id: number) {
    return  this.http.delete(`http://localhost:3000/farms/${id}`).subscribe( () => {
      alert('Deletado!');
    })
  }

  list():  Observable<{farms: Farm[]}> {
    const options = {
      headers: new HttpHeaders(),
      observe: 'response' as 'body'
    };
    return this.http.get(this.endPoint + 'farms', options).pipe(
      map((response: any) => {
          return{
            farms: response.body.map(farm => BuildFarm(farm))
          };
      })
    );
  }
}
