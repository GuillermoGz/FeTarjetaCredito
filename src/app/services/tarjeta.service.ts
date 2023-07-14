import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private myAppUrl = 'https://localhost:44314/';
  private myapiUrl = 'api/Tarjeta/'
  constructor(private http: HttpClient) {}
    getListTarjeta() : Observable<any> {
      return this.http.get(this.myAppUrl + this.myapiUrl);
    }
    deleteTarjeta(id:Number) : Observable<any> {
      return this.http.delete(this.myAppUrl + this.myapiUrl + id);
    }
    saveTarjeta(tarjeta:any) : Observable<any> {
      return this.http.post(this.myAppUrl + this.myapiUrl,tarjeta);
    }
    updateTarjeta(id:number,tarjeta:any) : Observable<any> {
      return this.http.put(this.myAppUrl + this.myapiUrl + id,tarjeta);
    }
}
