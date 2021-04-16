import MetaTitle from "../snippets/MetaTitle";
import SearchCreateType from "./SearchCreateType";

function DashBoard(){
    return(
        <div>
            <MetaTitle>Admin dashboard</MetaTitle>
            <h1 className="title title--large">Admin dashboard</h1>
            <div>users</div>
            <SearchCreateType type="location" />
            <div>tags</div>
        </div>
    )
}

export default DashBoard;