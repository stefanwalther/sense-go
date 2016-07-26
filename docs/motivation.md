sense-go **automates typical repetitive tasks** when developing a *Visualization extension* for Qlik Sense, such as:

* **Preparation tasks**  
  * Import dependencies (like libraries, images, fonts, etc.)
* **Packaging**  
  * Health checks for your source files
  * Compile your .less files to CSS
* **Deployment**  
  * to GitHub or your favorite [VCS](https://en.wikipedia.org/wiki/Version_control)
  * to Qlik Sense Desktop
  * to a Qlik Sense Server
  * to a .zip file to share with others
* **Watching your changes**
  * to just rebuild everything automatically

Technically speaking ***sense-go*** is just a collection of configurable [gulp](http://gulpjs.com) tasks which can be easily re-used and extended.

![](docs/images/sense-go.gif)
