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
        const {numeroCuenta, titular, pais, moneda, seleccionada} = req.body;
        const newAccount = await bankModel.createAccount(req.body);
        res.status(201).json({ msg: "cuenta creada" });
      
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error)
    }            
};
const deleteAcc = async (req, res) => {
    try {
      const result = await bankModel.deleteAccount(req.body.numero_cuenta);
  
      if (result) {
        res.status(200).json({ message: 'Successfully deleted' });
      } else {
        res.status(404).json({ error: 'delete didnt work' });
      }
          }
   catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
  } 

module.exports = { getAllAccounts, createAcc, deleteAcc};