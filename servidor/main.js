var vm = require('vm');
var fs = require("fs");
var app = require('express')();
var http = require('http').Server(app);
const url = require('url');
var io = require('socket.io')(http);
var path = require('path');
var Sequelize = require('sequelize');
var port = 3000;
vm.runInThisContext(fs.readFileSync(__dirname + '/cfg.js'));


function main() {
    
    for(var i = 0; i < cfg.localDependencies.length; i++)
        vm.runInThisContext(fs.readFileSync(__dirname + cfg.localDependencies[i]));

    var sq = new Sequelize(cfg.chainConnection.development);

    var modelUsers = new ModelUsers('Users', sq, Sequelize);

    // Por cada nueva conexión
    io.on('connection', function(socket) {  
        var handlerLogin = new HandlerLogin(socket, modelUsers.getModel());
    
    });
}


//Arranque del servidor
http.listen(port, function () {
    console.log(':: INFO :: Server listening on *: ' + port);
    main();
});