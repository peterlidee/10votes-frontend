import PropTypes from 'prop-types'
import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'
import EditHeader from './EditHeader'

const EditUser = (props) => ( // props: userId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {(data) => {
            console.log('data',data)
            return(
                <div>
                    <EditHeader type={props.type} data={data} />
                    <section className="admin__taxonomy-sections-grid admin__taxonomy-sections-grid--tags">
                        <div className="admin-section">
                            <h2 className="item-crud__title title">Summary</h2>
                            <div className="taxonomy-summary">
                                {/* name / email */}
                                <div className="taxonomy-summary__label">user email:</div>
                                <div>{data.user.email}</div>

                                {/* user summary: uploads, votes given and received */}
                                <div className="taxonomy-summary__label">uploads:</div>
                                <div>{data.user.items.length}</div>
                                <div className="taxonomy-summary__label">votes cast:</div>
                                <div>{data.user.votes.length}</div>
                                <div className="taxonomy-summary__label">votes received:</div>
                                <div>{data.user.items.reduce((acc, item) => { return acc + item.votes.length }, 0)}</div>
                            </div>
                        </div>
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