> Deploy to either the Extension folder on your local computer (using Qlik Sense Desktop), upload to a server via ssh or upload to a Qlik Sense Repository using the Qlik Sense Repository (QRS) API.

The following typical deployment tasks are available

### Qlik Sense Desktop

**`deploy:tmpToLocal`** 
* Copies all files (except the excluded ones) from the `.mp` directory to the local extension directory, creating a new folder for the current package and eventually deleting any already existing files in the targeted folder.
* Options used:
  * `tmpDir`
  * `localExtensionDir
* Excluded files:
  * `*.less`

Note: The path for the local deployment will be fetched automatically (using [sense-loc](https://github.com/stefanwalther/sense-loc)), if you want to override the path, use `localExtensionDir`.
    
  
### Upload to Qlik Sense server

Upload the zipped visualization extension to a Qlik Sense server (using the Repository API in behind).

(tbd)
  
### Upload via SSH

**`deploy:toSSH`**
* Deploy the final output via SSH
* Options used:
  * `deployment:enabled`
  * `deployment:host`
  * `deployment:port`
  * `deployment:username`
  * `deployment:password`
  * `deployment:dest`

Note: `deploy:toSSH` has mainly be tested with mobaSSH, using certificates is not tested, yet.
