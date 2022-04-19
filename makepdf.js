const { jsPDF } = require("jspdf");

function write2pdf(topic,repo,issues){

    issues.pop();

    const doc = new jsPDF();
    for (let i = 1; i<=issues.length ; i++){
    let issueName = issues[i-1].split('\n')[0];
    let issueURL = issues[i-1].split('\n')[1];
    doc.text(i+". "+issueName, 5, 15 + i * 15);
    doc.textWithLink(issueURL, 12, 20 + i * 15,{url : issueURL});
}

    doc.save("ISSUES/"+topic+"/"+repo+"/"+repo+".pdf");

}

module.exports = {write2pdf : write2pdf} ;
