var svg;

var data;

var margin = {top: 20, right: 20, bottom: 30, left: 90},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var radius = Math.min(width, height) / 3;


var pie = d3.layout.pie()
    .value(function (d) {
        return d.revenue;
    })
    .sort(null);

var arc = d3.svg.arc()
    .outerRadius(radius - 20);

//0:revenue
//1:tuition
//2:total enrollment
//3:all employees

var opt = 0;

var pie_color = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"];

//add the tooltip area to the webpage
var tooltip = d3.select("#main").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);



function pieform(){
    var text = '<form>' +
        '<label><input id="pieselection" type="radio" name="dataset" value="revenue" checked> Revenue</label>' +
        '<label><input id="pieselection" type="radio" name="dataset" value="tuition"> Tuition</label>' +
        '<label><input id="pieselection" type="radio" name="dataset" value="total_enrollment"> Total Enrollment</label>' +
        '<label><input id="pieselection" type="radio" name="dataset" value="all_employees"> All Employees</label>' +
        '</form>'
    document.getElementById("selection").innerHTML=text;
}



function createPieSvg() {
    svg = d3.select("#svgtd").append("svg")
        .attr("id", "mainsvg")
        .attr("width", 800)
        .attr("height", 500)
        .append("g")
        .attr("transform", "translate(" + 800 / 2 + "," + 500 / 2 + ")");
}

