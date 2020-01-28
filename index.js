const express = require("express");
const fs = require("fs");

const app = express();

//Route for the Home Page
app.get("/",(req,res)=>{

    //This fetches a static HTML page
    fs.readFile("html/index.html",(err,data)=>{

        if(!err)
        {
            //this set the response header so the browser will do this is an HTML page
            res.setHeader("Content-Type","text/html");

            //parsers the html content
            res.write(data);
            res.end();
        }

        else
        {
            console.log(err);
        }

    })

});

const PORT=3000;
//This creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});