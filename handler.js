var spawn = require('child_process').spawn;

var invokeRubyApp = "./wrapper.sh";

exports.hello = function(event, context, callback) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  console.log("Starting process: " + invokeRubyApp);
  var child = spawn(invokeRubyApp, [JSON.stringify(event, null, 2), JSON.stringify(context, null, 2)]);

  child.stdout.on('data', function (data) { console.log("stdout:\n"+data); });
  child.stderr.on('data', function (data) { console.log("stderr:\n"+data); });

  child.on('close', function (code) {
    if(code === 0) {
      console.log("Process completed: " + invokeRubyApp);
      callback(null, response);
    } else {
      console.log("Process \"" + invokeRubyApp + "\" exited with code: " + code);
      callback(null, response);
    }
  });
}
