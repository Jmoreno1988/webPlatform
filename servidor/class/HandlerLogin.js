HandlerLogin.prototype.constructor = HandlerLogin;

function HandlerLogin(socket, modelUser) {
	this.socket = socket;
	this.modelUser = modelUser;
    
    socket.on('validateUser', function(data) { this.validateUser(data.userName, data.password) }.bind(this));
    socket.on('createUser', function(data) { this.createUser(data.userName, data.password, data.email) }.bind(this));
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