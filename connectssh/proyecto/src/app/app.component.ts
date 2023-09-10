import { Component, OnInit } from '@angular/core';
import { ConnectServiceService } from './services/connect-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'proyecto';
  public respuesta: any = [];

  constructor(
    private commandServer: ConnectServiceService
  ){
   /*  this.commandServer.getCommand().subscribe( (resp: any) => {
      this.respuesta = resp;
    });

    this.commandServer.getCommand().toPromise().then( (resp: any) => {
      this.respuesta = resp;
    }); */


  }
  async ngOnInit(): Promise<void> {
    this.respuesta = await this.commandServer.getCommand().toPromise();
  }
}
