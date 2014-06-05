/*jslint nomen: true */
/*globals define: true */

define([],

function(L) {
  'use strict';

  var settings = {};

  settings.baseLayer = '//a.tiles.mapbox.com/v3/matth.map-n9bps30s/{z}/{x}/{y}.png';
  settings.satelliteLayer = '//a.tiles.mapbox.com/v3/matth.map-yyr7jb6r/{z}/{x}/{y}.png';

  // Colors for option maps
  settings.colorRange = [
    "#b7aba5", // First color used for blank entries
    "#a743c3",
    "#f15a24",
    "#58aeff",
    "#00ad00",
    "#ffad00"
  ];

  settings.circleMarker = {
    radius: 8,
    fillColor: "#df455d",
    color: "#df455d",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  return settings;
});
