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
