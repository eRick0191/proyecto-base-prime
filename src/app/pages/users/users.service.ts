import {Injectable} from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private _http: HttpClient,
  ) {
  }

  public getUsers(): Observable<any> {

    return this._http.get('usuarios', {
      headers: {noLoading: 'true'}
    });
  }


  public create(body: any): Observable<any> {
    return this._http.post('usuarios', body);

  }

  public show(id: number): Observable<any> {
    return this._http.get(`usuarios/${id}`);
  }



  public update(id: number, body: any): Observable<any> {
    return this._http.put(`usuarios/${id}`, body);
  }

  public delete(id: number): Observable<any> {
    return this._http.delete(`usuarios/${id}`);
  }


}
