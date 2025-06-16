import Asset from '../Models/assets.js';
import mongoose from 'mongoose';
export const createAsset = async (req, res) => {
  try {
    const {
      assetURL,
      assetDescription,
      assetType,
      labels,
      scopeGroupLabels,
      scopeGroupType,
      company,
      programId,
    } = req.body;

     // ✅ Validate ObjectId
    if (!programId || !mongoose.Types.ObjectId.isValid(programId)) {
      console.error('Invalid programId:', programId);
      return res.status(400).json({
        success: false,
        message: 'Invalid programId'
      });
    }

    const newAsset = new Asset({
      assetURL,
      assetDescription,
      assetType,
      labels,
      scopeGroupLabels,
      scopeGroupType,
      company,
      program: programId, // store programId as program
    });

    await newAsset.save();

    res.status(201).json({
      success: true,
      message: 'Asset created successfully',
      data: newAsset
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllAssets = async (req, res) => {
  try {
    const { programId } = req.query;

    const filter = programId ? { programId } : {};

    const assets = await Asset.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: assets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAssetsByCompany = async (req, res) => {
  try {
    // Get companyId from authenticated user (adjust based on your auth middleware)
    const companyId = req.user._id || req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid company ID format'
      });
    }

    const assets = await Asset.find({ company: companyId })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    if (!assets) {
      return res.status(404).json({
        success: false,
        message: 'No assets found for this company'
      });
    }

    res.status(200).json({
      success: true,
      count: assets.length,
      data: assets
    });
  } catch (error) {
    console.error('Error fetching company assets:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching assets',
      error: error.message
    });
  }
};


