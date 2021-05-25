import PropTypes from 'prop-types'
import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'
import EditHeader from './EditHeader'
import UserPermissions from './UserPermissions'
import UserSummary from './UserSummary'

const EditUser = (props) => ( // props: userId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {(data) => {
            console.log('data',data)
            return(
                <div>
                    <EditHeader type={props.type} data={data} />
                    <section className="admin-grid">
                        <UserSummary data={data} />
                        <UserPermissions data={data} />
                    </section>

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