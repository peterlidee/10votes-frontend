import AdminGate from "../../components/admin/AdminGate";
import DashBoard from "../../components/admin/DashBoard";

function Admin(props){
    return(
        <AdminGate>
            <DashBoard />
        </AdminGate>
    )
}

export default Admin;