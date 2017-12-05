String.prototype.ucWords = function(){
	return this.replace(/\w+/g, (a)=>{ 
		return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()
	})
}

// {
// 	"name": "Common butterfly",
// 	"image": "http://vignette1.wikia.nocookie.net/animalcrossing/images/5/58/Common_Butterfly_HHD_Icon.png",
// 	"value": 90,
// 	"location": "Flying near flowers",
// 	"hours": [{"start":4,"end":19}],
// 	"months": [0,0,1,1,1,1,0,0,1,0,0,0]
// }


bugs = require('./res/bugs.json');
newBugs = []

bugs.forEach(b=>{
	b.name = b.name.ucWords()
	b.image = 'img/'+b.name.toLowerCase().replace(' ','_')+'.png'
	newBugs.push(b)	
})
console.log(JSON.stringify(newBugs,null,4))