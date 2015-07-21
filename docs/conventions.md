The entire concept follows **conventions** I am using when setting up a project:

```
| PROJECT-ROOT
|-- build			<= all builds, including source code or zipped files
    |-- dev			<= target for the development build
    |-- release		<= target for the release build
|-- docs			<= documentation files, then used by verb
|-- src				<= all source files
    |-- lib
		|-- css		<= see below *
        |-- less    <= less files
| .sense-go.yml		<= sense-go configuration file
| .verb.md			<= verbs readme template
| gulpfile.js		<= gulp file using sense-go
| package.json

```

\* If using less files is preferred for a project I keep this folder empty, otherwise all the .css files will be place here

***sense-go*** works best if you follow these conventions, otherwise everything is configurable, it's just a bit more work to get sense-go running immediately.
