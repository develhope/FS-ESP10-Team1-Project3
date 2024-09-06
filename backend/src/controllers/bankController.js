const bankModel = require('../models/infoBancaria');

const getAllAccounts = async (req, res) => {
    try {
        const accounts = await bankModel.getAccounts();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
const createAcc = async (req, res) => {
    try {
        const {numeroCuenta, titular, pais, moneda} = req.body;
        const newAccount = await bankModel.createAccount(req.body);
        res.status(201).json({ msg: "cuenta creada" });
      
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error)
    }            
};


module.exports = { getAllAccounts, createAcc};