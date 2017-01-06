// css
require('../../node_modules/semantic-ui-css/semantic.css')

// inject bundled Elm app into div#app
var Elm = require('../elm/Main');
Elm.Main.embed(document.getElementById('app'));