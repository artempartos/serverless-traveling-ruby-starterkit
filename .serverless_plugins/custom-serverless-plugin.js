'use strict';

class CustomServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      log: {
        lifecycleEvents: [
          'serverless'
        ],
      },
      deploy: {
        lifecycleEvents: [
          'functions'
        ]
      },
    };

    this.hooks = {
      'log:serverless': this.logServerless.bind(this),
      'after:deploy:functions': this.afterDeployFunctions
    };
  }
  logServerless() {
    console.log('Serverless instance: ', this.serverless);
  }
  afterDeployFunctions() {
    console.log('After Deploy Functions');
  }
}

module.exports = CustomServerlessPlugin;
