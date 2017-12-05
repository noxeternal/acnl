const fs = require('fs')
const rl = require('readline')

let bigO = [];

let keys = [
	"name",
	"image",
	"value",
	"location",
	"shadow",
	"hours",
	"months"
]


function buildBlock(b){
	o = {}
	let i=0
	keys.forEach(k=>{
		if(k == 'months'){
			months = []
			for(mon=0;mon<12;mon++){
				months.push(b[mon+i])
			}
			o[k] = months
		}else{
			o[k] = b[i]
		}
		i++
	})

	writer.write(JSON.stringify(o,null,'\t'));
}


let reader = rl.createInterface({
	input: fs.createReadStream('res/deepsea')
})
writer = fs.createWriteStream('res/deepsea.json')

writer.write('[\n');

let lineCount = 0
let block = []

reader.on('line', l=>{
	if(lineCount == 18){
		reader.pause()
		buildBlock(block)
		lineCount = 0
		block = []
		return
	}
	// console.log(l)
	block.push(l)
	lineCount++

})

reader.on('close',()=>{
	console.log(bigO)	
})