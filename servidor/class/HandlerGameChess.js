HandlerGameChess.prototype.constructor = HandlerGameChess;

function HandlerGameChess(socket, modelUser, modelGames, sq) {
	this.socket = socket;
	this.modelUser = modelUser;
	this.modelGames = modelGames;
	this.sq = sq;

	//socket.on('getRandomUser', function(data) { this.getRandomUser() }.bind(this));
    //socket.on('getListGames', function(data) { this.getListGames(data.userName) }.bind(this));

    // Recibir movimiento en FEN
    this.socket.on('sendFen', function(data) { this.playerMove(data.fen) }.bind(this));
}

HandlerGameChess.prototype.playerMove = function(user, game, fen) {
	// salvar nuevo fen
	//informar al otro jugador si esta conectado 
}

// Movimiento
// Mandar fen al servidor
// Actualizar registro BBDD (fen, updateAt, turn...)
// informar al otro del Movimiento