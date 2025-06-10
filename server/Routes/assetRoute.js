import express from 'express';
import { createAsset, getAllAssets ,getAssetsByCompany} from '../Controller/assetController.js';

const router = express.Router();

router.post('/', createAsset);
router.get('/', getAllAssets);
router.get('/:id', getAssetsByCompany);

export default router;
