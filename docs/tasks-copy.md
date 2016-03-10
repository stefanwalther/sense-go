> Copy files to a specific directory on your system

**`gulp copy:toTmp`** 
* Copies all files (except the excluded ones) from the `src` folder to the `.tmp` folder

Options used:
* `srcDir`
* `tmpDir`

Excluded files:
* `*.less`

**`copy:tmpToDev`** 
* Copies all files (except the excluded ones) from the `.tmp` folder to `.\build\dev` folder

Options used:
* `tmpDir`
* `buildDevDir`

Excluded files:
* `*.less`


**`copy:tmpToLocal`** 
* Copies all files (except the excluded ones) from the `.tmp` directory to the local extension directory, creating a new folder for the current package and eventually deleting any already existing files in the targeted folder.

Settings used:
* `tmpDir`
* `localExtensionDir

Excluded files:
* `*.less`




