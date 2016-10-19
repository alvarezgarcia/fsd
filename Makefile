reqs:
	sudo apt-get install mongodb nodejs
	npm install
	sudo npm install -g webpack
	sudo npm install -g webpack-dev-server
	sudo npm install -g nodemon
	sudo /etc/init.d/mongodb restart

start:
	webpack -p
	nodemon server.js
