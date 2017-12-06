const app = require('angular').module('fish', [])
module.exports = app.name

app.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('fish', {
    url: '/fish',
    template: require('./index.html'),
    controller: 'fish as fish',
    resolve: {}
  })
}])

app.component('fishDisplay', {
  templateUrl: require('./template.html'),
  bindings: {
    fish: '='
  }
})

class Fish {
  constructor () {
    this.fish = true
  }
}

app.controller('fish', [Fish])
