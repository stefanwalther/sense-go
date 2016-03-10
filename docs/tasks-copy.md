> Copy files to a specific directory on your system.

**`gulp copy:toTmp`** 
* Copies all files (except the excluded ones) from the `src` folder to the `.tmp` folder.
* Options used:  
  * `srcDir`
  * `tmpDir`
* Excluded files:  
  * `*.less`

**`copy:tmpToDev`** 
* Copies all files (except the excluded ones) from the `.tmp` folder to `.\build\dev` folder.
* Options used:
  * `tmpDir`
  * `buildDevDir`
* Excluded files:
  * `*.less`

**`copy:tmpToRelease`** 
* Copies all files (except the excluded ones) from the `.tmp` folder to `.\build\release` folder.
* Options used:
  * `tmpDir`
  * `buildReleaseDir`
* Excluded files:
  * `*.less`






