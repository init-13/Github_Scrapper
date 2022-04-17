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

    let topicsarr = utility.getObj(html,"f3 lh-condensed mb-0 mt-1 Link--primary");

    for(let i =0 ;i<topicsarr.length;i++){
        let linktopic = utility.gotolink(url,html,topicsarr[i]);
        utility.handletopic(linktopic);
    }


}