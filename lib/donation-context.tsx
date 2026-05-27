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

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  published: boolean;
}

interface DonationContextType {
  campaigns: FocusArea[];
  donations: DonationRecord[];
  blogs: BlogPost[];
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
  
  // Blog Management
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
  updateBlogPost: (id: string, updated: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  resetBlogsToDefault: () => void;

  // Campaign Admin Management
  addCampaign: (campaign: Omit<FocusArea, 'number' | 'raisedAmount'>) => void;
  updateCampaign: (id: string, updated: Partial<FocusArea>) => void;
  deleteCampaign: (id: string) => void;
  resetCampaignsToDefault: () => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: "b1",
    title: "Empowering Women Handloom Weavers in Dharwad Sectors",
    excerpt: "Our Shakti Tailoring collective and cooperative welcomes 25 new weaver members in rural Dharwad, enhancing sustainable wage-earning potential.",
    content: "We are thrilled to report a massive milestone for our Women Empowerment & Livelihoods division! This month, our Shakti Tailoring & Business Collective has formally integrated 25 new traditional handloom weavers across dry blocks of Dharwad.\n\nHistorically, these artisan families faced volatile earnings due to fragmented market access and lack of working capital. By bringing them under the Raita Mitra umbrella, they are receiving standard micro-training in digital financial accounts, access to unified raw material suppliers, and structured wage rates. \n\nOur program provides automatic alignment with ready clothing buyers, ensuring a secure baseline monthly income of ₹8,000 for each family. Trustee liaison Dr. Sunita K. shares: 'Empowering a woman in rural families alters the health and scholastic direction of the entire household. It is our ultimate grassroots tool.' Keep supporting this focus campaign!",
    category: "Women Empowerment",
    image: "https://picsum.photos/seed/handloom/1200/600",
    date: "2026-05-20",
    author: "Dr. Sunita K., Trustee Liaison",
    readTime: "4 min read",
    published: true
  },
  {
    id: "b2",
    title: "Climate-Resilient Pearl Millet Seeds Propagated in Dry Zones",
    excerpt: "Discover how the Siri Dharwad Seed Bank distributed indigenous climate-resilient seed bags to 150+ drought-hit families.",
    content: "Climate risk in Northern Karnataka is no longer a distant theoretical challenge—it is an active annual test for small farmers. This cropping cycle, rains have delayed by three weeks of standard timelines.\n\nIn response, the Siri Dharwad Seed Bank took targeted proactive action. Led by Agri-Specialist Coordinator Malleshappa Gowda, our volunteers successfully distributed 150+ high-yielding, dry-spell hybrid millet and pulse seed packets across drought-impacted sectors of Dharwad and Gadag.\n\nThese ancient crops are naturally equipped to survive low hydration levels, optimizing soil health and restoring micronutrient balances natively. Additionally, our teams conducted village-level workshops on micro-composting techniques and water-preservation tillage. 'Relying solely on high-cost chemical inputs breaks a marginalized farmer's financial resilience,' comments Malleshappa. 'Organic millet crops act as their sovereign shield.'",
    category: "Sustainable Agriculture",
    image: "https://picsum.photos/seed/millet/1200/600",
    date: "2026-05-12",
    author: "Malleshappa Gowda, Agri-Specialist",
    readTime: "5 min read",
    published: true
  },
  {
    id: "b3",
    title: "Establishing Smart Mitra TechLabs in Hubballi Government Schools",
    excerpt: "Bridging the tech divide by launching rural digital labs centered on foundational AI applications and office automation files.",
    content: "Can high school youth from remote rural sectors compete in the modern AI age? At Raita Mitra, we believe absolute access parity makes it inevitable.\n\nWe have inaugurated our newest dedicated Smart TechLab inside the Government High School on the outer limits of Hubballi rural. Outfitted with dual-core workstations, high-speed regional fiber hubs, and interactive projectors, the space now serves over 300 children weekly.\n\nOur customized syllabus bypasses dry technical syntax to focus on real-world capabilities: creating document structures, digital communications, safe search protocols, and the use of modern generative AI utilities to assist local farmers. \n\n'Seeing the pure focus in a village student's eyes as they execute their first terminal greeting is incredible,' notes Anusha G., our technology curriculum designer. 'These labs are training the next wave of local community leaders.'",
    category: "Digital Skills",
    image: "https://picsum.photos/seed/classroom/1200/600",
    date: "2026-04-28",
    author: "Anusha G., Technology Lead",
    readTime: "3 min read",
    published: true
  }
];

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<FocusArea[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
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
    const savedBlogs = localStorage.getItem('raitamitra_blogs');

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

    if (savedBlogs) {
      try {
        setBlogs(JSON.parse(savedBlogs));
      } catch (e) {
        setBlogs(DEFAULT_BLOGS);
      }
    } else {
      setBlogs(DEFAULT_BLOGS);
      localStorage.setItem('raitamitra_blogs', JSON.stringify(DEFAULT_BLOGS));
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

  // Blog management methods
  const addBlogPost = (post: Omit<BlogPost, 'id' | 'date'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `b-${Math.random().toString(36).substring(2, 9)}`,
      date: new Date().toISOString().split('T')[0]
    };
    const nextBlogs = [newPost, ...blogs];
    setBlogs(nextBlogs);
    localStorage.setItem('raitamitra_blogs', JSON.stringify(nextBlogs));
  };

  const updateBlogPost = (id: string, updated: Partial<BlogPost>) => {
    const nextBlogs = blogs.map(b => b.id === id ? { ...b, ...updated } : b);
    setBlogs(nextBlogs);
    localStorage.setItem('raitamitra_blogs', JSON.stringify(nextBlogs));
  };

  const deleteBlogPost = (id: string) => {
    const nextBlogs = blogs.filter(b => b.id !== id);
    setBlogs(nextBlogs);
    localStorage.setItem('raitamitra_blogs', JSON.stringify(nextBlogs));
  };

  const resetBlogsToDefault = () => {
    setBlogs(DEFAULT_BLOGS);
    localStorage.setItem('raitamitra_blogs', JSON.stringify(DEFAULT_BLOGS));
  };

  // Campaign management methods
  const addCampaign = (campaign: Omit<FocusArea, 'number' | 'raisedAmount'>) => {
    const maxNum = campaigns.reduce((max, c) => c.number > max ? c.number : max, 0);
    const newCampaign: FocusArea = {
      ...campaign,
      number: maxNum + 1,
      raisedAmount: 0
    };
    const nextCampaigns = [...campaigns, newCampaign];
    setCampaigns(nextCampaigns);
    localStorage.setItem('raitamitra_campaigns', JSON.stringify(nextCampaigns));
  };

  const updateCampaign = (id: string, updated: Partial<FocusArea>) => {
    const nextCampaigns = campaigns.map(c => c.id === id ? { ...c, ...updated } as FocusArea : c);
    setCampaigns(nextCampaigns);
    localStorage.setItem('raitamitra_campaigns', JSON.stringify(nextCampaigns));
  };

  const deleteCampaign = (id: string) => {
    const nextCampaigns = campaigns.filter(c => c.id !== id);
    setCampaigns(nextCampaigns);
    localStorage.setItem('raitamitra_campaigns', JSON.stringify(nextCampaigns));
  };

  const resetCampaignsToDefault = () => {
    setCampaigns(FOCUS_AREAS);
    localStorage.setItem('raitamitra_campaigns', JSON.stringify(FOCUS_AREAS));
  };

  const totalDonationSum = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <DonationContext.Provider value={{
      campaigns,
      donations,
      blogs,
      isModalOpen,
      selectedCampaignId,
      openModal,
      closeModal,
      addDonation,
      getCampaignById,
      totalDonationSum,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      resetBlogsToDefault,
      addCampaign,
      updateCampaign,
      deleteCampaign,
      resetCampaignsToDefault
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
