import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent} from './componentes/main/main.component';
import { CsvParserComponent} from './componentes/csv-parser/csv-parser.component';
import { PruebasComponent} from './componentes/pruebas/pruebas.component';
import { BarrasComponent} from './componentes/barras/barras.component';
import { LineasComponent} from './componentes/lineas/lineas.component';
import { MenuComponent} from './componentes/menu/menu.component';
import { InputComponent} from './componentes/input/input.component';





const routes: Routes = [

  { path: "",
  redirectTo: "/menu",
  pathMatch: 'full' },

  /*{ path: '', component: MainComponent },*/
  { path: 'main', component: MainComponent },
  { path: 'file-input', component: CsvParserComponent },
  { path: 'barras', component: BarrasComponent },
  { path: 'lineas', component: LineasComponent },
  { path: 'pruebas', component: PruebasComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'input', component: InputComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
