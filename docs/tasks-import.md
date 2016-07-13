> Import files to the deployment.


**`import`**
The main use-case behind the `import` task is to be able to import "external" files from external dependencies (e.g. node_modules or bower) into the .tmp directory to use them in the solution.

Define the file you want to import in your `.sense-go.yml` file as follows:

Example:

```
import:
  files:
    - ["./node_modules/d3/d3.min.js", "./.tmp/lib/external/d3/d3.min.js"]
    - ["./node_modules/moment/min/moment.min.js", "./.tmp/lib/external/moment/moment.min.js"]
```
