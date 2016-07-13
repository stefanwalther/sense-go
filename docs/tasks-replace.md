> Replaces string patterns in text files across the project.
`
**`replace:tmp`**
* Use `@@ to prefix the key to be replaced with a given value in the source code
* Replacements will only be performed in the following file types: 
  * .html
  * .js
  * .json
  * .qext
  * .txt
  * .xml
  * .yml
 
**Using data from package.json**
All keys from your package.json file are available out of the box if you use the prefix `pkg`

* To get the version, use `@@pkg.version`
* To the get name, use `@@pkg.name`
* etc.

Example using package.json:

```js

console.log('Extension @@pkg.name, version @@pkg.version');

```

given the following package.json

```js
{
  "name": "my-extension",
  "version": "0.1.0"
}

```

will return

```js
Extension my-extension, version 0.1.0
```

**Builtin patterns**
The following patterns are available out of the box:

`@@timestamp` - Defaults to new Date().getTime()

  
**Adding replacement patterns**
Add new replacements patterns in your .sense-go.yml file:

```
replacements:
  custom:
    test1: bla bla
  custom2:
    var1: true
    var2: "Whatever comes here"
```

Then in your e.g. JavaScript file use the replacements:

```js
console.log('custom.test1', '@@custom.test1');
console.log('custom2.var2', '@@custom2.var1');
console.log('custom2.var2', '@@custom2.var2');
```

Will return:

```
bla bla
true
Whatever comes here
```
