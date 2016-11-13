HandlerGameChess.prototype.constructor = HandlerGameChess;

function HandlerGameChess(socket, modelUser, modelGames, sq) {
	this.socket = socket;
	this.modelUser = modelUser;
	this.modelGames = modelGames;
	this.sq = sq;

	socket.on('getRandomUser', function(data) { this.getRandomUser() }.bind(this));
    socket.on('getListGames', function(data) { this.getListGames(data.userName) }.bind(this));
}

HandlerGameChess.prototype.saveGame = function() {

}