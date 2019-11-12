class Barchart {
	constructor(names, colors, data, selector) {

		this.width = 450
		this.height = 800
		this.textWidth = 70
		this.margin = 200
		this.animationDuration = 2000;
		this.data = data
		let max = d3.max(data, d => +d.count);
		let xScale = d3.scaleLinear()
			.domain([0, max])
			.range([0, this.width - this.textWidth])
			.nice()
		let yScale = d3.scaleBand()
			.range([0, this.height]).padding(.1);
		yScale.domain(names);

		let xAxis = d3.axisBottom();
		xAxis.scale(xScale);
		//let barscale = d3.scaleLinear().range([0, this.bar['width'] - this.bar['buffer'] ]);
		//barscale.domain([0, 1]);
		//this.xAxis = xAxis;
		this.yScale = yScale;
		this.xScale = xScale;
		this.names=names;
		
		this.fill = d3.scaleOrdinal()
			.domain(d3.range(names.length))
			.range(colors);
			
		this.selector = selector;

	}
	
	createBarchart(name) {

		this.name = 'Emery' //initiale county shown on the barcharts
		let data = this.data
		let origin = data.filter((d) => {return d.origin == this.name;})
		//console.log(d3.max(origin, d => +d.count))
		let destination = data.filter((d) => {return d.destination == this.name;})
		let spacing = this.height / origin.length;

		//origin = origin.sort(function (a, b) {
					// sorting by magnitude
		//			return +b.count - +a.count;
		//});
		let max1 = d3.max(origin, d => +d.count)
		let max2 = d3.max(destination, d => +d.count)
///////////////////////////////////////////////
		let xScale1 = d3.scaleLinear()
			.domain([0, Math.max(max1, max2)])
			.range([0, this.width/2 - this.textWidth +this.margin])
			.nice();
		let formatter = d3.format("0");
		let xAxis = d3.axisBottom();
		xAxis.scale(xScale1)
			.tickFormat(function (d) {
				if (d === 0) return d; // No label for '0'
				else if (d < 0) d = d; // No nagative labels
				return formatter(d);
			});
///////////////////////////////////////////////
		let xScale2 = d3.scaleLinear()
			.domain([ -Math.max(max1, max2),0])
			.range([ this.width/2 - this.textWidth  +this.margin,0])
			.nice();
		let xScale3 = d3.scaleLinear()
			.domain([ -Math.max(max1, max2),0])
			.range([ 0,this.width/2 - this.textWidth  +this.margin])
			.nice();

		let xAxis2 = d3.axisBottom();
		xAxis2.scale(xScale3)
			.tickFormat(function (d) {
				if (d === 0) return d; // No label for '0'
				else if (d < 0) d = -d; // No nagative labels
				return formatter(d);
			});



///////////////////////////////////////////////
		let ColorScale1 = d3.scaleLinear().range(['#feebe2', '#a30000']);
		ColorScale1.domain([0, d3.max(origin, d => +d.count)]);
///////////////////////////////////////////////
		let ColorScale2 = d3.scaleLinear().range(['#B5D3E7', '#02075d']);
		ColorScale2.domain([0, d3.max(destination, d => +d.count)]);
			//d3.scaleQuantize()
			//.domain([0, d3.max(origin, d => +d.count)])
			//.range([0, '#034e7b']);
///////////////////////////////////////////////
		let svg = d3.select("#barchart").append("svg")
			.attr("width", 2*this.width+this.margin)
			.attr("height", this.height+this.margin)
			//.append("g")
			.attr("id","bar-chart");
			//.classed("barview", true);
///////////////////////////////////////////////
		svg.append("g")
			.attr("transform", `translate(${this.width+this.textWidth},${this.height})`)
			.call(xAxis);
///////////////////////////////////////////////
		svg.append("g")
			.attr("transform", `translate(${this.textWidth},${this.height})`)
			.call(xAxis2);
///////////////////////////////////////////////
		svg.append("g")
			.attr("id","exiting")
			.selectAll("rect")
			.data(origin)
			.join("rect")
			.attr("x",this.width+this.textWidth)
			.attr("y", (d, i) => i * spacing)
			.attr("width", (d) => {return xScale1(+d.count);

			})
			.attr("height", this.yScale.bandwidth())
			//.style("fill", 'blue')
			.attr("fill", (d,i) => {
				return d3.rgb(this.fill(i));
			})
			.html("")
			.append("title")
			.text(d => {
				return `number of exiting trips: ${+d.count}`;
			});
///////////////////////////////////////////////
		svg.append("g")
			.attr("id","entering")
			.selectAll("rect")
			.data(destination)
			.join("rect")
			.attr("x",(d) => {return this.width-25  - xScale2(- +d.count);

			})
			.attr("y", (d, i) => i * spacing)
			//.attr("height", yScale.bandwidth())
			.attr("width", (d) => {return xScale2(- +d.count);

			})
			.attr("height", this.yScale.bandwidth())
			//.style("fill", 'blue')
			.attr("fill", (d,i) => {
				return d3.rgb(this.fill(i));
			})
			.html("")
			.append("title")
			.text(d => {
				return `number of entering trips: ${+d.count}`;
			});

		svg.append("g").selectAll("text")
			.data(this.names)
			.join("text")
			.text((d) => {return d})
			.attr("x", this.width + this.textWidth -15 )
			// dy is a shift along the y axis;
			// bandwidth() accesses the automatically computed width of the bar
			.attr("dy", this.yScale.bandwidth() / 2)
			.attr("y", (d, i) => (i) * spacing)
			// align it to the right
			.attr("text-anchor", "end")
			// center it
			.attr("alignment-baseline", "middle");
			//.transition().duration(this.animationDuration)
			//.attr("opacity", 1);

		svg.append("text")
			.text('Entering trips')
			.attr("x", 50)
			.attr("y",35)
			.attr("alignment-baseline", "middle")
			.attr("text-anchor", "end")
			.attr("transform", `translate(${this.textWidth},${this.height})`);
		svg.append("text")
			.text('Exiting trips')
			.attr("x", 2*this.width-this.textWidth)
			.attr("y",35)
			.attr("alignment-baseline", "middle")
			.attr("text-anchor", "end")
			.attr("transform", `translate(${this.textWidth},${this.height})`);

		svg.append("line")          // attach a line
			.style("stroke", "black")  // colour the line
			.attr("x1", this.width-this.textWidth +46)     // x position of the first end of the line
			.attr("y1", 0)      // y position of the first end of the line
			.attr("x2", this.width-this.textWidth +46)     // x position of the second end of the line
			.attr("y2", this.height);

		svg.append("line")          // attach a line
			.style("stroke", "black")  // colour the line
			.attr("x1", this.width +70)     // x position of the first end of the line
			.attr("y1", 0)      // y position of the first end of the line
			.attr("x2", this.width +70)     // x position of the second end of the line
			.attr("y2", this.height);

	}
	
	updateBarchart(){
		let that = this;
		
		let entering =  d3.select("#bar-chart")
			.select("#entering")
			.selectAll("rect");
		
		entering.on("click", function (d,i) {	
			that.selector.fade(d.origin,i);
		});
		
		let exiting = d3.select("#bar-chart")
			.select("#exiting")
			.selectAll("rect");
			
		exiting.on("click", function(d,i) {
			that.selector.fade(d.destination,i);
		});
		
		entering.attr("opacity",0.8);
		exiting.attr("opacity",0.8);
	}
}
