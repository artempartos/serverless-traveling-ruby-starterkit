'use strict';

class Deplo {
  constructor() {
    this.commands = {
      deplo: {
        lifecycleEvents: [
          'resources',
          'functions'
        ]
      },
    };

    this.hooks = {
      'before:deplo:resources': this.beforeDeployResources,
      'deplo:resources': this.deployResources,
      'after:deplo:functions': this.afterDeployFunctions
    };
  }

  beforeDeployResources() {
    console.log('Before Deploy Resources');
  }

  deployResources() {
    console.log('Deploy Resources');
  }

  afterDeployFunctions() {
    console.log('After Deploy Functions');
  }
}

module.exports = Deplo
