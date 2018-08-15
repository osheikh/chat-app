const path = require('path');
const express = require('express');


const publicPath = path.join(__dirname,'../public');
var app = express();

app.set('PORT',process.env.PORT || 3000)

app.use(express.static(publicPath));

app.listen(app.get('PORT'),()=>{
  console.log('server started on port 3000');
})