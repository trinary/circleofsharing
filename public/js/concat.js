/* global window: false */
/* global document: false */
/* global requestAnimationFrame: false */
/* jshint -W015 */
/* jshint camelcase: false */

(function () {
  'use strict';
  // connect to our socket server
  var socket = io.connect('http://127.0.0.1:7008/'),
      width = window.innerWidth,
      height = window.innerHeight,
      colors = d3.scale.linear().domain([0,100]).range(["#16e8f7", "#cf6ff2"]).interpolate(d3.interpolateHsl),
      radius = 200,
      dotSize = 5,
      users = d3.map(),
      container,
      svg = d3.select("body")
        .append("svg")
        .attr({
          width: width,
          height: height
        });

  container = svg.append("g")
    .classed("container", true)
    .attr("transform", "translate(400,400)");

  function addTweet(tweet) {
    users.set(tweet.id, tweet);
    console.log(users.entries());
    container.selectAll(".sharer").data(users.entries(), function(d) { return d.key; })
      .attr({
        cx: function (d, i) { return Math.sin(2 * Math.PI / users.size() * i) * radius ; },
        cy: function (d, i) { return Math.cos(2 * Math.PI / users.size() * i) * radius ; },
        r: dotSize,
        fill: function(d,i) { return colors(i); }
      })
      .enter()
      .append("circle")
      .classed("sharer", true);
  }
  socket.on('tweet', addTweet);
}());
