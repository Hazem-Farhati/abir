import Project from '../models/project.model.js';
import { errorHandler } from "../utils/error.handler.js";
import { valdiateProject } from '../validations/projects.schema.js';
import fs from 'fs';
import multer from 'multer';

//create project


export const createProject = async (req, res, next) => {
    const {  name , description} = req.body;
    // validate regiseter schema
    const { error } = valdiateProject(req.body);
    if (error) return next(errorHandler(400, `${error.details[0].message}`));
    // check if project already exists
    const existProject= await Project.find({ $or: [{ name }] });
    if (existProject.length) return next(errorHandler(409, "Project already exists"));
    
    const newProject = new Project({
      name,
      description
    });
    try {
      await newProject.save();
      const projectFolderPath = `./projects/${req.body.name}`;
     fs.mkdirSync(projectFolderPath, { recursive: true });
      return res
        .status(201)
        .json({ message: "Projected created successfully", status: true });
    } catch (error) {
      next(error);
    }
    
  };


//Upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "projects");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

 export const uploadfile = (req, res) => {
  upload.array("files")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(500).send(err.message);
    } else if (err) {
      // An unknown error occurred
      return res.status(500).send("An error occurred while uploading files.");
    }

    if (req.files.length > 0) {
      return res.json({ files: req.files });
    } else {
      return res.send("No files were uploaded.");
    }
  });
};

