
> 

### Less Transpiling

Transpile Less files to CSS. 

**Tasks:**

- **less-each** - Transpiles every .less file into a .css file
- **less-reduce** - Transpiles a collection of .less files into a single .css file, which can then be easily loaded in your visualization extension


**Options:**
- less-each
  - src - Source mask
  - dest - Destination
  - cwd - Current working directory, defaults to __dirname
- less-reduce
  - src - Source mask
  - dest - Destination
  - cwd - Current working directory, defaults to __dirname
  
**Example:**



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

