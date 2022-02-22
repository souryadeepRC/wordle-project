
var WORD_DATA  = []
const getDictionaryWordCollection = () => {
    let url = 'data/words.json'
    $.get(url, (data, status) => { 
        return data
    });
}
const loadContent = () => {
    if(WORD_DATA){
        console.log(WORD_DATA);
        console.log('Loader off...');
        clearInterval(myInterval); 
    }else{
        console.log('Loader On...');
    }
}

function myTimer() {
    console.log('myTimer Called');
    if(WORD_DATA.length>0){
        console.log(WORD_DATA);
        console.log('Loader off...');
        clearInterval(myInterval); 
    }else{
        console.log('Loader On...');
    }
}
 
function loadData() {
    console.log('Hello World !')
   
    WORD_DATA = getDictionaryWordCollection()
     
    console.log(WORD_DATA);
}