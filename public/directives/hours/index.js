const app = require('angular').module('hours', [])
module.exports = app.name

class HoursDisplay {
  constructor ($scope) {
    if (!$scope.fish) return
    this.out = {}
    this.fish = $scope.fish.name
    this.hours = $scope.fish.hours
  }

  getHours () {
    let returnHours = new Array(24).fill(0)
    this.hours.forEach((h) => {
      if (h.end < h.start) { h.end = h.end + 23 }

      for (let i = h.start; i <= h.end; i++) {
        let thisHour = i >= 24 ? i - 24 : i
        returnHours[thisHour] = 1
      }
    })

    return returnHours
  }

  output () {
    if (!this.out) return
    let disp = []
    if (this.out[this.fish]) {
      disp = this.out[this.fish]
    } else {
      let hours = this.getHours()
      hours.forEach((h, i) => {
        disp.push({hour: i + 1, meridian: h === 0 ? 'blank' : (i > 5 && i < 18 ? 'pm' : 'am')})
      })
      this.out[this.fish] = disp
    }
    return disp
  }
}

function hours () {
  return {
    restrict: 'E',
    scope: {
      fish: '='
    },
    controller: ['$scope', HoursDisplay],
    controllerAs: 'hoursdisplay',
    template: require('./index.html')
  }
}

app.directive('hours', [hours])
