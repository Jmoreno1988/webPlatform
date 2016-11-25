HandlerLogin.prototype.constructor = HandlerLogin;

function HandlerLogin(socket, modelUser, sq, usersManager) {
	this.socket = socket;
	this.modelUser = modelUser;
	this.sq = sq;
	this.usersManager = usersManager;
    
    socket.on('validateUser', function(data) { this.validateUser(data.userName, data.password) }.bind(this));
    socket.on('createUser', function(data) { this.createUser(data.userName, data.password, data.email) }.bind(this));
}

HandlerLogin.prototype.validateUser = function(userName, password) {
	this.modelUser.findOne({ where: {userName: userName, password: password} }).then(function(user) {
			
			// Asociar conexion con usuario
			if(user) {
				var conn = this.usersManager.getConnectionByIdSocket(this.socket.id)
				if(conn) 
					conn.userId = user.id;
			}

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