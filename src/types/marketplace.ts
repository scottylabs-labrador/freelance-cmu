// Type definitions for the Freelance Marketplace

export type FreelancerStatus = 'available' | 'limited' | 'unavailable';
export type JobPayType = 'hourly' | 'fixed';

export interface Freelancer {
  id: number;
  name: string;
  title: string;
  location: string;
  description: string;
  status: FreelancerStatus;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  hourlyRate: number;
  skills: string[];
  isScamRisk: boolean;
  isVerified: boolean;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  payType: JobPayType;
  payRate: number;
  payMax: number;
  postedDays: number;
  description: string;
  skills: string[];
  applicants: number;
  isVerified: boolean;
}

export type MarketplaceMode = 'hire' | 'jobs';
