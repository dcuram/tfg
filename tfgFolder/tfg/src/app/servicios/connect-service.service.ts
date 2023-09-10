import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DatosService} from './datos.service';



@Injectable({
  providedIn: 'root'
})

export class ConnectServiceService {

  public url_server = environment.serverUrl;

  constructor(private http: HttpClient, public DatosService: DatosService) { }

  public getCommand(): any {

    let command = this.DatosService.sshCommands;
    console.log("params = " + command)
    return this.http.get( this.url_server + `exec?command=${command}` );
  }

  public getDownload(): any {

    let command = this.DatosService.sshCommands;
    console.log("params = " + command)
    return this.http.get( this.url_server + `sftp?command=${command}` );
  }
}
