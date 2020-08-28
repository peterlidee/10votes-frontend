import validateFile from '../../lib/validateFile';
import PropTypes from 'prop-types';
import IconUpload from '../snippets/IconUpload';
import Loader from '../snippets/Loader';

class ManageUpload extends React.Component{
    state = {
        errorMessage: "",
        loading: false,
    }

    cancelAll = (errorMessage) => {
        // 1. set error to this components state
        // 2. reset the entire state to blank
        // 3. reset the form to blank
        this.setState({
            errorMessage,
            loading: false,
        });
        this.props.handleCancelAll();
        // reset the form
        document.getElementById('createItemForm').reset()
    }

    uploadFile = async (e) => {
        this.setState({
            loading: true
        });
        const files = e.target.files;
        // console.log('files', files)

        // validate the file, we only accept .jpeg, .jpg or .png
        if(!validateFile(files[0])){ // not valid, handle
            this.cancelAll('You can only upload .jpg, .jpeg or .png files.');
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
            // console.log('file', file)

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
            this.cancelAll(`Something went wrong (${error.message}), please try again`);
        }
    }

    render(){
        return(
            <>
                {!this.props.image &&
                    <div className="crud-item crud-upload__container">
                        <input 
                            type="file" id="file" name="file" 
                            placeholder="upload an image" 
                            onChange={this.uploadFile} 
                            required 
                            accept=".jpg, .jpeg, .png" 
                            className="crud-upload__input" disabled={this.state.loading} />
                        <label htmlFor="file" className="crud-upload__label">
                            <IconUpload />
                            <span className="crud-upload__label__text">Select your image</span>
                        </label>
                        {this.state.loading && <Loader containerClass="upload-loader" />}
                    </div> 
                }
                {this.state.errorMessage &&
                    <p>{this.state.errorMessage}</p>
                }
                {this.props.image && <img src={this.props.image} alt="upload preview" width="300" className="crud__pic-preview" />}
            </>
        )
    }
}

export default ManageUpload;