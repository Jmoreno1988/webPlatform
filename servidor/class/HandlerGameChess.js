HandlerGameChess.prototype.constructor = HandlerGameChess;

function HandlerGameChess(socket, modelUser, modelGames, sq, usersManager) {
	this.socket = socket;
	this.modelUser = modelUser;
	this.modelGames = modelGames;
	this.sq = sq;
	this.usersManager = usersManager;

	//socket.on('getRandomUser', function(data) { this.getRandomUser() }.bind(this));
    //socket.on('getListGames', function(data) { this.getListGames(data.userName) }.bind(this));

    // Recibir movimiento en FEN
    this.socket.on('sendMoveToServer', function(data) { this.playerMove(data.raw) }.bind(this));
}

HandlerGameChess.prototype.playerMove = function(raw) {
	// salvar nuevo fen
	this.modelGames.findOne({ where: { id: raw.id } })
  		.then( function (game) {
    	// Check if record exists in db
    		if (game) {
     			game.updateAttributes({
        			turn: game.turn + 1,
        			board: raw.board
      			}).then(function(game){
      				//Informamos al otro si esta coenctado
      				try {
      					var rivalId = null;
      				// userId
      				var conn = this.usersManager.getConnectionByIdSocket(this.socket.id);
      				if(conn.userId != null) {
      					var userId = conn.userId;
      				// Idfollow OR idcreator del rival
      					if(game.idCreator == conn.userId)
      						rivalId = game.idFollow;
      					else if(game.idFollow == conn.userId)
      						rivalId = game.idCreator;
      					
      					// Mandar mensaje si esta conectado
      					if(rivalId != null) {
      						console.log("le vamos a mandar un mensaje a alguien, falta saber a id"+rivalId)
      					}



      				}

      				} catch(e) { 
      					console.log(e)
      					console.log(":: ERROR :: Error a la hora de comunicar jugada al rival.")
      				}
      			}.bind(this))
    		}
  		}.bind(this))
}

// Movimiento
// Mandar fen al servidor
// Actualizar registro BBDD (fen, updateAt, turn...)
// informar al otro del Movimiento