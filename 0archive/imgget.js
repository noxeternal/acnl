const spawn = require('child_process').spawn

let fish = require('./res/bugs.json')

let proc = 'curl'
let args = ['-o']
let opts = {'cwd': '/home/mikee/git/ac/img/'}

fish.forEach(f=>{
	filename = f.name.toLowerCase().replace(' ','_')+'.png'
	// console.log(filename)
	console.log(proc+' '+f.image+' '+args+' '+opts.cwd+filename)
})