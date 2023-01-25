const applicantModel = require("../model/Applicant");
const cloudinary = require("cloudinary").v2;
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.resolve(__dirname, "../upload");
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath);
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `resume-${Date.now()}.pdf`);
//   },
// });
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type, only PDF is allowed!"), false);
//     }
//   },
// });

cloudinary.config({
  cloud_name: "dhupp7wwx",
  api_key: "549775959516217",
  api_secret: "48zYFHE8fpoDdBgdDQuXSMCZd44",
});

const createApplicant = async (req, res) => {
  cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      postal,
      github,
    } = req.body;
    const applicant = new applicantModel({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      postal,
      github,
      resume: result.url,
    });
    try {
      applicant.save();
      res
        .status(201)
        .json({ message: "Applicant Created Succesfully", applicant });
    } catch (e) {
      res.status(400).json({ message: "Something Went Wrong", e });
    }
  });
};

const getApllicant = async (req, res) => {
  try {
    const applicant = await applicantModel.find({}).sort({ createdAt: -1 });
    const Count = await applicantModel.countDocuments({});
    res
      .status(200)
      .json({ message: "Applicant Fetched Succesfully", applicant, Count });
  } catch (e) {
    res.status(400).json({ message: "Something Went Wrong", e });
  }
};

const getApllicantById = async (req, res) => {
  const { id } = req.params;
  try {
    const applicant = await applicantModel.findById(id);
    res
      .status(200)
      .json({ message: "Applicant Fetched Succesfully", applicant });
  } catch (e) {
    res.status(400).json({ message: "Something Went Wrong", e });
  }
};

const searchApplicant = async (req, res) => {
  const { firstName } = req.params;
  try {
    const applicant = await applicantModel.find({
      firstName: { $regex: firstName, $options: "i" },
    });
    res
      .status(200)
      .json({ message: "Applicant Fetched Succesfully", applicant });
  } catch (e) {
    res.status(400).json({ message: "Something Went Wrong", e });
  }
};

const deleteApplicant = async (req, res) => {
  const { id } = req.params;
  try {
    const applicant = await applicantModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Applicant Deleted Succesfully", applicant });
  } catch (e) {
    res.status(400).json({ message: "Something Went Wrong", e });
  }
};

module.exports = {
  createApplicant,
  getApllicant,
  getApllicantById,
  searchApplicant,
  deleteApplicant,
};
