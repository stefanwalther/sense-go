> Replaces strings in text files across your project

### Usage

* Use @@ to prefix the key to be replaced with a given value
* Replacements will only be performed in the following file types: 
  * .xml
  * .js
  * .qext
  * .json
  * .html
  * .yml
  * .txt
 
### Using data from package.json
All keys from your package.json file are available out of the box if you use the prefix `pkg`

* To get the version, use `@@pkg.version`
* To the get name, use `@@pkg.name`
* etc.

## Builtin patterns
The following patterns are available out of the box:

`@@timestamp` - Defaults to new Date().getTime()

  
### Adding replacement patterns

  
(All replace tasks use the plugin gulp-replace-task)
