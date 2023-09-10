const express = require('express');
const appCommands = express();
const fs = require('fs');
const path = require('path');
const {NodeSSH} = require('node-ssh');


appCommands.get('/exec', function(req, res) {
  
    const ssh = new NodeSSH()

    let command = req.query.command;
    let directory = req.query.directory;

    if (command == null){
        let data = {
            "message" : "faltan parametros",
        }
        return res.json(data);
    }
    console.log(command);

    let commandAux = command.split(",");
    let listCommands = command.replace(/\,/g,";")
    console.log(listCommands);    
    ssh.connect({
      host: commandAux[0],
      username: commandAux[1],
      port: parseInt(commandAux[3]),
      passphrase: commandAux[2],
      privateKey: fs.readFileSync('C:/Users/daniel/Desktop/connectssh/.ssh/digital_vps').toString(),
      tryKeyboard: true
      ///////////////////////////////
      /*host:commandAux[0],
      username:commandAux[1],
      password:commandAux[2],
      port: parseInt(commandAux[3]),
      tryKeyboard: true*/
    }).then(() => {
      console.log('Conexión');
        ssh.execCommand(commandAux[4], { cwd: commandAux[5] }).then(function(result) {
        console.log('STDOUT: ' + result.stdout)
        console.log('STDERR: ' + result.stderr)
        if (result.stderr.length > 0 ){
            let data = {
                "message" : "Error al  ejectuar el comando",
                "content": result.stderr
            }
            res.json(data);
        } else {
            let data = {
                "message" : "Comando ejecutado con éxito",
                "content": result.stdout
            }
            res.json(data);
        }
       
      })
    })
    .catch( error => {
        console.log('error', error);
        let data = {
            "message" : "Error al ejecutar el comando",
            "content": error
        }
        res.json(data);
    })    
})

module.exports = appCommands;