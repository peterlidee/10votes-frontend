// takes string, return string with first letter capitalized 
function capitalizeString(string){
    const newString = string[0].toUpperCase() + string.slice(1,string.length);
    return newString;
}

export default capitalizeString;