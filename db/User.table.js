import { error, success } from "."

export const insertUser = async (tx, item, callback) => {
    return tx.executeSql(
        `insert into users (username, role, team, team_lead, organization, password, created_at, email, phone) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.username, item.role, item.team, item.team_lead, item.organization, item.password, item.created_at, item.email, item.phone],
        (_, data) => {
            success(data.insertId, callback);
        },
        (_, err) => {
            error(err, callback);
        }
    )
}
export const selectSingleUser = async (tx, id, callback) => {
    return tx.executeSql(
        `select * from users where id = ?;`,
        [Number(id)],
        (_, data) => {
            success(data.rows._array[0], callback);
        },
        (_, err) => {
            error(err, callback);
        }
    )
}
export const selectAuthenticatedUser = async (tx, item, callback) => {
    return tx.executeSql(
        `select * from users where username = ? and password = ?;`,
        [item.username, item.password],
        (_, data) => {
            success(data.rows._array[0], callback);
        },
        (_, err) => {
            error(err, callback);
        }
    )
} 
