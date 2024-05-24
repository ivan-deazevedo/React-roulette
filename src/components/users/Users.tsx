import { User } from "../../models/users";
import { UserDelete } from "../../api_functions/apiFunctions";
import styles from './Users.module.css'

interface IUserProps {
    user: User;
    fetchDataCallBack: () => void;
}

const Users: React.FC<IUserProps> = ({ user, fetchDataCallBack }) => {

    user.isChecked = false;

    return(
    <>
        <div className={styles.users}>
            <label htmlFor="resto">{user.voornaam + " " + user.familienaam}</label>
            <input type="checkbox" id={user.id.toString()} name={user.voornaam} value={user.voornaam} onChange={(e) => user.isChecked = e.target.checked} />
            <button onClick={() => UserDelete(user.id, fetchDataCallBack )}>X</button>
        </div>
    </>
    )
}

export default Users