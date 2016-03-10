> Converts .less files to .css files.

All less tasks automatically create a sourcemap (using [gulp-sourcemaps](http://github.com/floridoo/gulp-sourcemaps)) and autoprefix (using [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))

**`gulp less:reduce`**
* Uses `/src/less/main.less`, resolves all its dependencies and creates `/.tmp/css/main.css`
* Options used:
  * srcDir
  * tmpDir

Uses the following gulp plugins:
{%= related([
  'gulp-autoprefixer', 
  'gulp-less', 
  'gulp-sourcemaps'
  ], {"silent": true}
) %}  


**`gulp less:each`**
* Converts every `.less` file from the source directory to a corresponding .css file in the .tmp directory.
* Options used:
  * srcDir
  * tmpDir

Uses the following gulp plugins:
{%= related([
  'gulp-autoprefixer', 
  'gulp-less', 
  'gulp-sourcemaps'
  ], {"silent": true}
) %}  
