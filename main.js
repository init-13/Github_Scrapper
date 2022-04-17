let url = "https://github.com/topics";
const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");
const utility = require("./utility");

request(url,cb);

function cb(err,res,body){
    if(err) console.log(err);
    else {
        
        
        handleHTML(body);
    }
    
}

function handleHTML(html){

    let topicsarr = utility.getObj(html,'a[class="no-underline flex-grow-0"]');
    console.log(topicsarr.length);
    
    for(let i =0 ;i<3;i++){
        let linktopic = utility.gotolink(url,html,topicsarr[i]);
        
        console.log(linktopic);
        ;
    }


}