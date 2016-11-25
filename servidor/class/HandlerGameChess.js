HandlerGameChess.prototype.constructor = HandlerGameChess;

function HandlerGameChess(socket, modelUser, modelGames, sq) {
	this.socket = socket;
	this.modelUser = modelUser;
	this.modelGames = modelGames;
	this.sq = sq;

	//socket.on('getRandomUser', function(data) { this.getRandomUser() }.bind(this));
    //socket.on('getListGames', function(data) { this.getListGames(data.userName) }.bind(this));

    // Recibir movimiento en FEN
    this.socket.on('sendMoveToServer', function(data) { this.playerMove(data.raw) }.bind(this));
}

HandlerGameChess.prototype.playerMove = function(raw) {
	// salvar nuevo fen

	/*
	this.modelGames.findOne({ where: {id: raw.id} }).then(function(game) {
    	// guardamos info
    	//game.updateAttributes({
        //	turn: 22
      	//})
		game.turn = 22;
		game.save().then(function() {})
	}.bind(this));
*/
this.modelGames.findOne({ where: { id: raw.id } })
  .then( function (game) {
    // Check if record exists in db
    if (game) {
      game.updateAttributes({
        turn: game.turn + 1,
        board: raw.board
      })
      
    }
  })
}

// Movimiento
// Mandar fen al servidor
// Actualizar registro BBDD (fen, updateAt, turn...)
// informar al otro del Movimiento