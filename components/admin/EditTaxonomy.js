import PropTypes from 'prop-types'

import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'
import EditHeader from './EditHeader'
import TaxonomySummary from './TaxonomySummary'
import UserSummary from './UserSummary'
import UpdateTaxonomy from './UpdateTaxonomy'
import UserPermissions from './UserPermissions'
import DeleteTaxonomy from './DeleteTaxonomy'
import UsersItems from './UsersItems'
import UsersVotedItems from './UsersVotedItems'

const EditTaxonomy = props => ( // props: id and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {(data) => (
            <>
                <EditHeader type={props.type} data={data} />
                <section className="admin-grid">
                    {(props.type == "locations" || props.type == "tags") && (
                        <>
                            <TaxonomySummary type={props.type} data={data} />
                            <UpdateTaxonomy type={props.type} id={data[props.type.slice(0,-1)].id} />
                        </>
                    )}
                    {props.type == "users" && (
                        <>
                            <UserSummary data={data} />
                            <UserPermissions data={data} />
                        </>
                    )} 
                    <DeleteTaxonomy type={props.type} id={props.id} />
                </section>
                {props.type == "users" && (
                    <>
                        <UsersItems items={data.user.items} />
                        <UsersVotedItems votes={data.user.votes} />
                    </>
                )} 
            </>
        )}
    </SingleTaxonomyAdmin>
)

EditTaxonomy.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default EditTaxonomy;