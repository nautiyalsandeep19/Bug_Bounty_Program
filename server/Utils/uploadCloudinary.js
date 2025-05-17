const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    file: {
      url: req.file.path,
      public_id: req.file.filename,
      mimetype: req.file.mimetype,
    },
  })
}

export { uploadFile }
