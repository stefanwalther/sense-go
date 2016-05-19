There are basically three different approaches to configure the behavior of **sense-go**.

- Pass in a custom configuration into `senseGo.init
- Define the configuration in the .sense-go.yml file
- Rely on the default configuration

### Pass in a custom configuration as object

In your gulpfile.js create a userConfiguration as follows:

```js
'use strict';
var gulp = require('gulp');
var senseGo = require('./lib/');

var userConfig = {
  packageName: 'my-custom-extension',
  deployment: {
    toLocal: {
      enabled: false
    }
  }
}

senseGo.init( gulp, userConfig, function () {
  // Define your custom gulp tasks here ...
});

```

### .sense-go.yml file
Place a `.sense-go.yml` file in the root folder of your project:

The easiest way to start with your custom configuration is to copy the [default configuration file](src/default-config.yml) and start modifying it.
But keep in mind, following the conventions, you should only need to adapt a few of the default configurations.


### Default configuration
If **sense-go** cannot find neither a `.sense-go.yml file nor a custom-configuration is passed to `senseGo.init`, then the default configuration is loaded, which mich also be fine if you follow the default setup.



