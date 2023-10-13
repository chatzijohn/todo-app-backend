const Watermeter = require("../models/watermeterModel");
const { Op } = require("sequelize");

const getWatermeters = async (req, res, next) => {
  try {
    // get query params
    const {
      page = null,
      pageSize = null,
      sortBy = null,
      sortOrder = "asc",
      serialNumber = null,
      brandName = null,
    } = req.query;

    // Check validity of sortBy param
    const validSortFields = Object.keys(Watermeter.getAttributes());

    if (sortBy && !validSortFields.includes(sortBy)) {
      throw { name: "InvalidSortByError" };
    }
    // define query options for sorting, filtering and pagination
    let options = {
      where: {
        ...(serialNumber && { serialNumber: { [Op.iLike]: `%${serialNumber}%` } }),
        ...(brandName && { brandName: { [Op.iLike]: `%${brandName}%` } }),
      },
      order: sortBy ? [[sortBy, sortOrder]] : [],
      offset: parseInt(page - 1) * pageSize,
      limit: pageSize,
    };
    // fetch all watermeters
    const watermeters = await Watermeter.getAll(options);
    //calculate total size of entries
    const totalSize = await Watermeter.count({
      where: options.where,
    });

    res.status(200).json({ watermeters, totalSize });
  } catch (error) {
    next(error);
  }
};

const getWatermeter = async (req, res, next) => {
  try {
    const watermeterId = req.params.id;
    const watermeter = await Watermeter.findById(watermeterId);
    if (!watermeter) {
      throw { name: "NotFoundError" };
    }
    res.status(200).json(watermeter);
  } catch (error) {
    next(error);
  }
};

const addWatermeter = async (req, res, next) => {
  try {
    const {
      serialNumber,
      brandName,
      currentReading,
      isActive,
      deviceId,
      geometry,
    } = req.body;
    // Check if any required property is missing
    if (
      !serialNumber ||
      !brandName ||
      !currentReading ||
      !isActive ||
      !deviceId ||
      !geometry
    ) {
      throw { name: "RequiredPropertiesError" };
    }

    const watermeterData = {
      serialNumber,
      brandName,
      currentReading,
      isActive,
      deviceId,
      geometry,
    };
    const watermeter = await Watermeter.save(watermeterData);

    res.status(201).json(watermeter);
  } catch (error) {
    next(error);
  }
};

const updateWatermeter = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      serialNumber,
      brandName,
      currentReading,
      isActive,
      deviceId,
      geometry,
    } = req.body;

    const watermeterToUpdate = await Watermeter.findById(id);

    if (!watermeterToUpdate) {
      throw { name: "NotFoundError" };
    }

    watermeterToUpdate.serialNumber = serialNumber;
    watermeterToUpdate.brandName = brandName;
    watermeterToUpdate.currentReading = currentReading;
    watermeterToUpdate.isActive = isActive;
    watermeterToUpdate.deviceId = deviceId;
    watermeterToUpdate.geometry = geometry;

    await watermeterToUpdate.save();

    res.status(200).json(watermeterToUpdate);
  } catch (error) {
    next(error);
  }
};

const deleteWatermeter = async (req, res, next) => {
  try {
    const id = req.params.id;

    const watermeterToDelete = await Watermeter.findById(id);

    if (!watermeterToDelete) {
      throw { name: "NotFoundError" };
    }

    await watermeterToDelete.delete();

    res.status(200).json({ message: "Watermeter deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWatermeters,
  getWatermeter,
  addWatermeter,
  updateWatermeter,
  deleteWatermeter,
};
