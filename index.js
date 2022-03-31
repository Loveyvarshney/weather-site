const express = require("express");
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname +"/app.html");
    
    
});
app.post("/", function(req, res){


    const query= req.body.city;
    const appkey = "9a29280da0f4ce72abe2101d28825586";
    const unit ="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appkey +"&units="+unit +"";
https.get(url,function(response){
  
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const icon =weatherData.weather[0].icon;
        const image = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        res.write("<h1>The Temperature is " + temp+ " degree celcius.</h1>");
        res.write("<h2>The weather in "+query + " currently is "+ desc +"</h2>" );
        res.write("<img src="+image+">");
        res.send();
        
    }); 

});
});

app.listen(3000, function(){
    console.log("server running on port 3000");
});