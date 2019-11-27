class Selector {
	constructor(geoData,names,colors){
		this.opacity = {
				outer: 0.8,
				full: 0.7,
				partial: 0.5,
				faded: 0.1
		};
		
		this.fill = d3.scaleOrdinal()
			.domain(d3.range(names.length))
			.range(colors);
		
		this.barchart;
		this.geoData = geoData;
	};
	
	clear() {
		let that = this;
		
		let paths = d3.select("#main")
			.select("#title-map-chord")
			.select("#chord-diagram")
			.select("#chords")
			.selectAll("path");

		paths
			.transition()
			.style("stroke-opacity",that.opacity.full)
			.style("fill-opacity", that.opacity.full);
		
		paths = d3.select("#main")
				.select("#title-map-chord")
				.select("#map-container")
				.select("#map")
				.selectAll("path")	
		paths
			.transition()
			.style("stroke-opacity",0)
			.style("fill-opacity", that.opacity.outer);
			
		texts
			.transition()
			.style("font-weight","normal");
	};
		
	fade(county, index) {
		let that = this; 
		
		function internalFade(d, i) {
			
			
				
			let paths = d3.select("#main")
				.select("#title-map-chord")
				.select("#map-container")
				.select("#map")
				.selectAll("path")				
			
			paths
				.transition()
				.style("stroke-opacity",1)
				.style("fill-opacity", that.opacity.outer);
			
			paths
				.filter(d => that.geoData[i].properties.NAME10 !== d.properties.NAME10)
				.transition()
				.style("stroke-opacity", 0)
				.style("fill-opacity", that.opacity.partial);
				
			let texts = d3.select("#main")
				.select("#title-map-chord")
				.select("#map-container")
				.select("#map")
				.selectAll("text")	
				
			texts
				.transition()
				.style("font-weight","bolder");
				
			texts
				.filter(d => that.geoData[i].properties.NAME10 !== d.properties.NAME10)
				.transition()
				.style("font-weight","normal");
				
			paths = d3.select("#main")
				.select("#title-map-chord")
				.select("#chord-diagram")
				.select("#chords")
				.selectAll("path");
				
			
			paths
				.filter(d => d.source.index != i && d.target.index != i)
				.transition()
				.style("stroke", d => 'grey')
				.style("fill", d => 'grey')
				.style("stroke-opacity", that.opacity.faded)
				.style("fill-opacity", that.opacity.faded);
				
			paths
				.filter(d => d.source.index == i)
				.transition()
				.style("stroke",d => that.fill(d.target.index))
				.style("fill",d => that.fill(d.target.index))
				.style("stroke-opacity",that.opacity.full)
				.style("fill-opacity", that.opacity.full);
				
			paths
				.filter(d => d.target.index == i)
				.transition()
				.style("stroke", d => that.fill(d.source.index))
				.style("fill", d => that.fill(d.source.index))
				.style("stroke-opacity",that.opacity.full)
				.style("fill-opacity", that.opacity.full);
				
			that.barchart.updateBarchart(i);
		};
		
		if (typeof county !== 'undefined') 
			internalFade(this.d,index);
		else
			return internalFade;
	};
	
	addReference(barchart){
		this.barchart = barchart;
	};
}
