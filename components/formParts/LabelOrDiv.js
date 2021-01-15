// renders a block wrapped with a div or a label
// props: 
// .html: true for label, none (cause defaultProp) for div 
// .for : the for attribute for the label

const LabelOrDiv = props => (
    <>
        {props.html && 
            <label htmlFor={props.for ? props.for : ""} className="form-part__labelish">
                {props.children}
            </label>
        }
        {!props.html && 
            <div className="form-part__labelish">
                {props.children}
            </div>
        }
    </>
);
LabelOrDiv.defaultProps = {
    html: false,
    for: "",
}

export default LabelOrDiv;