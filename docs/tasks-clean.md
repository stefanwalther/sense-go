> Cleaning and deleting folders.

**`gulp clean:tmp`**
* Delete the entire `.tmp` directory.

Options used:

- `tmpDir`

**`gulp clean:buildDev`**
* Deletes all files in the `./build/dev` directory
* Options used:
  * `buildDevDir`

**`gulp clean:buildRelease`**
* Deletes all files in the `./build/release` directory.
* Options used:
  * `buildReleaseDir`

**`clean:localExtensionDir`**
* Deletes all files in the project's local extension folder. Only makes sense if working against Qlik Sense Desktop. Disabled if `deployment.toLocal.enabled === true`.
  * Options used:
    * `deployment.toLocal.enabled`
    * `deployment.toLocal.extensionBaseDir`

**`clean:tmpIllegal`**
* Clean all files in the `.tmp` directory which are not supposed to be deployed to the extension directory
* These are all files, except files with the following file extension: 
  * `{png,jpg,jpeg,json,qext,txt,js,css,eot,svg,ttf,woff,html,htm,wbl,svg}`
