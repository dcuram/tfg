import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import {DatosService} from '../../servicios/datos.service';

@Component({
  selector: 'app-csv-parser',
  templateUrl: './csv-parser.component.html',
  styleUrls: ['./csv-parser.component.scss']
})
export class CsvParserComponent implements OnInit {

  header = false; // parsear cabeceras
  public fileName: string = "";
  csvRecords: any[] = [];


  constructor(private ngxCsvParser: NgxCsvParser, public DatosService: DatosService) {}
 
  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
 
  fileChangeListener($event: any): void { // seleccionamos archivo

    this.DatosService.labels = []

    const files = $event.srcElement.files;
    let file = $event.srcElement.files[0];

    let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
          let csv: any = reader.result;
          let allTextLines = [];
          allTextLines = csv.split(/\r|\n|\r/); // texto entero

          for(let i = 0; i < allTextLines.length; i++){
            this.DatosService.data[i] = {
              datos: [],
              fileName: ""
            }
            this.DatosService.data[i].datos.push(allTextLines[i].split(';'));
          }

          this.DatosService.data[0].datos[this.DatosService.data[0].datos.length-1]
          [this.DatosService.data[0].datos[this.DatosService.data[0].datos.length-1].length] = "Sum line 0 and line 4"


          for(let i = 1; i < this.DatosService.data.length; i++){
            console.log("datos i = " + this.DatosService.data[i]);   
            for(let j = 0; j < this.DatosService.data[i].datos.length; j++){      
              console.log("datos j = " + this.DatosService.data[i].datos[j]);       
              for(let k = 2; k < this.DatosService.data[i].datos[j].length; k++){
                let x = this.DatosService.data[i].datos[j][k]/1000000;
                this.DatosService.data[i].datos[j][k] = x.toFixed(4); 
              }
              let y = Number(this.DatosService.data[i].datos[j][2]);
              let z = Number(this.DatosService.data[i].datos[j][6]);
              var yz:number = y + z;
              this.DatosService.data[i].datos[j][this.DatosService.data[i].datos[j].length] = yz.toFixed(4);
            }
          }
      }
  }

  onFolderSelected(event){ // seleccionamos fichero
    if (event.target.files.length > 0){

      this.DatosService.data = [{
        datos: [],
        fileName: ""
      }];
      this.DatosService.labels = ["Name"] // reseteamos DatosService

      let files = event.target.files; // me cojo los ficheros
      if(files && files.length > 0) {
        for (let i = 0; i < files.length; i++){//para mostrar por consola
          let file : File = files.item(i); 
          let reader: FileReader = new FileReader();
          reader.readAsText(file);
          reader.onload = (e) => {
            let csv: string = reader.result as string;
          }  

          this.ngxCsvParser.parse(files[i], {header: this.header, delimiter: ';' })
          .pipe().subscribe((result: Array<any>) => {
            this.DatosService.fileNames =this.DatosService.fileNames.concat(files[i].name) ; // cojo el nombre del csv
            this.DatosService.datos[i] = result; // cojo los datos y los meto en el servcio para pasarselos a barras.
            this.DatosService.data[i] = {
              datos: [],
              fileName: ""
            }
            this.DatosService.data[i].datos = result;
            console.log(result);
            this.DatosService.data[i].fileName =files[i].name;
            //this.csvRecords = result; // esto es para la tabla

            for (let j  = 0; j < this.DatosService.data[i].datos.length; j++){
              if(!this.DatosService.labels.includes(this.DatosService.data[i].datos[j][0])){
                this.DatosService.labels = this.DatosService.labels.concat(this.DatosService.data[i].datos[j][0]);//fila labels
              }
            }


          }, (error: NgxCSVParserError) => { // en caso de error...
            console.log('Error', error);
          });
        }   
      }
    }
  }

  ngOnInit(): void { 

    this.DatosService.data = [{ // borramos todos los datos para volver a cargar fichero
      datos: [],
      fileName: ""
    }];

  }

}
