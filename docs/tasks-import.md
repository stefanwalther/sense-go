> Import files to the deployment

The main use-case behind this task is to be able to import "external" files from external dependencies (e.g. node_modules or bower) into the .tmp directory to use them in the solution.

`gulp import`

Define the file you want to import in your `sense-go.yml` file as follows:

Example:

```
import:
  files:
    - ["./node_modules/sense-angular-directives/dist/eui-collapse/eui-collapse.js", "./.tmp/lib/components/eui-collapse"]
    - ["./node_modules/sense-angular-directives/dist/eui-note/eui-note.js", "./.tmp/lib/components/eui-note"]
    - ["./node_modules/sense-angular-directives/dist/eui-note/eui-note.css", "./.tmp/lib/components/eui-note"]
    - ["./node_modules/sense-angular-directives/dist/eui-note/eui-note.ng.html", "./.tmp/lib/components/eui-note"]
    - ["./node_modules/sense-angular-directives/dist/eui-tablesort/eui-tablesort.js", "./.tmp/lib/components/eui-tablesort"]
    - ["./node_modules/sense-angular-directives/dist/eui-tablesort/eui-tablesort.css", "./.tmp/lib/components/eui-tablesort"]
    - ["./node_modules/sense-angular-directives/dist/eui-tooltip/eui-tooltip.js", "./.tmp/lib/components/eui-tooltip"]
    - ["./node_modules/sense-angular-directives/dist/eui-tooltip/eui-tooltip.css", "./.tmp/lib/components/eui-tooltip"]
```
