
const app = require('./src/app')
//const {server_config} = require('./src/configs/config')
require('dotenv')
const PORT = process.env.PORT || 5000 

app.listen(PORT,()=>{
    console.log(`server on port : ${PORT}`.yellow);
  });
  