/**
 * Created by Peter on 14-4-7.
 */

function barChart(){
    var margin = {top: 20, right: 20, bottom: 300, left: 60},
        width = 960 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var xValue = function(d) { return d.instname; }, // data -> value
        xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1), // value -> display
        xMap = function(d) { return xScale(xValue(d)); }, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    var yValue = function(d) { return d.tuition03_tf; }, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d)); }, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(formatPercent);

    var svg = d3.select("#svgtd").append("svg")
        .attr("id", "mainsvg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("data/top50with5categories.csv", type, function(error, data) {


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
            .attr("transform", "translate(0," + 500 + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");


        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", xMap)
            .attr("width", xScale.rangeBand)
            .attr("y", yMap)
            .attr("height", function(d) {
                return height - yMap(d); });

    });

    function type(d) {
        d.tuition03_tf = +d.tuition03_tf;
        return d;
    }
}