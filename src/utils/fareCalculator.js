// Transparent Fare Splitting & Ecological Savings Calculator for Arrivio (Delhi-NCR)

/**
 * Calculates transparent fare breakdown based on distance, co-riders, fuel, and tolls.
 */
export function calculateFareBreakdown({
  distanceKm = 28,
  passengerCount = 3,
  fuelPricePerLiter = 96.72, // in INR
  fuelConsumptionPer100Km = 6.8, // Liters (Swift / City hybrid)
  tollAmount = 100.0, // MCD / Expressway FASTag Toll
  wearTearPerKm = 1.80,
  isElectric = true,
}) {
  // Solo taxi estimate (Ola/Uber Premier: ₹50 base + ₹16/km + Toll)
  const soloEstimatedCost = Math.round(50.0 + distanceKm * 15.5 + tollAmount);

  // Actual operating costs
  const fuelCost = isElectric
    ? distanceKm * 1.20 // EV electricity ~ ₹1.20/km (Nexon EV)
    : (distanceKm / 100) * fuelConsumptionPer100Km * fuelPricePerLiter;
  const vehicleWearCost = distanceKm * (isElectric ? 1.00 : wearTearPerKm);
  const totalBaseExpenses = fuelCost + vehicleWearCost + tollAmount;

  // Driver time compensation offset (₹2.50/min commute contribution)
  const estimatedDriveMinutes = Math.round(distanceKm * 1.8);
  const driverTimeCompensation = estimatedDriveMinutes * 1.80;

  const totalFairTripCost = totalBaseExpenses + driverTimeCompensation;

  // Platform escrow & 24/7 safety response fee
  const platformFeePerRider = 15.0;

  // Dynamic shared split divisor based on total occupants
  const rawSharePerPassenger = totalFairTripCost / (passengerCount + 0.4);
  const passengerFare = Math.round(rawSharePerPassenger + platformFeePerRider);

  const totalCollectedFromRiders = passengerFare * passengerCount;
  const driverEarningsOffset = Math.max(
    150,
    Math.round((totalCollectedFromRiders - (platformFeePerRider * passengerCount)) * 0.92)
  );

  const individualSavings = Math.max(0, Math.round(soloEstimatedCost - passengerFare));
  const savingsPercent = Math.min(80, Math.round((individualSavings / soloEstimatedCost) * 100));

  // CO2 savings: ~120g CO2 per km saved per passenger not taking an individual cab
  const co2SavedKg = parseFloat(((distanceKm * 0.14) * (passengerCount)).toFixed(1));

  return {
    soloEstimatedCost,
    passengerFare,
    individualSavings,
    savingsPercent,
    co2SavedKg,
    driverEarningsOffset,
    lineItems: [
      {
        label: 'Fuel & Energy Consumption',
        amount: Math.round(fuelCost * 100) / 100,
        explanation: isElectric ? 'Electric battery recharge allocation' : `Estimated ${fuelCostLiters.toFixed(1)}L fuel consumed`,
      },
      {
        label: 'Highway / Bridge Tolls',
        amount: tollAmount,
        explanation: 'Split equally between all vehicle occupants',
      },
      {
        label: 'Vehicle Wear & Depreciation',
        amount: Math.round(vehicleWearCost * 100) / 100,
        explanation: 'IRS-aligned standard maintenance and tire wear allowance',
      },
      {
        label: 'Driver Commute Offsetting Credit',
        amount: Math.round(driverTimeCompensation * 100) / 100,
        explanation: 'Direct offset rewarding car owner for sharing their commute',
      },
      {
        label: 'Trust, Safety & Escrow Protection',
        amount: platformFeePerRider,
        explanation: 'Covers live GPS tracking, 24/7 SOS dispatch, and identity verification',
      },
    ],
  };
}
