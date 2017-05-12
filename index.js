//Import electron
var electron = require('electron');
var app = electron.app;

//Import dependencies
var fs = require('fs');
var path = require('path');
var pathurl = require('url');
var ejs = require('ejs');
var mime = require('mime');
var is = require('electron-is');

//Main function
function ElectronEjs(options)
{
  //Check options
  if(typeof options === 'undefined') { options = {}; }

  //App ready event
  app.on('ready', function(){

    //Import protocol
    var protocol = electron.protocol;
    if(!protocol){
      try {
          protocol = require('protocol');
      } catch(e){
        // ignore
      }
    }

    //Intercept the file protocol
    protocol.interceptBufferProtocol('file', function(request, callback){

      //Get the file
      var file = ParsePath(request.url);

      //Get the file extension
      var extension = path.extname(file);

      //Get the file content
      var content = fs.readFileSync(file, 'utf8');

      //Check the extension
      if(extension === '.ejs')
      {
        //Add the path to options
        options.filename = file;

        //Get the full file
        var full = ejs.render(content, options);
        /***
         * Set a conf object in your electron main file
         * The conf object contains a layoutViewPath and a layoutFile fields
         * */
        if(typeof conf.layoutFile!=="undefined" && conf.layoutFile) {
          /* Set the body content */
          body = ejs.render(content, options);
          /* And then render the layout */
          contentLayout = fs.readFileSync(conf.layoutViewPath+conf.layoutFile, 'utf8');
          full = ejs.render(contentLayout, options);
        }

        //Return the callback
        return callback({data: new Buffer(full), mimeType:'text/html'});
      }
      else
      {
        //Get the mime type
        var mimet = mime.lookup(extension);

        //Return the callback
        return callback({data: new Buffer(content), mimeType: mimet});
      }
    });
  });
}

//Function for parse the path
function ParsePath(url)
{
  //Parse the url
  var p = pathurl.parse(url);

  //Return the path name

  if(is.windows() && p.pathname.indexOf('/') === 0) return p.pathname.substr(1);
  return p.pathname;
}

//Exports to node
module.exports = ElectronEjs;
