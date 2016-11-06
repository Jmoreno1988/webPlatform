HandlerLogin.prototype.constructor = HandlerLogin;

function HandlerLogin(socket, modelUser, modelGames, sq) {
	this.socket = socket;
	this.modelUser = modelUser;
	this.modelGames = modelGames;
	this.sq = sq;
    
    socket.on('validateUser', function(data) { this.validateUser(data.userName, data.password) }.bind(this));
    socket.on('createUser', function(data) { this.createUser(data.userName, data.password, data.email) }.bind(this));
    socket.on('getRandomUser', function(data) { this.getRandomUser() }.bind(this));
    socket.on('getListGames', function(data) { this.getListGames(data.userName) }.bind(this));
}

HandlerLogin.prototype.validateUser = function(userName, password) {
	this.modelUser.findOne({ where: {userName: userName, password: password} }).then(function(user) {
    		var type = user ? 200 : 410;
			this.socket.emit('respondValidate', {type: type, data: {}});	    
	}.bind(this));
}

HandlerLogin.prototype.createUser = function(userName, password, email) {
	this.modelUser.create({
		userName: userName,
		password: password,
		email: email
	}).then(function(newUser){
		var type = newUser ? 200 : 410;
		this.socket.emit('respondCreateUser', {type: type, data: {}});	
	}.bind(this)).catch(function(err) {
      	console.log(":: Error :: Creación de usuario fallida.");
      	this.socket.emit('respondCreateUser', {type: 410, data: {}});	
  	}.bind(this))

}

HandlerLogin.prototype.getRandomUser = function() {
	this.sq.query("SELECT COUNT(*) as totalUsers FROM `users`", { type: this.sq.QueryTypes.SELECT})
		.then(function(result) {
			var rand = Math.floor(Math.random() * result[0].totalUsers);
			this.sq.query("SELECT * FROM `users` where id=" + rand, { type: this.sq.QueryTypes.SELECT}).
			then(function(result){
				//this.socket.emit('respondGetRandomUser', {id: 200, data: {id: result.id, }});	ME quedo aqui, tengp que repasaar la bbdd
			}.bind(this))
  	}.bind(this))
}

HandlerLogin.prototype.getListGames = function(userName) {
	this.getIdByUserName(userName);
	// Buscar id por userName
	// Buscar partidas donde idCreator OR idFollow sea igual al id
	// Devolver al clieente el resultado
}

HandlerLogin.prototype.getIdByUserName = function(userName) {
	this.modelUser.findOne({ where: {userName: userName} }).then(function(user) {
   		this.modelGames.findAll({ where: {$or: [{idCreator: user.id}, {idFollow: user.id}]} }).then(function(games) {
			this.socket.emit('respondGetListGames', {type: 200, data: {games: games}})
		}.bind(this));
	}.bind(this));
}
