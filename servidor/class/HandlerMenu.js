HandlerMenu.prototype.constructor = HandlerMenu;

function HandlerMenu(socket, modelUser, modelGames, sq) {
	this.socket = socket;
	this.modelUser = modelUser;
	this.modelGames = modelGames;
	this.sq = sq;
    
    socket.on('getRandomUser', function(data) { this.getRandomUser() }.bind(this));
    socket.on('getListGames', function(data) { this.getListGames(data.userName) }.bind(this));
}


HandlerMenu.prototype.getRandomUser = function() {
	this.sq.query("SELECT COUNT(*) as totalUsers FROM `users`", { type: this.sq.QueryTypes.SELECT})
		.then(function(result) {
			var rand = Math.floor(Math.random() * result[0].totalUsers);
			this.sq.query("SELECT * FROM `users` where id=" + rand, { type: this.sq.QueryTypes.SELECT}).
			then(function(result){
				//this.socket.emit('respondGetRandomUser', {id: 200, data: {id: result.id, }});	ME quedo aqui, tengp que repasaar la bbdd
			}.bind(this))
  	}.bind(this))
}

HandlerMenu.prototype.getListGames = function(userName) {
	this.getIdByUserName(userName);
	// Buscar id por userName
	// Buscar partidas donde idCreator OR idFollow sea igual al id
	// Devolver al clieente el resultado
}

HandlerMenu.prototype.getIdByUserName = function(userName) {
	this.modelUser.findOne({ where: {userName: userName} }).then(function(user) {
   		this.modelGames.findAll({ where: {$or: [{idCreator: user.id}, {idFollow: user.id}]} }).then(function(games) {
			this.socket.emit('respondGetListGames', {type: 200, data: {games: games}})
		}.bind(this));
	}.bind(this));
}