var radius = 20;

var gameSettings = {
  width: 600,
  height: 400,
  enemies: 2
};

// var drag = d3.behavior.drag()
//     .on("drag", dragmove);

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("drag", dragmove);

var asteroids = d3.range(gameSettings.enemies).map(function (item) {
  return { id: item };
});

var board = d3.select("body").selectAll("svg")
                  .data([{x: gameSettings.width / 2, y: gameSettings.height / 2}])
                  .enter()
                  .append("svg")
                  .attr("width" , gameSettings.width)
                  .attr("height" , gameSettings.height)
                  .attr("class" , "board");

var player = board.append("circle")
                  .attr("r", 10)
                  .attr("cx", function(d) { return d.x; })
                  .attr("cy", function(d) { return d.y; })
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
                  .attr("y", function (d) { return Math.random() * gameSettings.height - radius });


function dragmove(d) {
  d3.select(this)
      .attr("cx", d.x = Math.max(radius, Math.min(gameSettings.width - radius, d3.event.x)))
      .attr("cy", d.y = Math.max(radius, Math.min(gameSettings.height - radius, d3.event.y)));
}

function checkCollisions (x, y) {
  // var currentPlayerPosition = player.attr("x")
  console.log("Player:", player.attr("cx"), player.attr("cy"));
  console.log("Enemy:", x, y);
}

setInterval(function () {
  board.selectAll("image")
        .transition().duration(1000)
        .tween(null, function(){
          var asteroid = d3.select(this);
          return function () {
            checkCollisions(asteroid.attr('x'), asteroid.attr('y'));
          }
        })
        .attr("x", function (d) { return Math.random() * gameSettings.width - radius; })
        .attr("y", function (d) { return Math.random() * gameSettings.height - radius; })
}, 1000);
