// Define the Ember application
App = Ember.Application.create({
	version: '0.091.91'
});

App.Router.map(function() {
	this.resource('about');
	this.resource('posts');
});

App.List = [{
	name: "my awesome name"
},
{
	name: "some other name"
}];