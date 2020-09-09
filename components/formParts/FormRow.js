// container element for that also supplies section label-ish

// renders a form row
// 1. FormNumber: the number of the row
// 2. FormSection:
//    2.1 <>, <label> or <div> (labelish)
//    2.2 props.children (f.e. ManageUpload or InputSuggestion)

// props is takes
// 1. number: { number, extraClass }
// 2. label:  { text, required, html (render <label> or <div>), for (attr to <label>) }
// 3. valid:  { field, form, error (from props.children or direct) }

import FormNumber from './FormNumber';
import LabelOrDiv from './LabelOrDiv';

const FormSection = props => (
    <>
        <FormNumber 
            {...props.number}
            valid={props.valid}
        />
        <div className="form-part__section">
            {props.label &&
                <LabelOrDiv {...props.label}>
                    <span className="form-part__labelish__text">{props.label.text}</span>
                    <span className="form-part__labelish__optional">{props.label.required ? "required" : "optional"}</span>
                </LabelOrDiv>
            }
            {props.children}
        </div>
    </>
);

export default FormSection;