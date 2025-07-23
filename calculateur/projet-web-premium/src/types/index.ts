// src/types/index.ts

export interface User {
    id: string;
    email: string;
    displayName?: string;
    createdAt: Date;
}

export interface CalculationHistory {
    id: string;
    userId: string;
    calculationDate: Date;
    result: number;
    parameters: Record<string, any>;
}

export interface Discount {
    id: string;
    code: string;
    percentage: number;
    validUntil: Date;
}

export interface PrefilledValue {
    fieldName: string;
    value: any;
}

export interface PaymentDetails {
    amount: number;
    currency: string;
    paymentMethodId: string;
    userId: string;
}