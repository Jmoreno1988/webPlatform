var cfg = {
	chainConnection: {
		development : "mysql://root:@localhost/app",
		production: "mysql://root:moreneitor@localhost/app"
	},

	localDependencies: [
		"/cfg.js",
		"/models/ModelUsers.js",
		"/models/ModelGames.js",
		"/class/UsersManager.js",
		"/class/HandlerLogin.js",
		"/class/HandlerMenu.js",
		"/class/HandlerGameChess.js"
	],

	colors: []
}