function piechart(){


    pieform();
    createPieSvg();
    d3.csv("data/map.csv", type, function(error, data) {
    var csvdata = [];
       
           if(schoolnames.length > 9) {
           
           schoolnames.pop(schoolnames[10])
           }
    
    schoolnames.forEach(function(m){
                        
                        data.forEach(function(d){
                                     
                                     if(d.instname == m){
                                     
                                     csvdata.push({instname:d.instname,tuition:d.tuition,revenue:d.revenue,control:d.control,
                                                  total_enrollment:d.total_enrollment,all_employees:d.all_employees})
                                     }
                                     
                                })
                        
                        
                        });
           svg.selectAll(".title").remove();
 
           if (schoolnames[0] == null){
           
            text = svg.append("text")
           .attr("class","title")
           .style("text-anchor", "middle")
           .text("Please enter an university.")
           .style("font-size","30px")
           .attr("font-family","serif")
           .attr("x",weight/2)
           .attr("y",height/2)
           .attr("font-weight","bold");
           
           }
           
           
        var group1 = svg.append("g").classed("group1", true)

        var blocks = group1.selectAll("g").data(schoolnames)
            .enter()
            .append("g")
            .attr("transform", function(d,i){
                  
                  
                    return get_location(d,i)
                  
           });

        var rects = blocks.append("rect")
            .attr({
                "x": 120,
                "y": 0,
                "width": 30,
                "height": 30,
                "rx": 5,
                "ry": 5
            })
           .style("fill", function(d,i){return pie_color[i];})

        var text_content = blocks.append("text").data(schoolnames)
            .attr({x:153, y:14})
            .style({
                "fill": "#232323",
                "stroke-width": 0 + "px",
                "font-size": 0.8 + "em",
                "text-anchor": "right",
                "alignment-baseline": "middle",
                "font-family": "sans-serif"
            })
            .text(function(d,i){return d})

        var path = svg.datum(csvdata).selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("fill", function(d, i) { return pie_color[i];})
            .attr("d", arc)
            .each(function(d) { this._current = d; }) // store the initial angles
            .on("mouseenter", function(d){

                text = svg.append("text")
                    .attr("class","detail")
                    .attr("transform", arc.centroid(d))
                    .attr("dy", ".5em")
                    .style("text-anchor", "middle")
                    .text(d.data.instname)
                    .style("font-size","15px")
                    .attr("font-family","serif")
                    .attr("y",height/2-80)
                    .attr("font-weight","bold");

                if(opt==0){
                    value = svg.append("text")
                        .attr("class","detail")
                        .attr("transform", arc.centroid(d))
                        .attr("dy", ".5em")
                        .style("text-anchor", "middle")
                        .attr("y",height/2-400)
                        .text("$ "+d.data.revenue)
                        .style("font-size","15px")
                        .attr("font-family","serif")
                        .attr("font-weight","bold");
                
                per = svg.append("text")
                .attr("class","detail")
                .attr("transform", arc.centroid(d))
                .attr("dy", ".5em")
                .style("text-anchor", "middle")
                .attr("y",height/2-380)
                .text(d3.round(100*(d.data.revenue/d3.sum(csvdata, function(d) { return d.revenue; })))+"%")
                .style("font-size","15px")
                .attr("font-family","serif")
                .attr("text-anchor","middle")
                .attr("font-weight","bold");
                
                
                }
                if(opt==1){
                    value = svg.append("text")
                        .attr("class","detail")
                        .attr("transform", arc.centroid(d))
                        .attr("dy", ".5em")
                        .style("text-anchor", "middle")
                        .attr("y",height/2-400)
                        .text("$ "+d.data.tuition)
                        .style("font-size","15px")
                        .attr("font-family","serif")
                        .attr("font-weight","bold");
                
                per = svg.append("text")
                .attr("class","detail")
                .attr("transform", arc.centroid(d))
                .attr("dy", ".5em")
                .style("text-anchor", "middle")
                .attr("y",height/2-380)
                .text(d3.round(100*(d.data.tuition/d3.sum(csvdata, function(d) { return d.tuition; })))+"%")
                .style("font-size","15px")
                .attr("font-family","serif")
                .attr("text-anchor","middle")
                .attr("font-weight","bold");

                }
                if(opt==2){

                    value = svg.append("text")
                        .attr("class","detail")
                        .attr("transform", arc.centroid(d))
                        .attr("dy", ".5em")
                        .style("text-anchor", "middle")
                        .attr("y",height/2-400)
                        .text(d.data.total_enrollment)
                        .style("font-size","15px")
                        .attr("font-family","serif")
                        .attr("font-weight","bold");
                
                per = svg.append("text")
                .attr("class","detail")
                .attr("transform", arc.centroid(d))
                .attr("dy", ".5em")
                .style("text-anchor", "middle")
                .attr("y",height/2-380)
                .text(d3.round(100*(d.data.total_enrollment/d3.sum(csvdata, function(d) { return d.total_enrollment; })))+"%")
                .style("font-size","15px")
                .attr("font-family","serif")
                .attr("text-anchor","middle")
                .attr("font-weight","bold");
                
                
                }
                if(opt==3){

                    value = svg.append("text")
                        .attr("class","detail")
                        .attr("transform", arc.centroid(d))
                        .attr("dy", ".5em")
                        .style("text-anchor", "middle")
                        .attr("y",height/2-400)
                        .text(d.data.all_employees)
                        .style("font-size","15px")
                        .attr("font-family","serif")
                        .attr("text-anchor","middle")
                        .attr("font-weight","bold");
                
                
                per = svg.append("text")
                .attr("class","detail")
                .attr("transform", arc.centroid(d))
                .attr("dy", ".5em")
                .style("text-anchor", "middle")
                .attr("y",height/2-380)
                .text(d3.round(100*(d.data.all_employees/d3.sum(csvdata, function(d) { return d.all_employees; })))+"%")
                .style("font-size","15px")
                .attr("font-family","serif")
                .attr("text-anchor","middle")
                .attr("font-weight","bold");
                
                
                }


            })
            .on("mouseout",function(d){
                svg.selectAll(".detail").remove()
                text.remove();
                value.remove();
                per.remove();
            });


        path.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function(d) { return d.data.instname; });



        d3.selectAll("#pieselection")
            .on("change", change);

        function change() {
            var value = this.value;
            if(value == "revenue"){ opt = 0}
            if(value == "tuition"){ opt = 1}
            if(value == "total_enrollment"){ opt = 2}
            if(value == "all_employees"){ opt = 3}

            pie.value(function(d) { return d[value]; }); // change the value function
            path = path.data(pie); // compute the new angles
            path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
        }
    });
}



function type(d) {
    d.revenue = +d.revenue;
    d.tuition = +d.tuition;
    d.total_enrollment = +d.total_enrollment
    d.all_employees = +d.all_employees
    return d;
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}


function get_location(d,i){
    var x = -500;
    var y = -200 + (48 * i);
    return "translate(" + [x, y] + ")";
}