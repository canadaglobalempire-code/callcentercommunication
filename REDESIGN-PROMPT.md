# Detailed Implementation Prompt — Call Center Communications Website Redesign

Use this prompt to build the full website. It is self-contained and includes all business context, architecture, content, and technical requirements.

---

## THE PROMPT

```
You are redesigning the website for Call Center Communications (callcentercommunications.com) — a call center outsourcing brokerage with ~30 years of experience. The company is NOT a call center. They are a FREE brokerage that matches businesses with vetted call center providers worldwide (onshore, nearshore, offshore). Their revenue comes from provider referral partnerships, not from the client companies.

The existing codebase is a Next.js 16 app (App Router) with React 19 in the /callcentercommunications folder. There is already a /public/images/ folder with 70+ professional stock photos and a hero-video.mp4. The current code is a basic single-page scaffold that needs to be rebuilt into a full multi-page professional website.

DO NOT touch any other folders. Only work inside /callcentercommunications.

---

## BUSINESS CONTEXT

Company: Call Center Communications
Website: callcentercommunications.com
Email: info@callcentercommunications.com
Business model: Free outsourcing brokerage — companies pay nothing. CCC earns from provider partnerships.
Experience: ~30 years, founded by former BPO executives
Tagline: "The World's Premiere Call Center Outsourcing Brokerage"
Locations coverage: Onshore (USA/Canada), Nearshore (Latin America), Offshore (Asia, Africa, Europe)

Key differentiators:
1. 100% FREE for companies — zero cost to the client
2. ~30 years of BPO industry experience
3. All referred providers are PCI-compliant and certified
4. Redundant infrastructure guaranteed (no single point of failure)
5. Omnichannel and AI-forward approach
6. Unbiased advice — brokerage model, not a single provider pushing their own service

Core services (6):
1. Inbound Call Center Services — 24/7 customer support, help desk, order processing, live chat, email support, social media support, disaster recovery, customer retention, tech support, retail call centers
2. Outbound Call Center Services — Lead generation, sales, surveys, collections, fundraising, market research, appointment setting, emergency/disaster outbound
3. Business Process Outsourcing (BPO) — Data entry, transcription, content moderation, document translations, data cleansing, market research, image sorting, invoice/PO entry, document formatting, form processing, data conversion, email sorting
4. Interactive & Automated Services — AI/ML solutions, avatar lead generation, IVR customer support, automated outbound, omnichannel customer support
5. Responsiveness & Reporting — High-touch account management, real-time analytics, campaign tracking, performance reporting
6. Multilingual Agents — Multi-language support for global customers

Industries served (14):
1. Healthcare — Patient experience, demand spikes, communication services
2. Banking & Financial Services — Customer care, account activations, product sales, multilingual
3. Insurance — Inbound/outbound sales, cross-sell, warranty inquiries, automated claims
4. Telecommunications — Billing, customer care, collections, equipment troubleshooting
5. Retail — 24/7 order taking, refunds/returns, customer retention, upsell/cross-sell
6. Ecommerce — Customer acquisition, query management, SEO, social media, shipping
7. Technology — 24/7 tech support, helpdesk, upsell/cross-sell
8. Automotive — Customer outreach, dealer/OEM connection, outbound campaigns
9. Airlines — Crisis management, customer care, mobile check-ins, reservations, claims
10. Travel & Hospitality — Lead gen, social moderation, loyalty programs, marketing
11. Government Services — Social messaging, email campaigns, survey support, emergency alerts
12. Energy & Utilities — Demand spikes, credit management, customer acquisition
13. Cable & Media — Billing, customer care, troubleshooting, back office, tech support tiers
14. Disaster & Emergency — Crisis hotlines, 24/7 emergency centers, outbound notifications

---

## SITE ARCHITECTURE

Build these pages using Next.js App Router:

/ → Homepage
/about → About Us
/services → Services Overview
/services/inbound → Inbound Call Center Services
/services/outbound → Outbound Call Center Services
/services/bpo → Business Process Outsourcing
/services/automated → Interactive & Automated Services
/services/reporting → Responsiveness & Reporting
/services/multilingual → Multilingual Agents
/industries → Industries Overview
/industries/healthcare → Healthcare
/industries/banking → Banking & Financial Services
/industries/insurance → Insurance
/industries/telecommunications → Telecommunications
/industries/retail → Retail
/industries/ecommerce → Ecommerce
/industries/technology → Technology
/industries/automotive → Automotive
/industries/airlines → Airlines
/industries/travel → Travel & Hospitality
/industries/government → Government Services
/industries/energy → Energy & Utilities
/industries/cable-media → Cable & Media
/industries/disaster → Disaster & Emergency Call Center
/contact → Contact Us
/blog → Blog listing page
/blog/[slug] → Blog post template
/case-studies → Case Studies listing
/case-studies/[slug] → Case Study detail template
/free-consultation → Dedicated landing page
/privacy-policy → Privacy Policy
/terms → Terms of Service

Use dynamic routes with generateStaticParams for /services/[slug] and /industries/[slug]. Store all data in /src/data/ files (services.js, industries.js, testimonials.js, caseStudies.js, blogPosts.js, siteConfig.js).

---

## HOMEPAGE SECTIONS (in order)

1. STICKY NAVBAR
   - Logo (left): /public/images/logo.png
   - Nav links: About, Services (dropdown showing 6 services), Industries (dropdown showing 14 industries), Case Studies, Blog, Contact
   - Right side: Phone number + "Free Consultation" CTA button (orange)
   - Mobile: Hamburger icon → slide-out drawer menu
   - Sticky on scroll with background blur/white

2. HERO SECTION
   - Background: hero-video.mp4 with dark gradient overlay
   - H1: "Find Your Perfect Call Center Partner — For Free"
   - Sub-headline: "We've spent 30 years vetting the world's top call center providers so you don't have to. Tell us what you need and we'll match you with the right partner. No cost. No obligation."
   - Two CTAs: "Get Matched Free" (primary orange) + "See How It Works" (outline white)
   - Below: Trust stats bar — "30+ Years Experience | 100s of Clients Served | Vetted Provider Network | 14 Industries Covered"
   - Stats should animate/count up when visible

3. TRUSTED BY / LOGO BAR
   - Heading: "Trusted By Companies Across Every Industry"
   - If no real client logos yet, use industry icon badges (Healthcare, Banking, Telecom, Retail, etc.) in a scrolling marquee
   - Design it so real logos can be swapped in later

4. HOW IT WORKS
   - Heading: "How It Works"
   - Sub: "Getting matched with the right call center is simple — and completely free."
   - 4 steps with numbered circles and icons:
     Step 1: "Tell Us Your Needs" — Fill out our quick consultation form with your requirements
     Step 2: "We Find Your Match" — Our experts search our vetted network for the perfect fit
     Step 3: "Meet Your Provider" — We introduce you to qualified partners who match your criteria
     Step 4: "Launch & Grow" — Your new call center team integrates seamlessly with your business

5. SERVICES OVERVIEW
   - Heading: "Our Services"
   - Sub: "Comprehensive call center and BPO solutions tailored to your business"
   - 6 cards in a 3x2 grid, each with: icon, title, 2-line description, "Learn More →" link to /services/[slug]
   - Cards have hover lift effect

6. WHY CHOOSE US
   - Split layout: Image left (use /public/images/team-collaboration.jpg or similar), content right
   - Heading: "Why Companies Choose Call Center Communications"
   - 5 feature items with icons:
     • 100% Free Service — No cost, no commission, no hidden fees
     • 30 Years of Expertise — Founded by former BPO executives who know the industry inside out
     • PCI-Compliant Providers Only — Every partner meets the highest security and compliance standards
     • Omnichannel & AI-Ready — Modern solutions across voice, chat, email, social, and AI
     • Unbiased Matching — We're a brokerage, not a provider. Our only goal is finding your best fit

7. INDUSTRIES GRID
   - Heading: "Industries We Serve"
   - Sub: "Specialized call center solutions for every sector"
   - 14 industry cards in a responsive grid, each with: industry icon, title, brief tag line, link to /industries/[slug]
   - Dark background section with cards having subtle glass effect

8. TESTIMONIALS
   - Heading: "What Our Clients Say"
   - Carousel with 3 placeholder testimonials (design for real quotes to be added):
     • "Call Center Communications matched us with the perfect partner in less than a week. The service was completely free and the results exceeded our expectations." — VP Operations, Healthcare Company
     • "After years of trial and error with call centers, CCC connected us to a provider that actually understood our industry. Game changer." — Director of CX, Retail Brand
     • "The team's decades of experience showed immediately. They asked the right questions and found us an offshore team that cut our costs 40% without sacrificing quality." — COO, Technology Startup
   - Include note in code comments that these are placeholder testimonials

9. CTA BANNER
   - Full-width orange gradient background
   - Heading: "Ready to Find Your Ideal Call Center Partner?"
   - Sub: "Schedule your free consultation today. No commitment, no cost — just expert guidance."
   - CTA button: "Get Your Free Consultation" → links to /free-consultation

10. BLOG PREVIEW
    - Heading: "Latest Insights"
    - 3 placeholder blog cards with title, excerpt, date, "Read More →"
    - "View All Posts →" link to /blog

11. FOOTER
    - 4 columns:
      Col 1: Logo, company description, phone, email, social icons
      Col 2: "Company" — About, Case Studies, Blog, Contact, Free Consultation
      Col 3: "Services" — all 6 service links
      Col 4: "Industries" — all 14 industry links (or top 8 + "View All")
    - Bottom bar: Copyright 2026, Privacy Policy, Terms of Service
    - Newsletter signup field (email input + subscribe button)

---

## INDIVIDUAL SERVICE PAGE TEMPLATE (/services/[slug])

Each of the 6 service pages should follow this layout:
1. Breadcrumbs (Home > Services > [Service Name])
2. Hero banner with service title (H1), description paragraph, and CTA
3. Overview section — what this service covers, why companies need it
4. Features/capabilities grid — all the sub-services listed with icons (use the detailed lists from the business context above)
5. "Why outsource [service]?" section — 3-4 benefit points
6. Related industries section — which industries commonly need this service
7. CTA banner — "Need [service]? Let's find your perfect provider."
8. Related services — links to the other 5 services

SEO: Each page gets unique title, meta description, and JSON-LD Service schema.

---

## INDIVIDUAL INDUSTRY PAGE TEMPLATE (/industries/[slug])

Each of the 14 industry pages should follow this layout:
1. Breadcrumbs (Home > Industries > [Industry])
2. Hero banner with industry name (H1), industry-specific tagline, relevant image
3. Industry challenges section — what problems companies in this industry face with customer service
4. Solutions section — how call center outsourcing solves these problems (use the specific bullet points from the business context above for each industry)
5. Relevant services section — which of the 6 services apply to this industry
6. Stats/facts about outsourcing in this industry (can be placeholder)
7. CTA banner — "Ready to transform your [industry] customer experience?"
8. Related industries

SEO: Each page gets unique title, meta description, and JSON-LD schema.

---

## ABOUT PAGE (/about)

1. Hero: "About Call Center Communications"
2. Story section: Founded by former BPO executives, ~30 years connecting companies with call center providers worldwide. Expand on the "more than a brokerage" messaging.
3. Mission/Values: Innovation & Adaptability, Privacy & Security, Unbiased Expertise
4. Stats bar: 30+ Years | Hundreds of Clients | Global Provider Network | 14 Industries
5. "What Makes Us Different" section:
   - Cost Effective, Experienced, Ethical
   - Adaptable, Strategic, Fast Launching
   - PCI Compliant partners, redundant infrastructure, omnichannel-ready
6. Team section (placeholder for real team bios)
7. CTA banner

---

## CONTACT PAGE (/contact)

1. Hero: "Contact Us" + "Ready to outsource today?"
2. Two-column layout:
   Left: Contact form matching the existing WordPress form fields:
     - Company Name (required)
     - Name (required)
     - Title (required)
     - Phone Number (required)
     - Email Address (required)
     - Website/URL (required)
     - Inbound/Outbound/Both (radio)
     - Anticipated call length in minutes (required)
     - Business or Consumer contacts (radio)
     - Product/service description (textarea)
     - Daily program hours (required)
     - Estimated monthly call volume (required)
     - Purpose of call (select: Sales, Appointment Setting, Lead Generation, Market Research, Customer Service, Customer Retention, Database Update, Other)
     - Anticipated program start date (required)
     - Number of agents needed (select: 5-25, 25-50, 50-100, 100+)
     - Days of week (checkboxes: Mon-Sun)
     - Additional comments (textarea)
   Right: Direct contact info, phone, email, map or "We serve clients worldwide" message

3. Form submission: POST to /api/contact API route. For now, log to console + return success. Add email forwarding later via SMTP/SendGrid.

---

## FREE CONSULTATION LANDING PAGE (/free-consultation)

1. Headline: "Get Your Free Call Center Consultation"
2. Sub: "No cost. No obligation. Just expert guidance from industry veterans."
3. Simplified form: Name, Email, Company, Phone, Brief description of needs, Submit
4. Right side: 3 trust points (Free Service, 30 Years Experience, PCI Compliant Partners)
5. Testimonial quote below form

---

## DESIGN SYSTEM

Colors:
  --primary: #f6780a (orange)
  --primary-dark: #d45608
  --primary-light: #fff4eb
  --dark: #0f172a
  --dark-secondary: #1e293b
  --gray: #64748b
  --gray-light: #f1f5f9
  --bg: #ffffff
  --success: #10b981

Typography:
  - Import Inter from next/font/google
  - H1: 3.5rem/bold, H2: 2.5rem/bold, H3: 1.5rem/semibold
  - Body: 1rem/400, line-height 1.7

Spacing:
  - Section padding: 96px top/bottom
  - Container max-width: 1280px
  - Card border-radius: 12px
  - Button border-radius: 8px

Cards:
  - White background, subtle border (#e2e8f0), shadow on hover
  - Hover: translateY(-4px) + larger shadow

Buttons:
  - Primary: orange bg, white text, hover darker orange
  - Secondary: transparent with border, hover light bg
  - Large variant for hero CTAs

---

## SEO REQUIREMENTS

Every page must export a metadata object with:
  - title: "[Page Title] | Call Center Communications"
  - description: Unique 150-160 char description with target keywords
  - openGraph: title, description, url, siteName, type
  - twitter: card, title, description
  - alternates.canonical: full URL

Add JSON-LD structured data:
  - Organization schema on layout (every page)
  - BreadcrumbList on all inner pages
  - Service schema on service pages
  - FAQPage schema where FAQ sections exist
  - Article schema on blog posts

Generate sitemap.xml using next-sitemap or a custom route handler.

---

## TECHNICAL REQUIREMENTS

1. Use Next.js App Router with server components by default, 'use client' only where needed (forms, carousels, mobile menu, animations)
2. Use next/image for all images with proper width/height/alt attributes
3. Use next/font for font loading (self-hosted, no layout shift)
4. All pages must be fully responsive (mobile-first: 320px → 768px → 1024px → 1280px+)
5. Implement scroll-triggered fade-in animations using Intersection Observer
6. Contact form: client-side validation + API route handler
7. Navbar: transparent on hero, solid white on scroll (add scroll listener)
8. Service and industry data lives in /src/data/ — single source of truth for content + dynamic routes
9. Use generateStaticParams for all dynamic routes so pages are statically generated
10. Lighthouse performance target: 90+ on Performance, Accessibility, Best Practices, SEO
11. Add loading.js files for route transitions
12. Implement proper error.js and not-found.js pages
13. Use CSS Modules for component styles (already established pattern)

---

## FILE STRUCTURE

Create this exact structure:

src/
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js (Homepage)
│   ├── page.module.css
│   ├── not-found.js
│   ├── about/
│   │   ├── page.js
│   │   └── page.module.css
│   ├── services/
│   │   ├── page.js (overview)
│   │   ├── page.module.css
│   │   └── [slug]/
│   │       ├── page.js
│   │       └── page.module.css
│   ├── industries/
│   │   ├── page.js (overview)
│   │   ├── page.module.css
│   │   └── [slug]/
│   │       ├── page.js
│   │       └── page.module.css
│   ├── contact/
│   │   ├── page.js
│   │   └── page.module.css
│   ├── blog/
│   │   ├── page.js
│   │   ├── page.module.css
│   │   └── [slug]/
│   │       ├── page.js
│   │       └── page.module.css
│   ├── case-studies/
│   │   ├── page.js
│   │   ├── page.module.css
│   │   └── [slug]/
│   │       ├── page.js
│   │       └── page.module.css
│   ├── free-consultation/
│   │   ├── page.js
│   │   └── page.module.css
│   ├── privacy-policy/
│   │   └── page.js
│   ├── terms/
│   │   └── page.js
│   └── api/
│       └── contact/
│           └── route.js
├── components/
│   ├── layout/
│   │   ├── Navbar.js
│   │   ├── Navbar.module.css
│   │   ├── Footer.js
│   │   ├── Footer.module.css
│   │   ├── MobileMenu.js
│   │   └── MobileMenu.module.css
│   ├── sections/
│   │   ├── Hero.js + Hero.module.css
│   │   ├── TrustBar.js + TrustBar.module.css
│   │   ├── LogoCarousel.js + LogoCarousel.module.css
│   │   ├── HowItWorks.js + HowItWorks.module.css
│   │   ├── ServicesGrid.js + ServicesGrid.module.css
│   │   ├── WhyChooseUs.js + WhyChooseUs.module.css
│   │   ├── IndustriesGrid.js + IndustriesGrid.module.css
│   │   ├── Testimonials.js + Testimonials.module.css
│   │   ├── CaseStudyPreview.js + CaseStudyPreview.module.css
│   │   ├── CtaBanner.js + CtaBanner.module.css
│   │   └── BlogPreview.js + BlogPreview.module.css
│   ├── ui/
│   │   ├── Button.js + Button.module.css
│   │   ├── SectionHeading.js + SectionHeading.module.css
│   │   ├── Breadcrumbs.js + Breadcrumbs.module.css
│   │   ├── ContactForm.js + ContactForm.module.css
│   │   └── ConsultationForm.js + ConsultationForm.module.css
│   └── seo/
│       └── JsonLd.js
├── data/
│   ├── services.js
│   ├── industries.js
│   ├── testimonials.js
│   ├── caseStudies.js
│   ├── blogPosts.js
│   └── siteConfig.js
└── lib/
    └── metadata.js

---

## DATA FILE: services.js

Export an array of 6 service objects. Each object:
{
  slug: "inbound",
  title: "Inbound Call Center Services",
  shortDescription: "24/7 customer support, help desk, and order processing",
  description: "Whether you need 24/7 call center support to boost your seasonal inbound customer support needs, or for ongoing support year round, our network of inbound call centers will integrate seamlessly into your business to meet your specific needs.",
  image: "/images/cc-agent-headset.jpg",
  icon: "PhoneIncoming" (use Lucide icon name or similar),
  features: [
    "Order Processing",
    "Marketing Support",
    "New Customer Acquisition",
    "24/7 Technical Support",
    "Helpdesk Services",
    "Social Media Support",
    "Disaster Recovery",
    "Customer Retention",
    "Retail Call Centers",
    "Email Support",
    "Live Chat/Text Support",
    "Social Media Customer Support"
  ],
  benefits: [
    "Never miss a customer call with 24/7 availability",
    "Scale support up or down based on seasonal demand",
    "Reduce costs while improving customer satisfaction",
    "Seamless integration with your existing systems"
  ],
  relatedIndustries: ["healthcare", "retail", "ecommerce", "technology"]
}

Create similar complete objects for all 6 services using the business context provided above.

---

## DATA FILE: industries.js

Export an array of 14 industry objects. Each object:
{
  slug: "healthcare",
  title: "Healthcare",
  tagline: "Improve patient experience with specialized healthcare call center solutions",
  description: "Healthcare organizations face unique challenges...",
  image: "/images/case-study-healthcare.jpg",
  icon: "Heart",
  challenges: [
    "Managing critical spikes in patient call volume",
    "Providing accurate medical communication",
    "Maintaining HIPAA compliance",
    "Delivering empathetic patient experiences"
  ],
  solutions: [
    "Boost Your Healthcare Customer Support",
    "Adapt And Scale To Critical Spikes In Demand",
    "Improve Your Patient Experience",
    "Provide Accurate Communication Services"
  ],
  relatedServices: ["inbound", "automated", "multilingual"]
}

Create similar complete objects for all 14 industries using the business context provided above.

---

## DATA FILE: siteConfig.js

export const siteConfig = {
  name: "Call Center Communications",
  tagline: "The World's Premiere Call Center Outsourcing Brokerage",
  email: "info@callcentercommunications.com",
  phone: "", // Client to provide
  url: "https://callcentercommunications.com",
  founded: "1996", // approximate based on "almost thirty years"
  description: "Call Center Communications is a free call center outsourcing brokerage that matches businesses with vetted contact center providers worldwide.",
  social: {
    linkedin: "",
    twitter: "",
    facebook: ""
  }
};

---

## IMPORTANT NOTES

1. All content on the live WordPress site (callcentercommunications.com) should be used as the content source. The copy above comes directly from the live site. Expand and improve it — do not reduce it.

2. Placeholder testimonials must have HTML comments marking them as placeholders so the client can swap in real ones.

3. The blog and case study pages should have template infrastructure ready with 2-3 sample/placeholder posts, so the client can add real content.

4. The contact form must replicate ALL fields from the current WordPress contact form — do not simplify it. This is a qualified lead form and every field serves a purpose.

5. The "FREE service" messaging must be prominent — it's the #1 differentiator. It should appear in the hero, in the How It Works section, in CTAs, and on the free consultation page.

6. Image selection from /public/images/: Use contextually appropriate images. Agent headset photos for service pages, team/office photos for about, industry-specific case study images for industry pages.

7. Every page must work perfectly on mobile. Test at 375px width.

8. Build for production quality. This is a real client project being delivered for money.
```

---

## HOW TO USE THIS PROMPT

1. Copy everything between the triple backticks above
2. Paste it as the opening prompt in a new Claude or AI coding session
3. Ask it to start with Phase 1 (foundation + homepage)
4. Then proceed page by page through Phases 2-4
5. Review each deliverable before moving to the next phase

You can also break it into smaller prompts per phase if the context window fills up. The data files (services.js, industries.js, siteConfig.js) should be created first as they feed every page.
