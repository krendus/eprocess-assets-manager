// creates users table
export const createUserTable = (tx, callback) => {
    return tx.executeSql(
        "create table if not exists users (" +
            "id integer primary key autoincrement," +
            "username text unique," +
            "role text," +
            "team text," +
            "email text," +
            "phone text," +
            "team_lead text," +
            "organization text," +
            "password text," +
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
            "name text," +
            "accessories text," +
            "serial_number text,"+
            "received_date text,"+
            "image text,"+
            "team text,"+
            "status text," +
            "return_image text," +
            "return_date text," +
            "return_reason text," +
            "team_lead text,"+
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
