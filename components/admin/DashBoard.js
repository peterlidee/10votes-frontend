import MetaTitle from "../snippets/MetaTitle";
import SearchCreateType from "./SearchCreateType";

function DashBoard(){
    return(
        <>
            <MetaTitle>Admin dashboard</MetaTitle>
            <h1 className="title title--large title--admin">Admin dashboard</h1>
            <div className="admin-grid">
                <SearchCreateType type="users" />
                <SearchCreateType type="locations" />
                <SearchCreateType type="tags" />
            </div>
        </>
    )
}

export default DashBoard;