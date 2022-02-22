//const LETTER_LIST = ['A', 'B', 'C','D','E']
//const LETTER_LIST = ['A', 'B', 'C', 'P', 'E', 'L']
const LETTER_LIST = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'V', 'Z']
let MAX_LETTER_COUNT = 5

//LADET
/*

*/


const getDictionaryWordData = () => {
    let properWordData = []
    WORD_DATA.filter(properWord => {
        if (properWord.Name.length == MAX_LETTER_COUNT) {
            properWordData.push(properWord.Name.toUpperCase())
        }
    })
    return properWordData
}
const checkWithCorrectLocation = (perfectPosition, word) => {
    for (let position = 0; position < MAX_LETTER_COUNT; position++) {
        if (perfectPosition[position] != '' && word[position] != perfectPosition[position]) {
            return false
        }
    }
    return true
}

const checkValidity = (removalLetterAtPosition, word) => {
    let validFlag = true;
    for (let position = 0; position < MAX_LETTER_COUNT; position++) {
        //console.log(position);
        //console.log( removalLetterAtPosition[position]);
        removalLetterAtPosition[position].forEach((removalLetter, index) => {
            if (removalLetter != '' && word[position] == removalLetter) {
                validFlag = false
            }
        });
        if (!validFlag) {
            return false
        }
    }
    return true
}

function loadData() {

    const inValidLetterData = ['F', 'A', 'S', 'Q', 'U', 'X', 'H', 'I']
    let removalLetterAtPosition = [
        [], // Position 1
        ['E', 'O'], // Position 2
        ['E', 'R'], // Position 3
        ['E', 'T'], // Position 4
        ['T'] // Position 5
    ]
    let perfectPosition = [
        'T', // Position 1
        '', // Position 2
        '', // Position 3
        '', // Position 4
        'E', // Position 5
    ]

    const DICTIONARY_WORD_DATA = getDictionaryWordData()

    const validLetterData = LETTER_LIST.filter(letter => !inValidLetterData.find(inValidLetter => letter == inValidLetter))

    console.log(validLetterData);
    let validWordList = []
    validLetterData.forEach(letter1 => {
        validLetterData.forEach(letter2 => {
            validLetterData.forEach(letter3 => {
                validLetterData.forEach(letter4 => {
                    validLetterData.forEach(letter5 => {
                        validWordList.push({
                            'Value': `${letter1}${letter2}${letter3}${letter4}${letter5}`,
                            'Is_Valid_Status': true
                        });
                    });
                });
            });
        });
    });
    console.log(validWordList);

    //console.log(checkValidity(removalLetterAtPosition,'AAAAA'));
    validWordList.forEach((word, index) => {
        if (!checkValidity(removalLetterAtPosition, word.Value)) {
            word.Is_Valid_Status = false
        } else if (!checkWithCorrectLocation(perfectPosition, word.Value)) {
            word.Is_Valid_Status = false
        }

    });

    let filteredDataSet = validWordList.filter(letter => letter.Is_Valid_Status);
    console.log(filteredDataSet)
        //console.log(DICTIONARY_WORD_DATA)



    filteredDataSet.forEach(word => {
        word.Is_Valid_Status = (DICTIONARY_WORD_DATA.find(properWord => properWord == word.Value)) ? true : false
    })

    let possibleOutcome = filteredDataSet.filter(letter => letter.Is_Valid_Status);
    console.log(possibleOutcome)
}