
/*************************************
//
// global-socket app
//
**************************************/
/* global io: false */
/* global window: false */
/* global document: false */
/* global requestAnimationFrame: false */
/* jshint -W015 */
/* jshint camelcase: false */

(function () {
  'use strict';
  // connect to our socket server
  var socket = io.connect('http://127.0.0.1:7008/');

  var width = window.innerWidth,
      height = window.innerHeight;

  var colors = d3.scale.linear().domain([0,100]).range(["#16e8f7", "#cf6ff2"]).interpolate(d3.interpolateHsl);

  var svg = d3.select("body")
    .append("svg")
    .attr({
      width: width,
      height: height
    });
  var users = d3.map();
  var container = svg.append("g").classed("container", true);
  container.attr("transform", "translate(400,400)");

  function addTweet(tweet) {
    users.set(tweet.id, tweet);
    console.log(users.entries());
    container.selectAll(".sharer").data(users.entries(), function(d) { return d.key; })
      .attr({
        cx: function (d, i) { return Math.sin(2 * Math.PI / users.size() * i) * 200 ; },
        cy: function (d, i) { return Math.cos(2 * Math.PI / users.size() * i) * 200 ; },
        r: 5,
        fill: function(d,i) { return colors(i); }

      })
      .enter()
      .append("circle")
      .classed("sharer", true);
  }
  socket.on('tweet', addTweet);
}());
