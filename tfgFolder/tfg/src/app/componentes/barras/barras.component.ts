import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {DatosService} from '../../servicios/datos.service';
//import { saveAs } from 'file-saver';


@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styleUrls: ['./barras.component.scss']
})
export class BarrasComponent implements OnInit {

  public nombre: string = "";// nombre vaccio para las label
  public tope: number = 0;// limite vertical en el eje Y
  public nombres: string[] =[];
  public datos: number[] = [];
  public region: string ="";
  public dataArray: any[] = [];
  public totaltimes: any[] = [];
  public max: number = 0;
  public nombreImagen: string = ""

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { 
      xAxes: [{
        stacked: true
      }], 
      yAxes: [{ 
        stacked: true,
        ticks: { 
          beginAtZero: true,
          //stepSize: 0.5
        },
        scaleLabel: {
          labelString: 'Tiempo en segundos'//no me coge el nombre para el eje Y
       }
      }] 
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartColors: any[] = [
    /*{ backgroundColor: 'red' },
    { backgroundColor: 'green' },
    { backgroundColor: 'blue' },
    { backgroundColor: 'yellow' },
    { backgroundColor: 'brown' }*/
  ]

  public barChartData: ChartDataSets[] = [// valores y nombre de de las barras
  ];

  public barChartLabels: string[] = [];// etiqueta de barras, eje X
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  


  constructor(public DatosService: DatosService) { }

  ngOnInit(): void {

    this.barChartData = [];
    this.max  = 0;

    console.log(this.DatosService.data)


    for (let i = 0; i < this.DatosService.data.length; i++){// para cada csv 
      for (let n = 0; n < this.DatosService.data[i].datos.length; n++){
        if(this.DatosService.data[i].datos[n][0] == "Totaltime"){
          this.totaltimes.push(this.DatosService.data[i].datos[n][1]); // cojo los totaltimes
        }
      }
    }

    for (let i = 0; i < this.DatosService.data.length; i++){// para cada csv
      if (this.DatosService.data[i].datos.length > this.max){
        this.max = this.DatosService.data[i].datos.length; // ya tengo max
      }
      this.barChartLabels.push( this.DatosService.data[i].fileName /* +"\n Totaltime = " + this.totaltimes[i]*/);// cojo el nombre del csv
    }
    //ya tengo las labels

    for (let i = 0; i < this.max; i++){ // hasta el máximo de regiones
      this.datos = [];
      this.region = "";
      var tupac:ChartDataSets = {data: [], label: "", stack: 'a'};

      for (let n = 0; n < this.DatosService.data.length; n++){ ///para cada csv
        if (this.DatosService.data[n].datos.length > i){
          this.region = this.DatosService.data[n].datos[i][0];
          tupac.data.push(this.DatosService.data[n].datos[i][1]);
        }else{
          tupac.data.push(0); // si no tiene esta region se le pone un cero
          this.DatosService.data[n].datos.push(["","0"]);
        }
      }
      tupac.label = this.region;
      this.barChartData.push(tupac);

      /*if(this.region != "Totaltime"){
        this.barChartData.push(tupac);
      }*/
    }

    //SpeedUp
    var tupac:ChartDataSets = {data: [], label: "", stack: 'a'};

    tupac.label = "speedup";
    for (let n = 0; n < this.totaltimes.length; n ++){
      tupac.data.push((this.totaltimes[0]/this.totaltimes[n]));
    }
    this.barChartData.push(tupac);

}
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public saveTextAsFile (data, filename){

    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    if(!filename) filename = 'console.json'

    var blob = new Blob([data], {type: 'text/plain'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    }
    else{
      var e = document.createEvent('MouseEvents'),
          a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
      e.initEvent('click', true, false/*, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null*/);
      a.dispatchEvent(e);
    }
  }

  /*downloadCanvas(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = "test.png";
    this.nombreImagen = anchor.download;
  }*/

  public expFile(event) {

    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = "image.png";
    this.nombreImagen = anchor.download;

    //var fileName = "exportedData.tex"
  
    /*
    //cabecera
    var fileText = "\\documentclass[journal]{IEEEtran}\r\n" +
    "\\usepackage{amsmath}\r\n" + 
    "\\usepackage{graphicx}\r\n" + 
    "\\usepackage{subfigure}\r\n" + 
    "\\usepackage{algorithm}\r\n" + 
    "\\usepackage{algorithmic}\r\n" + 
    "\\usepackage{epsfig}\r\n" + 
    "\\usepackage{color}\r\n" + 
    "\\usepackage{amsfonts}\r\n" + 
    "\\usepackage{amssymb}\r\n" + 
    "\\usepackage{amsbsy}\r\n" + 
    "\\usepackage{cite}\r\n" + 
    "\\usepackage{hyperref}\r\n" + 
    "\\usepackage[]{graphicx}\r\n" + 
    "\\usepackage{amssymb}\r\n" + 
    "\\usepackage{amsmath}\r\n" + 
    "\\usepackage{amsfonts}\r\n" + 
    
    "\\newcommand{\\bs}{\\boldsymbol }\r\n" + 
    "\\definecolor{light}{gray}{.9}\r\n" + 
    "\\newcommand{\\newtext}[1]{{\\leavevmode\color{blue}#1}}\r\n" + 
    "\\usepackage{xcolor} % http://www.ctan.org/tex-archive/macros/latex/contrib/xcolor\r\n" + 
    "\\def\\HiLi{\\leavevmode\\rlap{\\hbox to \\hsize{\\color{yellow!50}\\leaders\\hrule height .8\\baselineskip depth .5ex\\hfill}}}\r\n" + 
    
    "\\begin{document}\r\n";

    //tabla
    fileText = fileText.concat("\\begin{table}[ht]\scriptsize\r\n" +
      "\\center\r\n" +
      "\\caption{Spectral Angle Values (in Degrees) between the Target Pixels Extracted by the ATDCA-GS Algorithm and the Reference USGS Mineral Signatures available for the AVIRIS Cuprite Scene.}\r\n" +
      "\\label{tab:accuracy_atdca}\r\n" +
      "\\begin{tabular}{c|c|c|c|c|c}\r\n" +
      "\\hline\r\n" +
      "\\hline\r\n");

    //datos
    for( let i = 0; i < this.DatosService.labels.length; i++  ){
        if (i == 0){
          fileText = fileText.concat("\\textbf{"+ this.DatosService.labels[i]+"}");

        }else{
          fileText = fileText.concat(" & \\textbf{"+ this.DatosService.labels[i]+"}");
        }
    }
    fileText = fileText.concat("\\\\");
    fileText = fileText.concat("\r\n" + "\\hline\r\n");

    for(let i = 0; i < this.DatosService.data.length; i++){
        fileText = fileText.concat("/"+ this.DatosService.data[i].fileName + "$^{\\circ}$	");
        for(let j = 0; j < this.DatosService.data[i].datos.length; j ++){
          fileText = fileText.concat("	& "+ this.DatosService.data[i].datos[j][1] + "$^{\\circ}$");
        }
        fileText = fileText.concat("\\\\"+"\r\n");
    }
    //cierre de tabla
    fileText = fileText.concat("\r\n" + "\\hline\r\n" +
      "\\hline\r\n" +
      "\\end{tabular}\r\n" +
      "\\end{table})\r\n");

    //imagen
    fileText = fileText.concat("\\begin{figure}[ht]\r\n" +
    "\\centering\r\n" +
    "\\begin{tabular}{c}\r\n" +
    "\\includegraphics[height=0.37\\textwidth]{" + document.getElementsByTagName('canvas')[0].toDataURL() + "}\\\r\n" +
    "\\end{tabular}\r\n" +
    "\\caption{Breakdown of the execution time considering all the parallel programming languages and platforms available (HYDICE data set).}\r\n" +
    "\\label{fig:hydice}\r\n" +
    "\\end{figure}\r\n");

    //fin de documento
    fileText = fileText.concat("\\end{document}");

    console.log(fileText);

    this.saveTextAsFile(fileText, fileName);*/

      var fileText = "";
      fileText = fileText.concat("\r\n" + "\\begin{table}[ht]\r\n" +
      "\\centering\r\n" +
      "\\caption{Tabla de los datos exportados a formato LaTex}\r\n" +
      "\\label{tab:accuracy_atdca}\r\n" +
      "\\scriptsize\r\n" +
      "\\begin{tabular}{cccccccccccc}\r\n" +
      "\\toprule\r\n");

    //datos
    for( let i = 0; i < this.DatosService.labels.length; i++  ){
        if (i == 0){
          fileText = fileText.concat("\\textbf{"+ this.DatosService.labels[i]+"}");

        }else{
          fileText = fileText.concat(" & \\textbf{"+ this.DatosService.labels[i]+"}");
        }
    }
    fileText = fileText.concat("\\\\");
    fileText = fileText.concat("\r\n" + "\\midrule\r\n");
    //fileText = fileText.replace(/_/g, "\\_");
    fileText = fileText.replace(/Set_id/g, "Set\\_id");


        for(let i = 1; i < this.DatosService.data.length; i++){
          fileText = fileText.concat(i.toString());
          for(let j = 0; j < this.DatosService.data[i].datos.length; j++){   
            for(let k = 1; k < this.DatosService.data[i].datos[j].length; k++){
              fileText = fileText.concat("	& "+ this.DatosService.data[i].datos[j][k]);
            }
          }
          fileText = fileText.concat("\\\\"+"\r\n");
        }

    //cierre de tabla
    fileText = fileText.concat("\r\n" + "\\bottomrule\r\n" +
      "\\end{tabular}\r\n" +
      "\\end{table}\r\n");

      // Datos que deseas exportar a LaTeX
      var latexIni = `
      \\documentclass{article}
      \\usepackage{graphicx}
      \\usepackage{booktabs} 
      \\usepackage{tabularx} 
      \\usepackage{hhline}   
      \\begin{document}`;
      

      
      var latexFin = `
      \\begin{figure}[ht]
      \\begin{tabular}{c}
      \\includegraphics[height=0.37\\textwidth]{image.png}
      \\end{tabular}
      \\caption{Imagen de la gráfica de barras exportada a formato LaTex.}
      \\label{fig:hydice}
      \\end{figure}
      
      Este es un ejemplo de documento LaTeX generado desde Angular.
      \\end{document}
    `;

    var latexData = latexIni + fileText + latexFin;

    // Crear un elemento <a> para descargar el archivo
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(latexData));
    element.setAttribute('download', 'documento.tex');

    // Simular un clic en el elemento <a> para iniciar la descarga
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
