# MAG

`MAG` is a demo application to show how to implement `JWT` authentication with a `Sails` backend and an `Angular 1.x` frontend.

The app is connected to a demo database in Mongo to restrinct its access to users, and each user has its permissions to access to the different app modules and its actions.

It's still in progress so you may find a lot of bugs in it.

If you want to try it, you need to do the following:

Install the latest `sails` beta if you don't have it:

```
$ sudo npm install -g sails@beta
```

Then, inside this app folder:

```
$ npm install
$ sails lift
```

### TODO:

* Socket.io integration.
* SPA authentiaction 
