// This file contains utility functions for managing the history of calculations.

let calculationHistory = [];

// Function to add a calculation to the history
export function addCalculationToHistory(calculation) {
    calculationHistory.push(calculation);
}

// Function to get the calculation history
export function getCalculationHistory() {
    return calculationHistory;
}

// Function to clear the calculation history
export function clearCalculationHistory() {
    calculationHistory = [];
}

// Function to get a specific calculation by index
export function getCalculationByIndex(index) {
    return calculationHistory[index] || null;
}