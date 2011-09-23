var path = require("path"),
    fs = require("fs"),
    responseWriter = require('./responseWriter'),
    fileResolver = require('./fileResolver');

var load = function (filename, response) {

    filename = fileResolver.resolve(filename);

    path.exists(filename, function(exists) {
       if (!exists) {
           responseWriter.write(response, 404, "404 Not Found\n");
           return;
       }

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                responseWriter.write(response, 500, err + "\n");
                return;
            }

            responseWriter.write(response, 200, file);
        });
    });

};

exports.load = load;