import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  fileName: string = "";
  datos: any[] = [];
  fileNames: string[] = [];
  labels: string[] = ["Name"];

  data:[{
    datos: any[],
    fileName: string
  }] = [{
    datos: [],
    fileName: ""
  }]

  sshCommands: any[]= [];

  constructor() { }
}
