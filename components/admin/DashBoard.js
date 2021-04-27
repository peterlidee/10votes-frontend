import MetaTitle from "../snippets/MetaTitle";
import SearchCreateType from "./SearchCreateType";

function DashBoard(){
    return(
        <>
            <MetaTitle>Admin dashboard</MetaTitle>
            <h1 className="title title--large title--large--admin">Admin dashboard</h1>
            <div className="admin-dashboard">
                <SearchCreateType type="users" />
                <SearchCreateType type="locations" />
                <SearchCreateType type="tags" />
            </div>
        </>
    )
}

export default DashBoard;