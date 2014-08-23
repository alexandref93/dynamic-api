var underscore = require('underscore');

var lib_ext = require('./ext');
var lib_read = require('./read');
var lib_import = require('./import');

var processMatch = function( _import, contents, hasAlready, pathsImport, options) {
    return contents.substring(0,_import.index) +
    (options.ignoreRepeated && hasAlready ? '' : lib_read.readFile(_import)) +
    contents.substring(_import.index+_import.matchText.length);
};

module.exports = function(p, contents, pathsImport, options) {
    var ext = lib_ext.getExt(p);
    var processed = contents, _import;
    while(_import = lib_import(ext, processed, path.dirname(p), pathsImport, options)) {
        if (!underscore.contains(pathsImport, _import.path)) {
            pathsImport.push(_import.path);
            processed = processMatch(_import, processed, false, pathsImport,  options);
        } else {
            processed = processMatch(_import, processed, true, pathsImport, options);
        }
    }
    return processed;
};