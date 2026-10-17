package com.arrivio.arrivio_backend.service;

import com.arrivio.arrivio_backend.dto.FareBreakdownDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FareCalculatorService {

    public FareBreakdownDto calculateFare(double distanceKm, int passengerCount, double fuelPricePerLiter, double tollAmount, boolean isElectric) {
        // Solo cab baseline
        double soloEstimated = Math.round((4.00 + distanceKm * 1.95 + tollAmount * 1.2) * 100.0) / 100.0;

        // Operating costs
        double fuelCostLiters = (distanceKm / 100.0) * (isElectric ? 0 : 8.5);
        double fuelCost = isElectric ? (distanceKm * 0.04) : fuelCostLiters * fuelPricePerLiter;
        double wearCost = distanceKm * (isElectric ? 0.06 : 0.12);
        double totalExpenses = fuelCost + wearCost + tollAmount;

        // Driver time offset
        double driveMinutes = Math.round(distanceKm * 1.85);
        double driverOffset = (driveMinutes / 60.0) * 14.00;
        double fairTripCost = totalExpenses + driverOffset;

        double platformFee = 1.50;
        double rawShare = fairTripCost / (passengerCount + 0.3);
        double passengerFare = Math.round((rawShare + platformFee) * 100.0) / 100.0;

        double savings = Math.max(0.0, Math.round((soloEstimated - passengerFare) * 100.0) / 100.0);
        int savingsPct = (int) Math.min(75, Math.round((savings / soloEstimated) * 100.0));
        double co2Saved = Math.round(((distanceKm * 0.14) * passengerCount) * 10.0) / 10.0;

        double totalCollected = passengerFare * passengerCount;
        double driverEarnings = Math.max(10.0, Math.round((totalCollected - (platformFee * passengerCount)) * 0.90 * 100.0) / 100.0);

        List<FareBreakdownDto.LineItemDto> items = new ArrayList<>();
        items.add(new FareBreakdownDto.LineItemDto(
                "Fuel & Energy Consumption",
                Math.round(fuelCost * 100.0) / 100.0,
                isElectric ? "Electric battery recharge allocation" : String.format("Estimated %.1fL fuel consumed", fuelCostLiters)
        ));
        items.add(new FareBreakdownDto.LineItemDto(
                "Highway & Express Lane Tolls",
                tollAmount,
                "Split equitably across vehicle occupants"
        ));
        items.add(new FareBreakdownDto.LineItemDto(
                "Vehicle Wear & Depreciation",
                Math.round(wearCost * 100.0) / 100.0,
                "IRS standard mileage allowance maintenance"
        ));
        items.add(new FareBreakdownDto.LineItemDto(
                "Driver Commute Offsetting Credit",
                Math.round(driverOffset * 100.0) / 100.0,
                "Direct reward for car owner opening seats"
        ));
        items.add(new FareBreakdownDto.LineItemDto(
                "Trust, Safety & Escrow Protection",
                platformFee,
                "Includes live GPS telemetry and 24/7 SOS dispatch"
        ));

        FareBreakdownDto dto = new FareBreakdownDto();
        dto.setSoloEstimatedCost(soloEstimated);
        dto.setPassengerFare(passengerFare);
        dto.setIndividualSavings(savings);
        dto.setSavingsPercent(savingsPct);
        dto.setCo2SavedKg(co2Saved);
        dto.setDriverEarningsOffset(driverEarnings);
        dto.setLineItems(items);

        return dto;
    }
}
