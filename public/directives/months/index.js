const app = require('angular').module('months', [])
module.exports = app.name

class MonthsDisplay {
  constructor ($scope) {
    if (!$scope.fish) return
    this.out = {}
    this.fish = $scope.fish.name
    this.months = $scope.fish.months
    this.monthMap = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    this.seasonMap = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter']
  }

  output () {
    if (!this.out) return
    let disp = []
    if (this.out[this.fish]) {
      disp = this.out[this.fish]
    } else {
      this.months.forEach((m, i) => {
        disp.push({id: i + 1, month: this.monthMap[i], season: m ? this.seasonMap[i] : 'blank'})
      })
      this.out[this.fish] = disp
    }

    return disp
  }
}

function months () {
  return {
    restrict: 'E',
    scope: {
      fish: '='
    },
    controller: ['$scope', MonthsDisplay],
    controllerAs: 'monthsdisplay',
    template: require('./index.html')
  }
}

app.directive('months', [months])
