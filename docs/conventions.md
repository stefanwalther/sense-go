The entire concept follows some conventions I am using when setting up a project. According to this convention the structure of a typical project is as follows:

```
| PROJECT-ROOT
|-- build			
    |-- dev			    <= target for the development build
    |-- release		    <= target for the release build
|-- docs				<= documentation files, then used by verb
|-- src				    <= all source files
    |-- lib
        |-- less        <= less files
| gulpfile.js			<= gulp file using sense-go
| package.json
| .sense-go.yml			<= sense-go configuration file
| .verb.md				<= verbs readme template

```


