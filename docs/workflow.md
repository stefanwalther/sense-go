The workflow of the pre-configured tasks can be summarized as follows:

- You **develop** in the `.src` folder
- Whenever you want to **test or deploy**, use a one-liner in your command line
  - To
    - Convert `.less` files to `.css` files
    - Lint, Minify, Ugilify the output
    - Create a .zip file to distribute your visualization extension
    - ... a lot of other neat tasks ... fully customizable ...
- Then the **extension is being deployed**
  - To the local extension directory (Qlik Sense Desktop)
  - Imported to the Qlik Sense Server (using the Qlik Sense Repository API)
  - to other destinations, like via SSH

It is important to mention that you can by 100% re-define the workflow and also all default settings, but the idea of **sense-go** is really to get something up and running across different projects with as little configuration and development work as possible. **So choose custom configurations wisely.**
