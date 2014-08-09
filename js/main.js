/*jslint nomen: true */
/*globals require: true */

require.config({
  paths: {
    async: 'lib/async',
    backbone: 'lib/backbone',
    dropzone: 'lib/dropzone',
    jquery: 'lib/jquery',
    moment: 'lib/moment.min',
    text: 'lib/text',
    underscore: 'lib/underscore'
  },

  shim: {
    'lib/leaflet/leaflet': {
      exports: 'L'
    },

    'lib/papaparse': {
      exports: 'Papa'
    },

    'lib/leaflet.draw/leaflet.draw': {
      deps: ['lib/leaflet/leaflet'],
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
