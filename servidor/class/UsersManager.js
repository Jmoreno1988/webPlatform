UsersManager.prototype.constructor = UsersManager;

function UsersManager() {
	this.listUsersConnected = [];
}

UsersManager.prototype.insertUsersConnected = function(socket) {
	var connection = {
		userId: null,
		socket: socket
	}
	this.listUsersConnected.push(connection);
}

UsersManager.prototype.removeUsersConnected = function(socket) {
	try {
	for(var i = 0; i < this.listUsersConnected.length; i++) 
		if(socket.id == this.listUsersConnected[i].socket.id) 
			this.listUsersConnected.splice(i, 1);
	} catch(e) { 
		console.log(":: ERROR :: Fallo al sacar usuario de la lista de sockets.") 
	}
}

UsersManager.prototype.getUsersConnected = function() {
	return this.listUsersConnected;
}

UsersManager.prototype.getUsersConnected = function() {
	return this.listUsersConnected;
}

UsersManager.prototype.getConnectionByIdSocket = function(socketId) {
	var conn = null;

	for(var i = 0; i < this.listUsersConnected.length; i++) 
		if(socketId == this.listUsersConnected[i].socket.id) 
			conn = this.listUsersConnected[i];

	return conn;
}

UsersManager.prototype.getConnectionByIdUser = function(userId) {
	var conn = null;

	for(var i = 0; i < this.listUsersConnected.length; i++) 
		if(this.listUsersConnected[i].userId != null && userId == this.listUsersConnected[i].userId) 
			conn = this.listUsersConnected[i];

	return conn;
}

UsersManager.prototype.totalUsersConnected = function() {
	return this.listUsersConnected.length;
}