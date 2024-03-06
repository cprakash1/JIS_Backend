const Registrar = require("../Models/Registrar.model");
const Temp = require("../Models/Temp.model");

class RegistrarRepository {
  async create(registrar) {
    try {
      if (!registrar) throw new Error("Registrar object is required");
      if (!registrar.name) throw new Error("Registrar name is required");
      if (!registrar.email) throw new Error("Registrar email is required");
      if (!registrar.password)
        throw new Error("Registrar password is required");
      if (!registrar.phone) throw new Error("Registrar phone is required");
      if (!registrar.address) throw new Error("Registrar address is required");
      const result = await Temp.findOneAndUpdate(
        { name: "registrar" },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
      );
      const newRegistrar = new Registrar({
        ...registrar,
        id: "R" + result.count,
      });
      console.log(newRegistrar);
      return await newRegistrar.save();
    } catch (error) {
      throw error;
    }
  }
  async getByEmail(email) {
    try {
      if (!email) throw new Error("Email is required");
      return await Registrar.findOne({ email });
    } catch (error) {
      throw error;
    }
  }
  async getById(id) {
    try {
      if (!id) throw new Error("Id is required");
      return await Registrar.findOne({ id: id });
    } catch (error) {
      throw error;
    }
  }
  async getByPhone(phone) {
    try {
      if (!phone) throw new Error("Phone is required");
      return await Registrar.findOne({ phone });
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      return await Registrar.find();
    } catch (error) {
      throw error;
    }
  }
  async update(registrar) {
    try {
      if (!registrar) throw new Error("Registrar object is required");
      if (!registrar.id) throw new Error("Registrar id is required");
      await Registrar.findOneAndUpdate({ id: registrar.id }, registrar, {});
      return await Registrar.findOne({ id: registrar.id });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RegistrarRepository();
