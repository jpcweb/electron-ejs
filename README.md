# electron-ejs-layout

[![npm](https://img.shields.io/npm/v/electron-ejs-layout.svg?style=flat-square)](https://www.npmjs.com/package/electron-ejs-layout)
[![npm](https://img.shields.io/npm/dt/electron-ejs-layout.svg?style=flat-square)](https://www.npmjs.com/package/electron-ejs-layout)

Simple Electron plugin for render EJS templates. It allow you to use `ejs` files in your electron projects and you can define some layouts.


## How to use it

Install with npm

```sh
npm install electron-ejs-layout
```

For initialize **electron-ejs-layout** on your project, simply add

```javascript
//In main process.
var electronEjs = require('electron-ejs-layout')(locals);
conf = {
    layoutViewPath: __dirname+'/views/'
};
...
//You have to define layoutFile
conf.layoutFile = 'layout.ejs';
mainWindow.loadURL('file://'+__dirname+'/views/main/main.ejs');
```
Where `locals` is an object where each key is used as a variable in your template.

In layout.ejs:
```ejs
<html>
    <head>My Page</head>
    <body>
        <h1>This is part of the layout</h1>
        <div id='container-body'>
            <%- body %>
        </div>
        <p>
            My Footer
        </p>
    </body>
</html>


```

In main.ejs:
```ejs
<h2>This is not part of the layout</h2>
```

Generates:
```html
<html>
    <head>My Page</head>
    <body>
        <h1>This is part of the layout</h1>
        <div id='container-body'>
            <h2>This is not part of the layout</h2>
        </div>
        <p>
            My Footer
        </p>
    </body>
</html>
```


## Issues

You can publish issues here https://github.com/jpcweb/electron-ejs-layout/issues

## License

**electron-ejs-layout** is under the [MIT](LICENSE) license.
