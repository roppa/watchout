var radius = 20;

var gameSettings = {
  width: 600,
  height: 400,
  enemies: 20,
  score: 0,
  highScore: 0,
  collisions: 0
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
                  .attr("collided", "0")
                  .attr("x", function (d) { return Math.random() * gameSettings.width - radius })
                  .attr("y", function (d) { return Math.random() * gameSettings.height - radius });



function dragmove(d) {
  d3.select(this)
      .attr("cx", d.x = Math.max(radius, Math.min(gameSettings.width - radius, d3.event.x)))
      .attr("cy", d.y = Math.max(radius, Math.min(gameSettings.height - radius, d3.event.y)));
}

function checkCollisions (enemyX, enemyY) {
  // x distance player x - enemy x
  var xDistance = player.attr("cx") - enemyX;
  // y distance gets play y - enemy y
  var yDistance = player.attr("cy") - enemyY;
  // distance gets the square root of x^2 + y^2
  var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  // if distance > 2 * radius
  return distance < 2 * radius;
}

var colideOnce = function () {
  var asteroid = d3.select(this);
  return function () {
  var collided = checkCollisions(asteroid.attr('x'), asteroid.attr('y'));
    if (collided) {
      gameSettings.score = 0;
      score();
      if (asteroid.attr('collided') === "0") {
        asteroid.attr('collided', "1");
        gameSettings.collisions++;
        collision();
      }
    } else {
      asteroid.attr('collided', "0");
    }
  }
}

var collision = function() {
  d3.selectAll('.collisions')
    .select('span')
    .text(gameSettings.collisions);
}

var score = function () {
  d3.select(".current span").text(gameSettings.score);
  
  if (gameSettings.score > gameSettings.highScore) {
    gameSettings.highScore = gameSettings.score;
    d3.select(".high span").text(gameSettings.highScore);
  }
}


setInterval(function () {
  board.selectAll("image")
        .transition().duration(1000)
        .tween(null, colideOnce)
        .attr("x", function (d) { return Math.random() * gameSettings.width - radius; })
        .attr("y", function (d) { return Math.random() * gameSettings.height - radius; });
  gameSettings.score++
  score();
  
}, 1000);
  