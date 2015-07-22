> Bumps the version in your package.json file

**`gulp bump:patch`** or `gulp b` or `gulp b:p`  
Changes the version in package.json from `0.2.1` to `0.2.2`

**`gulp bump:minor`** or `gulp b:min`  
Changes the version in package.json from `0.2.1` to `0.3.1`

**`gulp bump:major`** or `gulp b:maj`  
Changes the version in package.json from `0.2.1` to `1.0.0`

**`gulp bump:version`** or `gulp b:v`  
Set the package.json version to a specific value given by the parameter `--newversion` resp. `--nv`.

Examples:
```
gulp bump:version --newversion=0.1.0
gulp b:v --nv=0.1.0
```

**Possible command line parameters** 

**`--tag`**
Tags the current version of your commit with the newly created version created by any of the bump-tasks.

**`--commit="Your commit message"`**
Commits all files with the given commit message, if no commit message is defined, "." will be committed as a message.
