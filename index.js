const app = require('./app');
const {PORT} = process.env;

app.listen(PORT || 5001, (req,res)=>{
    console.log(`Server listening to the port no ${PORT}`)
});
