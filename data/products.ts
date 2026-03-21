export interface ProductVariant {
  id: string
  size: string
  price: number
  originalPrice?: number
}

export interface Product {
  id: string
  supplierId: string
  peptideId: string
  name: string
  description: string
  variants: ProductVariant[]
  inStock: boolean
  requiresPrescription: boolean
  thirdPartyTested: boolean
  coaAvailable: boolean
  form: 'lyophilized' | 'pre-mixed' | 'nasal_spray' | 'cream' | 'capsule' | 'tablet'
  purity: string
}

export const products: Product[] = [
  // ── BPC-157 (4 suppliers) ──────────────────────────────────────────
  {
    id: 'pl-bpc157',
    supplierId: 'peptidelab-sciences',
    peptideId: 'bpc-157',
    name: 'BPC-157 Research Vial',
    description: 'High-purity lyophilized BPC-157 for research use. Each vial includes a Certificate of Analysis.',
    variants: [
      { id: 'pl-bpc157-5', size: '5mg', price: 39.99, originalPrice: 49.99 },
      { id: 'pl-bpc157-10', size: '10mg', price: 64.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },
  {
    id: 'bt-bpc157',
    supplierId: 'biosyntech-research',
    peptideId: 'bpc-157',
    name: 'BPC-157 Economy Vial',
    description: 'Research-grade BPC-157 at competitive pricing. HPLC-verified purity.',
    variants: [
      { id: 'bt-bpc157-5', size: '5mg', price: 29.99 },
      { id: 'bt-bpc157-10', size: '10mg', price: 52.99, originalPrice: 59.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },
  {
    id: 'pp-bpc157',
    supplierId: 'pinnacle-peptides',
    peptideId: 'bpc-157',
    name: 'BPC-157 Ultra-Pure Vial',
    description: 'Premium-grade BPC-157 with independent COA included. 99.5%+ purity guaranteed.',
    variants: [
      { id: 'pp-bpc157-5', size: '5mg', price: 44.99 },
      { id: 'pp-bpc157-10', size: '10mg', price: 74.99, originalPrice: 84.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99.5%+',
  },
  {
    id: 'nc-bpc157',
    supplierId: 'novacompound-rx',
    peptideId: 'bpc-157',
    name: 'BPC-157 Compounded Injection',
    description: 'Pharmacy-compounded BPC-157 in bacteriostatic water, ready to use. Physician order required.',
    variants: [
      { id: 'nc-bpc157-5', size: '5mg pre-mixed', price: 42.00 },
      { id: 'nc-bpc157-10', size: '10mg pre-mixed', price: 69.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── TB-500 (3 suppliers) ───────────────────────────────────────────
  {
    id: 'pl-tb500',
    supplierId: 'peptidelab-sciences',
    peptideId: 'tb-500',
    name: 'TB-500 Research Vial',
    description: 'Lyophilized Thymosin Beta-4 fragment for research applications.',
    variants: [
      { id: 'pl-tb500-5', size: '5mg', price: 42.99 },
      { id: 'pl-tb500-10', size: '10mg', price: 74.99, originalPrice: 85.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },
  {
    id: 'bt-tb500',
    supplierId: 'biosyntech-research',
    peptideId: 'tb-500',
    name: 'TB-500 Value Vial',
    description: 'Cost-effective TB-500 for research. Ships worldwide.',
    variants: [
      { id: 'bt-tb500-5', size: '5mg', price: 35.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },
  {
    id: 'pp-tb500',
    supplierId: 'pinnacle-peptides',
    peptideId: 'tb-500',
    name: 'TB-500 Premium Vial',
    description: 'Ultra-pure TB-500 with independent third-party COA.',
    variants: [
      { id: 'pp-tb500-5', size: '5mg', price: 49.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99.5%+',
  },

  // ── CJC-1295 (3 suppliers) ────────────────────────────────────────
  {
    id: 'pl-cjc1295',
    supplierId: 'peptidelab-sciences',
    peptideId: 'cjc-1295',
    name: 'CJC-1295 (no DAC) Research Vial',
    description: 'Modified GRF(1-29) without DAC for pulsatile GH release research.',
    variants: [
      { id: 'pl-cjc1295-2', size: '2mg', price: 32.99 },
      { id: 'pl-cjc1295-5', size: '5mg', price: 54.99, originalPrice: 64.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },
  {
    id: 'bt-cjc1295',
    supplierId: 'biosyntech-research',
    peptideId: 'cjc-1295',
    name: 'CJC-1295 (no DAC) Economy Vial',
    description: 'Affordable Mod GRF(1-29) for research use. HPLC verified.',
    variants: [
      { id: 'bt-cjc1295-2', size: '2mg', price: 24.99 },
      { id: 'bt-cjc1295-5', size: '5mg', price: 44.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },
  {
    id: 'nc-cjc1295',
    supplierId: 'novacompound-rx',
    peptideId: 'cjc-1295',
    name: 'CJC-1295/Ipamorelin Blend',
    description: 'Compounded CJC-1295/Ipamorelin combination vial. Physician order required.',
    variants: [
      { id: 'nc-cjc1295-blend', size: '2mg/2mg blend', price: 59.00 },
      { id: 'nc-cjc1295-blend-lg', size: '5mg/5mg blend', price: 99.00, originalPrice: 119.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Ipamorelin (3 suppliers) ───────────────────────────────────────
  {
    id: 'pl-ipamorelin',
    supplierId: 'peptidelab-sciences',
    peptideId: 'ipamorelin',
    name: 'Ipamorelin Research Vial',
    description: 'High-purity Ipamorelin for GH secretagogue research.',
    variants: [
      { id: 'pl-ipa-2', size: '2mg', price: 27.99 },
      { id: 'pl-ipa-5', size: '5mg', price: 47.99, originalPrice: 54.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },
  {
    id: 'bt-ipamorelin',
    supplierId: 'biosyntech-research',
    peptideId: 'ipamorelin',
    name: 'Ipamorelin Economy Vial',
    description: 'Research-grade Ipamorelin at budget-friendly pricing.',
    variants: [
      { id: 'bt-ipa-2', size: '2mg', price: 21.99 },
      { id: 'bt-ipa-5', size: '5mg', price: 39.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },
  {
    id: 'pp-ipamorelin',
    supplierId: 'pinnacle-peptides',
    peptideId: 'ipamorelin',
    name: 'Ipamorelin Ultra-Pure Vial',
    description: 'Premium Ipamorelin with guaranteed 99.5%+ purity and COA.',
    variants: [
      { id: 'pp-ipa-2', size: '2mg', price: 34.99 },
      { id: 'pp-ipa-5', size: '5mg', price: 54.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99.5%+',
  },

  // ── Semaglutide (2 suppliers) ──────────────────────────────────────
  {
    id: 'nc-semaglutide',
    supplierId: 'novacompound-rx',
    peptideId: 'semaglutide',
    name: 'Compounded Semaglutide Injection',
    description: 'Pharmacy-compounded semaglutide for weight management. Requires physician prescription.',
    variants: [
      { id: 'nc-sema-1mo', size: '1 month supply (0.25mg/wk start)', price: 199.00, originalPrice: 249.00 },
      { id: 'nc-sema-3mo', size: '3 month supply (escalating dose)', price: 499.00, originalPrice: 599.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },
  {
    id: 'mv-semaglutide',
    supplierId: 'metavitality-labs',
    peptideId: 'semaglutide',
    name: 'Semaglutide Research Vial',
    description: 'Lyophilized semaglutide for metabolic research applications.',
    variants: [
      { id: 'mv-sema-3', size: '3mg', price: 149.99 },
      { id: 'mv-sema-5', size: '5mg', price: 229.99, originalPrice: 279.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },

  // ── GHK-Cu (3 suppliers) ──────────────────────────────────────────
  {
    id: 'pl-ghkcu',
    supplierId: 'peptidelab-sciences',
    peptideId: 'ghk-cu',
    name: 'GHK-Cu Injectable Vial',
    description: 'Copper peptide complex for skin and tissue research.',
    variants: [
      { id: 'pl-ghkcu-50', size: '50mg', price: 44.99 },
      { id: 'pl-ghkcu-100', size: '100mg', price: 79.99, originalPrice: 89.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },
  {
    id: 'pp-ghkcu',
    supplierId: 'pinnacle-peptides',
    peptideId: 'ghk-cu',
    name: 'GHK-Cu Premium Cream',
    description: 'Topical GHK-Cu cream formulation for skin rejuvenation research. 1% concentration.',
    variants: [
      { id: 'pp-ghkcu-30', size: '30ml jar', price: 49.99 },
      { id: 'pp-ghkcu-60', size: '60ml jar', price: 84.99, originalPrice: 99.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'cream',
    purity: '1% GHK-Cu',
  },
  {
    id: 'bt-ghkcu',
    supplierId: 'biosyntech-research',
    peptideId: 'ghk-cu',
    name: 'GHK-Cu Economy Vial',
    description: 'Affordable copper peptide for research. Ships worldwide.',
    variants: [
      { id: 'bt-ghkcu-50', size: '50mg', price: 34.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },

  // ── Selank (3 suppliers) ──────────────────────────────────────────
  {
    id: 'np-selank',
    supplierId: 'neuropep-sciences',
    peptideId: 'selank',
    name: 'Selank Nasal Spray',
    description: 'Ready-to-use Selank intranasal formulation for cognitive and anxiolytic research.',
    variants: [
      { id: 'np-selank-5', size: '5mg (30-day spray)', price: 44.99 },
      { id: 'np-selank-10', size: '10mg (60-day spray)', price: 74.99, originalPrice: 89.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'nasal_spray',
    purity: '99%+',
  },
  {
    id: 'bt-selank',
    supplierId: 'biosyntech-research',
    peptideId: 'selank',
    name: 'Selank Lyophilized Vial',
    description: 'Research-grade Selank powder for reconstitution.',
    variants: [
      { id: 'bt-selank-5', size: '5mg', price: 36.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },
  {
    id: 'pl-selank',
    supplierId: 'peptidelab-sciences',
    peptideId: 'selank',
    name: 'Selank Research Nasal Spray',
    description: 'Pre-mixed Selank nasal spray with precision dosing pump.',
    variants: [
      { id: 'pl-selank-5', size: '5mg spray', price: 39.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'nasal_spray',
    purity: '99%+',
  },

  // ── Semax (3 suppliers) ───────────────────────────────────────────
  {
    id: 'np-semax',
    supplierId: 'neuropep-sciences',
    peptideId: 'semax',
    name: 'Semax Nasal Spray (0.1%)',
    description: 'Nootropic-grade Semax intranasal spray. Precision metered dosing.',
    variants: [
      { id: 'np-semax-3', size: '3mg (30-day spray)', price: 34.99 },
      { id: 'np-semax-6', size: '6mg (60-day spray)', price: 59.99, originalPrice: 69.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'nasal_spray',
    purity: '99%+',
  },
  {
    id: 'bt-semax',
    supplierId: 'biosyntech-research',
    peptideId: 'semax',
    name: 'Semax Research Vial',
    description: 'Lyophilized Semax for research reconstitution.',
    variants: [
      { id: 'bt-semax-5', size: '5mg', price: 29.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },
  {
    id: 'np-semax-1pct',
    supplierId: 'neuropep-sciences',
    peptideId: 'semax',
    name: 'Semax Nasal Spray (1% N-Acetyl)',
    description: 'High-concentration N-Acetyl Semax for advanced cognitive research.',
    variants: [
      { id: 'np-nasa-3', size: '3mg spray', price: 44.99 },
    ],
    inStock: false,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'nasal_spray',
    purity: '99%+',
  },

  // ── Epithalon (3 suppliers) ───────────────────────────────────────
  {
    id: 'pl-epithalon',
    supplierId: 'peptidelab-sciences',
    peptideId: 'epithalon',
    name: 'Epithalon Research Vial',
    description: 'AEDG tetrapeptide for telomere and anti-aging research.',
    variants: [
      { id: 'pl-epi-10', size: '10mg', price: 49.99 },
      { id: 'pl-epi-20', size: '20mg', price: 89.99, originalPrice: 99.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },
  {
    id: 'bt-epithalon',
    supplierId: 'biosyntech-research',
    peptideId: 'epithalon',
    name: 'Epithalon Economy Vial',
    description: 'Affordable Epithalon for longevity research.',
    variants: [
      { id: 'bt-epi-10', size: '10mg', price: 39.99 },
      { id: 'bt-epi-50', size: '50mg', price: 159.99, originalPrice: 199.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },
  {
    id: 'pp-epithalon',
    supplierId: 'pinnacle-peptides',
    peptideId: 'epithalon',
    name: 'Epithalon Premium Vial',
    description: 'Ultra-pure AEDG peptide with independent COA for anti-aging research.',
    variants: [
      { id: 'pp-epi-10', size: '10mg', price: 59.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99.5%+',
  },

  // ── MOTS-c (2 suppliers) ──────────────────────────────────────────
  {
    id: 'mv-motsc',
    supplierId: 'metavitality-labs',
    peptideId: 'mots-c',
    name: 'MOTS-c Mitochondrial Peptide',
    description: 'Exercise mimetic peptide targeting AMPK pathways for metabolic research.',
    variants: [
      { id: 'mv-motsc-5', size: '5mg', price: 59.99 },
      { id: 'mv-motsc-10', size: '10mg', price: 104.99, originalPrice: 119.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },
  {
    id: 'pl-motsc',
    supplierId: 'peptidelab-sciences',
    peptideId: 'mots-c',
    name: 'MOTS-c Research Vial',
    description: 'High-purity MOTS-c for mitochondrial and exercise research.',
    variants: [
      { id: 'pl-motsc-5', size: '5mg', price: 69.99 },
      { id: 'pl-motsc-10', size: '10mg', price: 119.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },

  // ── AOD-9604 (2 suppliers) ────────────────────────────────────────
  {
    id: 'mv-aod9604',
    supplierId: 'metavitality-labs',
    peptideId: 'aod-9604',
    name: 'AOD-9604 Fat Metabolism Peptide',
    description: 'HGH fragment 176-191 for fat metabolism research.',
    variants: [
      { id: 'mv-aod-5', size: '5mg', price: 34.99 },
      { id: 'mv-aod-10', size: '10mg', price: 59.99, originalPrice: 69.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },
  {
    id: 'bt-aod9604',
    supplierId: 'biosyntech-research',
    peptideId: 'aod-9604',
    name: 'AOD-9604 Economy Vial',
    description: 'Budget-friendly AOD-9604 for research applications.',
    variants: [
      { id: 'bt-aod-5', size: '5mg', price: 27.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },

  // ── SS-31 / Elamipretide (2 suppliers) ────────────────────────────
  {
    id: 'mv-ss31',
    supplierId: 'metavitality-labs',
    peptideId: 'ss-31',
    name: 'SS-31 (Elamipretide) Research Vial',
    description: 'Mitochondria-targeting tetrapeptide for cellular energy research.',
    variants: [
      { id: 'mv-ss31-5', size: '5mg', price: 64.99 },
      { id: 'mv-ss31-10', size: '10mg', price: 109.99, originalPrice: 129.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },
  {
    id: 'pl-ss31',
    supplierId: 'peptidelab-sciences',
    peptideId: 'ss-31',
    name: 'Elamipretide Research Vial',
    description: 'High-purity SS-31 for mitochondrial repair research.',
    variants: [
      { id: 'pl-ss31-5', size: '5mg', price: 69.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },

  // ── DSIP (2 suppliers) ────────────────────────────────────────────
  {
    id: 'np-dsip',
    supplierId: 'neuropep-sciences',
    peptideId: 'dsip',
    name: 'DSIP Sleep Peptide Vial',
    description: 'Delta Sleep-Inducing Peptide for sleep and recovery research.',
    variants: [
      { id: 'np-dsip-2', size: '2mg', price: 29.99 },
      { id: 'np-dsip-5', size: '5mg', price: 54.99, originalPrice: 64.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },
  {
    id: 'bt-dsip',
    supplierId: 'biosyntech-research',
    peptideId: 'dsip',
    name: 'DSIP Economy Vial',
    description: 'Affordable DSIP for sleep research.',
    variants: [
      { id: 'bt-dsip-2', size: '2mg', price: 24.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },

  // ── Tirzepatide (1 supplier - prescription) ───────────────────────
  {
    id: 'nc-tirzepatide',
    supplierId: 'novacompound-rx',
    peptideId: 'tirzepatide',
    name: 'Compounded Tirzepatide Injection',
    description: 'Pharmacy-compounded tirzepatide for weight management. Physician prescription required.',
    variants: [
      { id: 'nc-tirz-1mo', size: '1 month supply (2.5mg/wk start)', price: 249.00, originalPrice: 299.00 },
      { id: 'nc-tirz-3mo', size: '3 month supply (escalating dose)', price: 599.00, originalPrice: 749.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },
]

// ── Helper Functions ────────────────────────────────────────────────

export function getProductsByPeptide(peptideId: string): Product[] {
  return products.filter(p => p.peptideId === peptideId)
}

export function getProductsBySupplier(supplierId: string): Product[] {
  return products.filter(p => p.supplierId === supplierId)
}

export function getFeaturedProducts(): Product[] {
  const featuredSupplierIds = new Set([
    'peptidelab-sciences',
    'novacompound-rx',
    'pinnacle-peptides',
  ])
  return products.filter(p => featuredSupplierIds.has(p.supplierId))
}
