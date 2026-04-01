// Product catalog batch 2 - products for additional peptides

import type { Product } from './products'

export const productsBatch2: Product[] = [
  // ── Exenatide (1 supplier - prescription) ─────────────────────────
  {
    id: 'nc-exenatide',
    supplierId: 'novacompound-rx',
    peptideId: 'exenatide',
    name: 'Compounded Exenatide Injection',
    description: 'Pharmacy-compounded exenatide (GLP-1 receptor agonist) in pre-filled vial. Physician prescription required. Used in type 2 diabetes and metabolic management.',
    variants: [
      { id: 'nc-exenatide-1mo', size: '1 month supply (5mcg BID)', price: 150.00 },
      { id: 'nc-exenatide-3mo', size: '3 month supply (10mcg BID)', price: 300.00, originalPrice: 375.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Dulaglutide (1 supplier - prescription) ───────────────────────
  {
    id: 'nc-dulaglutide',
    supplierId: 'novacompound-rx',
    peptideId: 'dulaglutide',
    name: 'Compounded Dulaglutide Injection',
    description: 'Pharmacy-compounded dulaglutide for once-weekly GLP-1 agonist therapy. Physician prescription required. Long-acting formulation for glycemic and weight management.',
    variants: [
      { id: 'nc-dulaglutide-1mo', size: '1 month supply (0.75mg/wk)', price: 175.00 },
      { id: 'nc-dulaglutide-3mo', size: '3 month supply (1.5mg/wk)', price: 350.00, originalPrice: 425.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Pramlintide (1 supplier - prescription) ───────────────────────
  {
    id: 'nc-pramlintide',
    supplierId: 'novacompound-rx',
    peptideId: 'pramlintide',
    name: 'Compounded Pramlintide Injection',
    description: 'Pharmacy-compounded pramlintide acetate (amylin analog) for adjunctive insulin therapy. Physician prescription required. Slows gastric emptying and reduces postprandial glucagon.',
    variants: [
      { id: 'nc-pramlintide-1mo', size: '1 month supply (60mcg TID)', price: 120.00 },
      { id: 'nc-pramlintide-3mo', size: '3 month supply (120mcg TID)', price: 220.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Teriparatide (1 supplier - prescription) ──────────────────────
  {
    id: 'nc-teriparatide',
    supplierId: 'novacompound-rx',
    peptideId: 'teriparatide',
    name: 'Compounded Teriparatide Injection',
    description: 'Pharmacy-compounded teriparatide (PTH 1-34 fragment) for bone density therapy. Physician prescription required. Stimulates osteoblast activity for new bone formation.',
    variants: [
      { id: 'nc-teriparatide-1mo', size: '1 month supply (20mcg/day)', price: 200.00, originalPrice: 250.00 },
      { id: 'nc-teriparatide-3mo', size: '3 month supply (20mcg/day)', price: 450.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Abaloparatide (1 supplier - prescription) ─────────────────────
  {
    id: 'nc-abaloparatide',
    supplierId: 'novacompound-rx',
    peptideId: 'abaloparatide',
    name: 'Compounded Abaloparatide Injection',
    description: 'Pharmacy-compounded abaloparatide (PTHrP analog) for severe osteoporosis. Physician prescription required. Selective PTH1R signaling for anabolic bone effects with lower hypercalcemia risk.',
    variants: [
      { id: 'nc-abaloparatide-1mo', size: '1 month supply (80mcg/day)', price: 250.00 },
      { id: 'nc-abaloparatide-3mo', size: '3 month supply (80mcg/day)', price: 500.00, originalPrice: 625.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Ziconotide (1 supplier - prescription) ────────────────────────
  {
    id: 'nc-ziconotide',
    supplierId: 'novacompound-rx',
    peptideId: 'ziconotide',
    name: 'Compounded Ziconotide Intrathecal Solution',
    description: 'Pharmacy-compounded ziconotide (omega-conotoxin MVIIA) for severe chronic pain management. Physician prescription required. N-type calcium channel blocker derived from cone snail venom. Intrathecal administration only.',
    variants: [
      { id: 'nc-ziconotide-1mo', size: '1 month supply (25mcg/mL)', price: 300.00 },
      { id: 'nc-ziconotide-3mo', size: '3 month supply (25mcg/mL)', price: 500.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Difelikefalin (1 supplier - prescription) ─────────────────────
  {
    id: 'nc-difelikefalin',
    supplierId: 'novacompound-rx',
    peptideId: 'difelikefalin',
    name: 'Compounded Difelikefalin Injection',
    description: 'Pharmacy-compounded difelikefalin (selective kappa opioid receptor agonist) for pruritus management. Physician prescription required. Peripherally acting with minimal CNS penetration.',
    variants: [
      { id: 'nc-difelikefalin-1mo', size: '1 month supply (0.5mcg/kg)', price: 150.00 },
      { id: 'nc-difelikefalin-3mo', size: '3 month supply (0.5mcg/kg)', price: 280.00, originalPrice: 350.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Glatiramer (1 supplier - prescription) ────────────────────────
  {
    id: 'nc-glatiramer',
    supplierId: 'novacompound-rx',
    peptideId: 'glatiramer',
    name: 'Compounded Glatiramer Acetate Injection',
    description: 'Pharmacy-compounded glatiramer acetate for relapsing-remitting multiple sclerosis. Physician prescription required. Immunomodulatory copolymer of glutamic acid, lysine, alanine, and tyrosine.',
    variants: [
      { id: 'nc-glatiramer-1mo', size: '1 month supply (20mg/day)', price: 200.00 },
      { id: 'nc-glatiramer-3mo', size: '3 month supply (40mg 3x/wk)', price: 400.00, originalPrice: 480.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Triptorelin (1 supplier - prescription) ───────────────────────
  {
    id: 'nc-triptorelin',
    supplierId: 'novacompound-rx',
    peptideId: 'triptorelin',
    name: 'Compounded Triptorelin Injection',
    description: 'Pharmacy-compounded triptorelin pamoate (GnRH agonist) for hormone-dependent conditions. Physician prescription required. Produces sustained LH/FSH suppression after initial stimulation.',
    variants: [
      { id: 'nc-triptorelin-1mo', size: '1 month depot (3.75mg)', price: 85.00 },
      { id: 'nc-triptorelin-3mo', size: '3 month depot (11.25mg)', price: 175.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Leuprolide (1 supplier - prescription) ────────────────────────
  {
    id: 'nc-leuprolide',
    supplierId: 'novacompound-rx',
    peptideId: 'leuprolide',
    name: 'Compounded Leuprolide Acetate Injection',
    description: 'Pharmacy-compounded leuprolide acetate (GnRH agonist) for hormone suppression therapy. Physician prescription required. Used in prostate cancer, endometriosis, and central precocious puberty.',
    variants: [
      { id: 'nc-leuprolide-1mo', size: '1 month depot (3.75mg)', price: 100.00, originalPrice: 125.00 },
      { id: 'nc-leuprolide-3mo', size: '3 month depot (11.25mg)', price: 200.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Afamelanotide (1 supplier - prescription) ─────────────────────
  {
    id: 'nc-afamelanotide',
    supplierId: 'novacompound-rx',
    peptideId: 'afamelanotide',
    name: 'Compounded Afamelanotide Implant',
    description: 'Pharmacy-compounded afamelanotide (MC1R agonist) subcutaneous implant for erythropoietic protoporphyria. Physician prescription required. Stimulates eumelanin production for photoprotection.',
    variants: [
      { id: 'nc-afamelanotide-single', size: 'Single implant (16mg)', price: 250.00 },
      { id: 'nc-afamelanotide-course', size: '3 implant course', price: 400.00, originalPrice: 500.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Desmopressin (2 products - prescription) ──────────────────────
  {
    id: 'nc-desmopressin-spray',
    supplierId: 'novacompound-rx',
    peptideId: 'desmopressin',
    name: 'Compounded Desmopressin Nasal Spray',
    description: 'Pharmacy-compounded desmopressin acetate (vasopressin V2 receptor agonist) nasal spray. Physician prescription required. Used for diabetes insipidus, nocturnal enuresis, and hemophilia A.',
    variants: [
      { id: 'nc-desmopressin-spray-1mo', size: '1 month spray (10mcg/spray)', price: 45.00 },
      { id: 'nc-desmopressin-spray-3mo', size: '3 month spray supply', price: 90.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'nasal_spray',
    purity: '99%+',
  },
  {
    id: 'nc-desmopressin-tab',
    supplierId: 'novacompound-rx',
    peptideId: 'desmopressin',
    name: 'Compounded Desmopressin Tablets',
    description: 'Pharmacy-compounded desmopressin acetate oral tablets. Physician prescription required. Convenient oral form for antidiuretic and coagulation support.',
    variants: [
      { id: 'nc-desmopressin-tab-1mo', size: '1 month supply (0.2mg tabs)', price: 50.00, originalPrice: 60.00 },
      { id: 'nc-desmopressin-tab-3mo', size: '3 month supply (0.2mg tabs)', price: 85.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'tablet',
    purity: '99%+',
  },

  // ── Octreotide (1 supplier - prescription) ────────────────────────
  {
    id: 'nc-octreotide',
    supplierId: 'novacompound-rx',
    peptideId: 'octreotide',
    name: 'Compounded Octreotide Injection',
    description: 'Pharmacy-compounded octreotide acetate (somatostatin analog) for neuroendocrine tumor management and acromegaly. Physician prescription required. Inhibits GH, glucagon, and insulin secretion.',
    variants: [
      { id: 'nc-octreotide-1mo', size: '1 month supply (100mcg TID)', price: 175.00 },
      { id: 'nc-octreotide-3mo', size: '3 month supply (200mcg TID)', price: 350.00, originalPrice: 425.00 },
    ],
    inStock: true,
    requiresPrescription: true,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'pre-mixed',
    purity: '99%+',
  },

  // ── Cagrilintide (1 supplier - research) ──────────────────────────
  {
    id: 'mv-cagrilintide',
    supplierId: 'metavitality-labs',
    peptideId: 'cagrilintide',
    name: 'Cagrilintide Research Vial',
    description: 'Lyophilized cagrilintide (long-acting amylin analog) for metabolic research. Phase 3 clinical candidate for obesity in combination with semaglutide (CagriSema). HPLC and MS verified.',
    variants: [
      { id: 'mv-cagrilintide-3', size: '3mg', price: 120.00 },
      { id: 'mv-cagrilintide-5', size: '5mg', price: 200.00, originalPrice: 240.00 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },

  // ── Survodutide (1 supplier - research) ───────────────────────────
  {
    id: 'mv-survodutide',
    supplierId: 'metavitality-labs',
    peptideId: 'survodutide',
    name: 'Survodutide Research Vial',
    description: 'Lyophilized survodutide (dual GLP-1/glucagon receptor agonist) for metabolic and MASH research. Phase 3 clinical candidate. May promote both weight loss and hepatic fat reduction.',
    variants: [
      { id: 'mv-survodutide-3', size: '3mg', price: 140.00 },
      { id: 'mv-survodutide-5', size: '5mg', price: 230.00 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },

  // ── Thymopentin (2 suppliers - research) ──────────────────────────
  {
    id: 'pl-thymopentin',
    supplierId: 'peptidelab-sciences',
    peptideId: 'thymopentin',
    name: 'Thymopentin (TP-5) Research Vial',
    description: 'Lyophilized thymopentin (thymopoietin 32-36 fragment) for immunomodulation research. Stimulates T-cell differentiation and maturation. HPLC verified.',
    variants: [
      { id: 'pl-thymopentin-10', size: '10mg', price: 35.99 },
      { id: 'pl-thymopentin-25', size: '25mg', price: 65.00, originalPrice: 79.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },
  {
    id: 'bt-thymopentin',
    supplierId: 'biosyntech-research',
    peptideId: 'thymopentin',
    name: 'Thymopentin (TP-5) Economy Vial',
    description: 'Research-grade thymopentin at competitive pricing for immune function studies. Ships worldwide.',
    variants: [
      { id: 'bt-thymopentin-10', size: '10mg', price: 29.99 },
      { id: 'bt-thymopentin-25', size: '25mg', price: 54.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },

  // ── Cortexin (1 supplier - research) ──────────────────────────────
  {
    id: 'np-cortexin',
    supplierId: 'neuropep-sciences',
    peptideId: 'cortexin',
    name: 'Cortexin Neuropeptide Complex Vial',
    description: 'Lyophilized cortexin polypeptide complex for neuroprotection and cognitive function research. Derived from cerebral cortex tissue. Promotes neurotrophic factor expression and synaptic plasticity.',
    variants: [
      { id: 'np-cortexin-5', size: '5mg (5 vials)', price: 55.00 },
      { id: 'np-cortexin-10', size: '10mg (10 vials)', price: 100.00, originalPrice: 110.00 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '98%+',
  },

  // ── Pinealon (1 supplier - research) ──────────────────────────────
  {
    id: 'np-pinealon',
    supplierId: 'neuropep-sciences',
    peptideId: 'pinealon',
    name: 'Pinealon Tripeptide Research Vial',
    description: 'Lyophilized pinealon (Glu-Asp-Arg) for sleep regulation and cognitive research. Short bioregulatory peptide that penetrates the blood-brain barrier. Modulates melatonin synthesis and circadian function.',
    variants: [
      { id: 'np-pinealon-10', size: '10mg', price: 40.00 },
      { id: 'np-pinealon-20', size: '20mg', price: 70.00 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },

  // ── Noopept (2 suppliers - research) ──────────────────────────────
  {
    id: 'np-noopept',
    supplierId: 'neuropep-sciences',
    peptideId: 'noopept',
    name: 'Noopept Cognitive Support Capsules',
    description: 'Encapsulated N-phenylacetyl-L-prolylglycine ethyl ester for nootropic and neuroprotective research. Modulates AMPA/NMDA receptor activity and BDNF/NGF expression. Oral bioavailability optimized.',
    variants: [
      { id: 'np-noopept-30', size: '30 capsules (10mg each)', price: 25.00 },
      { id: 'np-noopept-90', size: '90 capsules (10mg each)', price: 50.00, originalPrice: 60.00 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'capsule',
    purity: '99%+',
  },
  {
    id: 'bt-noopept',
    supplierId: 'biosyntech-research',
    peptideId: 'noopept',
    name: 'Noopept Economy Capsules',
    description: 'Budget-friendly noopept capsules for cognitive enhancement research. Third-party tested for purity.',
    variants: [
      { id: 'bt-noopept-30', size: '30 capsules (10mg each)', price: 19.99 },
      { id: 'bt-noopept-90', size: '90 capsules (10mg each)', price: 42.99 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'capsule',
    purity: '98%+',
  },

  // ── Carnosine (2 suppliers - research) ────────────────────────────
  {
    id: 'mv-carnosine',
    supplierId: 'metavitality-labs',
    peptideId: 'carnosine',
    name: 'L-Carnosine Longevity Capsules',
    description: 'Encapsulated L-carnosine (beta-alanyl-L-histidine) for anti-glycation and cellular longevity research. Potent antioxidant dipeptide that buffers intracellular pH and chelates metal ions.',
    variants: [
      { id: 'mv-carnosine-60', size: '60 capsules (500mg each)', price: 22.00 },
      { id: 'mv-carnosine-120', size: '120 capsules (500mg each)', price: 38.00, originalPrice: 44.00 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'capsule',
    purity: '99%+',
  },
  {
    id: 'bt-carnosine',
    supplierId: 'biosyntech-research',
    peptideId: 'carnosine',
    name: 'L-Carnosine Economy Capsules',
    description: 'Affordable L-carnosine capsules for anti-aging and antioxidant research. HPLC verified purity.',
    variants: [
      { id: 'bt-carnosine-60', size: '60 capsules (500mg each)', price: 18.00 },
      { id: 'bt-carnosine-120', size: '120 capsules (500mg each)', price: 32.00 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'capsule',
    purity: '98%+',
  },

  // ── Vilon (1 supplier - research) ─────────────────────────────────
  {
    id: 'pl-vilon',
    supplierId: 'peptidelab-sciences',
    peptideId: 'vilon',
    name: 'Vilon Dipeptide Research Vial',
    description: 'Lyophilized vilon (Lys-Glu) for immune modulation and anti-aging research. Khavinson bioregulatory peptide that stimulates thymic function and T-cell proliferation. HPLC verified.',
    variants: [
      { id: 'pl-vilon-10', size: '10mg', price: 45.00 },
      { id: 'pl-vilon-25', size: '25mg', price: 80.00, originalPrice: 95.00 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'lyophilized',
    purity: '99%+',
  },

  // ── Acetyl-Tetrapeptide-3 (1 supplier - cosmetic) ────────────────
  {
    id: 'pp-acetyl-tetrapeptide-3',
    supplierId: 'pinnacle-peptides',
    peptideId: 'acetyl-tetrapeptide-3',
    name: 'Acetyl-Tetrapeptide-3 Hair Density Serum',
    description: 'Premium topical serum containing acetyl-tetrapeptide-3 with red clover extract (Capixyl) for hair follicle research. Targets DHT pathways and extracellular matrix remodeling around hair follicles.',
    variants: [
      { id: 'pp-atp3-30', size: '30ml pump bottle', price: 40.00 },
      { id: 'pp-atp3-60', size: '60ml pump bottle', price: 75.00, originalPrice: 80.00 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'cream',
    purity: '5% Capixyl',
  },

  // ── Palmitoyl-Tetrapeptide-7 (1 supplier - cosmetic) ─────────────
  {
    id: 'pp-palmitoyl-tetrapeptide-7',
    supplierId: 'pinnacle-peptides',
    peptideId: 'palmitoyl-tetrapeptide-7',
    name: 'Palmitoyl-Tetrapeptide-7 Anti-Aging Cream',
    description: 'Premium anti-aging cream with palmitoyl-tetrapeptide-7 for skin rejuvenation research. Reduces IL-6 secretion and glycation-induced inflammation. Promotes firmer, smoother skin texture.',
    variants: [
      { id: 'pp-pt7-30', size: '30ml jar', price: 35.00 },
      { id: 'pp-pt7-60', size: '60ml jar', price: 60.00 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'cream',
    purity: '2% active',
  },

  // ── Myristoyl-Pentapeptide-17 (1 supplier - cosmetic) ────────────
  {
    id: 'pp-myristoyl-pentapeptide-17',
    supplierId: 'pinnacle-peptides',
    peptideId: 'myristoyl-pentapeptide-17',
    name: 'Myristoyl-Pentapeptide-17 Lash Growth Serum',
    description: 'Precision lash and brow serum with myristoyl-pentapeptide-17 for eyelash growth research. Stimulates keratin gene expression and follicle proliferation for longer, thicker lashes.',
    variants: [
      { id: 'pp-mp17-5', size: '5ml applicator', price: 30.00 },
      { id: 'pp-mp17-10', size: '10ml applicator (duo pack)', price: 55.00, originalPrice: 60.00 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'cream',
    purity: '3% active',
  },

  // ── Tetrapeptide-30 (1 supplier - cosmetic) ──────────────────────
  {
    id: 'pp-tetrapeptide-30',
    supplierId: 'pinnacle-peptides',
    peptideId: 'tetrapeptide-30',
    name: 'Tetrapeptide-30 Brightening Cream',
    description: 'Targeted skin brightening cream with tetrapeptide-30 for hyperpigmentation research. Inhibits tyrosinase and MITF transcription without cytotoxicity. Suitable for all skin types.',
    variants: [
      { id: 'pp-tp30-30', size: '30ml jar', price: 35.00 },
      { id: 'pp-tp30-60', size: '60ml jar', price: 60.00, originalPrice: 65.00 },
    ],
    inStock: true,
    requiresPrescription: false,
    thirdPartyTested: true,
    coaAvailable: true,
    form: 'cream',
    purity: '2% active',
  },
]
