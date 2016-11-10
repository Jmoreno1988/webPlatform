HandlerGameChess.prototype.constructor = HandlerGameChess;

function HandlerGameChess(socket, modelUser, modelGames, sq) {
	this.socket = socket;
	this.modelUser = modelUser;
	this.modelGames = modelGames;
	this.sq = sq;
}