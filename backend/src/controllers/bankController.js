const bankModel = require('../models/infoBancaria');

const getAllAccountsByToken = async (req, res) => {
    try {
        const accounts = await bankModel.filterByToken(req.body.token);
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
};
const createAcc = async (req, res) => {
    try {
        const {numero_cuenta, titular, pais, moneda, seleccionada, token} = req.body;
        const propietario = await bankModel.getPropetario(token);
        const nuevaCuenta = { ...req.body, propietario };
        const newAccount = await bankModel.createAccount(nuevaCuenta);
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
  const selectAcc = async (req, res) => {
    try {
      const result = await bankModel.selectAccount(req.body.numero_cuenta);
  
      if (result) {
        res.status(200).json({ message: 'Successfully selected' });
      } else {
        res.status(404).json({ error: 'select didnt work' });
      }
          }
   catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
  } 

module.exports = { getAllAccountsByToken, createAcc, deleteAcc, selectAcc};