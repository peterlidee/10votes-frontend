import { useState } from 'react';
import PropTypes from 'prop-types';
import { validateFile } from '../../lib/helpers';

import IconUpload from '../snippets/icons/IconUpload';
import Loader from '../snippets/Loader';
import FormRow from '../formParts/FormRow';
import Error from '../snippets/Error';

function ManageUpload(props){
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // handle the upload to and res from cloudinary
    const uploadFile = async(e) => {
        setLoading(true);
        const files = e.target.files;

        // validate the file, we only accept .jpeg, .jpg or .png
        if(!validateFile(files[0])){ // not valid, handle
            cancelUpload('You can only upload .jpg, .jpeg or .png files.');
            return null;
        }

        try{
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', '10votes');
            const res = await fetch('https://api.cloudinary.com/v1_1/diidd5fve/image/upload', {
                method: 'POST',
                body: data
            });
            const file = await res.json();

            // send data to createItem component
            props.handleImageSelection({
                small: file.secure_url,
                large: file.eager[0].secure_url,
            })
            // reset error to ""
            setErrorMessage('');
            setLoading(false);

        }catch(error){
            cancelUpload(`${error.message}, please try again`);
        }

    }
    const cancelUpload = error => {
        // 1. set error to this components state
        // 2. loading to false
        setErrorMessage(error);
        setLoading(false);
        // remove the error file from input
        document.getElementById('file').value = '';
    }

    return(
        <FormRow 
            label={props.label} 
            valid={{...props.valid, error: Boolean(errorMessage)}}
            number={props.number}
        >
            {!props.image &&
                <>
                    <input 
                        type="file" id="file" name="file" 
                        placeholder="upload an image" 
                        onChange={uploadFile} 
                        required 
                        disabled={loading}
                        accept=".jpg, .jpeg, .png" 
                        className="manage-upload__input" />
                    <label htmlFor="file" className="manage-upload__label">
                        <IconUpload />
                        <span className="manage-upload__label__text">Select your image</span>
                    </label>
                    {loading && <Loader containerClass="manage-upload__loader" />}
                </> 
            }
            {errorMessage && 
                <div className="manage-upload__error">
                    <Error error={{message: errorMessage}} />
                </div>
            }
            {props.image && 
                <div className="manage-upload__image-container">
                    <img src={props.image} alt="upload preview" className="manage-upload__image-preview" />
                    <button 
                        type="button" className="clear-button"
                        onClick={() => props.handleImageSelection({ small: '', large: ''})}
                    >
                        &times;
                    </button>
                </div>
            }
        </FormRow>
    )
}

ManageUpload.propTypes = {
    handleImageSelection: PropTypes.func.isRequired,
    label: PropTypes.object.isRequired,
    valid: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
}

export default ManageUpload;