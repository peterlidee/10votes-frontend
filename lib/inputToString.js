// receives null or String, returns trimmed string or "", also removes double spaces inside string
// f.e. "   test   " -> "test"
// f.e. null -> ""
function inputToString(input){
    if(!input) return '';
    //const newInput = input.replace(/\s{2,}/g, ' ').trim();
    return input.replace(/\s{2,}/g, ' ').trim();
}

export { inputToString};