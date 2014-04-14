/**
 * Created by Peter on 14-3-16.
 */


var svg;

var data;

var margin = {top: 20, right: 20, bottom: 30, left: 90},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var xvar = "tuition03_tf",
    yvar = "tot_rev_w_auxother_sum",
    xname = "total_enrollment",
    yname = "all_employees";

// setting up x
var xValue = function (d) {
        return d[xvar];
    },
    xScale = d3.scale.linear().range([0, width]),
    xMap = function (d) {
        return xScale(xValue(d));
    },
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setting up y
var yValue = function (d) {
        return d[yvar];
    },
    yScale = d3.scale.linear().range([height, 0]),
    yMap = function (d) {
        return yScale(yValue(d));
    },
    yAxis = d3.svg.axis().scale(yScale).orient("left");

function scatterplot(){
    margin = {top: 20, right: 20, bottom: 30, left: 90},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


        createSPSvg();
        spform();

}

function createSPSvg() {
    svg = d3.select("#svgtd").append("svg")
        .attr("id", "mainsvg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function updateChart(data)
{
    xValue = function(d) {return d[xvar];},
        yValue = function(d) {return d[yvar];},

        // setting up the domain for the x and y-axis
        xScale.domain([0, d3.max(data, xValue) + 1]);
    yScale.domain([0, d3.max(data, yValue) + 1]);

    // creating the x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text(xname);

    // creating the y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(yname);

    // plotting the points on to the graph
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .attr("fill", "black")
        .on("mouseover", function(d) {
            var xPosition = parseFloat(d3.select(this).attr("cx"));
            var yPosition = parseFloat(d3.select(this).attr("cy"));

            svg.append("line").attr("id", "vline")
                .attr("x1", xPosition).attr("y1", yPosition+4)
                .attr("x2", xPosition).attr("y2", "450")
                .attr("style", "stroke:gray");

            svg.append("line").attr("id", "hline")
                .attr("x1", "0").attr("y1", yPosition)
                .attr("x2", xPosition-4).attr("y2", yPosition)
                .attr("style", "stroke:gray");
            svg.append("text")
                .attr("id", "mouseinfotext")
                .attr("x", function(){
                    if (xPosition > 300){
                        return 100;
                    }
                    else{
                        return 400;
                    }
                })
                .attr("y", "50")
                .text(d.instname)
                .attr("font-size", "12px");


            var text = document.getElementById("mouseinfotext");
            var width = text.clientWidth;
            var height = text.clientHeight;

            svg.append("rect")
                .attr("id", "mouserect")
                .attr("x", function(){
                    if (xPosition > 300){
                        return 95;
                    }
                    else{
                        return 395;
                    }
                })
                .attr("y", "35")
                .attr("width", width+10)
                .attr("height", height+10)
                .attr("fill", "rgb(220,220,220)")

            d3.select("#mouseinfotext").remove();

            svg.append("text")
                .attr("id", "mouseinfotext")
                .attr("x", function(){
                    if (xPosition > 300){
                        return 100;
                    }
                    else{
                        return 400;
                    }
                })
                .attr("y", "50")
                .text(d.instname)
                .attr("font-size", "12px");


        })
        .on("mouseout", function(d) {
            d3.select("#hline").remove();
            d3.select("#vline").remove();
            d3.select("#mouseinfo").remove();
            d3.select("#mouseinfotext").remove();
            d3.select("#mouserect").remove();
        });
    transformChart(data);
};

function transformChart(data){

    xValue = function(d) {return d[xvar];},
        yValue = function(d) {return d[yvar];},

        // setting up the domain for the x and y-axis
        xScale.domain([0, d3.max(data, xValue) + 1]);
    yScale.domain([0, d3.max(data, yValue) + 1]);

    // creating the x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text(xname);

    // creating the y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(yname);

    // plotting the points on to the graph
    svg.selectAll("circle")
        .data(data)
        .transition()
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .attr("fill", function(d){
            var spcolor = 0;
            schoolnames.forEach(function(n){
                if(d.instname == n){
                    spcolor = 1;
                }
            })
            console.log(spcolor);
            if(spcolor == 0){
                return "black";
            }
            else{
                return "red";
            }
        });
}

function chooseCategory()
{
    xvar = document.getElementById("xList")
        .options[xList.selectedIndex].value;
    yvar = document.getElementById("yList")
        .options[yList.selectedIndex].value;
    xname = document.getElementById("xList")
        .options[xList.selectedIndex].text,
        yname = document.getElementById("yList")
            .options[yList.selectedIndex].text;
    svg.selectAll("g")
        .data([])
        .exit()
        .remove();
    svg.selectAll(".dot")
        .data([])
        .exit()
        .remove();
    transformChart(data);
}

function spform(){

    var text = '<form>'+
        <!--Select value for x-axis:-->
        '<select id="xList" onchange="chooseCategory()">'+
            '<option value="tuition03_tf" selected>Tuition</option>'+
            '<option value="tot_rev_w_auxother_sum">Total Revenue</option>'+
    //'<option value="control">Control</option>'+
    '<option value="total_enrollment">Total Enrollment</option>'+
    '<option value="all_employees">Employees</option>'+
    '</select>'+
    <!--Select value for y-axis:-->
        '<select id="yList" onchange="chooseCategory()">'+
    '<option value="tuition03_tf">Tuition</option>'+
    '<option value="tot_rev_w_auxother_sum" selected>Total Revenue</option>'+
    //'<option value="control">Control</option>'+
    '<option value="total_enrollment">Total Enrollment</option>'+
    '<option value="all_employees">Employees</option>'+
    '</select>'+
    '</form>';
    document.getElementById("selection").innerHTML=text;
}