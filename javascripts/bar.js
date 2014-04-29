/**
 * Created by Peter on 14-4-7.
 */

var barsort = 0;
var barvar = "tuition03_tf";
var barname = "Tuition";

function barChart() {


    var margin = {top: 20, right: 150, bottom: 300, left: 100},
        width = 960 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var xValue = function (d) {
            return d.instname;
        }, // data -> value
        xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1), // value -> display
        xMap = function (d) {
            return xScale(xValue(d));
        }, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    var yValue = function (d) {
            return d[barvar];
        }, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function (d) {
            return yScale(yValue(d));
        }, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(getAxisFormat(barvar));

    var svg = d3.select("#svgtd").append("svg")
        .attr("id", "mainsvg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("data/top50with5categories.csv", type, function (error, data) {

        if (barsort == 1) {
            data.sort(function (a, b) {
                return b[barvar] - a[barvar];
            });
        }
        else if (barsort == 2) {
            console.log("true")
            data.sort(function (a, b) {
                return a[barvar] - b[barvar];
            });
        }
        // ensures data from csv is interpreted as int
        data.forEach(function (d) {
            d.tuition03_tf = +d.tuition03_tf;
            d.tot_rev_w_auxother_sum = +d.tot_rev_w_auxother_sum;
            d.control = +d.control;
            d.total_enrollment = +d.total_enrollment;
            d.all_employees = +d.all_employees;
        });

        xScale.domain(data.map(xValue));
        yScale.domain([0, d3.max(data, yValue)]);

        svg.append("g")
            .attr("class", "barx axis")
            .attr("transform", "translate(0," + 381 + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-145) translate(0, -18)");


        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(function (d) {
                return barname;
            });


        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", function (d) {
//            console.log()
                if (schoolnames.length == 0) {
                    return "bar";
                }
                else {
                    var spcolor = 0;
                    schoolnames.forEach(function (n) {
                        if (d.instname == n) {
                            spcolor = 1;
                        }
                    })
                    if (spcolor == 1) {
                        return "bar";
                    }
                    else {
                        return "transparentBar";
                    }
                }
            })
            .attr("fill", function(d){
                if(d.control == 1)
                    return "#0099CC";
                else
                    return "#FF3300";
            })
            .attr("x", xMap)
            .attr("width", xScale.rangeBand)
            .attr("y", yMap)
            .attr("height", function (d) {
                return height - yMap(d);
            });

    });

    var legend = svg.selectAll("g.legend")
        .data([
            {"Name": "Private", "Color": "#FF3300"},
            {"Name": "Public", "Color": "#0099CC"}
        ])
        .enter().append("svg:g")
        .attr("transform", function(d, i) { return "translate(730," + (i * 20 + 330) + ")"; });

    legend.append("rect")
        .attr("fill", function(d){
            return d.Color;
        })
        .attr("width", 40)
        .attr("height", 10);

    legend.append("svg:text")
        .attr("x", 42)
        .attr("dy", "0.9em")
        .text(function(d) { return d.Name; });

    function type(d) {
        d.tuition03_tf = +d.tuition03_tf;
        return d;
    }
}


function barform() {
    var text = '<form>' +
        '<select id="barSelect" onchange="barChooseCategory()">' +
        '<option value="tuition03_tf">Tuition</option>' +
        '<option value="tot_rev_w_auxother_sum">Total Revenue</option>' +
        '<option value="total_enrollment">Total Enrollment</option>' +
        '<option value="all_employees">Employees</option>' +
        '</select>' +
        '<input type="button" name="button" value="sort" onclick="sortBars()"/>' +
        '<input type="button" name="button" value="reset" onclick="resetBars()"/>' +
        '</form>';
    document.getElementById("selection").innerHTML = text;
}


function barChooseCategory() {
    barvar = document.getElementById("barSelect")
        .options[barSelect.selectedIndex].value;
    barname = document.getElementById("barSelect")
        .options[barSelect.selectedIndex].text;
    d3.select("#mainsvg").remove();
    barChart();
}

function resetBars() {
    barsort = 0;
    d3.select("#mainsvg").remove();
    barChart();
}

function sortBars() {
    if (barsort == 0 || barsort == 2) {
        barsort = 1;
    }
    else {
        barsort = 2;
    }
    d3.select("#mainsvg").remove();
    barChart();
}