const app = require("./app");

const port = process.env.PORT

app.listen(5678, () =>{
    console.log("Listening on port "+5678);
});