import PropTypes from 'prop-types'
import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'

const EditUser = (props) => ( // props: userId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {(data) => {
            console.log('data',data)
            return(
                <div>
                    hello, i'm the {props.type.slice(0,-1)}: {data[props.type.slice(0,-1)]?.name || data[props.type.slice(0,-1)]?.id}
                </div>
            )
        }}
    </SingleTaxonomyAdmin>
)

EditUser.propTypes = {
    userId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default EditUser;