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
			url : '/data.json',
			dataType : 'json',
			success : function( projectsList ) {

				var projectTemplate = ZANDER.helpers.template('project-list');
				var context = projectsList.portfolio;
				// log(projectsList);
				$('#main').html( projectTemplate(projectsList) );
			}
		});
	}
};

ZANDER.helpers = {
	template : function(name) {
		return Handlebars.compile($('#'+name+'-tpl').html());
	}
};


// Define the model
ZANDER.Project = Backbone.Model.extend();

// Define the collection
ZANDER.ProjectsCollection = Backbone.Collection.extend({
	model : ZANDER.Project,
	url : '/data.json',
	initialize: function () {

	},
	parse: function(response) {
		console.log(response.portfolio);
		return response.portfolio;
	}
});

// Define the Listing View
ZANDER.ProjectListView = Backbone.View.extend({
	el: '#main',
	template: ZANDER.helpers.template('project-list'),
	render: function() {
		$(this.el).html(this.template({
			projects: this.collection.toJSON()
		}));
	}
});

// Define the Individual View
ZANDER.ProjectView = Backbone.View.extend({
	el: '#main',
	template: ZANDER.helpers.template('project-item'),
	render: function() {
		$(this.el).html(this.template({
			project: this.collection.toJSON()
		}));
		console.log(this.model);
	}
});

// ZANDER.SiteSetup.init();
ZANDER.Router = Backbone.Router.extend({
	routes: {
		"": "index",
		"projects": "projects",
		"projects/:id": "project"
	},

	// Homepage / List of projects
	index: function() {

		var projectList = new ZANDER.ProjectsCollection();
		var projectListView = new ZANDER.ProjectListView({collection: projectList});
		projectListView.bind('renderCompleted:projects', this.changePage,this);

		projectListView.render();
	},

	// List of projects
	projects: function() {
		var view = new ZANDER.ProjectsView({
			collection: this.projects
		});

		if (this.projects.isEmpty()) {
			this.projects.fetch({
				success: function () {
					view.render();
				}
			});
		} else {
			view.render();
			console.log(view.render());
		}
	},

	// Individual Project
	project: function(id) {
		// console.log(this.projects.get(id));
		var view = new ZANDER.ProjectView({
			model: this.projects.get(id)
		});

		if (this.projects.isEmpty()) {
			this.projects.fetch({
				success: function () {
					view.render();
				}
			});
		} else {
			view.render();
		}
		console.log(this.projects);
		console.log("You are trying to reach project " + id);
	}
});



