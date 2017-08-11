#### Pass in a custom configuration as object

In your sense-go.js pass in a custom configuration object to `senseGo.init` as follows:

```js
'use strict';
const SenseGo = require('./lib/');
const senseGo = new SenseGo();

var customConfig = {
  deployment: {
    toLocal: {
      enabled: true
    }
  }
}

// customConfig will be used to overwrite existing settings from the default-settings.
// Any setting not being defined in your custom configuration will be taken from the default settings.
senseGo.init( customConfig, function () {
  
  
});
```

#### Load configuration from a file:

```js
'use strict';
const SenseGo = require('./lib/');
const senseGo = new SenseGo();

var customConfig = senseGo.loadYml( path.join(__dirname, 'custom-config.yml'));

senseGo.init( customConfig, function () {
  
  
});
```


### Add custom tasks

```js

'use strict';
const SenseGo = require('./lib/');
const senseGo = new SenseGo();
const gulp = senseGo.gulp; // Get the reference to the gulp instance used in sense-go

senseGo.init( function () {

	// Create a new custom task
	gulp.task('custom', function( done ) {
		console.log('Custom Task');
		done();
	});
	
	// Create a custom task chain, re-using 'build'
	gulp.task('customBuild', gulp.series(['custom', 'build']));
	
	// Run it ...
	gulp.series('customBuild')();
	
});
```
