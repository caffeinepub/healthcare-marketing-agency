import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    challenge: string;
    city: string;
    name: string;
    businessName: string;
    email: string;
    timestamp: bigint;
    phone: string;
}
export interface backendInterface {
    getAllLeads(): Promise<Array<Lead>>;
    getLeadCount(): Promise<bigint>;
    submitLead(businessName: string, name: string, phone: string, email: string, city: string, challenge: string, timestamp: bigint): Promise<void>;
}
