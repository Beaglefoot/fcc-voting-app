# fcc-voting-app

This is one of fullstack projects in Take Home Projects section on [freeCodeCamp](https://learn.freecodecamp.org/coding-interview-prep/take-home-projects/build-a-voting-app/) written in TypeScript.

### User stories:

1. As an authenticated user, I can keep my polls and come back later to access them.
1. As an authenticated user, I can share my polls with my friends.
1. As an authenticated user, I can see the aggregate results of my polls.
1. As an authenticated user, I can delete polls that I decide I don't want anymore.
1. As an authenticated user, I can create a poll with any number of possible items.
1. As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
1. As an unauthenticated or authenticated user, I can see the results of polls in chart form.
1. As an authenticated user, if I don't like the options on a poll, I can create a new option.

### How to build and run
First of all install all deps:
```
yarn install
```
This will also build client side of the application.

Server part of the app requires some env variables. For development build they can be placed in `server/.env` and then provided to the server side of the app with `yarn env` like this:
```
yarn env node dist/
```

The following command can help to get some idea about what these variables are and how to name them:
```
git grep -A3 -B3 process.env
```

Once the environment is set up the easiest way to start is to run tmux script from the client dir:
```
cd client && bash start_tmux_session.sh
```
but this requires system-wide tmux installation.

To start without tmux:
* in case of dev env simply run `yarn start` in both `client` and `server` dirs
* in case of prod env build client side with `yarn build` and run server side with
```
NODE_ENV='production' yarn env yarn start
```
