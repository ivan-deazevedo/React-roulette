import React from "react";
import { User } from "../../models/users";
import Users from "./Users";
import styles from "./ListUsers.module.css"


interface IListUserProps{
    users: User[],
    fetchCallBack: () => void;
}

const ListUsers: React.FC<IListUserProps> = ({users, fetchCallBack}) => {

    return (      
        <>
            <div className={styles.table_div}>
                <h2>Wie besteld:</h2>
                <div className={styles.table}>
                    {users.map(user => <Users key={user.id} user={user} fetchDataCallBack={fetchCallBack} />)}
                </div>
            </div>
        </>
    );
};

export default ListUsers;