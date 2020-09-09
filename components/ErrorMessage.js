// remove the clutter
const ErrorMessage = ({ error }) => {
    let errorMessage = "";
    if(error.message){
        errorMessage = error.message.replace('GraphQL error: ', '').replace('Network error: ', '');
    }
    // just in case
    if(error.networkError && error.networkError.result && error.networkError.result.errors.length){
        errorMessage = error.networkError.result.errors[0].message.replace('Network error: ', '');
    }
    return <div className="error-message">{errorMessage}</div>
}

export default ErrorMessage;