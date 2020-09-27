import PropTypes from 'prop-types';
import validateFile from '../../lib/validateFile';

import IconUpload from '../snippets/IconUpload';
import Loader from '../snippets/Loader';
import FormRow from '../formParts/FormRow';
import Error from '../snippets/Error';


class ManageUpload extends React.Component{

    static propTypes = {
        handleSetState: PropTypes.func.isRequired,
        image: PropTypes.string.isRequired,
    }

    state = {
        errorMessage: "",
        loading: false,
    }

    cancelUpload = (errorMessage) => {
        // 1. set error to this components state
        // 2. reset the entire state to blank
        // 3. reset the form to blank
        this.setState({
            errorMessage,
            loading: false,
        });
        // remove the error file from input
        document.getElementById('file').value = '';
    }

    uploadFile = async (e) => {
        this.setState({
            loading: true
        });
        const files = e.target.files;
        // console.log('files', files)

        // validate the file, we only accept .jpeg, .jpg or .png
        if(!validateFile(files[0])){ // not valid, handle
            this.cancelUpload('You can only upload .jpg, .jpeg or .png files.');
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
            //console.log('file', file)

            // send data to createItem component
            this.props.handleSetState({
                image: file.secure_url,
                largeImage: file.eager[0].secure_url,
            });
            // reset error to ""
            this.setState({
                errorMessage: "",
                loading: false,
            });

        }catch(error){
            // console.log('error', error)
            this.cancelUpload(`${error.message}, please try again`);
        }
    }

    render(){
        return(
            <FormRow 
                label={this.props.label} 
                valid={{...this.props.valid, error: Boolean(this.state.errorMessage)}}
                number={this.props.number}
            >
                {!this.props.image &&
                    <>
                        <input 
                            type="file" id="file" name="file" 
                            placeholder="upload an image" 
                            onChange={this.uploadFile} 
                            required 
                            disabled={this.state.loading}
                            accept=".jpg, .jpeg, .png" 
                            className="manage-upload__input" />
                        <label htmlFor="file" className="manage-upload__label">
                            <IconUpload />
                            <span className="manage-upload__label__text">Select your image</span>
                        </label>
                        {this.state.loading && <Loader containerClass="manage-upload__loader" />}
                    </> 
                }
                {this.state.errorMessage && 
                    <div className="manage-upload__error">
                        <Error error={{message: this.state.errorMessage}} />
                    </div>
                }
                {this.props.image && 
                    <div className="manage-upload__image-container">
                        <img src={this.props.image} alt="upload preview" className="manage-upload__image-preview" />
                        <button 
                            type="button" className="clear-button"
                            onClick={() => this.props.handleSetState({ image: "", largeImage: "" })}
                            >
                            &times;
                        </button>
                    </div>
                }
            </FormRow>
        )
    }
}

export default ManageUpload;