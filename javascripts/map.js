<<<<<<< HEAD
=======

>>>>>>> FETCH_HEAD
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

var color = d3.scale.linear()
.domain([0,0.01, 0.03])
.range(["yellow","orange", "red"]);

var opt = 0;

Drawmap();

function Drawmap(){
    
    
    
    d3.csv("map.csv", function(error, data) {
           
           data.forEach(function(d) {
                        d.all_employees = +d.all_employees;
                        d.revenue = +d.revenue;
                        });
           
           
           if(opt == 0){
           var total_value = d3.sum(data, function(n) { return n.revenue; });
           } else if (opt == 1) {
           var total_value = d3.sum(data, function(n) { return n.all_employees; });
           }
           d3.json("us.json", function(error, topology) {
                   
                   svg.selectAll("path")
                   .data(topojson.feature(topology, topology.objects.subunit).features)
                   .enter().append("path")
                   .attr("class","states")
                   .attr("d", path);
                   
                   svg.selectAll(".states")
                   .data(topojson.feature(topology, topology.objects.subunit).features)
                   .style("fill",function(d){
                          
                          
                          var local_value = 0.0;
                          data.forEach(function(m){
                                       
                                       if(m.state == d.properties.name) {
                                       
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
};



d3.select(self.frameElement).style("height", height + "px");
