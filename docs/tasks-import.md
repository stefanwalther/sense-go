> Import files to the deployment.


**`import:fromLocal`**
The main use-case behind the `import:fromLocal` task is to be able to import "external" files from external dependencies (e.g. node_modules or bower) into the .tmp directory to use them in the solution.

Define the file you want to import in your `.sense-go.yml` file as follows:

Example:

```
import:
  fromLocal:
    enabled: true
    files:
      - ["./node_modules/d3/d3.min.js", "./.tmp/lib/external/d3/d3.min.js"]
      - ["./node_modules/moment/min/moment.min.js", "./.tmp/lib/external/moment/moment.min.js"]
```

**`import:fromSsh`**
Import one or more files from a remote sever (with SSH enabled) to your local projects.

Define the sources and targets in your `.sense-go.yml` or `.sense-go.local.yml` file as follows:

Example (Import just one file):

```
import:
  fromSsh:
    enabled: true
    host: "192.168.10.20"
    port: 22
    user: "<username>"
    pwd: "password"
    src: "/remote/path/to/your/file"
    dest: "./tmp/whatever"
```

Example (Import a collection of files):

```
import:
  fromSsh:
    enabled: true
    host: "192.168.10.20"
    port: 22
    user: "<username>"
    pwd: "password"
    files:
      - src: "/remote/path/to/your/file"
        dest: "./tmp/whatever"
      - src: "/remote/path/to/your/2nd/file"
        dest: "./tmp/whatever"
```
