> Deploy to either the Extension folder on your local computer (using Qlik Sense Desktop), upload to a server via ssh or upload to a Qlik Sense Repository using the Qlik Sense Repository (QRS) API.

The following typical deployment tasks are available

### Qlik Sense Desktop

**`deploy:tmpToLocal`** 
* Copies all files (except the excluded ones) from the `.mp` directory to the local extension directory, creating a new folder for the current package and eventually deleting any already existing files in the targeted folder.
* Options used:  
  * `tmpDir`
  * `deployment.toLocal.enabled` - Enables or disables the deployment to a local folder *(Default: false)*
  * `deployment.toLocal.pathFetching` - If enabled, the local default path for Extensions will be determined. Only works on Windows and if Qlik Sense is installed. *(Default: true)*
  * `deployment.toLocal.localExtensionsBaseDir` - Define the base path for Qlik Sense extensions (in case `pathFetching` is set to `false`)
  * `deployment.toLocal.extensionDirOverride` - Define the name of the relative folder where your extension will be copied to. Defaults to the `packageName`. *(Default: null)*
* Excluded files:  
  * `*.less`

Note: The path for the local deployment will be fetched automatically (using [sense-loc](https://github.com/stefanwalther/sense-loc)), if you want to override the path, use `localExtensionDir`.
    
  
### Upload to Qlik Sense server

Upload the zipped visualization extension to a Qlik Sense server (using the Repository API in behind).

(tbd)
  
### Upload via SSH

**`deploy:toSsh`**
* Deploy the final output via SSH to another computer
* Options used:  
  * `deployment.toSsh.enabled`
  * `deployment.toSsh.host`
  * `deployment.toSsh.port`
  * `deployment.toSsh.username`
  * `deployment.toSsh.password`
  * `deployment.toSsh.dest`

Note: `deploy:toSsh` has mainly be tested with [mobaSSH](http://mobassh.mobatek.net/), using certificates is not tested, yet.


### Deploy via Shell

> Use a shell task for your custom deployment

* Options used:  
  * `deployment.enabled` - Enables or disable the deployment via shell. *(Default: `false`)*
  * `deployment.cmd - The shell command.
