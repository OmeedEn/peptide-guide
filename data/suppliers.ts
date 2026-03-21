export type SupplierType = 'compounding_pharmacy' | 'research_supplier' | 'licensed_pharmacy' | 'clinic'

export interface PharmacyCompliance {
  type: SupplierType
  licenseNumber?: string      // State pharmacy license
  deaRegistration?: boolean   // DEA registered
  nabpAccredited?: boolean    // National Association of Boards of Pharmacy
  usp797Compliant?: boolean   // Sterile compounding standards
  usp800Compliant?: boolean   // Hazardous drug handling
  fdaRegistered?: boolean     // FDA registered facility
  statePharmacyLicense?: string // e.g. 'CA Board of Pharmacy #PHY-XXXXX'
  compoundingLicense?: '503A' | '503B' // 503A = patient-specific, 503B = outsourcing facility
  cliaCertified?: boolean     // Clinical lab certification
  legitScriptVerified?: boolean // LegitScript online pharmacy verification
}

export interface Supplier {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  logo: string
  verified: boolean
  rating: number
  reviewCount: number
  shippingInfo: string
  returnPolicy: string
  location: string
  established: string
  specialties: string[]
  certifications: string[]
  website?: string
  featured: boolean
  compliance: PharmacyCompliance
}

export const suppliers: Supplier[] = [
  {
    id: 'peptidelab-sciences',
    name: 'PeptideLab Sciences',
    slug: 'peptidelab-sciences',
    description: 'Premium research peptides with rigorous quality control and GMP-certified manufacturing.',
    longDescription: 'PeptideLab Sciences is a leading US-based supplier of high-purity research peptides. Every batch undergoes HPLC and mass spectrometry analysis, with certificates of analysis available for all products. Our GMP-certified facility ensures consistent quality and purity across our extensive catalog of over 200 peptides.',
    logo: '🔬',
    verified: true,
    rating: 4.8,
    reviewCount: 1247,
    shippingInfo: 'Free shipping on orders over $100. Standard 2-5 business days. Expedited available.',
    returnPolicy: '30-day return policy on unopened items. Full refund or exchange.',
    location: 'San Diego, CA',
    established: '2019',
    specialties: ['Research Peptides', 'Anti-Aging', 'Healing'],
    certifications: ['Third-Party Tested', 'GMP Certified', 'COA Available'],
    website: 'https://peptidelabsciences.example.com',
    featured: true,
    compliance: {
      type: 'research_supplier',
      fdaRegistered: true,
      deaRegistration: false,
      nabpAccredited: false,
      usp797Compliant: false,
      usp800Compliant: false,
      legitScriptVerified: true,
    },
  },
  {
    id: 'novacompound-rx',
    name: 'NovaCompound Rx',
    slug: 'novacompound-rx',
    description: 'Licensed compounding pharmacy specializing in GLP-1 and custom peptide formulations.',
    longDescription: 'NovaCompound Rx is a state-licensed 503A compounding pharmacy serving patients and clinics nationwide. We specialize in compounded GLP-1 receptor agonists, custom peptide blends, and physician-prescribed formulations. All compounds are prepared under sterile conditions by licensed pharmacists with full USP 797/800 compliance.',
    logo: '💊',
    verified: true,
    rating: 4.9,
    reviewCount: 892,
    shippingInfo: 'Cold-chain shipping included. 1-3 business days. Signature required.',
    returnPolicy: 'Prescription items non-returnable per federal law. Contact for damaged shipments.',
    location: 'Tampa, FL',
    established: '2017',
    specialties: ['GLP-1', 'Compounded Peptides', 'Weight Management'],
    certifications: ['State Licensed Pharmacy', 'USP 797 Compliant', 'PCAB Accredited'],
    website: 'https://novacompoundrx.example.com',
    featured: true,
    compliance: {
      type: 'compounding_pharmacy',
      licenseNumber: 'FL-PHY-28491',
      deaRegistration: true,
      nabpAccredited: true,
      usp797Compliant: true,
      usp800Compliant: true,
      fdaRegistered: true,
      statePharmacyLicense: 'Florida Board of Pharmacy #PH-28491',
      compoundingLicense: '503A',
      legitScriptVerified: true,
    },
  },
  {
    id: 'biosyntech-research',
    name: 'BiosynTech Research',
    slug: 'biosyntech-research',
    description: 'Affordable research-grade peptides with worldwide shipping and bulk discounts.',
    longDescription: 'BiosynTech Research provides cost-effective, research-grade peptides to scientists and institutions worldwide. Our direct-from-synthesis model eliminates middlemen, passing savings to customers. Every product ships with HPLC purity reports, and our bulk pricing makes large-scale research projects feasible.',
    logo: '⚗️',
    verified: true,
    rating: 4.5,
    reviewCount: 2103,
    shippingInfo: 'Ships worldwide. Free domestic shipping over $75. International flat rate $15.',
    returnPolicy: '14-day return policy. Restocking fee may apply.',
    location: 'Houston, TX',
    established: '2020',
    specialties: ['Research Peptides', 'Nootropics', 'Cognitive'],
    certifications: ['Third-Party Tested', 'COA Available', 'ISO 9001'],
    website: 'https://biosyntechresearch.example.com',
    featured: false,
    compliance: {
      type: 'research_supplier',
      fdaRegistered: false,
      legitScriptVerified: false,
    },
  },
  {
    id: 'pinnacle-peptides',
    name: 'Pinnacle Peptides',
    slug: 'pinnacle-peptides',
    description: 'Boutique peptide supplier focused on ultra-high purity and curated product selection.',
    longDescription: 'Pinnacle Peptides takes a quality-over-quantity approach, offering a carefully curated catalog of the most effective healing and recovery peptides. Every vial ships with an independent Certificate of Analysis, and our 99.5%+ purity standard exceeds industry norms. Trusted by clinicians and researchers who demand the best.',
    logo: '🏔️',
    verified: true,
    rating: 4.9,
    reviewCount: 534,
    shippingInfo: 'Free shipping on all orders. 1-3 business days with tracking.',
    returnPolicy: '30-day satisfaction guarantee. Free returns on all orders.',
    location: 'Scottsdale, AZ',
    established: '2018',
    specialties: ['Healing', 'Recovery', 'Anti-Aging'],
    certifications: ['Third-Party Tested', 'COA With Every Order', 'GMP Certified'],
    website: 'https://pinnaclepeptides.example.com',
    featured: true,
    compliance: {
      type: 'research_supplier',
      fdaRegistered: true,
      nabpAccredited: false,
      legitScriptVerified: true,
    },
  },
  {
    id: 'metavitality-labs',
    name: 'MetaVitality Labs',
    slug: 'metavitality-labs',
    description: 'Specialists in metabolic and mitochondrial peptides for cellular energy optimization.',
    longDescription: 'MetaVitality Labs is dedicated to the emerging field of mitochondrial and metabolic peptides. Our research team stays at the cutting edge of cellular energy science, offering peptides that target AMPK pathways, mitochondrial function, and metabolic health. We provide detailed dosing guides and educational resources with every order.',
    logo: '⚡',
    verified: true,
    rating: 4.7,
    reviewCount: 763,
    shippingInfo: 'Free shipping over $50. Standard 2-4 business days.',
    returnPolicy: '21-day return policy on unopened products.',
    location: 'Austin, TX',
    established: '2021',
    specialties: ['Mitochondrial', 'Fat Loss', 'Exercise Mimetics'],
    certifications: ['Third-Party Tested', 'COA Available', 'Purity Verified'],
    website: 'https://metavitalitylabs.example.com',
    featured: false,
    compliance: {
      type: 'research_supplier',
      fdaRegistered: false,
      legitScriptVerified: false,
    },
  },
  {
    id: 'neuropep-sciences',
    name: 'NeuroPep Sciences',
    slug: 'neuropep-sciences',
    description: 'Cognitive and wellness peptides with specialized intranasal formulations.',
    longDescription: 'NeuroPep Sciences focuses exclusively on cognitive enhancement and neurological wellness peptides. Our proprietary intranasal delivery systems maximize bioavailability for brain-targeting peptides. Founded by neuroscience researchers, we bring academic rigor to every product in our catalog.',
    logo: '🧠',
    verified: false,
    rating: 4.6,
    reviewCount: 441,
    shippingInfo: 'Free shipping over $60. Standard 3-5 business days.',
    returnPolicy: '14-day return policy on unopened items.',
    location: 'Portland, OR',
    established: '2022',
    specialties: ['Nootropics', 'Sleep', 'Anxiolytics'],
    certifications: ['Third-Party Tested', 'COA Available'],
    website: 'https://neuropepsciences.example.com',
    featured: false,
    compliance: {
      type: 'research_supplier',
      fdaRegistered: false,
      legitScriptVerified: false,
    },
  },
]

export const supplierMap = Object.fromEntries(suppliers.map(s => [s.id, s]))
