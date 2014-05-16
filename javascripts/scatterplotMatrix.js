/**
 * Created by Peter on 14-3-24.
 */



function createSPM(){

    var svg;

    var width = 960,
        size = 150,
        padding = 19.5;

    var x = d3.scale.linear()
        .range([padding / 2, size - padding / 2]);

    var y = d3.scale.linear()
        .range([size - padding / 2, padding / 2]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom").tickFormat(d3.format("s"))
        .ticks(5);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left").tickFormat(d3.format("s"))
        .ticks(5);

    var color = d3.scale.category10();

    var text = ''
    document.getElementById("selection").innerHTML=text;

    d3.csv("data/top50with5categories.csv", function(data) {

        // Size parameters.
        var size = 140,
            padding = 10,
            n = 4,
            traits = d3.keys(data[0]).filter(function(d) { return ( d !== "control" && d !== "instname"); })

        // Position scales.
        var x = {}, y = {};
        traits.forEach(function(trait) {
            // Coerce values to numbers.
            data.forEach(function(d) { d[trait] = +d[trait]; });

            var value = function(d) { return d[trait]; },
                domain = [d3.min(data, value), d3.max(data, value)],
                range = [padding / 2, size - padding / 2];
            x[trait] = d3.scale.linear().domain(domain).range(range);
            y[trait] = d3.scale.linear().domain(domain).range(range.reverse());
        });

        // Axes.
        var axis = d3.svg.axis()
            .ticks(5)
            .tickSize(size * n);


        // Root panel.
        var svg = d3.select("#svgtd").append("svg:svg")
            .attr("id", "mainsvg")
            .attr("width", 1000)
            .attr("height", 600)
            .append("svg:g")
            .attr("transform", "translate(9.5,9.5)");


        // X-axis.
        svg.selectAll("g.x.axis")
            .data(traits)
            .enter().append("svg:g")
            .attr("class", "x smpaxis")
            .attr("transform", function(d, i) { return "translate(" + i * size + ",0)"; })
            .each(function(d) { d3.select(this).call(axis.scale(x[d]).orient("bottom").tickFormat(d3.format("s"))); });

        // Y-axis.
        svg.selectAll("g.y.axis")
            .data(traits)
            .enter().append("svg:g")
            .attr("class", "y smpaxis")
            .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
            .each(function(d) { d3.select(this).call(axis.scale(y[d]).orient("right").tickFormat(d3.format("s"))); });

        // Cell and plot.
        var cell = svg.selectAll("g.cell")
            .data(cross(traits, traits))
            .enter().append("svg:g")
            .attr("class", "cell")
            .attr("transform", function(d) { return "translate(" + d.i * size + "," + d.j * size + ")"; })
            .each(plot);

        // Titles for the diagonal.
        cell.filter(function(d) { return d.i == d.j; }).append("svg:text")
            .attr("x", padding)
            .attr("y", padding)
            .attr("dy", ".71em")
            .text(function(d) {
                return getLabelText(d.x); });

        function plot(p) {
            var cell = d3.select(this);

            // Plot frame.
            cell.append("rect")
                .attr("class", "frame")
                .attr("x", padding / 2)
                .attr("y", padding / 2)
                .attr("width", size - padding)
                .attr("height", size - padding);

            // Plot dots.
            cell.selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("class",function(d){
//            console.log()
                    if (schoolnames.length == 0){
                        return "circle";
                    }
                    else{
                        var spcolor = 0;
                        schoolnames.forEach(function(n){
                            if(d.instname == n){
                                spcolor = 1;
                            }
                        })
                        if(spcolor == 1){
                            return "circle";
                        }
                        else{
                            return "transparent";
                        }
                    }
                })
                .attr("fill", function(d){
                    if(d.control == 1)
                        return "#0099CC";
                    else
                        return "#FF3300";
                })
                .attr("cx", function(d) { return x[p.x](d[p.x]); })
                .attr("cy", function(d) {
                    if(y[p.y](d[p.y]) < 1){
                        return y[p.y](d[p.y]) + 1;
                    }
                    else {
                        return y[p.y](d[p.y]);
                    }
                })
                .attr("r", 3);

        }

        function cross(a, b) {
            var c = [], n = a.length, m = b.length, i, j;
            for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
            return c;
        }

        var legend = svg.selectAll("g.legend")
            .data([
                {"Name": "Private", "Color": "#FF3300"},
                {"Name": "Public", "Color": "#0099CC"}
            ])
            .enter().append("svg:g")
            .attr("transform", function(d, i) { return "translate(650," + (i * 20 + 450) + ")"; });

        legend.append("svg:circle")
            .attr("fill", function(d){
                return d.Color;
            })
            .attr("r", 3);

        legend.append("svg:text")
            .attr("x", 12)
            .attr("dy", ".31em")
            .text(function(d) { return d.Name; });
    });
}


