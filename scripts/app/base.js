Promise.all([
	d3.csv("data/data.csv"),
	d3.csv("data/labels.csv"),
	d3.json("data/tl_2010_49_county10.json")
]).then(function(files) {
	let data = files[0];
	let names = files[1].map(d => d.name);
	let colors = files[1].map(d => d.color);
	
	let json = files[2];
	let geoData = json.features;
	geoData.sort((a,b) => (
		a.properties.NAME10.toUpperCase() > 
		b.properties.NAME10.toUpperCase()) 
		? 1 : -1); 	
		
	d3.select("#main")
		.append("svg")
		.attr("id","title-map-chord")
		.attr("width",1000)
		.attr("height",700);
		
	d3.select("#title-map-chord")
		.append("g")
		.attr("id","title-container")
		.attr("width",1000)
		.attr("height",80);
		
	d3.select("#title-container")
		.append("text")
		.attr("x",5)
		.attr("y",25)
		.style("font-size", "30px")
		.style("fill", "black")
		.text("Data Visualization Term Project");
		
	d3.select("#title-container")
		.append("text")
		.attr("x",6)
		.attr("y",50)
		.style("font-size", "22px")
		.style("fill", "black")
		.text("Mitra Alirezaei, Seth Miller");
		
	let selector = new Selector(geoData);

	let chord = new Chord(names,colors,data,selector);
	chord.createChord();
	
	let map = new Map(names,colors,geoData,selector);
	map.createMap();
	
	let barchart = new Barchart(names, colors, data, selector);
	barchart.createBarchart();
	barchart.updateBarchart();
	
	selector.addReference(barchart);
});
