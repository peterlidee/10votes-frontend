import MetaTitle from "../snippets/MetaTitle";
import SearchCreateType from "./SearchCreateType";

function DashBoard(){
    return(
        <>
            <MetaTitle>Admin dashboard</MetaTitle>
            <h1 className="title title--large title--large--admin">Admin dashboard</h1>
            <div className="admin-dash">
                <div>users</div>
                <SearchCreateType type="locations" />
                <div>tags</div>
            </div>
        </>
    )
}

export default DashBoard;