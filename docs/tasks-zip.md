> Create .zip files based on the building strategy

**`zip:dev`**
- Creates a zip file following the pattern "%packageName%_dev.zip" (e.g. "my-extension_dev.zip")
- This task is used in the pre-built task-chain build and will create the output of the build-strategy "dev"
* Options used:  
  * `tmpDir`
  * `buildDir`
  * `packageName`
  
**`zip:release`**
- Creates a zip file following the pattern "%packageName%_v%pkg.version%.zip" (e.g. "my-extension_v0.12.1.zip")
- This task is used in the pre-built task-chain release and creates a packaged version of your current version
* Options used:  
  * `tmpDir`
  * `buildDir`
  * `packageName`
  * `pkg.version`

**`zip:latest`**
- Create a zip file following the pattern "%packageName%_latest.zip" (e.g. "my-extension_latest.zip")
- Useful to have a provide a link to the always latest version
* Options used:  
  * `tmpDir`
  * `buildDir`
  * `packageName`

