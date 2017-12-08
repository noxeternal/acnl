const app = require('angular').module('fishdisplay', [])
module.exports = app.name

class FishDisplay {
  constructor (ls) {
    this.ls = ls
  }

  caught (fish) {
    return this.ls.getVal(fish)
  }
}

function fishDisplay () {
  return {
    restrict: 'E',
    scope: {
      fish: '=',
      index: '@'
    },
    controller: ['ls', FishDisplay],
    controllerAs: 'fishdisplay',
    template: require('./index.html')
  }
}

app.directive('fishDisplay', [fishDisplay])
