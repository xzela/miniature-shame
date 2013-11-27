// Define the Ember application
var Roller = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_BINDINGS: true,
    LOG_VIEW_LOOKUPS: true,
    LOG_STACKTRACE_ON_DEPRECATION: true,
    LOG_VERSION: true,
    debugMode: true
});

// override index route to roll
Roller.IndexRoute = Ember.Route.extend({
    redirect: function () {
        this.transitionTo("roll");
    }
});

//
Roller.RollRoute = Ember.Route.extend({
    model: function() {
        return [Roller.Roll.create(), Roller.Roll.create(), Roller.Roll.create()];
    },

    setupController: function(controller, model) {
        controller.set("content", model);
    }
});

Roller.Router.map(function () {
    this.resource("roll");
});

Roller.Roll = Ember.Object.extend({
    diceNumber: 0,
    totalRolls: 0,
    numberOfRolls: 0,

    proportion: function() {
        var width = 50 + parseInt(400 * this.get("numberOfRolls") / this.get("totalRolls"));
        return "width: " + width + "px;";
    }.property("totalRolls", "numberOfRolls")
});


Roller.RollController = Ember.Controller.extend({
    rollDice: function() {
        var roll = this.get("rollString"),
            content = [],
            rolls = 0,
            sides = 0,
            errors = "",
            i, rnd, roll_parts;

        // check roll
        if (roll == undefined) {
            this.set("errors", "Please fill out the text box!");
            return
        }

        roll_parts = roll.split("d");

        if (roll_parts.length !== 2) {
            errors += "You need to enter a value in the format 'xdy'.  ";
        } else {
            // find the rolls and sides
            rolls = parseInt(roll_parts[0]); // hopefully the rolls
            sides = parseInt(roll_parts[1]); // hopefully the sides

            if (isNaN(rolls) || isNaN(sides)){
                errors += "Rolls and Sides must be numbers. ";
            }

            if (errors.length === 0) {
                // generate all of the models
                for (i = 0; i < sides; i++) {
                    content.push(Roller.Roll.create({
                        diceNumber: i + 1,
                        totalRolls: rolls
                    }));
                }

                for(i = 0; i < rolls; i++) {
                    rnd = Math.floor(Math.random() * sides);

                    content[rnd].incrementProperty("numberOfRolls");
                }
            }

        }
        // update the content
        this.set("content", content);

        // display errors
        this.set("errors", errors)
    }
});