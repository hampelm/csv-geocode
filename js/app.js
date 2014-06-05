/*jslint nomen: true */
/*globals define: true */


define([
  'jquery',
  'underscore',
  'backbone',
  'lib/leaflet/leaflet',
  'shp',

  'settings'
],

function($, _, Backbone, L, shp, settings) {
  'use strict';

  var App = {};

  // Kick off the LocalData app
  App.initialize = function() {
    console.log("Initalizing app");

    this.map = new L.map('map', {
      zoom: 15,
      center: [42.350587,-83.060299]
    });
    L.tileLayer(settings.baseLayer).addTo(this.map);

    var geo = L.geoJson().addTo(this.map);
    var base = 'files/DDOT_BUS_STOPS_110111.zip';
    shp(base).then(function(data){
      console.log("Got data!");
      geo.addData(data);
    });
  };


  return App;
});

