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
    const companyId = req.user.id; // Adjust this based on your auth setup
    // console.log('Company ID frknsasad asdasd sadsa das das d:', companyId);

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid companyId'
      });
    }

    const assets = await Asset.find({ company: companyId }).sort({ createdAt: -1 });

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
    