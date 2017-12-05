class bugCtl{
	constructor($scope,$http){
		this.scope = $scope
		this.http = $http
		this.refresh()
	}

	getBug(){
		this.http.get('res/bugs.json').then((res)=>{
			res.data.forEach((f)=>{
				f.image = f.image.toLowerCase()
				this.bugList.push(f)
			})

			this.locations = []

			this.bugList.forEach(f=>{
				if(this.locations.indexOf(f.location) === -1)
					this.locations.push(f.location)
			})
		})
	}

	refresh(){
		this.monthMap = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
		this.seasonMap = ['winter','winter','spring','spring','spring','summer','summer','summer','autumn','autumn','autumn','winter']

		if(!this.bugList){
			this.bugList = []
			this.getBug()
		}
		
		this.filterName = ''
		this.filterBells = {eq:'=',val:0}
		this.filterLocation = ''
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

	showBug(){
		if(this.bugList.length === 0)
			return

		let filteredBug = this.filterByName(this.bugList)
		// console.log('AfterName', filteredBug)

		if(typeof(filteredBug) === 'object' && filteredBug.length > 0) 
			filteredBug = this.filterByBells(filteredBug)
		// console.log('AfterBells',filteredBug)
		
		if(typeof(filteredBug) === 'object' && filteredBug.length > 0) 
			filteredBug = this.filterByLocation(filteredBug)
		// console.log('AfterLocation',filteredBug)
		
		if(typeof(filteredBug) === 'object' && filteredBug.length > 0) 
			filteredBug = this.filterByMonth(filteredBug)
		// console.log('AfterMonth',filteredBug)
		
		if(typeof(filteredBug) === 'object' && filteredBug.length > 0) 
			filteredBug = this.filterByHour(filteredBug)
		// console.log('AfterHour',filteredBug)

		return filteredBug

	}

	filterByName(bugList){
		if(this.filterName === '')
			return bugList

		let thisFilterName = this.filterName.toLowerCase()
		let filteredBug = bugList.filter((bug)=>{
			let thisBug = bug.name.toLowerCase()
			return thisBug.indexOf(thisFilterName) >= 0
		})

		return filteredBug
	}

	filterByBells(bugList){
		if(this.filterBells.val === 0)
			return bugList

		let filteredBug = bugList.filter((bug)=>{
			switch(this.filterBells.eq){
				case '=':
					return bug.value == this.filterBells.val
				case '<=':
					return bug.value <= this.filterBells.val
				case '>=':
					return bug.value >= this.filterBells.val
			}
		})

		return filteredBug
	}

	filterByLocation(bugList){
		if(this.filterLocation === '')
			return bugList

		let filteredBug = bugList.filter((bug)=>{
			return bug.location.indexOf(this.filterLocation) >= 0
		})

		return filteredBug
	}

	filterByShadow(bugList){
		if(this.filterShadow === '')
			return bugList

		let filteredBug = bugList.filter((bug)=>{
			return bug.shadow.indexOf(this.filterShadow) >= 0
		})

		return filteredBug
	}

	filterByMonth(bugList){
		let filteredBug = bugList.filter((bug,i)=>{
			return bug.months.find((m, i)=>{
				return m == 1 && this.filterMonths[i] == 1
			})
		})

		return filteredBug
	}

	filterByHour(bugList){
		let filteredBug = bugList.filter((bug,i)=>{
			let bugHours = this.getHours(bug.hours)
			return bugHours.find((hour, i)=>{
				return bugHours[i] == 1 && this.filterHours[i] == 1
			})
		})

		return filteredBug		
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

AnimalCrossing.controller('bugCtl', bugCtl)

