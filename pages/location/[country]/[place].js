import SingleLocation from "../../../components/SingleLocation";

// displays location, fe /be/gent

const Place = props => (
    <div>
        <SingleLocation query={props.query} />
    </div>
)

export default Place;