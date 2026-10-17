package com.arrivio.arrivio_backend.dto;

import java.util.List;

public class FareBreakdownDto {
    private double soloEstimatedCost;
    private double passengerFare;
    private double individualSavings;
    private int savingsPercent;
    private double co2SavedKg;
    private double driverEarningsOffset;
    private List<LineItemDto> lineItems;

    public FareBreakdownDto() {}

    public static class LineItemDto {
        private String label;
        private double amount;
        private String explanation;

        public LineItemDto() {}

        public LineItemDto(String label, double amount, String explanation) {
            this.label = label;
            this.amount = amount;
            this.explanation = explanation;
        }

        public String getLabel() { return label; }
        public void setLabel(String label) { this.label = label; }

        public double getAmount() { return amount; }
        public void setAmount(double amount) { this.amount = amount; }

        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }
    }

    public double getSoloEstimatedCost() { return soloEstimatedCost; }
    public void setSoloEstimatedCost(double soloEstimatedCost) { this.soloEstimatedCost = soloEstimatedCost; }

    public double getPassengerFare() { return passengerFare; }
    public void setPassengerFare(double passengerFare) { this.passengerFare = passengerFare; }

    public double getIndividualSavings() { return individualSavings; }
    public void setIndividualSavings(double individualSavings) { this.individualSavings = individualSavings; }

    public int getSavingsPercent() { return savingsPercent; }
    public void setSavingsPercent(int savingsPercent) { this.savingsPercent = savingsPercent; }

    public double getCo2SavedKg() { return co2SavedKg; }
    public void setCo2SavedKg(double co2SavedKg) { this.co2SavedKg = co2SavedKg; }

    public double getDriverEarningsOffset() { return driverEarningsOffset; }
    public void setDriverEarningsOffset(double driverEarningsOffset) { this.driverEarningsOffset = driverEarningsOffset; }

    public List<LineItemDto> getLineItems() { return lineItems; }
    public void setLineItems(List<LineItemDto> lineItems) { this.lineItems = lineItems; }
}
