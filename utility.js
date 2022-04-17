const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

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

function gotolink(url, selecTool , obj){

    let hrefl = selecTool(obj).attr('href');

    return url +hrefl;



}

module.exports = {makeFolder : makeFolder,
getObj : getObj,
gotolink : gotolink} ;