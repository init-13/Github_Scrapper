const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const request = require("request");
const {write2pdf} = require("./makepdf");

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

    return url + hrefl;



}

function extractText(body,obj){
    let SelecTool = cheerio.load(body);
    return SelecTool(obj).text();
}

function handleLink(topicName, url){

    makeFolder("ISSUES/"+topicName);
    
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
            let repoName = extractText(html,rlinks[i]).trim('\n');
            console.log(repoName);
            
            GetIssues(repoName,repoLink);
            
        }
    }

    function GetIssues(repoName,url){
        makeFolder("ISSUES/"+topicName+"/"+repoName);
        url+='/issues'
   
        request(url,cb);
        
        function cb(err,res,body){
            if(err) console.log(err);
            else getisu(body);
        }

        function getisu(html){

            let selecTool = cheerio.load("html");
            
            let isuLinks = getObj(html,'a[class="Link--primary v-align-middle no-underline h4 js-navigation-open markdown-title"]');
            let issues = [];
            for(let i=0;i<6;i++){
                
                let issueName = selecTool(isuLinks[i]).text() ;
                console.log(issueName+" || "+ topicName +" || "+ repoName);
                issues.push(issueName);
                
                
                
                
            }
            write2pdf(topicName, repoName, issues);
        }
    }


}

module.exports = {makeFolder : makeFolder,
getObj : getObj,
gotolink : gotolink,
handleLink : handleLink,
extractText : extractText
} ;