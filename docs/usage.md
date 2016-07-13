There are basically three different approaches to use **sense-go**.

- **CLI with default configuration:** Just run `sense-go` in the command line and use the default settings and [follow the conventions](#conventions)
- **CLI with custom configuration:** Place a `.sense-go.yml` file into the root folder of your project and customize the settings, then just run `sense-go`
- **Programmatic usage:** Place a `sense-go.js` file into the root folder of your project, load the default tasks and add custom tasks, then just run `sense-go`

### CLI with default configuration

Nothing special to explain, just run `sense-go` in the command line in the root of your project.
The default configuration will be considered. Also have a look at 

### CLI with custom configuration
Place a `.sense-go.yml` file in the root folder of your project:

The easiest way to start with your custom configuration is to copy the [default configuration file](src/default-config.yml) and start modifying it.
But keep in mind, following the conventions, you should only need to adapt a few of the default configurations.

### Programmatic usage
If you want to add custom gulp tasks, this is the way to go.

- Create a file `sense-go.js` in the root of your project based on the following skeleton:

```js
'use strict';
var senseGo = require( 'sense-go' );
var gulp = senseGo.gulp; // Get the reference to the gulp instance used in sense-go

senseGo.init( function () {

	// Now all default tasks are loaded, can be modified or new ones can be added
	
	// Run your tasks, e.g. with
	gulp.series(['build']);
	
});
```


#### Pass in a custom configuration as object

In your sense-go.js pass in a custom configuration object to `senseGo.init` as follows:

```js
'use strict';
var senseGo = require('./lib/');

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
var senseGo = require('./lib/');

var customConfig = senseGo.loadYml( path.join(__dirname, 'custom-config.yml'));

senseGo.init( customConfig, function () {
  
  
});
```


### Add custom tasks

```js

'use strict';
var senseGo = require('./lib/');
var gulp = senseGo.gulp; // Get the reference to the gulp instance used in sense-go

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
