build-ExtensionLayer:
	echo :build-ExtensionLayer
	cd nodejs-example-extension && npm install 
	chmod +x nodejs-example-extension/index.js
	chmod +x extensions/nodejs-example-extension
	cp -R extensions "$(ARTIFACTS_DIR)"
	cp -R nodejs-example-extension "$(ARTIFACTS_DIR)"
