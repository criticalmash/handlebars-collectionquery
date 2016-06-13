/**
 * Main script
 */
'use strict';


//console.log('Loading navigation search helper');

module.exports.register = function (Handlebars, options, params)  {
  //console.log(params);
  var _ = params.grunt.util._;
  var grunt = params.grunt;

  //grunt.log.write('\n Handlebars after: ' + JSON.stringify(Handlebars, null, '\t') + '\n\n');


  // stollen from helpers-collections.js
  var getDescendantProp = function (obj, desc) {
    var arr = desc.split('.');
    while (arr.length && (obj = obj[arr.shift()])) {
      continue;
    }
    return obj;
  };

  /**
   * A handlebars helper to search a colloection
   * @return {[type]} [description]
   */
  Handlebars.registerHelper('collectionQuery', function (collection, options) {
    // unpack options
    var results = {test: 'no results'};
    var key = options.hash.key || false;
    var value = options.hash.value || false;
    var sortBy = options.hash.sortBy || false;
    var sortDir = options.hash.sortDir || false;
    var limit = options.hash.limit || false;

    // search the collection
    if (key) {
      var query = {};
      query[key] = value;
      results = _.find(collection, function (item) {
        return item[key] === value;
      });
    }

    // sort and limit the result set, if needed
    if (sortBy) {
      results = results.items.sort(function (a, b) {
        var aProp = getDescendantProp(a, sortBy);
        var bProp = getDescendantProp(b, sortBy);
        if (aProp > bProp) {
          return 1;
        } else {
          if (aProp < bProp) {
            return -1;
          }
        }
        return 0;
      });
      if (sortDir === 'desc') {
        results = results.reverse();
      }
    }

    if (limit) {
      results = results.slice(0, limit);
    }

    // return results
    grunt.log.write('collectionQuery results: ' + JSON.stringify(results, null, '\t') + '\n\n');

    var resultSet = '';
    _.forEach(results, function (result) {
      resultSet += options.fn(result);
    });

    return resultSet;
  });
};
