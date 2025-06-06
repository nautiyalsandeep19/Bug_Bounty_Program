// Utils/uploadCloudinary.js

export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log("req.file =", req.file);

  res.status(200).json({
    message: 'File uploaded successfully',
    file: {
      url: req.file.path,                // usually same as secure_url
      filename: req.file.filename,       // public_id
      mimetype: req.file.mimetype,
      originalname: req.file.originalname,
      size: req.file.size,               // may be undefined
    },
  });
};
