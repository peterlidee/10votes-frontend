import SingleTaxonomyQuery from './SingleTaxonomyQuery';

const EditLocation = (props) => ( // props: locationId and type (locations, tags, users)
    <SingleTaxonomyQuery {...props}>
        {(data) => {
            console.log('data',data)
            return(
                <div>
                    hello, i'm the {props.type.slice(0,-1)}: {data[props.type.slice(0,-1)].name}
                </div>
            )
        }}
    </SingleTaxonomyQuery>
)

export default EditLocation;