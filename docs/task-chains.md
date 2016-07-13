Based on gulp tasks provided by ***sense-go*** you can then create your task chains.
Some are already predefined:

**`sense-go build`**

```js
  gulp.task( 
    'build', 
    gulp.series( 
      'init', 
      'clean:tmp', 
      'copy:toTmp', 
      'replace:tmp', 
      'clean:buildDev', 
      'copy:tmpToDev', 
      'clean:localExtensionDir', 
      'deploy:tmpToLocal' 
      )
  );`
```

## Create your own task-chains
You can add additional tasks on top of sense-go, mixing your very own tasks with sense-go tasks, etc.

* Always initialize a task chain with the `init` task
* When creating your own tasks, note that sense-go relies on Gulp4

**Example:**

Use your own gulpfile.js (be aware that sense-go uses gulp 4.0 beta):

```js
'use strict';
var senseGo = require( 'sense-go' );
var gulp = senseGo.gulp;
var path = require( 'path' );

var customConfig = senseGo.loadYml( path.join( __dirname, 'custom-config.yml') );

senseGo.init( customConfig,  function (  ) {
  
  gulp.task('myTask', function() {
    ...
  } );
  
  
  // Create your own task chain, and overwrite the current task chain 'build'
  gulp.task( 'build', gulp.series( 
    'init', 
    'clean:tmp', 
    'copy:toTmp', 
    'myTask'        // <== Load your own custom task and mix it with existing ones 
  ) );
  
  // Run your task
  gulp.series(['build'])();
    
});
```

Then run `sense-go build` in the CLI.


