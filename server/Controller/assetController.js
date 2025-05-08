import Asset from '../Models/assets.js'

export const getAsset = async (req, res) => {
  try {
    const { url, assetType, label, assetScope, assetDescription } = req.body

    // check the feilds
    if (!url || !assetType || !label || !assetScope) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required to fill',
      })
    }

    // Create the  asset
    const asset = new Asset({
      assetURL: url,
      assetType,
      labels: label,
      scope: assetScope,
      assetDescription,
    })

    await asset.save()

    return res
      .status(200)
      .json({ success: true, message: 'Asset created successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
