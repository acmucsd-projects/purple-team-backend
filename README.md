# ACM Purple Team Backend - Splash Pages
Built in Express.js with care by the ACM Side Projects Purple Team. Generate a eye





## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project (W.I.P).

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
5. Run `npm start` to boot up your backend server

#### Example .env configuration

```
NODE_ENV=development
PORT=3000
#MongoDB connection information
MONGO_URI = mongodb_connection_string
```

You can find the `mongodb_connection_string` by going to your MongoDB data cluster, clicking `connect`, then the `Connect your application` button. From there, there should be a `Connection String Only` box that contains your connection string. (Make sure to follow the instructions listed below the box!)

### File Hierarchy

- `/src` - main folder of the project
- `/src/database` - folder containing everything about the mongoDB database
- `/src/database/models` - folder with all database models
- `/src/routes` - contains all routes

