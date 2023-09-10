import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './componentes/main/main.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BarrasComponent } from './componentes/barras/barras.component';

import { ChartsModule } from 'ng2-charts';

import { CsvParserComponent } from './componentes/csv-parser/csv-parser.component';

import { NgxCsvParserModule } from 'ngx-csv-parser';
import { FormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { PruebasComponent } from './componentes/pruebas/pruebas.component';
import { NgApexchartsModule } from 'ng-apexcharts';

import { LineasComponent } from './componentes/lineas/lineas.component';

import {MatTabsModule} from '@angular/material/tabs';

import { MenuComponent } from './componentes/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from './componentes/input/input.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BarrasComponent,
    CsvParserComponent,
    PruebasComponent,
    LineasComponent,
    MenuComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ChartsModule,
    NgxCsvParserModule,
    FormsModule,
    DataTablesModule,
    NgApexchartsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }