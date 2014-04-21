var width = 1400,
height = 500;

var projection = d3.geo.albersUsa()
.scale(1000)
.translate([width / 2, height / 2]);

var path = d3.geo.path()
.projection(projection);

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height);;

var map_color = d3.scale.linear()
.domain([0,0.01, 0.02])
.range(["yellow","orange", "red"]);

var map_color_rev = d3.scale.linear()
.domain([0,0.65, 0.8])
.range(["yellow","orange", "red"]);

var opt = 0;

var data = d3.range(10);

Drawmap();

function Drawmap(){
    
    d3.csv("data/mapgps_new.csv", function(error, data) {
           
           data.forEach(function(d) {
                        d.all_employees = +d.all_employees;
                        d.revenue = +d.revenue;
                        d.LONGITUD = +d.LONGITUD;
                        d.LATITUDE = +d.LATITUDE;
                        });
           
           if(opt == 0){
           var total_value = d3.mean(data, function(n) { return n.revenue;});
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
                          
                          var local_value = 0.0;
                          var count = 0;
                          data.forEach(function(m){
                                       
                                       if(m.state == d.properties.name) {
                                       
                                       if(opt==0){
                                       local_value = local_value + m.revenue;
                                       count++;
                                       }else if(opt==1){
                                       local_value = local_value + m.all_employees;
                                       }
                                       }
                                       
                                       });
                          
                          if(local_value == 0) {
                          
                          return map_color(0);
                          
                          } else {
                          //98,251,152
                          if(opt==0){
                          var num = (local_value/count)/total_value;
                          return map_color_rev(num);
                          } else {
                          var num = (local_value)/total_value;
                          }
                          return map_color(num);
                          }
                          });
                   
                   
                   svg.selectAll(".circle")
                   .data(data)
                   .enter()
                   .append("circle")
                   .attr("r",2)
                   .attr("fill", "black")
                   .attr("transform", function(d) {return "translate(" + projection([d.LONGITUD,d.LATITUDE]) + ")";});
                   
                   
                   d3.selectAll("input")
                   .on("change", change);
                   
                   
                   function change() {
                   var value = this.value;
                   if(value == "revenue"){ opt = 0;}
                   if(value == "all_employees"){ opt = 1;}
                   
                   Drawmap();
                   }
                   
                   });  //json
           }); //csv
}




var gradient = svg.append("linearGradient")
.attr("y1", 10)
.attr("y2", 150)
.attr("x1", "0")
.attr("x2", "0")
.attr("id", "gradient")
.attr("gradientUnits", "userSpaceOnUse");

gradient.append("stop")
.attr("offset", "0")
.attr("stop-color", "red");

gradient.append("stop")
.attr("offset", "0.8")
.attr("stop-color", "yellow");

svg.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr("x", 180)
.attr("y", 10)
.attr("width", 20)
.attr("height", 120)
.attr("fill", "url(#gradient)");

svg.append("text")
.attr("class","bar")
.attr("dy", ".5em")
.attr("x",220)
.attr("y",10)
.text("High")
.attr("font-family","serif")
.attr("text-anchor","middle")
.attr("font-weight","bold");

svg.append("text")
.attr("class","bar")
.attr("dy", ".5em")
.attr("x",220)
.attr("y",130)
.text("Low")
.attr("font-family","serif")
.attr("text-anchor","middle")
.attr("font-weight","bold");


d3.select(self.frameElement).style("height", height + "px");