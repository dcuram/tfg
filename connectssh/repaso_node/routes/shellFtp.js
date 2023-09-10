const express = require('express');
const appSftp = express();

const fs = require('fs');
const path = require('path');

let Client = require('ssh2-sftp-client');
let localPath = '';

let data = {
    message: '',
    error: null
}

appSftp.get('/sftp', function (req, res) {

    let command = req.query.command;

    if (command == null){
        let data = {
            "message" : "faltan parametros",
        }
        return res.json(data);
    }
    console.log(command);
    let commandAux = command.split(",");

    let remotePath = /*'/home/dani/dani.txt'*/commandAux[6];
    localPath = /*'C:/Usuarios/daniel/Desktop/documentacion/'*/ commandAux[7];
    let sftp = new Client();

    sftp.connect({
        host: '178.62.254.34',
        port: '22',
        username: 'root',
        passphrase: 'clases2022',
        privateKey: fs.readFileSync('C:/Users/daniel/Desktop/connectssh/.ssh/digital_vps').toString(),

        ///////////////////////////////
        /*host:commandAux[0],
        username:commandAux[1],
        password:commandAux[2],
        port: parseInt(commandAux[3]),
        tryKeyboard: true*/

    }).then(async() => {
        await sftp.fastGet(remotePath, localPath);
        sftp.end();
        return true;
    }).then(( resp ) => {
        data.error = '';
        data.message = `El archivo ${commandAux[6]} se ha descargado correctamente`;
        return res.json(data);
    }).catch(error => {
        console.log('error', error);
        data =  {
            message: 'Error en la descarga del archivo',
            error
        }
        return res.json(data);
    })
});

module.exports = appSftp;