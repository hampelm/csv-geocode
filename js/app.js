/*jslint nomen: true */
/*globals define: true, FileReader: true */


define([
  'jquery',
  'underscore',
  'backbone',
  'lib/leaflet.draw/leaflet.draw',
  'shp',
  'dropzone',

  'settings',

  'text!templates/row.html'
],

function($, _, Backbone, L, shp, Dropzone, settings, row) {
  'use strict';

  var App = {};

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

  };


  App.setupMapEditor = function(layer) {
    if (App.drawControl) {
      App.map.removeControl(App.drawControl);
    }

    App.drawControl = new L.Control.Draw({
      draw: false,
      edit: {
        featureGroup: layer
      }
    });
    App.map.addControl(App.drawControl);
  };


  App.setupDragdrop = function() {
    var holder = document.getElementById('holder');
    var state = document.getElementById('status');

    holder.ondragover = function () { this.className = 'hover'; return false; };
    holder.ondragend = function () { this.className = ''; return false; };
    holder.ondrop = App.readFile;
  };


  App.editFeature = function(event) {
    App.setupMapEditor(event.target);
    App.map.fitBounds(event.target.getBounds());
  };


  App.addRow = function(feature) {
  };


  App.addFeature = function(feature) {
    var geoJsonLayer = L.geoJson(feature).addTo(App.map);
    geoJsonLayer.on('click', App.editFeature);
    console.log(row);
    $('table').append(_.template(row, feature));
  };


  App.readShapefile = function(event) {
    shp(event.target.result).then(function(data) {
      console.log("Got data!", data);
      _.each(data.features, App.addFeature);
    });
  };


  App.readFile = function(event) {
    event.preventDefault();
    var file = event.dataTransfer.files[0];
    var reader = new FileReader();

    reader.onload = App.readShapefile;
    reader.readAsArrayBuffer(file);
  };

  return App;
});

