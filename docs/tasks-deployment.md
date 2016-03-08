
> Deploy to either the Extension folder on your local computer (using Qlik Sense Desktop), upload to a server via ssh or upload to a Qlik Sense Repository using the Qlik Sense Repository (QRS) API.


`gulp deploy:toLocal`

**Options:**

- deployment
  - local
    - enabled {boolean} - Whether to enable deployment to local Qlik Sense folder or not, default to `true`
    - localExtensionDir {string} - Path to the local extension directory, defaults to `null`
    
Note: The path for the local deployment will be fetched automatically (using sense-loc), if you want to override the path, use `localExtensionDir`.
    


### Clean local local deployment directory

**Options:**
- clean
  - src
  - cwd
  
### Upload to Qlik Sense server

Upload the zipped visualization extension to a Qlik Sense server (using the Repository API in behind).

**Options:**
- upload
  - src
  - cert
  - serverUrl
  
### Compress

Compress files.

**Options:**
- compress
  - src
  - dest
  - format
  - password Set a password to protect the .zip file.
  
### Replace
Replace strings in relevent text files (.js, .txt, .json, .yml, .txt, .css)

### Uglify
(TBC)

### Minify
(TBC)

