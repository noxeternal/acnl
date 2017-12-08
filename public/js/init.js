require('./../css/main.css')

const angular = require('angular')
window.angular = angular

require('@uirouter/angularjs')
require('ngstorage')

let app = angular.module('acnl', ['ui.router', 'ngStorage', require('./directives'), require('./services'), require('./states')])

app.config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.when('/', 'index')
  $locationProvider.html5Mode(true)
}])
