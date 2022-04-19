const { jsPDF } = require("jspdf");

function write2pdf(topic,repo,issues){

    issues.pop();

    const doc = new jsPDF();
    for (let i = 1; i<=issues.length ; i++)
    doc.text(i+". "+issues[i-1], 5, 15 + i * 15);

    doc.save("ISSUES/"+topic+"/"+repo+"/"+repo+".pdf");

}

module.exports = {write2pdf : write2pdf} ;
