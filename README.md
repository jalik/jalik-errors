# Error helper for Meteor

## Introduction

This package provides an easy way to display errors on the client in Meteor.
You can also use it for other purposes on the server.

## Installation

To install the package, execute this command in the root of your project :
```
meteor add jalik:errors
```

If later you want to remove the package :
```
meteor remove jalik:errors
```

## How it works ?

First, you need as much error handlers as you have templates that display errors.
All errors are stored in a temporary `Mongo.Collection` available at `Meteor.errors`,
this means that errors are not really stored on disk and then not persistent over app/browser restarts.
Using a collection offers reactivity when an error is added/removed.
Each error helper has an ID that allow to attach errors to it, so we know exactly where to display errors.

## Declaring template's error helper

You need to create an error helper for each templates where errors should be displayed.
The best place to create it is in the `Template.onCreated()` method.

```js
Template.loginForm.onCreated(function () {
    this.errors = new ErrorHelper();
});
```

## Clearing template's error helper

When the template is destroyed, you may want to remove related errors to free memory.

```js
Template.loginForm.onDestroyed(function () {
    this.errors.clear();
});
```

## Handling template's errors

Below is an example of how you would handle errors in the template, removing and adding them at the right time.

```js
Template.loginForm.events({
    'submit form': function (ev, tpl) {
        ev.preventDefault();
        let fields = getFields(ev.target);
        
        // Before login, clear previous errors
        tpl.errors.clear();

        // Login with username and password
        Meteor.loginWithPassword(fields.username, fields.password, function (err) {
            if (err) {
                // Add the error to the list
                tpl.errors.add(error);
            }
        });
    }
});

Template.loginForm.helpers({
    errors: function () {
        // Returns errors for this template, argument is optional
        return Template.instance().errors.find({
            sort: {createdAt: -1}
        });
    }
});
```

## Display template's errors

Finally, we display errors in the template.

```html
<template name="loginForm">
   <form>
       {{#each errors}}
           <p class="msg bg-danger">{{message}}</p>
       {{/each}}

       <div class="form-group">
           <label>{{t "Username or email"}}</label>
           <input class="form-control input-lg" name="username" type="text" required>
       </div>
       <div class="form-group">
           <label>{{t "Password"}}</label>
           <input class="form-control input-lg" name="password" type="password" required>
       </div>
       <div class="pull-right">
           <input class="btn btn-lg btn-success" type="submit" value="{{t "Log in"}}" disabled="{{loggingIn}}">
       </div>
   </form>
</template>
```
