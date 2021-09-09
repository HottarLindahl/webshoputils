const fs = require('fs')
const path = require('path');

StrLeftBack = (string, separator)=>{
    return string.substr(0, string.lastIndexOf(separator));
}

StrRightBack = (string, separator)=>{
    return string.substr(string.lastIndexOf(separator), string.length);
}



StrLeft = (string, separator)=>{
    return string.substr(0, string.indexOf(separator));
}
StrRight = (string, separator)=>{
    return string.substr(string.indexOf(separator)+1,string.length );
}

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

const basepath = 'M:\\Erikjobb\\Mayura\\Photos\\'
const newpath = 'new/path/file.txt'

walk(basepath, function(err, results) {
    if (err) throw err;
    //console.log(results);
    for (let n in results){
        let filename = '' + results[n]
       
        filename = StrRightBack(filename,'\\')
        filename = basepath + filename
        console.log('old ' + results[n] + ' new ' + filename)
        fs.rename(results[n],filename,function (err) {
        if (err) throw err
            console.log('Successfully renamed/moved files')
        })
    }
  });