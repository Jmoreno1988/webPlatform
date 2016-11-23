UsersManager.prototype.constructor = UsersManager;

function UsersManager() {
	this.listUsersConnected = [];
}

UsersManager.prototype.insertUsersConnected = function(socket) {
	this.listUsersConnected.push(socket);
}

UsersManager.prototype.removeUsersConnected = function(socket) {
	try {
	for(var i = 0; i < this.listUsersConnected.length; i++) 
		if(socket.id == this.listUsersConnected[i].id) 
			this.listUsersConnected.splice(i, 1);
	} catch(e) { console.log(":: ERRRO :: Fallo al sacar usuario de la lista de sockets.") }
}

UsersManager.prototype.getUsersConnected = function() {
	return this.listUsersConnected;
}

UsersManager.prototype.getUsersConnected = function() {
	return this.listUsersConnected;
}

UsersManager.prototype.totalUsersConnected = function() {
	return this.listUsersConnected.length;
}