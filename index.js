
const app = require('./app')
const config = require('./config')


app.listen(config.PORT,config.HOST,()=>{
    console.log("server on port :5000".green);
  });
  