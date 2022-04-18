const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const request = require("request");

function makeFolder(name){

    let folderPath = path.join(__dirname,name);
    if(!fs.existsSync(folderPath))
    fs.mkdirSync(folderPath);
}

function getObj (html, selector){

    let SelecTool = cheerio.load(html);

    let elementObj = SelecTool(selector);

    return elementObj;

}

function gotolink(url, html , obj){


    let selecTool = cheerio.load(html);

    let hrefl = selecTool(obj).attr('href');

    return url +hrefl;



}

function handleLink(url){
    
    request(url,cb);
    function cb (err,res,body){
        if(err) console.log(err);
        else{
            //console.log(body);
            fetchURL(body);
        }        
    }

    function fetchURL(html){
        
        let rlinks = getObj(html,'a[class="text-bold wb-break-word"]');
        
        for (let i =0;i<8;i++){
            let repoLink = gotolink("https://github.com/",html,rlinks[i]);
            console.log(repoLink)
            
        }
    }


}

module.exports = {makeFolder : makeFolder,
getObj : getObj,
gotolink : gotolink,
handleLink : handleLink} ;