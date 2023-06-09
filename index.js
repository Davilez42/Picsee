
const app = require('./src/app')
const {server_config} = require('./src/configs/config')


app.listen(server_config.PORT,server_config.HOST,()=>{
    console.log("server on port :5000".green);
  });
  