# Kishara Digital — Cafe/FnB/Restaurant Marketing Agency

## Current State
A full-stack marketing agency landing page built for healthcare providers (doctors, clinics, hospitals). It includes:
- Hero with lead capture form
- Case study results cards
- Stats bar (animated counters)
- Why Choose Us (4 cards)
- How It Works (3 steps)
- Specialties tag cloud
- Services (6 cards)
- Success story spotlight
- Testimonials (3 cards)
- FAQ accordion
- Pricing section
- Bottom CTA
- Footer
- Floating WhatsApp button
- Backend: Motoko canister storing leads with businessName, name, phone, email, city, challenge

## Requested Changes (Diff)

### Add
- Restaurant/cafe/FnB-specific case studies (e.g. QSR chain, fine dining restaurant, cloud kitchen, cafe)
- Restaurant-specific service descriptions (menu website, online ordering, Zomato/Swiggy profile, food photography direction, table booking, review management)
- Restaurant/FnB business type tags replacing medical specialties (Cafe, Restaurant, Cloud Kitchen, QSR, Bakery, Bar & Grill, Hotel F&B, Food Truck, etc.)
- Restaurant-focused FAQ answers
- Restaurant-specific challenge options in lead form (Low footfall, Poor online visibility, No delivery orders, Weak social media, Need complete solution)
- Restaurant-focused testimonials and success story

### Modify
- All copy, stats, headlines to be relevant to cafes/restaurants/FnB (replace "patients" with "customers/diners/footfall", "doctors" with "restaurant owners", "clinic" with "restaurant/cafe")
- Hero headline and subheadline for FnB growth
- Case study stats to show table covers, delivery orders, footfall, Zomato ratings
- Stats bar numbers appropriate for FnB industry
- Services section to show FnB-specific digital services
- Success story to feature a restaurant client
- Why Choose Us copy tailored to FnB owners
- How It Works steps adapted to restaurant onboarding
- Pricing kept at same structure but copy updated for restaurants
- Lead form placeholder text updated (e.g. "Your restaurant or cafe name", "Owner / Manager name")

### Remove
- Medical/healthcare icons (HeartPulse) replaced with FnB icon (UtensilsCrossed or similar)
- All references to patients, doctors, clinics, hospitals, HIPAA, medical ethics
- Healthcare specialty tags

## Implementation Plan
1. Replace all copy, headlines, sub-headlines for FnB audience throughout App.tsx
2. Swap HeartPulse icon to UtensilsCrossed (or ChefHat) in header, footer, CTA section
3. Update hero badge and hero bullet points for FnB growth messaging
4. Update case studies to reflect restaurant/FnB clients with relevant metrics
5. Update stats bar (e.g. 150+ Restaurants, 50,000+ Table Covers, 3X Revenue Growth, 30 Days To See Results)
6. Update Why Choose Us cards for FnB context
7. Update How It Works copy for restaurant onboarding
8. Replace medical specialty tags with FnB business types
9. Update all 6 services cards with FnB-relevant service names and features
10. Update success story spotlight to feature a restaurant client
11. Update all 3 testimonials to restaurant owners
12. Update FAQ answers for FnB context
13. Update pricing card copy for FnB
14. Update bottom CTA and footer tagline
15. Update lead form: placeholder text and challenge options for FnB
