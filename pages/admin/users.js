import AdminGate from "../../components/admin/AdminGate";
import EditUser from "../../components/admin/EditUser";

function Users(){
    return(
        <AdminGate>
            <EditUser />
        </AdminGate>
    )
}

export default Users;