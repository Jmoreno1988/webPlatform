HandlerLogin.prototype.constructor = HandlerLogin;

function HandlerLogin(socket, modelUser) {
	this.socket = socket;
	this.modelUser = modelUser;
    
    socket.on('validateUser', function(data) { this.validateUser(data.userName, data.password) }.bind(this));
}

HandlerLogin.prototype.validateUser = function(userName, password) {
	this.modelUser.findOne({ where: {userName: userName, password: password} }).then(function(user) {
    		var type = user ? 200 : 410;
			this.socket.emit('respondValidate', {type: type, data: {}});	    
	}.bind(this));
}