/**
 * Created by pabloweremczuk on 12/30/16.
 */
var bulk = require('bulk-require');
var sections = bulk(__dirname, [ 'data/**/*.js', 'render/*.js' ]);

module.exports = sections;