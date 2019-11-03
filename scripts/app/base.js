Promise.all([
	d3.csv("data/data.csv"),
	d3.csv("data/labels.csv"),
	d3.json("data/tl_2010_49_county10.json")
]).then(function(files) {
	let data = files[0];
	let names = files[1].map(d => d.name);
	let colors = files[1].map(d => d.color);
	
	let json = files[2]; 
	console.log(json);//TODO

	let chord = new Chord(names,colors,data);
	chord.createChord();
	
	let map = new Map(names,colors,json);
	map.createMap();
	
	let barchart = new Barchart(names, colors, data);
	barchart.createBarchart();
});
