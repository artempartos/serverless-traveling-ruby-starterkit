'use strict';

class CustomServerlessPlugin {
  constructor() {
    this.commands = {
      deploy: {
        lifecycleEvents: [
          'resources',
          'functions'
        ]
      },
    };
  }
}

//class Deploy {
//  constructor() {
//    this.commands = {
//      deploy: {
//        lifecycleEvents: [
//          'resources',
//          'functions'
//        ]
//      },
//    };
//
//    this.hooks = {
//      'before:deploy:resources': this.beforeDeployResources,
//      'deploy:resources': this.deployResources,
//      'after:deploy:functions': this.afterDeployFunctions
//    };
//  }
//
//  beforeDeployResources() {
//    console.log('Before Deploy Resources');
//  }
//
//  deployResources() {
//    console.log('Deploy Resources');
//  }
//
//  afterDeployFunctions() {
//    console.log('After Deploy Functions');
//  }
//}

module.exports = CustomServerlessPlugin
