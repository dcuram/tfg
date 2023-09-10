import { Component, OnInit} from '@angular/core';
import { ConnectServiceService } from '../../servicios/connect-service.service';
import {DatosService} from '../../servicios/datos.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {

  constructor(private connectService: ConnectServiceService,  public DatosService: DatosService) { }

  ngOnInit() {
    
  }

  onReadtxt($event){

    const files = $event.srcElement.files;
    let file = $event.srcElement.files[0];
    let allTextLines = [];

    let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
          let txt: any = reader.result;
          allTextLines = [];
          allTextLines = txt.split(/*/\r|\n|\r/*//\r?\n/);
          console.log(allTextLines);
          if (allTextLines.length > 0){
            this.DatosService.sshCommands[0] = allTextLines[0];
            this.DatosService.sshCommands[1] = allTextLines[1];
            this.DatosService.sshCommands[2] = allTextLines[2];
            this.DatosService.sshCommands[3] = allTextLines[3];
            this.DatosService.sshCommands[4] = allTextLines[4];
            this.DatosService.sshCommands[5] = allTextLines[5];
            this.DatosService.sshCommands[6] = allTextLines[6];
            this.DatosService.sshCommands[7] = allTextLines[7];   
          }
         }
  }

  onLaunch(){
    this.connectService.getCommand().toPromise().then((res:any)=>{
      console.log(res);
      
    })
  }

  onDownload(){
    this.connectService.getDownload().toPromise().then((res:any)=>{
      console.log(res);
      
    })
  }
}
