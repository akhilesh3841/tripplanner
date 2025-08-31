import multer from "multer";

const storage = multer.memoryStorage(); // memory storage
const upload = multer({ storage });

export default upload;
