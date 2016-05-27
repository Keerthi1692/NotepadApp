
// Require Modules
var http    = require('http');
var url     = require('url');
var path    = require('path');
var fs      = require('fs');// file system module

// Mime Types (file types)
var mimeTypes = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'js'   : 'text/javascript',
    'jpg'  : 'image/jpeg',
    'jpeg' : 'image/jpeg',
    'png'  : 'image/png'
};

// Create server
http.createServer(function(req, res){
    var uri      = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(),unescape(uri));
    console.log('Loading '+uri);
    var stats;

    // verify if the file is existed in the direcotry or not.
    try{
        stats=fs.lstatSync(fileName);
    }catch(e){
        // through an error if the page is not found
        res.writeHead(302,{
            'Location':'index.html'
        });
        res.end();
        return;
    }

    // check if the user request is a file or directory
    if(stats.isFile()){
        var mimeType=mimeTypes[path.extname(fileName).split('.').reverse()[0]];// will give the mime type of the first file
        res.writeHead(200, {'Content-type':mimeType});
        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);
    } else if(stats.isDirectory()){
        // if user selected a directory  it will be redirected to redirect.html pagea
        res.writeHead(302,{
            'Location':'index.html'
        });
        res.end();
    } else {
        res.writeHead(500,{'Content-type':'text/plain'});
        res.write('500, Internal error ');
        res.end();
    }
}).listen(3000);// port number
