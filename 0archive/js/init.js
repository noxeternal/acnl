var AnimalCrossing = angular.module('AnimalCrossing',['ui.router'])
.config(($stateProvider,$urlRouterProvider)=>{
	$stateProvider.state('index',{
		// url:'index',
		template: ''
	})
	$stateProvider.state('fish',{
		// url:'fish',
		templateUrl:'fish/index.html',
		controller:'fishCtl',
		controllerAs:'fish',
		params:{
			fishID: null
		}
	})
	$stateProvider.state('bugs',{
		// url:'bugs',
		templateUrl:'bugs/index.html',
		controller:'bugCtl',
		controllerAs:'bug',
		params:{
			fishID: null
		}
	})
	// $urlRouterProvider.otherwise('index')
})
