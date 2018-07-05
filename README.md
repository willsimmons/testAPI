- npm/yarn install
- create your mongoDB and create a user for it
- create your .env file in ./

#in mongo DB command write a script
- use testAPI
db.createUser({user:"ADMIN", pwd:"helloWorld",roles:["dbOwner"]})
db.createUser({user:"primary", pwd:"helloWorld",roles:["readWrite"]})

in .env place DB_USER, DB_PASSWORD, DB_PORT_, DB_NAME
SERVER_PORT
SERVER_HOST
http://mongoosejs.com/
