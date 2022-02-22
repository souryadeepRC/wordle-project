
let WORD_DATA  = [] 
const URL = 'data/data.json'

//const LETTER_LIST = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K','L','M','N','O','P','Q','R','S', 'T', 'U', 'V', 'W', 'X', 'V', 'Z']
const LETTER_LIST = ['A', 'B', 'C']
let MAX_LETTER_COUNT = 5
const getDictionaryWordCollection = () => { 
    $.ajax({
        url: URL,
        type: 'GET', 
        success:function(data) {
            WORD_DATA = data 
        }
    }); 
}
const filterWithValidWord = () => {
    getDictionaryWordCollection() 
    console.log('Loader On..');
    setTimeout(() => {
        console.log(WORD_DATA);
        console.log('Loader Off..'); 
    }, 5000); 
}
const getWord = (letterDetail, startingLetter, letterCount) => { 
    let finalWordArray = []
        //console.log([letterDetail, startingLetter, letterCount]);
    if (letterCount != MAX_LETTER_COUNT) {
         
        letterDetail[letterCount-1].forEach(letter => {
            finalWordArray.push(...getWord(letterDetail, startingLetter + letter, letterCount + 1))
        });
    } else {
       /*  console.log('ELSE');
        console.log(letterDetail[letterCount-1]); */

        let possibleWordArray = []

        letterDetail[letterCount-1].forEach(letter => {
            possibleWordArray.push(startingLetter + letter)
        });
        console.log(`After Position ${letterCount} := ${startingLetter}`);
        console.log(possibleWordArray);
        return possibleWordArray

    }
    console.log(finalWordArray);
    return finalWordArray
}

const checkCorrectPosition = (word, perfectPosition) => {

    let checkFlag = true
    perfectPosition.forEach((positionLetter, index) => {
        if (positionLetter != '') {
            checkFlag = checkFlag && word[index] == positionLetter
        }
    })
    return checkFlag
}
const filterPerfectPositionWord = (possibleWordList, perfectPosition) => {
    return possibleWordList.filter(word => checkCorrectPosition(word,perfectPosition))
}
const getPossibleWord = (letterDetail) => {
    let possibleWordArray = [] 
    console.log(letterDetail);
    possibleWordArray = getWord(letterDetail, '', 1)
    console.log(possibleWordArray);
    return possibleWordArray
}

const removeExtraLetter = (letterlist, removalLetterDetail, igonreLetterDetail) => {

/*     console.log(removalLetterDetail);
    console.log(igonreLetterDetail); 
    let data = letterlist.filter(letter => !removalLetterDetail.find(item => item == letter) )

    console.log(data);
    let data1 = data.filter(letter => !igonreLetterDetail.find(item => item == letter) )
    console.log(data1);
    console.log(letterlist.filter(letter => !removalLetterDetail.find(item => item == letter) && !igonreLetterDetail.find(item => item == letter)));
    console.log('----------------'); */
    return letterlist.filter(letter => !removalLetterDetail.find(item => item == letter) && !igonreLetterDetail.find(item => item == letter))
    /* return (letterlist.filter(letter => !removalLetterDetail.find(item => item == letter)
        .filter(letter => !igonreLetterDetail.find(item => item == letter)) )) */
}

const getAttemptLetterDetail = (completeIgnoreLetter, removalLetterAtPosition) => {  
    let letterList = [] 
    for (let index = 0; index < MAX_LETTER_COUNT; index++) {
        letterList.push(removeExtraLetter(LETTER_LIST, completeIgnoreLetter, removalLetterAtPosition[index]))
    } 
    return letterList 
}

const stringPermutations = str => {
    if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
    return str
      .split('')
      .reduce(
        (acc, letter, i) =>
          acc.concat(stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)),
        []
      );
  };
  

function loadData() { 
   
  console.log(stringPermutations('abcd'));
    let completeIgnoreLetter = ['F', 'A', 'I', 'S', 'G']
    
    let removalLetterAtPosition = [ 
        ['R'], // Position 1
        ['O'], // Position 2
        [], // Position 3
        ['N', 'T'], // Position 4
        ['T'], // Position 5
    ]
    let perfectPosition = [
        '', // Position 1
        'H', // Position 2
        'O', // Position 3
        '', // Position 4
        '', // Position 5
    ]
    //let letterDetail = getAttemptLetterDetail (completeIgnoreLetter, removalLetterAtPosition) 
    //console.log(letterDetail);
    //let possibleWordList = getPossibleWord(letterDetail) 
    
     
    
    //let filteredWordArray = filterPerfectPositionWord(possibleWordList, perfectPosition) 
    //let filteredWordArray filterPerfect Positionword(['FEAST', 'BHPOER",";UJOKL, THORN", "GHOBR", "APPLE"],perfectPosition)
    
 
    
    //console.log(filteredWordArray)
}