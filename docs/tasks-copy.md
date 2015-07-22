> Copy files to a specific directory on your system

**`gulp copy:toTmp`** - Copies all files from the `src` folder to the `.tmp` folder

Settings used:
* srcDir
* tmpDir

**`copy:tmpToDev`** - Copies all files from the `.tmp` folder to `.\build\dev` folder

Settings used:
* tmpDir
* buildDevDir


**`copy:tmpToLocal`** - Copies all files from the `.tmp` directory to the local extension directory, creating a new folder for the current package and eventually deleting any already existing files in the targeted folder.

Settings used:
* tmpDir
* localExtensionDir





