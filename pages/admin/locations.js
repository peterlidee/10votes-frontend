import AdminGate from "../../components/admin/AdminGate";
import EditLocation from "../../components/admin/EditLocation";

function Locations(){
    return(
        <AdminGate>
            <EditLocation />
        </AdminGate>
    )
}

export default Locations;