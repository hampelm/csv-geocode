/*jslint nomen: true */
/*globals require: true */

require.config({
  paths: {
    async: 'lib/async',
    backbone: 'lib/backbone',
    jquery: 'lib/jquery',
    moment: 'lib/moment.min',
    shp: 'lib/shp',
    text: 'lib/text',
    underscore: 'lib/underscore'
  },

  shim: {
    'lib/leaflet/leaflet': {
      exports: 'L'
    }
  }
});

require(['jquery', 'underscore', 'backbone', 'app'],
        function ($, _, Backbone, app) {
  'use strict';

  $(document).ready(function () {
    app.initialize();
  });
});
