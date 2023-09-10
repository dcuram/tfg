import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {DatosService} from '../../servicios/datos.service';



@Component({
  selector: 'app-root',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss']
})
export class PruebasComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
      {}
  ];

  public nombres: string[] =[];
  public datos: number[] = [];
  public region: string ="";
  public dataArray: any[] = [];

  constructor(public DatosService: DatosService) { }

  ngOnInit() {
    //console.log("datosService = " + this.DatosService.data);
    
    this.barChartData = [];

    for (let i = 0; i < this.DatosService.data.length; i++){// para cada csv
      this.barChartLabels.push( this.DatosService.data[i].fileName);// cojo el nombre del csv
    }
    //ya tengo las labels

    for (let i = 0; i < this.DatosService.data[0].datos.length; i++){
      this.datos = [];
      this.region = "";
      var tupac:ChartDataSets = {data: [], label: "", stack: 'a'};

      for (let n = 0; n < this.DatosService.data.length; n++){
        this.region = this.DatosService.data[n].datos[i][0];
        tupac.data.push(this.DatosService.data[n].datos[i][1]);
      }
      tupac.label = this.region;

      if(this.region != "Totaltime"){
        this.barChartData.push(tupac);
      }
    }
  }
}










/*import { NgForOf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexYAxis,
  ApexFill,
  ApexPlotOptions
} from "ng-apexcharts";
import { NgApexchartsModule } from 'ng-apexcharts';
import {DatosService} from '../../servicios/datos.service';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill;
  yaxis: ApexYAxis
};

@Component({
  selector: 'app-root',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss']
})
export class PruebasComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor(public DatosService: DatosService) { 

    this.chartOptions = {
      title : {
        text: 'Tupac'
      },
  
      series : [{
        name: "",
        data: []
      }],
  
      chart : {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      plotOptions : {
        bar: {
          horizontal: false
        }
      },
      xaxis : {
        type: "category",
        categories: [
          "01/2011",
          "02/2011",
          "03/2011",
          "04/2011",
          "05/2011",
          "06/2011"
        ]
      },
      fill : {
        opacity: 1
      },
  
      legend : {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        showForSingleSeries: true,
        onItemClick: {
          toggleDataSeries: false
        }
      },
      yaxis : { 
      max: 1
      }
    }
  };


  public tope: number = 0;// limite vertical en el eje Y
  public datos: any[] = [];// cogemos los datos del servicio;
  public nombre: string = "";// nombre vaccio para las label

  ngOnInit(): void {

    this.chartOptions.series = [{
      name: "",
      data: []
      }];

    for (let i = 0; i < this.DatosService.data.length; i++){

      this.nombre = this.DatosService.data[i].fileName;

      for(let n = 0; n < this.DatosService.data[i].datos.length; n++){
      
        
        this.datos[n] = this.DatosService.data[i].datos[n][1];
      
      }

      /*this.chartOptions.series.push([{
        name: this.nombre,
        data: this.datos
      }])*/

      /*var chart = new ApexCharts(document.querySelector("#chartdiv"),this.chartOptions);
      chart.appendSeries({
        name: 'newSeries',
        data: [32, 44, 31, 41, 22]
      })*/


      /*this.chartOptions.updateSeries([{
        name: this.nombre,
        data: this.datos
      }])*/
      
      
      /*([{
        name: this.nombre,
        data: this.datos
      }])
      /*this.chartOptions.series = [{
        name: this.nombre,
        data: this.datos
      }];*/
      
      /*this.series.push({
        name: this.DatosService.data[i].fileName,
        data: this.datos

        name: "TUPAC",
        data: [1,2,3,4]

      })
      this.series = [{
        name: this.nombre,
        data: this.datos
      }];
      console.log(this.datos);

    };

  }
}*/
