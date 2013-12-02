Shell

If you have a fresh install of Ubuntu, feel free to run the build
environment script to install nginx and set your webroot to this git checkout

```
./build_env.sh
```

If you do not have a local copy of the ExtJs library,
run this dependacy script. 

```
./depends.sh
```

Note: If you have run the build script above, you do not need to run
	dependancy script.


Javascript

This working demo, demo.n-e-r-d.net, is a little ticketing system to show the powerful extension
of ExtJs's base classes. We define a main application container and scope all functionality to the
specified application namespace. Demo contains examples of the following modules, Treeview Navigation, 
Toolbars, Grid views, and Modal functionalities. 

A few cool items to look at: 
	
	/ticketingsystem/assets/ui/controller/Main.js - doStoreFilter (method)
		this method all the user to specify column nammed annotations

	/ticketingsystem/assets/ui/controller/Main.js - updateSystemStatus (method)
		this method provides a single entry point to display messages to the user

	/ticketingsystem/assets/ui/util/Modal.js 
		this is a small base modal class scoped to the current application. Extensions of this class
		do not need to worry about overlays and draggables moving outside of the users main VP.

	/ticketingsystem/assets/conf.json
		this is a basic client side config file for pure clientside development. This concept
		behind this file is create an exact reprentation of the contract between client and server. 
		In theory, this should minimize any sort of integration issues that could arise in the future.

There are many more features, please click around and take a look at any source files. 
	
