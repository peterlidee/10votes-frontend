// this component renders a number next to a form section
// the number background renders blue when valid, orange when error and grey else
// if the form is valid up until this field, the line will be blue, else grey

const CrudNumber = props => {
    // add extra class if present
    let containerClass = `form-part__number ${props.extraClass}`;
    // add classes if form and input are valid
    if(props.valid){
        if(props.valid.field)   containerClass += ` validField`;
        if(props.valid.form)    containerClass += ` validForm`;
        if(props.valid.error)   containerClass += ` errorField`;
    }
    return(
        <div className={containerClass}>
            <div className="form-part__number__inner">{props.number ? props.number : "!"}</div>
        </div>
    )
};

CrudNumber.defaultProps = {
    extraClass: "",
}

export default CrudNumber;