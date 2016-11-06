var cfg = {
	chainConnection: {
		development : "mysql://root:@localhost/app",
		production: "mysql://root:moreneitor@localhost/app"
	},

	localDependencies: [
		"/cfg.js",
		"/models/ModelUsers.js",
		"/models/ModelGames.js",
		"/class/HandlerLogin.js"
	],

	colors: []
}