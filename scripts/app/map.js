class Map {
	constructor(names, colors, data, selector) {
		this.data = data;
		
		this.fill = d3.scaleOrdinal()
			.domain(d3.range(names.length))
			.range(colors);

		this.height = 650;
		this.width = 400;
		this.names=names;
		
		this.selector = selector;
	}

	createMap() {
		let that = this;
		
		let data = this.data
		let projection = d3.geoMercator()
			.translate([9950 , 4050]) // this centers the map in our SVG element
			.scale([5000]); // this specifies how much to zoom
			
// This converts the projected lat/lon coordinates into an SVG path string
		let path = d3.geoPath()
			.projection(projection);
						
		let svg = d3.select("#title-map-chord")
			.append("g")
			.attr("id", "map-container")
			.attr("max-height","500px")
			.attr("preserveAspectRatio", "xMinYMin meet")
			.attr("viewBox", "0 0 440 300")
			.attr("width", this.width)
			.attr("height", this.height)
			.attr("transform","translate(0,80)");

			
		let map = d3.select("#title-map-chord")
			.select("#map-container")
			.append("g")
			.attr("id","map");

		let g = map.selectAll("g")
			.data(data)
			.enter()
			.append("g")
			.attr("class","county");
			
		g.append("path")
			.attr("d",path)
			.attr("fill",(d,i) => d3.rgb(that.fill(i)))
			.attr("opacity","0.8");
		g.on("click", that.selector.fade());

		g.append("text")
			.attr("class", "county-label")
			.attr("y", "5px")
			.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
			.text((d) => {return d.properties.NAME10})
			.classed("heavy","true")
			.style("fill-opacity",1)
			.style("stroke-opacity",0.2)
			.style("fill","black")
			.style("stroke","white")
			.style("stroke-width","0.5px");
		
	}
}


