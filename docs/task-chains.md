Based on gulp tasks provided by ***sense-go*** you can then create your task chains.
Some are already predefined:

**`sense-go build`**

Task `build` as an example:
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
  );
```

The default task-chains are defined in the `taskChains` section in the [default-config.yml](./lib/default-config.yml) file.

### Modify existing task-chains (by configuration)

You can add additional task-chains or overwrite the existing ones in your project configuration file, e.g:

```yml
taskChains:
  ## Completely overwrite the existing "build" task
  "build":
    - "clean:tmp"
    - "copy:toTmp"
    - "copy:tmpToDev"
    - "deploy:toSsh"
```

### Create/Modify task-chains (by code)
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


