
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;


const publicPath = path.join(__dirname, '../public'); //this is what you want to provide to the express status middleware
app.use(express.static(publicPath));



app.listen(port, () => {
  console.log(`Started on port ${port} & the Mongo DB is: ${process.env.MONGODB_URI}`);
});

// console.log(__dirname+'/../public'); //this doesn't look clean
console.log(publicPath);
