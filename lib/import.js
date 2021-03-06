var lib_ext = require('./ext');
var lib_read = require('./read');

module.exports = function(ext, contents, dirname, pathsImport, options) {
  lib_ext.allExt[ext].lastIndex = 0;
  var useDebug = false;
  var match = lib_ext.allExt[ext].exec(contents);

  if (!match) {
    match = lib_ext.allExtDebug[ext].exec(contents);
    useDebug = true;
  }

  if (match) {

    var indexMatch = (ext === 'html' || ext === 'any' ? 1 : 2 );

    return {
      matchText: match[0],
      index: match.index,
      path: lib_read.readAlternativePath(dirname, match[indexMatch],
      pathsImport, options),
      pathOrigin:  match[indexMatch],
      match: match,
      debug: useDebug
    };
  } else {
    return undefined;
  }
}
