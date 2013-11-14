// Define the Ember application
Todos = Ember.Application.create();

// Ember Object
Todos.todo = Ember.Object.extend({
	title: null,
	isDone: false
});

Todos.Controller = Ember.Object.create({
	// Ember Array A()?
	todos: Ember.A(),

	// init property
	init: function() {
		var items = this.get('todos');
		// add some items
		items.addObject(Todos.todo.create({title: 'Title 1'}));
		items.addObject(Todos.todo.create({title: 'Title 2'}));
	}
});