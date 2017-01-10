/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	admin: function(req, res) {
    res.view('admin/homepage', { layout: 'admin/layout' });
  },

  public: function(req, res) {
    res.view('site/homepage', { layout: 'site/layout' });
  },

  _config: { actions: false, shortcuts: false, rest: false }
};
