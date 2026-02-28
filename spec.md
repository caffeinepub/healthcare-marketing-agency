# Healthcare Marketing Agency

## Current State
The project was previously attempted but failed deployment. The workspace may have partial files. We are rebuilding the full landing page clone from scratch.

## Requested Changes (Diff)

### Add
- Hero section with headline "Get 3X More Patients With Your Professional Online Presence" and bullet points
- Lead capture form (Business Name, Your Name, Phone Number, Email Address, City, Biggest Challenge dropdown) that stores submissions in backend
- Case studies section with 3 examples (Dental Clinic 20x, IVF Hospital 150%, Hair Transplant 7x revenue)
- Stats bar: 100+ Healthcare Providers, 5,000+ Patient Appointments, 3X Average Growth, 30 Days To See Results
- Why Choose Us section with 4 feature cards
- How It Works 3-step process section
- Medical specialties grid (Cardiologist, Dermatologist, Orthopedic, Pediatrician, Dentist, Ophthalmologist, Gynecologist, All Specialists)
- Services section with 6 service cards (Website, Booking, SEO, Reviews, Social Media, Analytics)
- Success story spotlight (Dr. Priya Malhotra, 127 new patients in 60 days)
- Testimonials section with 3 doctor reviews
- FAQ accordion (5 questions)
- Pricing section (₹1,00,000/month starting, ₹30,000 setup fee)
- CTA section at bottom
- Sticky header with logo and phone number
- Floating WhatsApp button
- Footer with copyright

### Modify
- Nothing (new build)

### Remove
- Nothing (new build)

## Implementation Plan
1. Backend: Store lead form submissions with fields: businessName, name, phone, email, city, challenge, timestamp
2. Backend: Query function to retrieve all leads (admin use)
3. Frontend: Full single-page landing page with all sections listed above
4. Frontend: Lead form wired to backend submitLead() function
5. Frontend: Floating WhatsApp button linking to wa.me/+919415890852
6. Frontend: Sticky navigation with phone number link
