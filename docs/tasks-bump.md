> Bumps the version in your package.json file

**`gulp bump:patch`**
* Changes the version in package.json from `0.2.1` to `0.2.2`
* Shortcuts: `gulp b` or `gulp b:p` 

**`gulp bump:minor`** 
* Changes the version in package.json from `0.2.1` to `0.3.1`
* Shortcut: `gulp b:min`

**`gulp bump:major`**  
* Changes the version in package.json from `0.2.1` to `1.0.0`
* Shortcut: `gulp b:maj`

**`gulp bump:version`** 
* Set the package.json version to a specific value given by the parameter `--newversion` resp. `--nv`.
* Shortcut: `gulp b:v`
* Example: 
```sh
gulp bump:version --newversion=0.1.0
gulp b:v --nv=0.1.0
```

**Possible command line parameters** 

**`--tag`**  
* Tags the current version of your commit with the newly created version created by any of the bump-tasks.

**`--commit="Your commit message"`**  
* Commits all files with the given commit message, if no commit message is defined, "." will be committed as a message.
