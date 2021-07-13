// takes string, return string with first letter capitalized 
function capitalizeString(string){
    const newString = string[0].toUpperCase() + string.slice(1,string.length);
    return newString;
}

// receives null or String, returns trimmed string or "", also removes double spaces inside string
// f.e. "   test   " -> "test"
// f.e. null -> ""
function inputToString(input){
    if(!input) return '';
    return input.replace(/\s{2,}/g, ' ').trim();
}

// check if file is one of types
function validateFile(file){
    const fileTypes = [
        "image/jpeg",
        "image/png",
    ];
    return fileTypes.includes(file.type);
}

// verify orderParam
// takes orderParam as param, returns default if not valid
function verifyOrderParam(orderParam){
    // check if there's a url prop query param called order
    let orderBy = 'createdAt_DESC'; // the default
    // if not, set it to default createdAt_ASC
    // else 
    // 1. find out if the param matches the possibilities
    const orderByOptions = [ "voteCount_ASC", "voteCount_DESC", "createdAt_ASC", "createdAt_DESC" ];
    // 2. and then use it or if not, use default
    if(orderParam){
        if(orderByOptions.includes(orderParam)){
            orderBy = orderParam;
        }
    }
    return orderBy;
}

export { capitalizeString, inputToString, validateFile, verifyOrderParam };