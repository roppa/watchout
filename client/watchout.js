var radius = 20;

var gameSettings = {
  width: 600,
  height: 400,
  enemies: 20
};

var drag = d3.behavior.drag()
    .on("drag", dragmove);

var asteroids = d3.range(gameSettings.enemies).map(function (item) {
  return { id: item };
});

var board = d3.select("body").append("svg")
                  .attr("width" , gameSettings.width)
                  .attr("height" , gameSettings.height)
                  .attr("class" , "board");

var player = board.append("circle")
                  .attr("r", 10)
                  .attr("cx", 10)
                  .attr("cy", 10)
                  .call(drag);

var enemies = board
                  .selectAll("image")
                  .data(asteroids, function (d) { return d.id; })
                  .enter()
                  .append("image")
                  .attr("xlink:href", "asteroid.png")
                  .attr("class", "asteroid")
                  .attr("height", 30)
                  .attr("width", 30)
                  .attr("x", function (d) { return Math.random() * gameSettings.width - radius })
                  .attr("y", function (d) { return Math.random() * gameSettings.height - radius })

function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}

setInterval(function () {
  board.selectAll("image")
        .transition().duration(1000)
        .attr("x", function (d) { return Math.random() * gameSettings.width - radius; })
        .attr("y", function (d) { return Math.random() * gameSettings.height - radius; })
}, 1000);

setInterval(function () {
  console.log(d3.selectAll('image').attr("x"));
}, 100)