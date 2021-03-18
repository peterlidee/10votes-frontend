// little wrapper component for 'errorish' no data feedback

function NoData(props){
    return <p className="no-data">{props.children}</p>
}

export default NoData;