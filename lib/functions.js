// receives null or String, returns trimmed string or "", also removes double spaces inside string
// f.e. "   test   " -> "test"
// f.e. null -> ""
function inputToString(input){
    if(!input) return '';
    //const newInput = input.replace(/\s{2,}/g, ' ').trim();
    return input.replace(/\s{2,}/g, ' ').trim();
}

// remove duplicates from an array (also inlude lower and uppercase cases, so we can't use set)
// whitespaces where removed already!
function removeDuplicates(array){
    const newArray = [];
    array.map(item => {
        const check = newArray.find(newItem => newItem.toLowerCase() == item.toLowerCase());
        if(!check){
            newArray.push(item)
        }
    })
    return newArray;
} // TODO, needed?

export { inputToString};