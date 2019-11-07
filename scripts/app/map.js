class Map {
	constructor(names, colors, json) {
		this.data = json;
		this.width = 800
		this.height = 800
		this.names=names;
	}

	createMap() {
		let data = this.data
		let projection = d3.geoAlbersUsa()
			.translate([1400 , 600]) // this centers the map in our SVG element
			.scale([6500]); // this specifies how much to zoom

// This converts the projected lat/lon coordinates into an SVG path string
		let path = d3.geoPath()
			.projection(projection);
		console.log(data.features)
		let svg = d3.select("#mapchart").append("svg")
			.attr("width",  this.width)
			.attr("height", this.height)
			.attr("class", "mapview");

		let svg1 = svg.selectAll("path")
			.data(data.features)
			.join("path")
			.attr("d", path)
			.attr('transform', 'rotate(-9)')
			.attr("class", function(d,i) {
				if (d.properties.NAME10 == 'Salt Lake'){
					return 'SaltLake'
				}
				if (d.properties.NAME10 == 'Box Elder'){
					return 'BoxElder'
				}
				if (d.properties.NAME10 == 'San Juan'){
					return 'SanJuan'
				}
				return  d.properties.NAME10
			});

		//svg1.append("g").selectAll("text")
		//	.data(this.names)
		//	.join("text")
		//	.text((d) => {return d})
		svg1.append("text")
			.attr("class", "county-label")
			.attr('x', 0)
			.attr('y', 0)
			.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
			.text((d) => {return d.properties.NAME10})
			.style('fill', 'black');
		
	}
}


