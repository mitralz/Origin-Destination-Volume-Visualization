class Chord {
	constructor(names, colors, data, selector) {
		this.names = names;
		this.fill = d3.scaleOrdinal()
			.domain(d3.range(names.length))
			.range(colors);
			
		this.selector = selector;
		//TODO this.matrix = matrix;
		let row1 = [0,8900,2800,200,0,13700,300,9100,4800,1600,97700,28500,18900,30300,300,2600,0,77300,100,700,27800,3700,7700,100,42900,1100,66600,100,6200]
		let row2 = [9100,0,148500,8000,0,144100,1000,4700,100,900,19700,18500,500,8300,13600,0,1200,300900,1700,3200,3100,21900,19900,700,74500,3800,14600,0,234700]
		let row3 = [3700,136200,0,600,0,62700,300,500,0,100,2800,5900,300,2600,4900,0,14100,111100,200,200,200,5000,4700,200,18200,500,1500,0,87200]
		let row4 = [200,8500,1000,0,100,9100,35800,52200,0,10000,500,1300,0,100,4300,0,0,41400,9900,2500,10600,600,2800,7800,34900,2500,400,500,5000]
		let row5 = [0,100,0,0,0,200,600,100,0,100,0,0,0,0,0,0,0,700,0,0,0,200,0,2800,0,100,0,0,200]
		let row6 = [14200,152700,63500,5500,100,0,131800,5000,300,1700,14400,26400,300,10500,38900,100,800,1704900,2000,2900,3500,47100,73900,12700,182400,40700,12100,100,737400]
		let row7 = [100,3400,100,31600,400,139200,0,600,100,400,400,1000,100,300,700,0,100,70800,200,300,300,6700,900,206500,10300,33000,200,0,3000]
		let row8 = [11300,5900,400,56700,0,5700,2500,0,200,15700,16600,2300,0,1000,3400,0,0,35600,16900,2000,39700,400,2600,600,30100,1100,7500,1300,6900]
		let row9 = [7900,100,100,0,0,200,100,300,0,600,9400,1700,25700,2900,0,1300,0,3400,200,800,4800,200,100,0,3100,100,7000,3200,200]
		let row10 = [5900,1700,100,10200,0,3000,400,27600,200,0,7800,200,0,400,0,100,0,12600,29300,400,12700,100,200,700,7800,200,2800,1500,500]
		let row11 = [101600,18500,1700,200,0,17400,100,18500,8800,1800,0,55400,10000,62400,100,500,100,108000,200,1100,48100,7000,10900,100,76600,1700,256200,500,13200]
		let row12 = [34000,18700,2500,600,0,20200,600,2400,1500,400,54200,0,3200,24200,800,300,0,97700,1200,13900,22400,6900,9700,100,81600,2100,30800,200,10700]
		let row13 = [17500,100,0,100,0,300,0,100,30100,100,12000,2600,0,3700,0,800,0,4000,0,100,4400,0,100,0,2900,100,25000,200,400]
		let row14 = [35100,13900,900,400,100,13200,300,700,2000,600,51200,26600,4900,0,100,200,0,68300,100,1200,9700,4000,11300,100,48000,1600,31000,100,7600]
		let row15 = [200,14300,4000,2500,0,38700,700,3800,0,0,300,700,0,100,0,0,200,28500,0,400,600,13400,600,100,3100,1400,100,0,64400]
		let row16 = [3700,0,0,0,0,300,0,100,2200,0,800,100,700,100,0,0,0,700,0,200,4100,200,0,0,300,100,400,100,0]
		let row17 = [0,900,11000,0,0,800,0,0,0,0,0,100,0,100,400,0,0,3700,0,0,0,400,100,0,400,100,0,0,1200]
		let row18 = [71000,310300,123400,34200,500,1744100,57200,21800,3100,7600,88000,105800,4400,48700,26200,100,3800,0,8500,13600,19600,532600,466700,14100,1792500,121500,49900,200,670100]
		let row19 = [100,2600,100,11500,100,2600,1300,25100,100,26400,100,300,100,100,0,0,0,9300,0,300,1100,200,500,100,10800,400,400,1000,2500]
		let row20 = [900,1700,0,2200,0,2800,100,900,500,200,1300,10100,100,1400,0,100,0,16800,300,0,32400,100,900,0,20200,200,1100,100,1800]
		let row21 = [25000,1800,300,11200,0,4500,500,33100,4600,3800,39800,15400,5000,7000,500,5400,0,21700,1200,27300,0,400,1100,300,15800,200,26700,4700,2500]
		let row22 = [2700,11400,2700,400,100,48900,6500,100,100,100,3400,4400,100,2000,10000,0,400,506200,100,600,200,0,20100,1600,57100,148300,1300,0,25800]
		let row23 = [4100,27400,7000,2700,0,78400,600,2400,200,300,7000,7000,300,5100,700,100,100,454100,700,900,1500,27800,0,1100,43600,2200,4600,0,32200]
		let row24 = [0,1900,200,13400,2600,18700,203000,700,0,600,0,400,0,100,300,0,0,15600,400,100,400,900,1100,0,9700,8000,0,0,1200]
		let row25 = [49500,69400,9800,54200,0,173400,23500,31300,1700,10600,78400,98700,4700,44000,5500,600,100,1723100,16800,25200,17100,55900,44100,8400,0,76800,36400,400,80200]
		let row26 = [900,2200,600,1000,0,27400,47900,100,0,100,1700,2100,0,1100,2000,0,100,120200,0,100,300,144300,2200,10500,81100,0,400,100,4400]
		let row27 = [66800,12700,500,300,0,11800,200,8200,8000,1600,295300,27700,24700,36900,100,300,0,57900,600,600,29200,2700,5900,0,37800,400,0,300,5200]
		let row28 = [100,0,0,300,0,100,0,900,3000,1700,200,200,200,300,0,400,0,500,900,200,3900,0,0,0,300,0,200,0,0]
		let row29 = [10800,253900,115100,5100,300,687600,1800,3300,300,1100,14800,21400,800,7900,56700,200,800,619600,1200,1100,2400,27300,25200,1600,92400,4800,6400,0,0]


		let matrix = row1.concat(row2);
		matrix = matrix.concat(row3);
		matrix = matrix.concat(row4);
		matrix = matrix.concat(row5);
		matrix = matrix.concat(row6);
		matrix = matrix.concat(row7);
		matrix = matrix.concat(row8);
		matrix = matrix.concat(row9);
		matrix = matrix.concat(row10);
		matrix = matrix.concat(row11);
		matrix = matrix.concat(row12);
		matrix = matrix.concat(row13);
		matrix = matrix.concat(row14);
		matrix = matrix.concat(row15);
		matrix = matrix.concat(row16);
		matrix = matrix.concat(row17);
		matrix = matrix.concat(row18);
		matrix = matrix.concat(row19);
		matrix = matrix.concat(row20);
		matrix = matrix.concat(row21);
		matrix = matrix.concat(row22);
		matrix = matrix.concat(row23);
		matrix = matrix.concat(row24);
		matrix = matrix.concat(row25);
		matrix = matrix.concat(row26);
		matrix = matrix.concat(row27);
		matrix = matrix.concat(row28);
		matrix = matrix.concat(row29);

		let oldmatrix = matrix;
		matrix = [];
		while (oldmatrix.length) matrix.push(oldmatrix.splice(0, 29));
		this.matrix = matrix;
		
		this.dims = {
			width: 580,
			height: 580,
			outerRadius: 200,
			innerRadius: 180
		};
			
		this.chordPadding = 0.05;
		this.fontSize = "1.2em";
		
		this.opacity = {
			full: 0.7,
			faded: 0.02
		};
	}
	
	createChord() {
		let that = this;
		
		d3.select("#title-map-chord")
		.append("g")
		.attr("width", this.dims.width)
		.attr("height", this.dims.height)
		.attr("preserveAspectRatio", "xMaxYMin meet")
		.attr("id","chord-diagram")
		.attr("transform", "translate(" + (this.dims.width / 2 + 420) + "," + (this.dims.height / 2 + 50) + ")");
		
		let chart = d3.select("#title-map-chord")
			.select("#chord-diagram")
			.attr("x", 5000);

		let layout = d3.chord()
			.padAngle(this.chordPadding)
			.sortSubgroups(d3.descending)
			.sortChords(d3.descending)
			(this.matrix);

		let arc = d3.arc()
			.innerRadius(this.dims.innerRadius)
			.outerRadius(this.dims.outerRadius);

		let labels = chart.selectAll("label")
			.data(layout.groups)
			.enter()
			.append("g")
			.attr("class","label");

		labels.append("path")
			.attr("class", "arc")
			.style("stroke", d => that.fill(d.index))
			.style("fill", d => that.fill(d.index))
			.attr("d", arc);

		labels.append("text")
			.each(d => d.angle = (d.startAngle + d.endAngle) / 2)
			.attr("font-size", this.fontSize)
			.attr("class", "titles")
			.attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
			.attr("transform", d =>
				"rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
				"translate(" + (that.dims.outerRadius * (1 + this.chordPadding)) + ")" +
				(d.angle > Math.PI ? "rotate(180)" : "")
			)
			.text((d, i) => that.names[i]);
			
		let chords = chart.append("g")
			.attr("id","chords")
			
		let paths = chords.selectAll("path")
			.data(layout)
			.enter()
			.append("path")
			.attr("class", "chord")
			.style("stroke", d => d3.rgb(that.fill(d.source.index)).darker())
			.style("fill", d => that.fill(d.source.index))
			.attr("d", d3.ribbon().radius(this.dims.innerRadius))
			.style("stroke-opacity", this.opacity.full)
			.style("fill-opacity", this.opacity.full);

		console.log(labels);
		labels
			.on("click", this.selector.fade());
    
	}
}

