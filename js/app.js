/*jslint nomen: true */
/*globals define: true, FileReader: true */


define([
  'jquery',
  'underscore',
  'backbone',
  'lib/leaflet.draw/leaflet.draw',
  'lib/papaparse',
  'dropzone',

  'settings',

  'text!templates/row.html'
],

function($, _, Backbone, L, Papa, Dropzone, settings, rowTemplate) {
  'use strict';

  // Hardcoded maximum number of geocodes to run
  var LIMIT = 50;

  var App = {};
  App.base = 'http://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/';
  App.token = 'pk.eyJ1IjoibWF0dGgiLCJhIjoicGFzV1ZkWSJ9.KeK3hKmM52XpUEHHx_F8NQ';

  // Kick off the LocalData app
  App.initialize = function() {
    console.log("Initalizing app");

    App.setupDragdrop();
    App.setupMap();
  };

  App.setupMap = function() {
    // Set up the map
    App.map = new L.map('map', {
      zoom: 15,
      center: [42.400712,-83.118876]
    });
    L.tileLayer(settings.baseLayer).addTo(App.map);
    App.layers = L.geoJson().addTo(App.map);
  };

  App.setupDragdrop = function() {
    var holder = document.getElementById('holder');
    var state = document.getElementById('status');

    holder.ondragover = function () { this.className = 'hover'; return false; };
    holder.ondragend = function () { this.className = ''; return false; };
    holder.ondrop = App.readFile;
  };

  App.addRow = function(feature, row) {
    var context = {
      address: row.address,
      codedAddress: 'unable to geocode',
      relevance: 0
    };

    // If we have geodata...
    var first = feature.features[0];
    if (first) {
      context.codedAddress = first.place_name;
      context.relevance = first.relevance;
    }

    $('table').append(_.template(rowTemplate, context));
  };

  App.addFeature = function(feature, row) {
    console.log(feature, row);
    var first = feature.features[0];
    if (!first) { return; }

    App.layers.addData(first);
    App.map.fitBounds(App.layers.getBounds());
  };

  App.makeURL = function(address) {
    return App.base + address + '.json?access_token=' + App.token;
  };

  App.geocodeRow = function(row) {
    var address = row.address + " " + row.city;
    var url = App.makeURL(address);
    console.log(url);
    var req = $.get(url);
    req.success(function(results){
      App.addRow(results, row);
      App.addFeature(results, row);
    });
  };

  App.readFile = function(event) {
    console.log("READ FILE?");
    event.preventDefault();
    var file = event.dataTransfer.files[0];
    var reader = new FileReader();

    console.log(Papa);
    Papa.parse(file, {
      header: true,
      complete: function(results) {
        console.log(results);
        var slice = results.data.slice(0, LIMIT);
        _.each(slice, App.geocodeRow);
      }
    });
  };

  return App;
});

