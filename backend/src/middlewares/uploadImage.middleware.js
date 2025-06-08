import multer from "multer";

//Using memory storage (in RAM, suitable for cloudinary uploads)
const storage = multer.storage();

// Earlier method of just handling file upload could be problematic. user can upload pdf, exe file, there has to be a check.
const fileFilter = (req, res, cb) => {
    if(file.mimetype.startsWith("image/")){
        cb(null, true);
    } else {
        cb(new Error("Only Image Files Allowed"), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits:{fileSize: 5*1024*1024}, //only 5mb is being allowed
});

