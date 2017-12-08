const app = require('angular').module('ls', [])
module.exports = app.name

class LocalStorage {
  constructor ($localStorage) {
    this.localStorage = $localStorage
    this.localStorage.init = true
  }

  toggle (key) {
    if (this.localStorage[key]) {
      this.localStorage[key].marked = !this.localStorage[key].marked
    } else {
      this.localStorage[key] = {marked: true}
    }
  }

  getVal (key) {
    if (this.localStorage[key]) {
      return this.localStorage[key].marked
    } else {
      return false
    }
  }
}

app.service('ls', ['$localStorage', LocalStorage])
