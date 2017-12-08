const app = require('angular').module('fish', [])
module.exports = app.name

app.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('fish', {
    url: '/fish',
    template: require('./index.html'),
    controller: 'fish as fish',
    resolve: {
      fishList: ['$http', ($http) => {
        return $http.get('/fish.json')
        .then(fishes => fishes.data)
      }]
    }
  })
}])

class Fish {
  constructor ($scope, ls, fishList) {
    this.list = fishList

    this.locations = []
    this.list.forEach(item => {
      if (this.locations.indexOf(item.location) === -1) {
        this.locations.push(item.location)
      }
    })

    this.shadows = []
    this.list.forEach(item => {
      if (this.shadows.indexOf(item.shadow) === -1) {
        this.shadows.push(item.shadow)
      }
    })

    this.ls = ls
    this.filters = [
      {name: 'name', func: 'filterByName'},
      {name: 'caught', func: 'filterByCaught'},
      {name: 'location', func: 'filterByLocation'},
      {name: 'shadow', func: 'filterByShadow'},
      {name: 'months', func: 'filterByMonths'},
      {name: 'hours', func: 'filterByHours'},
      {name: 'currentTime', func: 'filterByCurrentTime'}
    ]

    this.filterValues = {
      name: '',
      caught: '',
      location: '',
      shadow: '',
      months: [],
      hours: [],
      currentTime: false
    }

    $scope.$watch('fish.filterValues', () => this.filter(), true)

    this.filter()
  }

  filter () {
    this.filteredList = this.list
    this.filters.forEach(f => {
      if (this.filterValues[f.name].length === 0) {
        return
      }

      console.log({'filter': f, list: this.filteredList})

      this[f.func](this.filterValues[f.name])
    })
  }

  filterByName (name) {
    console.log('byName', name)
    this.filteredList = this.filteredList.filter(fish => fish.name.toLowerCase().indexOf(name) !== -1)
  }

  filterByCaught (bool) {
    bool = !!parseInt(bool)
    console.log('byCaught', bool)
    this.filteredList = this.filteredList.filter(fish => this.ls.getVal(fish.name) === bool)
  }

  filterByLocation (location) {
    console.log('byLocation', location, this.locations)
    this.filteredList = this.filteredList.filter(fish => fish.location.toLowerCase().indexOf(location) !== -1)
  }

  filterByShadow (shadow) {
    console.log('byShadow', shadow)
    this.filteredList = this.filteredList.filter(fish => fish.shadow.toLowerCase().indexOf(shadow) !== -1)
  }

  filterByMonths (months) {
    console.log('byMonths', months)
    let tmpList = []
    this.filteredList.forEach(fish => {
      let month = months.filter((m) => fish.months[m - 1])
      if (month.length !== 0) {
        tmpList.push(fish)
      }
      this.filteredList = tmpList
    })
  }

  filterByHours (hours) {
    console.log('byHours', hours)
    let tmpList = []
    this.filteredList.forEach(fish => {
      let tmpHours = []
      fish.hours.forEach(h => {
        for (let i = 1; i <= 24; i++) {
          tmpHours.push(i >= h.start || i <= h.end)
        }
      })

      let hour = hours.filter(h => tmpHours[h - 1])
      if (hour.length !== 0) {
        tmpList.push(fish)
      }

      this.filteredList = tmpList
    })
  }

  filterByCurrentTime () {
    console.log('byCurrentTime')
    let d = new Date()
    console.log(d.getHours(), d.getMonth())
    this.filterValues.hours = [d.getHours() + 1]
    this.filterValues.months = [d.getMonth() + 1]
  }
}

app.controller('fish', ['$scope', 'ls', 'fishList', Fish])
