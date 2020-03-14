import Items from '../components/Items';

const Index = props => (
    <div>
        <Items page={parseFloat(props.query.page) || 1} />
    </div>
)

export default Index;