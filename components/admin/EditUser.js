import SingleTaxonomyQuery from './SingleTaxonomyQuery';

const EditUser = (props) => ( // props: userId and type (locations, tags, users)
    <SingleTaxonomyQuery {...props}>
        {(data) => {
            console.log('data',data)
            return(
                <div>
                    hello, i'm the {props.type.slice(0,-1)}: {data[props.type.slice(0,-1)]?.name || data[props.type.slice(0,-1)]?.id}
                </div>
            )
        }}
    </SingleTaxonomyQuery>
)

export default EditUser;