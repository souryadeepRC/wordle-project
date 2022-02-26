
const isEveryLetterPresent = (word, letterArray) => {
    let flag = true;
    letterArray.forEach(letter => {
        flag = flag & word.indexOf(letter) > -1
    });
    return flag
}

const checkCorrectPositionLetter = (perfectPosition, word) => {
    for (let position = 0; position < MAX_LETTER_COUNT; position++) {
        if (perfectPosition[position] != '' && word[position] != perfectPosition[position]) {
            return false
        }
    }
    return true
}

const chekWrongPositionLetter = (removalLetterAtPosition, word) => {
    let validFlag = true;
    for (let position = 0; position < MAX_LETTER_COUNT; position++) {
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

const checkInValidLetter = (inValidLetterData, word) => {
    for (let index = 0; index < inValidLetterData.length; index++) {
        if (word.indexOf(inValidLetterData[index]) > 0) return false
    }
    return true
}

const retrievePossibleOutcome = (inValidLetterData, removalLetterAtPosition, perfectPosition) => {

    let filteredDataSet = DICTIONARY_WORD_DATA.filter((word, index) => {

        if (checkInValidLetter(inValidLetterData, word) &&
            chekWrongPositionLetter(removalLetterAtPosition, word) &&
            checkCorrectPositionLetter(perfectPosition, word)) {
            return word
        }

    });

    let presentLetterArray = Array.prototype.concat.apply([], removalLetterAtPosition);
    return [...new Set(filteredDataSet.map(word => word))]
            .filter(outComeWord => isEveryLetterPresent(outComeWord, presentLetterArray));

}
const renderOutcomeDetail = (possibleOutcome) => {
    let content = ''
    possibleOutcome.forEach(word => {
        content += `<a href="https://www.google.com/search?q=${word}+meaning" target="_blank">${word}</a> `
    });

    $("#OutComeContainer").html(content)
}
const getImproperPositionDetail = () => {
    let data = []
    for (let index = 0; index < MAX_LETTER_COUNT; index++) {
        if ($(`#ImpropPosition${index}`).val() != '') {
            let convertedData = []
            $(`#ImpropPosition${index}`).val().split(',')
                .forEach(element => {
                    convertedData.push(element.toUpperCase())
                })
            data.push(convertedData)
        } else {
            data.push([])
        }
    }
    return data
}
const getproperPositionDetail = () => {
    let data = []
    for (let index = 0; index < MAX_LETTER_COUNT; index++) {
        data.push($(`#propPosition${index}`).val().toUpperCase())
    }
    return data
}

const selectLetter = (letterId) => {
    LETTER_DETAIL.filter(letterObj => {
        if (letterObj.Letter == letterId) {
            letterObj.Status = !letterObj.Status
            if (letterObj.Status) {
                $(`#${letterId}`).css('background', '#92b4c4')
                $(`#${letterId}`).css('color', 'white')
            } else {
                $(`#${letterId}`).css('background', '#d0e9f5')
                $(`#${letterId}`).css('color', '#064970')
            }
        }
    })
}
 
function loadData() {
    /* let inValidLetterData = ['C', 'E', 'K', 'O', 'R', 'T', 'U']
    let removalLetterAtPosition = [
        [],
        [],
        ['P', 'L'],
        ['I'],
        [],
    ]
    let perfectPosition = ['S', 'P', '', '', '']  */
 
 
    $("#GenerateSolutionBtn").on('click', () => {

       let inValidLetterData = LETTER_DETAIL.filter(letterObj => letterObj.Status).map(item => item.Letter)
        let removalLetterAtPosition = getImproperPositionDetail()
        let perfectPosition = getproperPositionDetail() 
 
       let possibleOutcome = retrievePossibleOutcome(inValidLetterData, removalLetterAtPosition, perfectPosition)  
        renderOutcomeDetail(possibleOutcome)
        document.getElementById('OutComeContainer').focus();
    })
    $("#ClearBtn").on('click', () => {
        LETTER_DETAIL.filter(letterObj => {
            letterObj.Status = false
            $(`#${letterObj.Letter}`).css('background', '#d0e9f5')
            $(`#${letterObj.Letter}`).css('color', '#064970')
        })
        for (let index = 0; index < MAX_LETTER_COUNT; index++) {
            $(`#propPosition${index}`).val('')
            $(`#ImpropPosition${index}`).val('')  
        }
    })
}