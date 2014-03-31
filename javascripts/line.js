

var svg;

var data;

var margin = {top: 20, right: 20, bottom: 30, left: 90},
width = 1500 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;



var color = d3.scale.category10();

//add the tooltip area to the webpage
var tooltip = d3.select("#main").append("div")
.attr("class", "tooltip")
.style("opacity", 0);

function createLinesSvg() {
    svg = d3.select("#main").append("svg")
    .attr("id", "mainsvg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function lineform(){
var text = ''
document.getElementById("selection").innerHTML=text;
}
function line(){
    
    createLinesSvg();
    lineform();
d3.csv("data/line.csv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

var x = d3.scale.linear()
        .domain([0,3])
        .range([0,width])


var y1 = d3.scale.linear()
     .domain([0, d3.max(data, function(d) { return d.revenue/10000000; })])
    .range([height, 0]);
    
var y2 = d3.scale.linear()
     .domain([0, d3.max(data, function(d) { return d.tuition/100; })])
    .range([height, 0]);    

var y3 = d3.scale.linear()
     .domain([0, d3.max(data, function(d) { return d.total_enrollment/100; })])
    .range([height, 0]);
    
var y4 = d3.scale.linear()
     .domain([0, d3.max(data, function(d) { return d.all_employees/100; })])
    .range([height, 0]);    

 var y1Axis = d3.svg.axis()
    .scale(y1)
    .orient("left");
    
    var y2Axis = d3.svg.axis()
    .scale(y2)
    .orient("left");
    
    var y3Axis = d3.svg.axis()
    .scale(y3)
    .orient("left");
    
    var y4Axis = d3.svg.axis()
    .scale(y4)
    .orient("left");
 
 
  svg.append("g")
      .attr("class", "y axis")
      .call(y1Axis)
    .append("text")
      .attr("transform", "translate(0," + height + ")")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Revenue");
      
      svg.append("g")
      .attr("class", "y1 axis")
      .call(y2Axis)
      .attr("transform", "translate(200," + 0 + ")")
    .append("text")
      .attr("transform", "translate(0," + height + ")")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Tuition");
      
      svg.append("g")
      .attr("class", "y1 axis")
      .call(y3Axis)
      .attr("transform", "translate(400," + 0 + ")")
    .append("text")
      .attr("transform", "translate(0," + height + ")")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Enrollment");
      
      svg.append("g")
      .attr("class", "y1 axis")
      .call(y4Axis)
      .attr("transform", "translate(600," + 0 + ")")
    .append("text")
      .attr("transform", "translate(0," + height + ")")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Employee");
      
      color.domain(d3.keys(data[0]).filter(function(key) { return key == "instname"; }));
     
      
  var univs = svg.selectAll(".univ")
      .data(data, function(d) { return d.instname; })
      .enter().append("g")
      .attr("class", "univ")
       .on("mouseenter", function(d){ 
       
           
      text = svg.append("text")
                  .attr("class","name")
                  .attr("dy", ".5em")
                  .attr("x",750)
                  .attr("y",100)
                  .text(d.instname)
                  .style("font-size","15px")
                  .attr("font-family","serif")
                  .attr("text-anchor","middle")
                  .attr("font-weight","bold");
      value1 = svg.append("text")
                  .attr("class","revenue")
                  .attr("dy", ".5em")
                  .attr("x",750)
                  .attr("y",140)
                  .text("Revenue :$"+d.revenue)
                  .style("font-size","15px")
                  .attr("font-family","serif")
                  .attr("text-anchor","middle")
                  .attr("font-weight","bold");
    value2 = svg.append("text")
                  .attr("class","tuition")
                  .attr("dy", ".5em")
                  .attr("x",750)
                  .attr("y",180)
                  .text("Tuition :$"+d.tuition)
                  .style("font-size","15px")
                  .attr("font-family","serif")
                  .attr("text-anchor","middle")
                  .attr("font-weight","bold");
    value3 = svg.append("text")
                  .attr("class","enrollment")
                  .attr("dy", ".5em")
                  .attr("x",750)
                  .attr("y",220)
                  .text("Enrollment :"+d.total_enrollment)
                  .style("font-size","15px")
                  .attr("font-family","serif")
                  .attr("text-anchor","middle")
                  .attr("font-weight","bold"); 
    value4 = svg.append("text")
                  .attr("class","employees")
                  .attr("dy", ".5em")
                  .attr("x",750)
                  .attr("y",260)
                  .text("Employees :"+d.all_employees)
                  .style("font-size","15px")
                  .attr("font-family","serif")
                  .attr("text-anchor","middle")
                  .attr("font-weight","bold");  
          
          
       circle1 = svg.append("circle")  
      .attr("class", "c1")        
      .attr("cx",0)
      .attr("cy",y1(+d.revenue/10000000)) 
      .attr("fill", "black")
      .attr("r", 4);  
      
       circle2 = svg.append("circle")  
      .attr("class", "c1")        
      .attr("cx",200)
      .attr("cy",y2(+d.tuition/100)) 
      .attr("fill", "black")
      .attr("r", 4); 
      
       circle3 = svg.append("circle")  
      .attr("class", "c1")        
      .attr("cx",400)
      .attr("cy",y3(+d.total_enrollment/100)) 
      .attr("fill", "black")
      .attr("r", 4); 
      
       circle4 = svg.append("circle")  
      .attr("class", "c1")        
      .attr("cx",600)
      .attr("cy",y4(d.all_employees/100)) 
      .attr("fill", "black")
      .attr("r", 4);   
                
          
    })
      
      .on("mouseout",function(){    
          text.remove()
          value1.remove()
          value2.remove()
          value3.remove()
          value4.remove()
          circle1.remove()
          circle2.remove()
          circle3.remove()
          circle4.remove()
        ;});
      
       
       univs.append("line")
      .attr("class", "line1")
      .attr("x1",0)
      .attr("y1",(data,function (d) { return y1(d.revenue/10000000);}))
      .attr("x2",200)
      .attr("y2",(data,function (d) { return y2(d.tuition/100);}))
      
            
      .style("stroke", (data,function(d) { return color(d.instname); })); 
      
      univs.append("line")
      .attr("class", "line2")
      .attr("x1",200)
      .attr("y1",(data,function (d) { return y2(d.tuition/100);}))
      .attr("x2",400)
      .attr("y2",(data,function (d) { return y3(d.total_enrollment/100);}))
      
      .style("stroke", (data,function(d) { return color(d.instname); }));
      
      univs.append("line")
      .attr("class", "line3")
      .attr("x1",400)
      .attr("y1",(data,function (d) { return y3(d.total_enrollment/100);}))
      .attr("x2",600)
      .attr("y2",(data,function (d) { return y4(d.all_employees/100);}))
       
      .style("stroke", (data,function(d) { return color(d.instname); }));


});
    
}
