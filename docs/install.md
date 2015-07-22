Install sense-go in your project

```js
npm install sense-go --save-dev
```

Install Gulp4, to run your local gulpfile.js

```js
npm install git://github.com/gulpjs/gulp#4.0 --save-dev
```

Create a gulpfile.js in the root folder of your project, containing the following minimal code:

```js
var gulp = require('gulp');
var senseGo = require('sense-go');

var userConfig = {
	"packageName": "Your Package Name"
};

senseGo.init( gulp, userConfig,  function (  ) {
  // Your own gulp tasks or task-chains here
  // ...
});
```

Run any of the below described gulp commands or create your own task-chains.
