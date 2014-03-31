
var margin = {top: 20, right: 20, bottom: 30, left: 90},
    width = 1400 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg;

var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var color = d3.scale.linear()
.domain([0, 0.5])
.range(["grey", "green"]);

var opt = 0;

//0 revenue
//1 all employees

//add the tooltip area to the webpage

var tooltip = d3.select("#main").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function mapform(){
    var text = '<form>' +
        '<label><input id="pieselection" type="radio" name="dataset" value="revenue" checked> Revenue</label>' +
        '<label><input id="pieselection" type="radio" name="dataset" value="all_employees"> All Employees</label>' +
        '</form>'
    document.getElementById("selection").innerHTML=text;
}



function createMapSvg() {
     svg = d3.select("#main").append("svg")
    .attr("id", "mainsvg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

}



function Drawmap(){
    
    mapform();
    createMapSvg();
    
    d3.csv("data/map.csv", function(error, data) {
           
           if(opt == 0){
           var total_value = d3.sum(data, function(n) { return n.revenue; });
           } else if (opt == 1) {
           var total_value = d3.sum(data, function(n) { return n.all_employees; });
           }
           d3.json("json/us.json", function(error, topology) {
                   
                   svg.selectAll("path")
                   .data(topojson.feature(topology, topology.objects.subunit).features)
                   .enter().append("path")
                   .attr("class","states")
                   .attr("d", path);
                   
                   svg.selectAll(".states")
                   .data(topojson.feature(topology, topology.objects.subunit).features)
                   .style("fill",function(d){
                          
                          
                          var local_value = 0;
                          data.forEach(function(m){
                                       
                                       if(d.properties.name == m.state) {
                                       
                                       if(opt==0){
                                       local_value = local_value + m.revenue;
                                       }else if(opt==1){
                                       local_value = local_value + m.all_employees;
                                       }
                                       }
                                       
                                       });
                          
                          if(local_value == 0) {
                          
                          return color(0);
                          
                          } else {
                          //98,251,152
                          var num = local_value/total_value;
                          return color(num);
                          }
                          })
                   .on("mouseenter", function(d){
                       
                       data.forEach(function(m,i){
                                    
                                    if(d.properties.name == m.state){
                                    
                                    text = svg.append("text")
                                    .attr("class","name")
                                    .attr("dy", ".5em")
                                    .attr("x",1250)
                                    .attr("y",100+i*30)
                                    .text(m.instname)
                                    .style("font-size","15px")
                                    .attr("font-family","serif")
                                    .attr("text-anchor","middle")
                                    .attr("font-weight","bold");
                                    }     
                                    
                                    });
                       })
                   .on("mouseout",function(){ 
                       
                       svg.selectAll(".name").remove();
                       });
                   
                   d3.selectAll("input")
                   .on("change", change); 
                   
                   function change() {
                   var value = this.value;
                   if(value == "revenue"){ opt = 0;}
                   if(value == "all_employees"){ opt = 1;}
                   Drawmap(); 
                   };
                });  //json
           }); //csv
}

d3.select(self.frameElement).style("height", height + "px");
