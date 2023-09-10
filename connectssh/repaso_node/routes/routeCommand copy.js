const express = require('express');
const appCommands = express();
const fs = require('fs');
const path = require('path');
const {NodeSSH} = require('node-ssh');


appCommands.get('/exec', function(req, res) {

    console.log('query', req.query);
    console.log('body', req.body);
    
  
    const ssh = new NodeSSH()

    const password = 'clases2022'
    //console.log(fs.readFileSync('C:/Users/juan/.ssh/digital_vps').toString());
    ssh.connect({
      host: /*'178.62.254.34'*/'bujaruelo.dacya.ucm.es',
      username: /*'root'*/'tfg_daniel',
      //port: 22,
      password: /*password*/'danielTFG_070722',
      //privateKey: fs.readFileSync('C:/Users/daniel/Desktop/connectssh/.ssh/digital_vps').toString(),
      tryKeyboard: true
    }).then(() => {
      console.log('Conexión');
      ssh.execCommand("touch prueba2.txt && ls", { cwd: '/scratch/tfg_daniel' }).then(function(result) {
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








module.exports = {
    appCommands
}