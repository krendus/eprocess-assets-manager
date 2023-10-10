// creates users table
export const createUserTable = (tx, callback) => {
    return tx.executeSql(
        "create table if not exists users (" +
            "id integer primary key autoincrement," +
            "username string unique," +
            "role string," +
            "team string," +
            "email string," +
            "phone string," +
            "team_lead string," +
            "organization string," +
            "password string," +
            "created_at integer" +
        ");", 
        [],
        (_, data) => {
            success(data.rows._array, callback)
        },
        (_, err) => {
            error(err, callback)
        }
    )
}
// creates assets table
export const createAssetTable = (tx, callback) => {
    return tx.executeSql(
        "create table if not exists assets (" +
            "id integer primary key autoincrement,"+
            "name string," +
            "accessories string," +
            "serial_number string,"+
            "received_date string,"+
            "image string,"+
            "team string,"+
            "status string," +
            "return_image string," +
            "return_date string," +
            "return_reason string," +
            "team_lead string,"+
            "user_id integer,"+
            "created_at integer"+
        ");",
        [],
        (_, data) => {
            success(data.rows._array, callback)
        },
        (_, err) => {
            error(err, callback)
        }
    )
}
export const success = (data, callback) => {
    console.log("Successful", data);
    if(!callback) {
        return;
    }
    callback(data, null);
}
export const error = (err, callback) => {
    console.log("Error...");
    if(!callback) {
        return;
    }
    callback(null, err)
}

export const init = (tx) => {
    createUserTable(tx);
    createAssetTable(tx);
}
