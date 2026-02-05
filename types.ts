export interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  phone: string;
  district: string;
  location: string;
  lastDonationDate?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  category: string; // <--- MUST BE STRING
  phone: string;
  location: string;
}

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';