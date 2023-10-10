import { error, success } from "."

export const insertAsset = async ( tx, item, callback) => {
    return tx.executeSql(
        `insert into assets (name, accessories, serial_number, received_date, image, team, team_lead, status, return_date, return_reason, return_image, created_at, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.name, item.accessories, item.serial_number, item.received_date, item.image, item.team, item.team_lead, item.status, item?.return_date, item?.return_reason, item?.return_image, item.created_at, item.user_id],
        (_, data) => {
            success(data.insertId, callback);
        },
        (_, err) => {
            error(err, callback);
        }
    )
}
export const selectSingleAsset = async (tx, item, callback) => {
    return tx.executeSql(
        `select * from assets where id = ? and user_id = ?;`,
        [item.id, item.user_id],
        (_, data) => {
            success(data.rows._array[0], callback);
        },
        (_, err) => {
            error(err, callback);
        }
    )
}
export const updateSingleAsset = async (tx, item, callback) => {
    return tx.executeSql(
        `update assets set status = ?, return_reason = ?, return_image = ?, return_date = ? where id = ? and user_id = ?;`,
        [item.status, item.return_reason, item.return_image, item.return_date, item.id, item.user_id],
        (_, data) => {
            success(data.rows._array[0], callback);
        },
        (_, err) => {
            error(err, callback);
        }
    )
}
export const selectAllAsset = async (tx, id, callback) => {
    return tx.executeSql(
        `select * from assets where user_id = ?;`,
        [id],
        (_, data) => {
            success(data.rows._array, callback);
        },
        (_, err) => {
            error(err, callback);
        }
    )
}
