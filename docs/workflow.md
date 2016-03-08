The workflow of the preconfigured tasks can be summarized as follows:

- Source files will be picked from the `src` directory
- All desired output files are transformed and finally copied to the `.tmp` folder
- Then deployment and packaging happens
- Finally the temporary folder `.tmp` will be deleted again

It is important to mention that you can by 100% re-define the workflow and also all default settings, but the idea of **sense-go** is really to get something up and running across different projects with as little configuration and development work as possible. So choose custom configurations wisely.
