There are basically three different approaches to use **sense-go**.

**1) CLI with default configuration** 

Just run `sense-go` in the command line in the root folder of your project (and [follow the conventions](#conventions)).
The [default configuration](https://github.com/stefanwalther/sense-go/blob/master/lib/default-config.yml) will be considered.

**2) CLI with custom configuration**  
Place a `.sense-go.yml` file in the root folder of your project, then run `sense-go` in the CLI.

*The easiest way to start with your custom configuration is to copy the [default configuration file](https://github.com/stefanwalther/sense-go/blob/master/lib/default-config.yml) and start modifying it.*
*But keep in mind, following the [conventions](#conventions) , you should only need to adapt a few of the default configurations.*

**3) Programmatic usage**  
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

**Note: sense-go is using the [beta of Gulp 4](https://github.com/gulpjs/gulp/tree/4.0) **
