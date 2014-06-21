//All of the below to be used with Perseids-style alignment data in JSON--see Kohelet-1.align.json for example

/*e.g. var alignmentData = {"alignment":[....]}
    
    getLNumWordDataBySentenceNumber(alignmentData,1,1)

*/

//For converting alignment XML to JSON--need to change xml:Lang to xmlLang and aligned-text to alignment--see Kohelet-1.align.json for an example



function getLangList(alignmentData) {
    var langData = alignmentData.alignment.language;
    var langList = [];

    for (i = 0; i < langData.length; i++) {
        langList.push(langData[i].xmlLang);
    }
    return langList;
}

function getDirList(alignmentData) {
    var langData = alignmentData.alignment.language;
    var dirList = [];

    for (i = 0; i < langData.length; i++) {
        dirList.push(langData[i].dir);
    }
    return dirList;
}

function getSentenceList(alignmentData) {
    return alignmentData.alignment.sentence;
}

//this should be replaced by URI functionality

function getWordsBySentenceNumber(alignmentData, sentenceNumber) {
    var num = sentenceNumber - 1;

    return alignmentData.alignment.sentence[num].wds;

}

function getLNumWordDataBySentenceNumber(alignmentData, sentenceNumber, lNum) {
    var num = sentenceNumber - 1;
    var lN = lNum - 1;
    return alignmentData.alignment.sentence[num].wds[lN].w;

}

function getLNumWordNumsBySentenceNumber(alignmentData, sentenceNumber, lNum) {
    var num = sentenceNumber - 1;
    var lN = lNum - 1;
    var wordList = alignmentData.alignment.sentence[num].wds[lN].w;
    var numList = [];

    for (i = 0; i < wordList.length; i++) {
        numList.push(wordList[i].n);
    }
    return numList;
}

function getLNumWordRefListsBySentenceNumber(alignmentData, sentenceNumber, lNum) {
    var num = sentenceNumber - 1;
    var lN = lNum - 1;
    var wordList = alignmentData.alignment.sentence[num].wds[lN].w;
    var refList = [];

    for (i = 0; i < wordList.length; i++) {
        refList.push(wordList[i].refs.nrefs.split(" "));
    }
    return refList;
}

function getLNumWordTextBySentenceNumber(alignmentData, sentenceNumber, lNum) {
    var num = sentenceNumber - 1;
    var lN = lNum - 1;
    var wordList = alignmentData.alignment.sentence[num].wds[lN].w;

    var textList = [];

    for (i = 0; i < wordList.length; i++) {
        textList.push(wordList[i].text);
    }
    return textList;
}

function getLNumSentenceBySentenceNumber(alignmentData, sentenceNumber, lNum){
    var num = sentenceNumber - 1;
    var lN = lNum - 1;
    var wordList = alignmentData.alignment.sentence[num].wds[lN].w;

    var textList = [];

    for (i = 0; i < wordList.length; i++) {
        textList.push(wordList[i].text);
    }
    return textList.join(" ");

}

function getFullTextbyLNum(alignmentData, lNum) {
    var lN = lNum - 1;
    var textList = [];
    var sentenceList = alignmentData.alignment.sentence;

    for (i = 0; i < sentenceList.length; i++) {
        var wordList = alignmentData.alignment.sentence[i].wds[lN].w;
        var wordTextList = [];

        for (x = 0; x < wordList.length; x++) {

            wordTextList.push(wordList[x].text);

        }

        textList.push(wordTextList.join(" "));

    }
    return textList.join(" ");
}

function sideBySideSentences(alignmentData){
    var sentenceList = alignmentData.alignment.sentence;


    var langData = alignmentData.alignment.language;
    var dirList = [];

    for (i = 0; i < langData.length; i++) {
        dirList.push(langData[i].dir);
    }

    var htmlArray =[];

    for (s=0; s < sentenceList.length; s++){

        var rowArray = [];

        for (d=0; d<dirList.length; d++){

             var num = s;
             var lN = d;
             var width = 12/(dirList.length);
             var wordList = alignmentData.alignment.sentence[num].wds[lN].w;
             var textList = [];

            for (i = 0; i < wordList.length; i++) {
                    textList.push(wordList[i].text);
            }
            rowArray.push("<div class='col-md-" + width +"' dir='" + dirList[d] + "'>" + textList.join(" ") + "</div>");

        }

        htmlArray.push("<div class 'row'>" + rowArray + "</div>");
    }

    return htmlArray.join("\n");

}

/*function findCorrWords(alignmentData) {

    var sentenceList = alignmentData.alignment.sentence;

    var sCorrList = [];

    for (i = 0; i < sentenceList.length; i++) {

        var sList = getWordsBySentenceNumber(alignmentData, i + 1);

        

        //hack that makes it only viable for 2 langs right now

        var n = 1;

        //the functions are supposed to be human readable (ie subtract 1 from input)

        var wordNums = getLNumWordNumsBySentenceNumber(alignmentData, i + 1, n + 1);
        var wordRefList = getLNumWordRefListsBySentenceNumber(alignmentData, i + 1, n + 1);

        var corrData = getLNumWordDataBySentenceNumber(alignmentData, i + 1, n + 2);

        var wordList = getWordsBySentenceNumber(alignmentData, i + 1);
        var corrList = [];

        for (w = 0; w < wordRefList.length; w++) {

            var refList = wordRefList[w];

            var corrTextList = [];

            for (r = 0; r < refList.length; r++) {

                var corrNum = wordRefList[w][r];

                for (c = 0; c < corrData.length; c++) {

                    if (corrData[c].n == corrNum) {

                        var corrWord = corrData[c].text;
                        corrTextList.push(corrWord);
                        
                    }


                }

            }

            corrList.push(corrTextList.join(" "));

        }

        sCorrList.push(corrList);



    }

} */
