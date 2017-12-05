class fishCtl{
	constructor($scope,$http){
		this.scope = $scope
		this.http = $http
		this.refresh()
	}

	getFish(){
		this.http.get('res/fish.json').then((res)=>{
			res.data.forEach((f)=>{
				f.image = f.image.toLowerCase()
				this.fishList.push(f)
			})

			this.shadows = []
			this.locations = []

			this.fishList.forEach(f=>{
				if(this.shadows.indexOf(f.shadow) === -1)
					this.shadows.push(f.shadow)
				if(this.locations.indexOf(f.location) === -1)
					this.locations.push(f.location)
			})
		})
	}

	refresh(){
		this.monthMap = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
		this.seasonMap = ['winter','winter','spring','spring','spring','summer','summer','summer','autumn','autumn','autumn','winter']

		if(!this.fishList){
			this.fishList = []
			this.getFish()
		}
		
		this.filterName = ''
		this.filterBells = {eq:'=',val:0}
		this.filterLocation = ''
		this.filterShadow = ''
		this.filterMonths = new Array(12).fill(1)
		this.filterHours = new Array(24).fill(1)
		this.orderBy = 'name'
		this.orderReverse = false
	}

	setOrderBy(orderBy){
		if(this.orderBy == orderBy){
			this.orderReverse = !this.orderReverse
		}else{
			this.orderBy = orderBy
			this.orderReverse = false
		}

	}

	setCurrentTime(){
		let date = new Date()
		let thisMonth = date.getMonth()
		let thisHour = date.getHours()

		this.filterMonths.fill(0)
		this.filterMonths[thisMonth] = 1

		this.filterHours.fill(0)
		this.filterHours[thisHour] = 1
	}

	resetTime(){
		this.filterMonths.fill(1)
		this.filterHours.fill(1)
	}

	showFish(){
		if(this.fishList.length === 0)
			return

		let filteredFish = this.filterByName(this.fishList)
		// console.log('AfterName', filteredFish)

		if(typeof(filteredFish) === 'object' && filteredFish.length > 0) 
			filteredFish = this.filterByBells(filteredFish)
		// console.log('AfterBells',filteredFish)
		
		if(typeof(filteredFish) === 'object' && filteredFish.length > 0) 
			filteredFish = this.filterByLocation(filteredFish)
		// console.log('AfterLocation',filteredFish)
		
		if(typeof(filteredFish) === 'object' && filteredFish.length > 0) 
			filteredFish = this.filterByShadow(filteredFish)
		// console.log('AfterShadow',filteredFish)
		
		if(typeof(filteredFish) === 'object' && filteredFish.length > 0) 
			filteredFish = this.filterByMonth(filteredFish)
		// console.log('AfterMonth',filteredFish)
		
		if(typeof(filteredFish) === 'object' && filteredFish.length > 0) 
			filteredFish = this.filterByHour(filteredFish)
		// console.log('AfterHour',filteredFish)

		return filteredFish

	}

	filterByName(fishList){
		if(this.filterName === '')
			return fishList

		let thisFilterName = this.filterName.toLowerCase()
		let filteredFish = fishList.filter((fish)=>{
			let thisFish = fish.name.toLowerCase()
			return thisFish.indexOf(thisFilterName) >= 0
		})

		return filteredFish
	}

	filterByBells(fishList){
		if(this.filterBells.val === 0)
			return fishList

		let filteredFish = fishList.filter((fish)=>{
			switch(this.filterBells.eq){
				case '=':
					return fish.value == this.filterBells.val
				case '<=':
					return fish.value <= this.filterBells.val
				case '>=':
					return fish.value >= this.filterBells.val
			}
		})

		return filteredFish
	}

	filterByLocation(fishList){
		if(this.filterLocation === '')
			return fishList

		let filteredFish = fishList.filter((fish)=>{
			return fish.location.indexOf(this.filterLocation) >= 0
		})

		return filteredFish
	}

	filterByShadow(fishList){
		if(this.filterShadow === '')
			return fishList

		let filteredFish = fishList.filter((fish)=>{
			return fish.shadow.indexOf(this.filterShadow) >= 0
		})

		return filteredFish
	}

	filterByMonth(fishList){
		let filteredFish = fishList.filter((fish,i)=>{
			return fish.months.find((m, i)=>{
				return m == 1 && this.filterMonths[i] == 1
			})
		})

		return filteredFish
	}

	filterByHour(fishList){
		let filteredFish = fishList.filter((fish,i)=>{
			let fishHours = this.getHours(fish.hours)
			return fishHours.find((hour, i)=>{
				return fishHours[i] == 1 && this.filterHours[i] == 1
			})
		})

		return filteredFish		
	}

	getHours(hours){
		let returnHours = new Array(24).fill(0)
		hours.forEach((h)=>{
			if(h.end < h.start)
				h.end = h.end+23

			for(let i=h.start;i<=h.end;i++){
				let thisHour = i>=24?i-24:i
				returnHours[thisHour] = 1
			}
		})

		return returnHours
	}
}

AnimalCrossing.controller('fishCtl', fishCtl)

