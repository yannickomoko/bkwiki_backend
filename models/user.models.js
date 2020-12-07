const sql = require('./db');
const { NotFoundError } = require('../helpers/utility');


// constructor
const User = function(user) {
    const today = new Date();
     
    this.user_id = user.user_id;
    this.username = user.username;
    this.phone = user.phone;
    this.email = user.email;
    this.firstname = user.firstname;
   // this.lastname = user.lastname;
    this.password = user.password; 
    this.created = today;
    this.modified = today;
     
};

User.create = async (newUser) => {
    let name = newUser.firstname;
    delete newUser.name;
    let insert = await sql.query("INSERT INTO users SET ?", newUser);
    if( insert.insertId ) {
        await sql.query("INSERT INTO users SET user_id = ?, name = ?", [insert.insertId, name]);
        return insert.insertId;
    }
    else {
        return;
    }
};

User.findBy = async (data, field, attach_additional_data = false) => {
    let row = await sql.query(`SELECT * FROM users WHERE ${field} = ?`, data[field]);

    if( row.length ) {
        let user = row[0];
        delete user.password;

        if( attach_additional_data ) {
            let addresses = [];

            try {
                addresses = await UserAddress.findByUserId(user.id);
            }
            catch(err) {
                console.log("Error in finding user address.", err);
            }

            user.address = addresses;
        }

        return user;
    }
    else {
        throw new NotFoundError("User does not exist");
    }
};

User.login = async (value) => {
    let row = await sql.query(`SELECT * FROM users WHERE phone = ?`, [value, value]);
    if( row.length ) {
        return row[0];
    }
    else {
        throw new NotFoundError("User does not exist");
    }
};

User.getAll = async (start, limit, return_total, sort_data) => {
    let str_query = "SELECT SQL_CALC_FOUND_ROWS * FROM user";
    let param_data = [];

    param_data.push(parseInt(start));
    param_data.push(parseInt(limit));

    str_query += " ORDER BY " + sort_data.sort_by + " " + sort_data.sort_dir + " LIMIT ?, ?";

    if( return_total ) {
        str_query += "; SELECT FOUND_ROWS() AS total_rows;"
    }

    let rows = await sql.query(str_query, param_data);
    let return_data = null;
    let users = [];

    if( return_total ) {
        users = rows[0];
        return_data = {total_rows: rows[1][0].total_rows};
    }
    else {
        users = rows;
    }

    // Handle no user found
    if( users.length == 0 ) {
        return_data.rows = users;
        return return_data;
    }

    // Remove password field
    users = users.map(item => {
        delete item.password;
        return item;
    });

    //console.log('rows', users);

    return_data.rows = users;

    return return_data;
};

User.getType = async (id) => {
    let row = await sql.query(`SELECT ut.name FROM user u LEFT JOIN user_types ut ON u.user_type_id = ut.id WHERE u.id = ?`, id);
    if( row.length ) {
        return row[0];
    }
    else {
        throw new NotFoundError("User does not exist");
    }
};

module.exports = User;