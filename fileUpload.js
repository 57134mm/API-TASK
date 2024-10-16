const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, './uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Upload Path:', uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
}).array('files', 10);

module.exports = (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer Error:', err);
            return res.status(400).json({ error: err.message });
        } else if (err) {
            console.error('File Upload Error:', err);
            return res.status(500).json({ error: 'File upload error', details: err.message });
        }
        console.log('Files Uploaded:', req.files);
        next();
    });
};
