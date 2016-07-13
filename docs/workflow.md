The workflow of the pre-configured tasks can be summarized as follows:

- You **develop** in the `.src` folder
- Whenever you want to **test or deploy**, use a one-liner in your command line: `sense-go`
  - This will
    - Convert `.less` files to `.css` files
    - Lint, Minify, Ugilify the output
    - Create a .zip file to distribute your visualization extension
    - ... a lot of other neat tasks ... fully customizable ...
- Then the **extension is automatically being deployed**
  - To the local extension directory (Qlik Sense Desktop)
  - Imported to the Qlik Sense Server (using the Qlik Sense Repository API)
  - to other destinations, like via SSH
- You can test the extension

It is important to mention that you can by 100% re-define the workflow and also all default settings, but the idea of **sense-go** is really to get something up and running across different projects with as little configuration and development work as possible. **So choose custom configurations wisely.**

### Behind the scenes
Behind the scenes the following happens:

- All relevant content of the src folder is copied to a temporary folder .tmp
- Then in the .tmp folder some transformation of existing files happens
- As soon as this is done, files are copied to a .build folder ( .build/dev in case of the dev strategy, .build/release in case of the release strategy)
- Then the enabled deployment tasks start
  - Copy all files to the local Qlik Sense Desktop
  - Deployment to any server using the QRS API
  - Deployment to any other server using SSH
- (All temporary folders (like .tmp) are deleted)
