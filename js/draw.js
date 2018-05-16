var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) 
  var svgClassName = 'language_graph_m';
else
  var svgClassName = 'language_graph_d';

const python = "#98abc5";
const sql = "#ddd";
const django = "#44B78B";
const react = "#00d8ff";
const HTML = "#e44b23";
const javascript = '#f1e05a';
const node = "#43853d";

var color = d3.scale.ordinal()
    .range([node, django, react, HTML, python, javascript, sql]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg = d3.select("body").append("svg")
    .attr('class', svgClassName)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 0])
  .html(function(d) {
    var length = d.data.population < 1 ? ' months' : " years";
    var time = d.data.time;
    return time + length;
  });

svg.call(tip);    

d3.csv("/js/data.csv", type, function(error, data) {
  if (error) throw error;

  var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);      

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.age); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.age; });
});

function type(d) {
  d.population = +d.population;
  return d;
}
