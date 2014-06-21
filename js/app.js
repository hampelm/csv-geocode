/*jslint nomen: true */
/*globals define: true, FileReader: true */


define([
  'jquery',
  'underscore',
  'backbone',
  'lib/leaflet.draw/leaflet.draw',
  'shp',
  'dropzone',

  'settings'
],

function($, _, Backbone, L, shp, Dropzone, settings) {
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
    App.drawControl = new L.Control.Draw({
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
    console.log(event.layer);
    App.setupMapEditor(event.layer);
  };


  App.readShapefile = function(event) {
    var geoJsonLayer = L.geoJson().addTo(App.map);
    shp(event.target.result).then(function(data){
      console.log("Got data!", data);
      geoJsonLayer.addData(data);
    });

    geoJsonLayer.on('click', App.editFeature);
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

