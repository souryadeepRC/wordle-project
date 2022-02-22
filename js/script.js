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

 const retrievePossibleOutcome = (inValidLetterData, removalLetterAtPosition, perfectPosition) => {
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
     filteredDataSet.forEach(word => {
         word.Is_Valid_Status = (DICTIONARY_WORD_DATA.find(properWord => properWord == word.Value)) ? true : false
     })
     let possibleResult = filteredDataSet.filter(letter => letter.Is_Valid_Status)
     return [...new Set(possibleResult.map(word => word.Value))]

 }
 const renderOutcomeDetail = (possibleOutcome) => {
     let content = ''
     possibleOutcome.forEach(word => {
         content += ` 
            <a href="https://www.google.com/search?q=${word}+meaning" target="_blank">${word}</a> `
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
             } else {
                 $(`#${letterId}`).css('background', '#d0e9f5')
             }
         }
     })
 }
 const renderLetterDetail = () => {
     let content = ''
     LETTER_LIST.forEach(letter => {
         content += `<p id="${letter}" onClick="selectLetter('${letter}')">${letter}</p> `
     });

     $("#EliminatedLetterContainer").html(content)
 }

 function loadData() {
     /* //const inValidLetterData = ['F', 'A', 'S', 'Q', 'U', 'X', 'H', 'I']
     let removalLetterAtPosition = [
         [], // Position 1
         ['E'], // Position 2
         ['E'], // Position 3
         ['E'], // Position 4
         ['T'] // Position 5
     ]
     let perfectPosition = [
         'T', // Position 1
         '', // Position 2
         '', // Position 3
         '', // Position 4
         'E', // Position 5
     ] */
     renderLetterDetail()
     console.log(LETTER_DETAIL);
     $("#GenerateSolutionBtn").on('click', () => {
         let inValidLetterData = LETTER_DETAIL.filter(letterObj => letterObj.Status).map(item => item.Letter)
         let removalLetterAtPosition = getImproperPositionDetail()
         let perfectPosition = getproperPositionDetail()

         /* console.log(inValidLetterData);
         console.log(removalLetterAtPosition);
         console.log(perfectPosition); */

         /* let possibleOutcome = retrievePossibleOutcome(inValidLetterData, removalLetterAtPosition, perfectPosition)
         console.log(possibleOutcome)
         renderOutcomeDetail(possibleOutcome) */
     })
 }