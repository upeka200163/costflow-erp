const express = require('express');
const router = express.Router();

// Cost calculation simulation engine
router.post('/simulate', (req, res) => {
  try {
    const {
      bottleVolume = 600, // ml
      preformWeightGrams = 18,
      preformCostPerKg = 44.5,
      capCost = 0.12,
      labelCost = 0.06,
      shrinkFilmPerBottle = 0.04,
      waterFiltrationCostPerL = 0.08,
      electricKwhPerBottle = 0.035,
      electricityRatePerKwh = 1.90,
      directLaborCostPerBottle = 0.32,
      maintenanceDepreciation = 0.22,
      factoryOverhead = 0.21,
      targetProfitMargin = 30, // percent
    } = req.body;

    const preformCost = (preformWeightGrams / 1000) * preformCostPerKg;
    const rawWaterCost = (bottleVolume / 1000) * waterFiltrationCostPerL;
    const powerCost = electricKwhPerBottle * electricityRatePerKwh;

    const totalRawMaterials = +(preformCost + capCost + labelCost + shrinkFilmPerBottle + rawWaterCost).toFixed(3);
    const totalLabor = +directLaborCostPerBottle.toFixed(3);
    const totalMachines = +(powerCost + maintenanceDepreciation).toFixed(3);
    const totalOverheads = +factoryOverhead.toFixed(3);

    const unitManufacturingCost = +(totalRawMaterials + totalLabor + totalMachines + totalOverheads).toFixed(2);
    const recommendedSellingPrice = +(unitManufacturingCost * (1 + targetProfitMargin / 100)).toFixed(2);
    const profitPerUnit = +(recommendedSellingPrice - unitManufacturingCost).toFixed(2);

    res.json({
      success: true,
      data: {
        unitManufacturingCost,
        recommendedSellingPrice,
        profitPerUnit,
        profitMarginPct: targetProfitMargin,
        breakdown: {
          rawMaterials: {
            cost: totalRawMaterials,
            percentage: Math.round((totalRawMaterials / unitManufacturingCost) * 100),
            items: {
              preform: +preformCost.toFixed(3),
              cap: capCost,
              label: labelCost,
              shrinkFilm: shrinkFilmPerBottle,
              waterFiltration: +rawWaterCost.toFixed(3),
            },
          },
          labor: {
            cost: totalLabor,
            percentage: Math.round((totalLabor / unitManufacturingCost) * 100),
          },
          machines: {
            cost: totalMachines,
            percentage: Math.round((totalMachines / unitManufacturingCost) * 100),
            items: {
              power: +powerCost.toFixed(3),
              depreciation: maintenanceDepreciation,
            },
          },
          overheads: {
            cost: totalOverheads,
            percentage: Math.round((totalOverheads / unitManufacturingCost) * 100),
          },
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
