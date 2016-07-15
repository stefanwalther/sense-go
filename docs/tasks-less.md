> Converts .less files to .css files.

All less tasks automatically autoprefix (using [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))

**`less:reduce`**
* Uses `/src/less/main.less`, resolves all its dependencies and creates `/.tmp/css/main.css`
* Options used:  
  * `lessReduce.src`
  * `lessReduce.dest`

**`less:each`**
* Converts every `.less` file from the source directory to a corresponding .css file in the .tmp directory.
* Options used:  
  * `lessEach.src`
  * `lessEach.dest`
