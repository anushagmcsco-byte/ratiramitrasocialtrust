'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FOCUS_AREAS, FocusArea } from './data';

export interface DonationRecord {
  id: string;
  campaignId: string;
  campaignTitle: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPan: string;
  date: string;
  receiptNumber: string;
}

interface DonationContextType {
  campaigns: FocusArea[];
  donations: DonationRecord[];
  isModalOpen: boolean;
  selectedCampaignId: string;
  openModal: (campaignId?: string) => void;
  closeModal: () => void;
  addDonation: (
    campaignId: string,
    amount: number,
    donorName: string,
    donorEmail: string,
    donorPhone: string,
    donorPan: string
  ) => DonationRecord;
  getCampaignById: (id: string) => FocusArea | undefined;
  totalDonationSum: number;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<FocusArea[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('');

  const openModal = (campaignId?: string) => {
    setSelectedCampaignId(campaignId || 'sustainable-agriculture');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCampaignId('');
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedCampaigns = localStorage.getItem('raitamitra_campaigns');
    const savedDonations = localStorage.getItem('raitamitra_donations');

    if (savedCampaigns) {
      try {
        setCampaigns(JSON.parse(savedCampaigns));
      } catch (e) {
        setCampaigns(FOCUS_AREAS);
      }
    } else {
      setCampaigns(FOCUS_AREAS);
    }

    if (savedDonations) {
      try {
        setDonations(JSON.parse(savedDonations));
      } catch (e) {
        setDonations([]);
      }
    } else {
      // Default sample donations to make the application feel active immediately
      const defaultDonations: DonationRecord[] = [
        {
          id: "d1",
          campaignId: "sustainable-agriculture",
          campaignTitle: "Sustainable Agriculture & Farmer Empowerment",
          amount: 5000,
          donorName: "Anil Kumar",
          donorEmail: "anil.k@example.com",
          donorPhone: "+91 9845012345",
          donorPan: "ABCPA1234Z",
          date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toLocaleDateString(),
          receiptNumber: "RMST-2026-0482"
        },
        {
          id: "d2",
          campaignId: "women-empowerment",
          campaignTitle: "Women Empowerment & Livelihoods",
          amount: 2500,
          donorName: "Savitha G.",
          donorEmail: "savitha.g@example.com",
          donorPhone: "+91 9900123456",
          donorPan: "DEFPM5678X",
          date: new Date(Date.now() - 12 * 3600 * 1000).toLocaleDateString(),
          receiptNumber: "RMST-2026-0483"
        }
      ];
      setDonations(defaultDonations);
      localStorage.setItem('raitamitra_donations', JSON.stringify(defaultDonations));
    }
  }, []);

  const addDonation = (
    campaignId: string,
    amount: number,
    donorName: string,
    donorEmail: string,
    donorPhone: string,
    donorPan: string
  ): DonationRecord => {
    const targetCampaign = campaigns.find(c => c.id === campaignId) || campaigns[0];
    const recNumber = `RMST-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: DonationRecord = {
      id: Math.random().toString(36).substring(2, 9),
      campaignId,
      campaignTitle: targetCampaign ? targetCampaign.title : "General Empowerment Fund",
      amount,
      donorName,
      donorEmail,
      donorPhone,
      donorPan: donorPan.toUpperCase() || "PENDING",
      date: new Date().toLocaleDateString(),
      receiptNumber: recNumber
    };

    const nextDonations = [newRecord, ...donations];
    setDonations(nextDonations);
    localStorage.setItem('raitamitra_donations', JSON.stringify(nextDonations));

    // Update campaign progress in-place
    const nextCampaigns = campaigns.map(c => {
      if (c.id === campaignId) {
        return {
          ...c,
          raisedAmount: c.raisedAmount + amount
        };
      }
      return c;
    });

    setCampaigns(nextCampaigns);
    localStorage.setItem('raitamitra_campaigns', JSON.stringify(nextCampaigns));

    return newRecord;
  };

  const getCampaignById = (id: string) => {
    return campaigns.find(c => c.id === id);
  };

  const totalDonationSum = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <DonationContext.Provider value={{
      campaigns,
      donations,
      isModalOpen,
      selectedCampaignId,
      openModal,
      closeModal,
      addDonation,
      getCampaignById,
      totalDonationSum
    }}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error('useDonations must be used within a DonationProvider');
  }
  return context;
}
