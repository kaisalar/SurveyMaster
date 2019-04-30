const { port } = require("./config");
const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api',(req,res)=>{
  console.log('hello from api')
  res.send({data: 'hello from api'});
})
app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
