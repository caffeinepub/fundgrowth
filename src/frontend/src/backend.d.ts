import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface PortfolioSummary {
    totalInvested: bigint;
    activeHoldings: Array<Investment>;
    investmentDistribution: Diversification;
}
export interface BondListing {
    diversification: Diversification;
    status: BondStatus;
    couponRate: number;
    couponType: CouponType;
    riskTags: Array<RiskTag>;
    minInvestment: bigint;
    issuer: string;
    ratingAgency: string;
    launchDate: Time;
    rating: number;
    redemptionType: RedemptionType;
    tenure: bigint;
    faceValue: bigint;
    repaymentFrequency: RepaymentFrequency;
}
export interface Investment {
    repayments: Array<Repayment>;
    investedOn: Time;
    bondId: number;
    isActive: boolean;
    investmentPlan: Diversification;
    amount: bigint;
}
export type CouponType = {
    __kind__: "zeroCoupon";
    zeroCoupon: null;
} | {
    __kind__: "coupon";
    coupon: bigint;
};
export type BondStatus = {
    __kind__: "active";
    active: null;
} | {
    __kind__: "fullyRedeemed";
    fullyRedeemed: null;
} | {
    __kind__: "matured";
    matured: Time;
} | {
    __kind__: "defaulted";
    defaulted: null;
};
export type Diversification = {
    __kind__: "investmentAmount";
    investmentAmount: bigint;
} | {
    __kind__: "riskLevel";
    riskLevel: string;
};
export interface Repayment {
    status: RepaymentStatus;
    dueDate: Time;
    principalComponent: bigint;
    amount: bigint;
    interestAmount: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
    kycStatus: Variant_verified_pending_rejected;
    phoneNumber: string;
}
export enum RedemptionType {
    bulletRepayment = "bulletRepayment",
    staggeredRedemption = "staggeredRedemption",
    prepayment = "prepayment"
}
export enum RepaymentFrequency {
    annually = "annually",
    quarterly = "quarterly",
    monthly = "monthly"
}
export enum RepaymentStatus {
    pending = "pending",
    paid = "paid",
    overdue = "overdue",
    defaulted = "defaulted"
}
export enum RiskTag {
    unsecured = "unsecured",
    secured = "secured",
    seniorSecured = "seniorSecured",
    securedByMovableAssets = "securedByMovableAssets"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_verified_pending_rejected {
    verified = "verified",
    pending = "pending",
    rejected = "rejected"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getBondListing(bondId: number): Promise<BondListing | null>;
    getBondListings(): Promise<Array<BondListing>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserPortfolio(): Promise<PortfolioSummary>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeDefaultBonds(): Promise<void>;
    invest(bondId: number, amount: bigint, diversification: Diversification): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
