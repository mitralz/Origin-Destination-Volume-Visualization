class Barchart {
	constructor(names, colors, data, selector) {

		this.width = 330
		this.height = 550
		this.textWidth = 50
		this.margin = 100
		//this.animationDuration = 2000;
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
		//for (let j=0 ; j<=29 ; j++){
		//console.log(this.fill(j))}
		this.selector = selector;
		let svg = d3.select("#title-map-chord")
			.append("g")
			.attr("id","bar")
			.attr("max-height","1200px")
			.attr("preserveAspectRatio", "xMinYMin meet")
			.attr("viewBox", "0 0 900 900")
			.attr("width", this.width+this.margin)
			.attr("height", this.height+this.margin)
			.attr("transform", `translate(${832},${100})`);
		let ent = svg.append("g")
			.attr("id","entering");
		let exi = svg.append("g")
			.attr("id","exiting");
		this.svg = svg;
		this.ent = ent;
		this.exi = exi;
	}
////////////////////////////////////////

	updateBarchart(i){
		let svg = this.svg;
		let names = this.names;
		let d = names[i];
		d3.select("#main").select("#title-map-chord").selectAll('rect').remove();
		d3.select("#main").select("#title-map-chord").select("#bar").selectAll('text').remove();
		d3.selectAll('line').remove();
		d3.selectAll('.domain').remove();


		this.name = ""+d;
		let ex_name = ""+d;
		let data = this.data;
		let origin1 = data.filter((d) => {return d.origin == this.name;})
		console.log(origin1)
		let destination1 = data.filter((d) => {return d.destination == this.name;})
		let spacing = this.height / origin1.length;

		let origin = origin1.sort(function (a, b) {
			//sorting by magnitude
			return +b.count - +a.count;
		});

		let destination = destination1.sort(function (a, b) {
			//sorting by magnitude
			return +b.count - +a.count;
		});

		let max1 = d3.max(origin, d => +d.count)
		let max2 = d3.max(destination, d => +d.count)
///////////////////////////////////////////////
		const ticksAmount = 6;
		//const tickStep1 = (max1 - 0) / (ticksAmount);
		//const tickStep2 = (max2 - 0) / (ticksAmount);
///////////////////////////////////////////////
		let xScale1 = d3.scaleLinear()
			.domain([0, Math.max(max1, max2)])
			.range([0, this.width/2 - this.textWidth +this.margin])
			.nice();
		let formatter = d3.format("~s");
		let xAxis = d3.axisBottom();
		xAxis.scale(xScale1)
			//.ticks(5)
			.ticks(ticksAmount)
			//.tickValues(d3.range(0, max1 + tickStep1, tickStep1))
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
			.ticks(ticksAmount)
			//.tickValues(d3.range( max2 + tickStep2,0, tickStep2))
			//.ticks(6)
			.tickFormat(function (d) {
				if (d === 0) return d; // No label for '0'
				else if (d < 0) d = -d; // No nagative labels
				return formatter(d);
			});
///////////////////////////////////////////////
		svg.append("g")
			.attr("transform", `translate(${this.width-10},${0})`)
			.call(xAxis);
///////////////////////////////////////////////
		svg.append("g")
			.attr("transform", `translate(${this.textWidth+40},${0})`)
			.call(xAxis2);
///////////////////////////////////////////////
		let exi = this.exi;
		//svg.append("g")
			//.attr("id","exiting")
			exi.selectAll("rect")
			.data(origin)
			.join("rect")
			.attr("x",this.width+this.textWidth-this.textWidth-10)
			.attr("y", (d, i) => (i+2) * spacing)
			.attr("width", (d) => {return xScale1(+d.count);

			})
			.attr("height", this.yScale.bandwidth())
			.attr("class", function(d,i) {
				if (d.destination == 'Salt Lake'){
					return 'SaltLake'
				}
				if (d.destination == 'Box Elder'){
					return 'BoxElder'
				}
				if (d.destination == 'San Juan'){
					return 'SanJuan'
				}
				return  d.destination
			})
			.html("")
			.append("title")
			.text(d => {
				return `number of exiting trips: ${+d.count}`;
			});
///////////////////////////////////////////////
		let ent= this.ent;
		//svg.append("g")
			//.attr("id","entering")
			ent.selectAll("rect")
			.data(destination)
			.join("rect")
			.attr("x",(d) => {return this.width-25  - xScale2(- +d.count);

			})
			.attr("y", (d, i) => (i+2) * spacing)
			//.attr("height", yScale.bandwidth())
			.attr("width", (d) => {return xScale2(- +d.count);

			})
			.attr("height", this.yScale.bandwidth())
			//.style("fill", 'blue')
			.attr("class", function(d,i) {
				if (d.origin == 'Salt Lake'){
					return 'SaltLake'
				}
				if (d.origin == 'Box Elder'){
					return 'BoxElder'
				}
				if (d.origin == 'San Juan'){
					return 'SanJuan'
				}
				return  d.origin
			})
			.html("")
			.append("title")
			.text(d => {
				return `number of entering trips: ${+d.count}`;
			});

		svg.select('#entering').selectAll("text")
			.data(destination)
			//.enter()
			//.append("text")
			.join("text")
			.attr("text-anchor", "middle")
			.text(function(d) {
				return d.origin;
			})

			.attr("x", (d) => {
				if (d.origin.length <=6){
					return this.width-44  - xScale2(- +d.count);}
				if (d.origin.length >6){
				return this.width-54  - xScale2(- +d.count);}

			})
			.attr("y",(d, i) => (i+2) * spacing + 10)
			.attr("font-family", "sans-serif")
			.attr("font-size", "11px")
			.attr("fill", "black");


		svg.select('#exiting').selectAll("text")
			.data(origin)
			.join("text")
			.attr("text-anchor", "middle")
			.text(function(d) {
				console.log(d.destination.length);
				return d.destination;
			})
			.attr("x", (d) => {
				if (d.destination.length <=6){
				return this.width+10 + xScale1( +d.count); }
				if (d.destination.length >6){
					return this.width+20 + xScale1( +d.count); }

			})
			.attr("y",(d, i) => (i+2) * spacing + 10)
			//.attr("transform", function(d) { return "translate(" + 150 + ")"; })
			.attr("font-family", "sans-serif")
			.attr("font-size", "11px")
			.attr("fill", "black");



		svg.append("text")
			.text('Entering trips')
			.attr("x", 90)
			.attr("y",-10)
			.attr("font-size", "15px")
			.attr("alignment-baseline", "middle")
			.attr("text-anchor", "end")
			.attr("transform", `translate(${this.textWidth},${0})`);
		svg.append("text")
			.text('Exiting trips')
			.attr("x", 2*this.width-150)
			.attr("y",0)
			.attr("font-size", "15px")
			.attr("alignment-baseline", "middle")
			.attr("text-anchor", "end")
			.attr("transform", `translate(${this.textWidth},${-10})`);

		svg.append("line")          // attach a line
			.style("stroke", "black")  // colour the line
			.attr("x1", this.width-this.textWidth +24)     // x position of the first end of the line
			.attr("y1", 37)      // y position of the first end of the line
			.attr("x2", this.width-this.textWidth +24)     // x position of the second end of the line
			.attr("y2", this.height+30);

		svg.append("line")          // attach a line
			.style("stroke", "black")  // colour the line
			.attr("x1", this.width -10)     // x position of the first end of the line
			.attr("y1", 37)      // y position of the first end of the line
			.attr("x2", this.width -10)     // x position of the second end of the line
			.attr("y2", this.height+30);

		svg.append("text")
			.text("County: " +ex_name)
			.attr("x", this.width+40)
			.attr("y",-15)
			.attr("font-size", "15px")
			.attr("alignment-baseline", "middle")
			.attr("text-anchor", "middle")
			.attr("text-anchor", "end");

		///////////////////////////////////////////
		let that = this;
		let entering =  d3.select("#title-map-chord")
			//.select("#bar-chart")
			//.select("#bar")
			.select("#entering")
			.selectAll("rect");
		console.log(entering)
		let destination2 = data.filter((d) => {return d.destination == this.name;})
		let origin2 = data.filter((d) => {return d.origin== this.name;})
		//console.log(destination2)

		entering.on("click", function (d,i) {
			let ii = destination2.map(x => x.origin).indexOf(''+d.origin);
			that.selector.fade(d.origin,ii);
		});
		
		let exiting = d3.select("#title-map-chord")
			//.select("#bar")
			.select("#exiting")
			.selectAll("rect");
			
		exiting.on("click", function(d,i) {
			let ii = origin2.map(x => x.destination).indexOf(''+d.destination);
			that.selector.fade(d.destination,ii);
		});
		
		entering.attr("opacity",0.8);
		exiting.attr("opacity",0.8);
	}
}
