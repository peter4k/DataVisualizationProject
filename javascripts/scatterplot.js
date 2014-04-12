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
    xname = "Tuition",
    yname = "Total Revenue";

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

    console.log(width);
    // load data from file

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
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", "black")
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9)
                .style("color", "black");
            tooltip.html(d["instname"] + "<br/> Tuition: $" + d["tuition03_tf"]
                    + "<br/> Revenue: $" + d["tot_rev_w_auxother_sum"]
                    + "<br/> Control: " + d["control"]
                    + "<br/> Total Enrollment: " + d["total_enrollment"]
                    + "<br/> Total Employees: " + d["all_employees"])
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

};

function updatedSelected(){

    svg.selectAll(".dot")
        .data(selecteddata)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", "red")
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9)
                .style("color", "black");
            tooltip.html(d["instname"] + "<br/> Tuition: $" + d["tuition03_tf"]
                + "<br/> Revenue: $" + d["tot_rev_w_auxother_sum"]
                + "<br/> Control: " + d["control"]
                + "<br/> Total Enrollment: " + d["total_enrollment"]
                + "<br/> Total Employees: " + d["all_employees"])
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
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
    updateChart(data);
}

function spform(){

    var text = '<form>'+
        <!--Select value for x-axis:-->
        '<select id="xList" onchange="chooseCategory()">'+
            '<option value="tuition03_tf">Tuition</option>'+
            '<option value="tot_rev_w_auxother_sum">Total Revenue</option>'+
    //'<option value="control">Control</option>'+
    '<option value="total_enrollment">Total Enrollment</option>'+
    '<option value="all_employees">Employees</option>'+
    '</select>'+
    <!--Select value for y-axis:-->
        '<select id="yList" onchange="chooseCategory()">'+
    '<option value="tuition03_tf">Tuition</option>'+
    '<option value="tot_rev_w_auxother_sum">Total Revenue</option>'+
    //'<option value="control">Control</option>'+
    '<option value="total_enrollment">Total Enrollment</option>'+
    '<option value="all_employees">Employees</option>'+
    '</select>'+
    '</form>';
    document.getElementById("selection").innerHTML=text;
}