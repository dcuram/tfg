import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConnectServiceService {

  public url_server = environment.serverUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getCommand(): any {
    let p1 = 'prueba.txt';
    let p2 = 'directorio.txt';
    return this.http.get( this.url_server + `shell/exec?p1=${p1}&p2=${p2}` );
  }
}
