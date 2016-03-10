Based on gulp tasks provided by ***sense-go*** you can then create your task chains.
Some are already predefined:

**`gulp build`**

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
      'copy:tmpToLocal' 
      )
  );`
```

## Create your own task-chains
You can add additional tasks on top of sense-go, mixing your very own tasks with sense-go tasks, etc.

* Always initialize a task chain with the `init` task
* When creating your own tasks, note that sense-go relies on Gulp4

**Example:**
```js
'use strict';
var gulp = require('gulp');
var senseGo = require('./lib/');

var userConfig = {
	"packageName": "sense-go"
};

senseGo.init( gulp, userConfig,  function (  ) {
  
  // Create your own task chain, and overwrite the current 'build' task
  gulp.task( 'build', gulp.series( 
    'init', 
    'clean:tmp', 
    'copy:toTmp', 
    'myTask1', 
    'myTask2' 
  ) );
    
});
```

