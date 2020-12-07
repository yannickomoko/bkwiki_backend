const sql = require('../models/db');

exports.getAllagences = async(req, res) => {
    sql.query('SELECT * FROM banques', (err, data) => {
        if(err) throw err;
        res.send(JSON.stringify(data));
         
    })
};

exports.getID = async (req, res) => {
    const code = req.params.id;
    sql.query('SELECT * FROM banques WHERE code_bank= ?', code, (err, data) => {
        if(err) throw err;
        res.send(JSON.stringify(data));
        console.log(data);
        console.log(code);
        
    })
};

exports.getAllTypeCredit = async (req, res) => {
    sql.query('SELECT * FROM type_credit', (err, data) => {
        if(err)throw err;
        res.send(JSON.stringify(data));
    })
};

exports.getTypeCredit = async (req, res) => {
    const code_type = req.params.id;
    sql.query('SELECT * FROM type_credit WHERE code_bank= ?', code_type, (err, data) => {
        if(err)throw err;
        res.send(JSON.stringify(data));
    })
};

exports.getAllTypeCompte = async (req, res) => {
    sql.query('SELECT * FROM type_compte', (err, data) =>{
        if(err) throw err;
        res.send(JSON.stringify(data));
    })
};

exports.getTypeCompte = async (req, res) => {
    const code_cpte = req.params.id;
    sql.query('SELECT * FROM type_compte WHERE code_bank= ?', code_cpte, (err, data) =>{
        if(err) throw err;
        res.send(JSON.stringify(data));
    })
};

exports.getClients = async (req, res) => {
    sql.query('SELECT * FROM clients', (err, data) =>{
        if(err) throw err;
        res.send(JSON.stringify(data));
    })
};

exports.getCltInfo = async (req, res) => {
    const code_clt = req.params.phone;
    sql.query('SELECT * FROM clients WHERE telephone_client= ?', code_clt, (err, data) =>{
        if(err) throw err;
        res.send(JSON.stringify(data));
    })
};
