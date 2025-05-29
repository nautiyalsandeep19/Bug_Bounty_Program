
// Save an asset ID for a given company
export function addAssetIdForCompany(companyId, assetId) {
  if (!companyId || !assetId) return;

  const key = `assets`;
  const existing = JSON.parse(localStorage.getItem(key)) || [];
 

  if (!existing.includes(assetId)) {
    existing.push(assetId);
    localStorage.setItem(key, JSON.stringify(existing));
  }
}

// Get all asset IDs stored for a company
export function getAssetIdsForCompany(companyId) {
  if (!companyId) return [];
  const key = `assets_${companyId}`;
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Clear all asset IDs for a company (optional)
export function clearAssetIdsForCompany(companyId) {
  if (!companyId) return;
  const key = `assets_${companyId}`;
  localStorage.removeItem(key);
}
