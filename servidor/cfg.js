var cfg = {
	chainConnection: {
		development : "mysql://root:@localhost/app"
	},

	localDependencies: [
		"/cfg.js",
		"/models/ModelUsers.js",
		"/class/HandlerLogin.js"
	]
}