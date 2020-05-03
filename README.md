# ACM Purple Team Backend - Splash Pages
Built in Express.js with care by the ACM Side Projects Purple Team. Generate a splash page for your event with all of its details with minimal effort!



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on Heroku.

### Requirements

1. Install the latest version of [Node.js](https://nodejs.org/en/ "Node.js")
2. Setup a [MongoDB](https://www.mongodb.com/) account and database

### Installing

Get a development environment running. 

1. Clone the repository to your local machine ```git clone https://github.com/acmucsd/purple-team-backend.git```
2. Navigate to your project directory via terminal
3. Run `npm install` to install all dependencies
4. Rename the example environment file and edit its contents for a testing environment
   - `cp .env.example .env` to rename the example environment file
   - Edit the contents to reflect the `.env` configuration displayed below
5. Run `npm start:dev` to boot up your backend server in development mode.
   - Use `npm start` to regularly launch your backend server.

#### Example .env configuration

```
NODE_ENV=development
PORT=3000
#MongoDB connection information
MONGO_URI = mongodb_connection_string
```

You can find the `mongodb_connection_string` by going to your MongoDB data cluster, clicking `connect`, then the `Connect your application` button. From there, there should be a `Connection String Only` box that contains your connection string. (Make sure to follow the instructions listed below the box!)

### Deployment

1. Create a free [Heroku](https://www.heroku.com/) account and install the Heroku [Command Line interface](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) (CLI).
   - Make sure you login to Heroku on your CLI using `heroku login` and following the instructions.
2. Navigate to your project directory using `cd`
3. Use `heroku create app_name` to create a Heroku application with the name "app_name" (put your application's name here)
4. Run `heroku buildpacks:set heroku/nodejs` to set the application's build pack.
5. Install the MLab addon to setup a MongoDB database for your Heroku app with the command `heroku addons:create mongolab:sandbox`
6. Push your code up to Heroku with `git push heroku master`

Now your application should be setup on your Heroku account and is ready for requests!

### File Hierarchy

- `/src` - main folder of the project
- `/src/database` - folder containing everything about the mongoDB database
- `/src/database/models` - folder with all database models
- `/src/routes` - contains all routes

