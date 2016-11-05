'use strict';

class CustomServerlessPlugin {
  constructor() {
    this.commands = {
      deploy: {
        lifecycleEvents: [
          'functions'
        ]
      },
    };

    this.hooks = {
      'after:deploy:functions': this.afterDeployFunctions
    };
  }

  afterDeployFunctions() {
    console.log('After Deploy Functions');
  }
}

module.exports = CustomServerlessPlugin;
