> Copy files to a specific directory on your system

**`gulp copy:toTmp`**
Copies all files from the `src` folder to the `.tmp` folder

_Settings used:_
* srcDir
* tmpDir

**`copy:tmpToDev`**
Copies all files from the `.tmp` folder to `.\build\dev` folder

_Settings used:_
* tmpDir
* buildDevDir


**`copy:tmpToLocal`**
Copies all files from the `.tmp` directory to the local extension directory, creating a new folder for the current package and eventually deleting any already existing files in the targeted folder.

_Settings used:_
* tmpDir
* localExtensionDir





