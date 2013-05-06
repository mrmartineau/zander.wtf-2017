/*jslint sloppy: true, white: true, browser: true, devel: true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:false, curly:true, browser:true, indent:4, maxerr:50, sloppy:true, white:false, smarttabs:false */

/*	Author:
		TMW - (Author Name Here)
*/

// ======================================
// === Declare global 'ZANDER' namespace ===
// ======================================
var ZANDER = window.ZANDER || {};

// Create a closure to maintain scope of the '$' and remain compatible with other frameworks
(function($) {

	$(function() {

		var router = new ZANDER.Router();
		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;
		// Backbone.history.start({pushState: true, hashChange: false});
		Backbone.history.start();

	});// END DOC READY

	// optional triggers
	// WINDOW.LOAD
	// $(window).load(function() {

	// });

	// WINDOW.RESIZE
	// $(window).resize(function() {

	// });



})(jQuery);


ZANDER.SiteSetup = {
	variableX : '', // please don't keep me - only for example syntax!

	init : function () {
		// ZANDER.tpl.init();
	}
};

ZANDER.ui = {
	init : function() {
		var self = this;
		// self.masthead();
	},

	masthead : function() {
		var viewportHeight = $(window).height() - 300;

		$('#masthead').height(viewportHeight);

		this.getViewPortHeight = function() {
			return viewportHeight;
		};
	}
};

ZANDER.tpl = {
	init : function() {
		ZANDER.tpl.projectList();
	},

	projectList : function() {
		$.ajax({
			url : 'http://martineau.dev/schema.json',
			dataType : 'json',
			success : function( projectsList ) {

				var projectTemplate = ZANDER.helpers.template('project-list');
				var context = projectsList.portfolio;
				// log(projectsList);
				// $('#container').html(template(context));
				$('#main').html( projectTemplate(projectsList) );
			}
		});

		// var projectSource = $('#project-list-tpl').html();
		// var projectTemplate = Handlebars.compile(projectSource);

		// // Print resulting data to page
		// $('#main').html( projectTemplate(pagedata.CurrentApp) );
	}
};

ZANDER.helpers = {
	template : function(name) {
		return Handlebars.compile($('#'+name+'-tpl').html());
	}
};


// Define the model
ZANDER.Project = Backbone.Model.extend({
	url: function() {
		return $.ajax({
			url : '/schema.json',
			dataType : 'json',
			success : function( projectsList ) {
				_.each(projectsList.portfolio, function(project) {
					console.log(project);
					return project;
				});
			}
		});
	},
	fetch: function(response) {
		console.log(response);
		return response.portfolio;
	},
	// parse: function(response) {
	// 	// console.log(response);
	// 	return response.portfolio;
	// },
	initialize: function() {
	}
});

// Define the collection
// ZANDER.Projects = Backbone.Collection.extend();

// Define the View
ZANDER.ProjectsView = Backbone.View.extend({
	el: '#main',
	initialize: function() {
		_.bindAll(this, 'render');
		// create a collection
		this.collection = new ZANDER.Projects();
		// Fetch the collection and call render() method
		var that = this;
		this.collection.fetch({
			success: function () {
				that.render();
			}
		});
	},
	// Use an extern template
	template: ZANDER.helpers.template('project-list'),
	// _.template( $('#project-list-tpl').html() ),

	render: function() {
		// Fill the html with the template and the collection
		$(this.el).html(this.template({ projects: this.collection.toJSON() }));
	}
});

// Define the View
ZANDER.ProjectView = Backbone.View.extend({
	el: '#main',
	// initialize: function() {
		// _.bindAll(this, 'render');
		// create a collection
		// this.collection = new ZANDER.Projects(id);
		// this.collection = new ZANDER.Project();
		// Fetch the model and call render() method
		// log(this.model);
		// console.log(this.options.models);
		// var that = this;
		// this.collection.fetch({
		// 	success: function (collection, response) {
		// 		that.render();
		// 	}
		// });
	// },
	// Use an extern template
	template: ZANDER.helpers.template('project-item'),

	// render: function() {
	// 	// Fill the html with the template and the collection
	// 	console.log(this.template());
	// 	$(this.el).html(this.template({ project: this.model.toJSON() }));
	// }
});

// ZANDER.SiteSetup.init();
ZANDER.Router = Backbone.Router.extend({
	initialize: function() {
		this.projects = new ZANDER.Projects();
	},
	routes: {
		"": "index",
		"projects": "projects",
		"projects/:id": "project"
	},

	// Homepage / List of projects
	index: function() {
		var view = new ZANDER.ProjectView({
			collection: this.projects
		});
		console.log(this.projects);
		if (this.projects.isEmpty()) {
			this.projects.fetch({
				success: function () {
					view.render();
				}
			});
		} else {
			view.render();
		}
	},

	// List of projects
	projects: function() {
		var view = new ZANDER.ProjectView({
			collection: this.projects}).render();
	},

	// Individual Project
	project: function(id) {
		// console.log(this.projects.get(id));
		var view = new ZANDER.ProjectView({
			model: this.projects.get(id)
		}).render();
		console.log(this.options);
		console.log("You are trying to reach project " + id);
	}
});



