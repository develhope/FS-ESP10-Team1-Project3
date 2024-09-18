const servicesModel = require("../models/services");
const bankModel = require("../models/infoBancaria")
const createService = async (req, res) => {
  try {
    const { titulo, pago, descripcion, categoria, token, imagen_path } = req.body;
    const creator_id = await bankModel.getPropetario(token);
    const nuevaOferta = { titulo, pago, descripcion, categoria, imagen_path, creator_id };
    const newService = await servicesModel.createService(nuevaOferta);
    res.status(201).json({ msg: "Oferta creada con éxito", service: newService });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};
const getAllOffers = async (req, res) => {
    try {
      const offers = await servicesModel.getOffers();
      res.json(offers);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
      console.error(error);
      
    }
  };
module.exports = { createService, getAllOffers };


