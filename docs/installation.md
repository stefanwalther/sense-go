**Step 1:** Install sense-go in your project

```js
npm install sense-go --save-dev
```

*Note:* 
*Currently you have to save sense-go locally as a devDependency in your project. It is planned to get sense-go working as a global dependency, since sense-go is quite heavy because of the many gulp packages being installed. As an alternative install sense-go globally and do an `npm link` in your project as for now.*


**Step 2:** Install Gulp4, to run your local gulpfile.js

```js
npm install git://github.com/gulpjs/gulp#4.0 --save-dev
```

*Note:*  
*The beta of Gulp 4 is used in this project.*

**Step 3:** Create a gulpfile.js in the root folder of your project, containing the following minimal code:

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
