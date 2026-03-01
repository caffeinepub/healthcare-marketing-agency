import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  Loader2,
  MessageCircle,
  MessageSquare,
  Phone,
  Search,
  Shield,
  Star,
  TrendingUp,
  Users,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

// ─────────────────────────────────────────────
// Animated counter hook
// ─────────────────────────────────────────────
function useCountUp(end: number, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(startValue + (end - startValue) * eased));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [end, duration, shouldStart]);

  return count;
}

// ─────────────────────────────────────────────
// Stat Counter Component
// ─────────────────────────────────────────────
function StatCounter({
  value,
  suffix,
  label,
}: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(value, 2000, isInView);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-display font-bold text-cream mb-1">
        {count}
        {suffix}
      </div>
      <div className="text-sm font-body text-green-light opacity-90">
        {label}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Lead Form Component
// ─────────────────────────────────────────────
function LeadForm() {
  const { actor } = useActor();
  const [formData, setFormData] = useState({
    businessName: "",
    name: "",
    phone: "",
    email: "",
    city: "",
    challenge: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Connection error. Please try again.");
      return;
    }
    setIsSubmitting(true);
    try {
      await actor.submitLead(
        formData.businessName,
        formData.name,
        formData.phone,
        formData.email,
        formData.city,
        formData.challenge,
        BigInt(Date.now()),
      );
      setSubmitted(true);
      toast.success("Your consultation request has been submitted!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-12 px-6"
      >
        <div className="w-20 h-20 rounded-full bg-green-pale flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-medium" />
        </div>
        <h3 className="font-display text-2xl font-bold text-green-deep mb-3">
          We'll Be In Touch Soon!
        </h3>
        <p className="text-muted-foreground font-body leading-relaxed">
          Our FnB marketing experts will contact you within 24 hours with your
          personalised growth plan.
        </p>
        <div className="mt-6 p-4 bg-green-pale rounded-xl text-sm text-green-medium font-body">
          📞 Can't wait? Call us:{" "}
          <a href="tel:9999764357" className="font-bold underline">
            9999764357
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form id="leadForm" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label
          htmlFor="businessName"
          className="text-sm font-medium text-foreground mb-1 block"
        >
          Business Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="businessName"
          placeholder="Your restaurant or cafe name"
          value={formData.businessName}
          onChange={(e) =>
            setFormData((p) => ({ ...p, businessName: e.target.value }))
          }
          required
          className="h-11 border-border focus:border-primary bg-white"
        />
      </div>
      <div>
        <Label
          htmlFor="name"
          className="text-sm font-medium text-foreground mb-1 block"
        >
          Your Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Owner / Manager name"
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          required
          className="h-11 border-border focus:border-primary bg-white"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label
            htmlFor="phone"
            className="text-sm font-medium text-foreground mb-1 block"
          >
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) =>
              setFormData((p) => ({ ...p, phone: e.target.value }))
            }
            required
            className="h-11 border-border focus:border-primary bg-white"
          />
        </div>
        <div>
          <Label
            htmlFor="city"
            className="text-sm font-medium text-foreground mb-1 block"
          >
            City <span className="text-destructive">*</span>
          </Label>
          <Input
            id="city"
            placeholder="Mumbai, Delhi..."
            value={formData.city}
            onChange={(e) =>
              setFormData((p) => ({ ...p, city: e.target.value }))
            }
            required
            className="h-11 border-border focus:border-primary bg-white"
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="email"
          className="text-sm font-medium text-foreground mb-1 block"
        >
          Email Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="owner@restaurant.com"
          value={formData.email}
          onChange={(e) =>
            setFormData((p) => ({ ...p, email: e.target.value }))
          }
          required
          className="h-11 border-border focus:border-primary bg-white"
        />
      </div>
      <div>
        <Label
          htmlFor="challenge"
          className="text-sm font-medium text-foreground mb-1 block"
        >
          Biggest Challenge
        </Label>
        <Select
          onValueChange={(val) =>
            setFormData((p) => ({ ...p, challenge: val }))
          }
        >
          <SelectTrigger className="h-11 border-border bg-white">
            <SelectValue placeholder="Select your challenge" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low footfall / table covers">
              Low footfall / table covers
            </SelectItem>
            <SelectItem value="Poor Zomato / Swiggy visibility">
              Poor Zomato / Swiggy visibility
            </SelectItem>
            <SelectItem value="No online ordering / delivery orders">
              No online ordering / delivery orders
            </SelectItem>
            <SelectItem value="Weak social media presence">
              Weak social media presence
            </SelectItem>
            <SelectItem value="Need complete digital solution">
              Need complete digital solution
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-base font-display font-semibold gradient-cta text-cream hover:opacity-90 shadow-green transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Get My Free Growth Plan →"
        )}
      </Button>
      <p className="text-xs text-center text-muted-foreground font-body">
        We'll contact you within 24 hours • No spam, guaranteed
      </p>
    </form>
  );
}

// ─────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document
      .getElementById("leadForm")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      <Toaster richColors position="top-right" />

      {/* ── STICKY HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-border"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-medium flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-cream" />
              </div>
              <span className="font-display font-bold text-lg text-green-deep tracking-tight">
                Kishara Digital
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:9999764357"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-green-medium hover:text-green-deep transition-colors"
              >
                <Phone className="w-4 h-4" />
                9999764357
              </a>
              <Button
                onClick={scrollToForm}
                className="gradient-cta text-cream text-sm font-semibold h-9 px-4 shadow-green hover:opacity-90"
              >
                Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="hero-mesh pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, oklch(0.55 0.1 155) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, oklch(0.55 0.1 155) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white border border-green-medium/30 rounded-full px-4 py-2 text-sm font-medium text-green-medium shadow-xs mb-6 w-fit"
              >
                <CheckCircle2 className="w-4 h-4 text-green-medium" />
                Trusted by 150+ Restaurants, Cafes &amp; Cloud Kitchens Across
                India
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-4xl md:text-5xl xl:text-6xl font-bold text-green-deep leading-[1.1] tracking-tight mb-5"
              >
                Get{" "}
                <span className="text-green-medium">
                  3X More Diners &amp; Delivery Orders
                </span>{" "}
                With Your Restaurant's Digital Presence
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl"
              >
                Stop losing customers to competitors who show up first on Zomato
                and Google. We build your complete digital presence — restaurant
                website, online ordering, and Google visibility. More customers,
                automatically.
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 mb-8"
              >
                {[
                  {
                    icon: Calendar,
                    text: "More Table Bookings. 24/7 online reservation system that fills every seat",
                  },
                  {
                    icon: Search,
                    text: "Rank #1 on Google & Zomato. Be the first restaurant customers find nearby",
                  },
                  {
                    icon: Star,
                    text: "Build Trust with Reviews. Showcase 5-star diner testimonials automatically",
                  },
                  {
                    icon: Globe,
                    text: "Professional Restaurant Website. Mobile-friendly site with menu, photos & booking",
                  },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-pale flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-green-medium" />
                    </div>
                    <span className="text-sm md:text-base text-foreground font-body">
                      {text}
                    </span>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className="gradient-cta text-cream font-semibold shadow-green hover:opacity-90 h-12 px-6"
                >
                  Get Free Growth Plan
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
                <a href="tel:9999764357">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-6 border-green-medium text-green-medium hover:bg-green-pale w-full sm:w-auto"
                  >
                    <Phone className="mr-2 w-4 h-4" />
                    Call Us Now
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column – Lead Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-[0_8px_50px_-10px_rgba(0,80,40,0.2)] border border-border p-6 md:p-8 relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-gold text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                  FREE CONSULTATION
                </div>
              </div>
              <div className="text-center mb-6 pt-2">
                <h2 className="font-display text-xl font-bold text-green-deep mb-1">
                  Get Your Free Growth Plan
                </h2>
                <p className="text-sm text-muted-foreground font-body">
                  See exactly how we'll get you more covers in 30 days
                </p>
              </div>
              <LeadForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="bg-green-pale text-green-medium border-0 mb-4 px-4 py-1.5 text-sm font-medium">
              Real Results
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-green-deep mb-3">
              Footfall &amp; Revenue Growth of Our Restaurant Clients
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real results from real restaurant owners and cafe operators we've
              helped grow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Cafe Chain (3 Outlets)",
                icon: "☕",
                badge: "15x Growth in 10 Months",
                stats: [
                  { label: "Total Clicks", value: "18.2K" },
                  { label: "Impressions", value: "960K" },
                ],
                color: "from-emerald-50 to-green-50",
              },
              {
                title: "Cloud Kitchen",
                icon: "🍱",
                badge: "200% Growth in 4 Months",
                stats: [
                  { label: "Delivery Orders", value: "3,200" },
                  { label: "Growth Rate", value: "+200%" },
                ],
                color: "from-teal-50 to-emerald-50",
                featured: true,
              },
              {
                title: "Fine Dining Restaurant",
                icon: "🍽️",
                badge: "5x Revenue Growth in 3 Years",
                stats: [
                  { label: "Total Clicks", value: "42.3K" },
                  { label: "Impressions", value: "3.2M" },
                ],
                color: "from-green-50 to-lime-50",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`card-hover bg-gradient-to-br ${item.color} rounded-2xl p-6 border border-green-medium/10 relative overflow-hidden ${item.featured ? "ring-2 ring-green-medium" : ""}`}
              >
                {item.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-medium text-cream text-xs">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-display text-lg font-bold text-green-deep mb-4">
                  {item.title}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {item.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-xl p-3 shadow-xs"
                    >
                      <div className="font-display text-xl font-bold text-green-medium">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground font-body">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-green-deep bg-white/80 rounded-lg px-3 py-2">
                  <TrendingUp className="w-4 h-4 text-green-medium" />
                  {item.badge}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="dark-section py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatCounter value={150} suffix="+" label="Restaurants" />
            <StatCounter value={50000} suffix="+" label="Table Covers" />
            <StatCounter value={3} suffix="X" label="Average Growth" />
            <StatCounter value={30} suffix="" label="Days To See Results" />
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-green-pale text-green-medium border-0 mb-4 px-4 py-1.5 text-sm font-medium">
              Why Us
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-green-deep mb-3">
              Why Restaurant Owners Choose Kishara Digital
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Digital marketing built for cafes, restaurants &amp; cloud
              kitchens
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Complete Solution",
                desc: "Everything your restaurant needs in one place — website, Zomato listings, reviews, table booking, and analytics. No juggling multiple agencies.",
              },
              {
                icon: Clock,
                title: "Fast Results",
                desc: "Most restaurant clients see measurable improvements within 30 days. Your new menu website goes live in 2 weeks.",
              },
              {
                icon: BarChart3,
                title: "Transparent ROI",
                desc: "Clear monthly reports showing exactly how many diners found you online, dine-in covers, and delivery order revenue generated.",
              },
              {
                icon: Shield,
                title: "Dedicated Support",
                desc: "Your own account manager who understands the FnB industry — food photography, seasonal menus, and Zomato algorithms.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-hover bg-background rounded-2xl p-6 border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-green-pale flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-green-medium" />
                </div>
                <h3 className="font-display text-lg font-bold text-green-deep mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 md:py-24 bg-green-pale/40">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-white text-green-medium border border-green-medium/30 mb-4 px-4 py-1.5 text-sm font-medium">
              Simple Process
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-green-deep mb-3">
              How It Works — Simple 3-Step Process
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From consultation to launch in just 30 days
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-green-pale via-green-medium/30 to-green-pale" />
            {[
              {
                step: "01",
                icon: MessageSquare,
                title: "Strategy Call",
                desc: "We learn about your restaurant, your cuisine, your goals, and what makes you unique. A 30-minute call that changes everything.",
              },
              {
                step: "02",
                icon: Globe,
                title: "We Build Everything",
                desc: "Our team builds your restaurant website with menu & photos, sets up your table booking system, optimises your Zomato/Swiggy listings, and launches your review system.",
              },
              {
                step: "03",
                icon: Users,
                title: "Diners Start Coming",
                desc: "New customers discover you on Google and Zomato, book tables or order online 24/7, and your restaurant grows automatically every month.",
              },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-card border border-border"
              >
                <div className="w-16 h-16 rounded-full bg-green-deep flex items-center justify-center mb-4 shadow-green">
                  <Icon className="w-7 h-7 text-cream" />
                </div>
                <div className="absolute -top-3 right-4 font-display font-bold text-5xl text-green-medium/10">
                  {step}
                </div>
                <h3 className="font-display text-xl font-bold text-green-deep mb-3">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS TYPES ── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-green-deep mb-2">
              We Serve All FnB Business Types
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              "☕ Cafe",
              "🍽️ Restaurant",
              "🍱 Cloud Kitchen",
              "🍕 QSR / Fast Food",
              "🥐 Bakery",
              "🍹 Bar & Grill",
              "🏨 Hotel F&B",
              "🚚 Food Truck",
              "🍣 Fine Dining",
              "🌮 All FnB Businesses",
            ].map((type, i) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Badge className="bg-green-pale text-green-deep border border-green-medium/20 px-4 py-2 text-sm font-medium hover:bg-green-medium hover:text-cream transition-colors cursor-default">
                  {type}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-green-pale text-green-medium border-0 mb-4 px-4 py-1.5 text-sm font-medium">
              Our Services
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-green-deep mb-3">
              Everything Your Restaurant Needs to Grow Online
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Professional Restaurant Website",
                features: [
                  "Custom design with your menu",
                  "Mobile-first, fast-loading",
                  "Online table reservation system",
                  "Food photography showcase",
                  "Location & hours pages",
                ],
              },
              {
                icon: Calendar,
                title: "Online Table Booking & Ordering",
                features: [
                  "24/7 automated reservation system",
                  "Calendar sync & booking reminders",
                  "Reduce no-shows by 60%",
                  "Online ordering / takeaway page",
                  "Order confirmation messages",
                ],
              },
              {
                icon: Search,
                title: "Zomato, Swiggy & Google Visibility",
                features: [
                  "Google Business Profile optimization",
                  "Zomato & Swiggy listing optimization",
                  "Local keyword targeting",
                  "Google Maps ranking",
                  "Monthly SEO audits",
                ],
              },
              {
                icon: Star,
                title: "Diner Reviews & Reputation",
                features: [
                  "Automated review collection",
                  "Respond to reviews at scale",
                  "Showcase on your website",
                  "Zomato rating improvement",
                  "Google rating improvement",
                ],
              },
              {
                icon: MessageCircle,
                title: "Social Media & Content",
                features: [
                  "Food & ambiance content creation",
                  "Instagram & Facebook management",
                  "Reels & short video content",
                  "Menu launch campaigns",
                  "Community engagement",
                ],
              },
              {
                icon: BarChart3,
                title: "Restaurant Analytics & Tracking",
                features: [
                  "Monthly performance reports",
                  "Customer acquisition tracking",
                  "ROI measurement dashboard",
                  "Delivery vs dine-in analysis",
                  "Competitor benchmarking",
                ],
              },
            ].map(({ icon: Icon, title, features }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="card-hover bg-white rounded-2xl p-6 border border-border shadow-card"
              >
                <div className="w-12 h-12 rounded-xl bg-green-pale flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-green-medium" />
                </div>
                <h3 className="font-display text-lg font-bold text-green-deep mb-4">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-muted-foreground font-body"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-medium shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORY SPOTLIGHT ── */}
      <section className="py-16 md:py-24 dark-section relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.7 0.1 150) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.5 0.08 155) 0%, transparent 50%)",
          }}
        />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-gold/20 text-gold border-gold/30 mb-6 px-4 py-1.5 text-sm font-medium">
                Success Story
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
                How a Mumbai Restaurant Got{" "}
                <span className="text-gold">312 New Table Covers</span> in 2
                Months
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10"
            >
              {[
                { value: "312", label: "New Covers", icon: Users },
                { value: "5,800", label: "Website Visitors", icon: Globe },
                { value: "#1", label: "Zomato Ranking", icon: Search },
                { value: "60", label: "Days To Full Results", icon: Clock },
              ].map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <Icon className="w-5 h-5 text-gold mx-auto mb-2" />
                  <div className="font-display text-2xl font-bold text-cream">
                    {value}
                  </div>
                  <div className="text-xs text-cream/70 font-body">{label}</div>
                </div>
              ))}
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="text-5xl text-gold/30 font-display leading-none mb-2">
                "
              </div>
              <p className="text-cream/90 text-lg md:text-xl leading-relaxed font-body italic mb-6">
                Before Kishara Digital, we were empty on weekdays. Within 60
                days, we were ranking #1 for restaurants in Bandra, and our
                tables were booked out for the entire week. The ROI is
                absolutely incredible.
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/30 flex items-center justify-center">
                  <span className="text-gold font-bold text-lg font-display">
                    R
                  </span>
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-cream">
                    Rahul Mehta
                  </div>
                  <div className="text-cream/60 text-sm font-body">
                    Restaurant Owner, Mumbai
                  </div>
                </div>
              </div>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-green-pale text-green-medium border-0 mb-4 px-4 py-1.5 text-sm font-medium">
              Testimonials
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-green-deep mb-3">
              What Restaurant Owners Say About Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sanjay Verma",
                title: "Cafe Owner, Delhi",
                initials: "SV",
                review:
                  "Kishara Digital completely transformed our cafe's online presence. We went from page 5 to #1 on Google in 3 months. We're now getting 60+ new table booking requests per week through our website alone.",
                growth: "+200% Bookings",
              },
              {
                name: "Priya Nair",
                title: "Cloud Kitchen, Bangalore",
                initials: "PN",
                review:
                  "The team really understands restaurant marketing. They optimised our Zomato listing and built a delivery-first website for our cloud kitchen. Our daily orders doubled in the first 2 months. The ROI tracking dashboard is excellent.",
                growth: "2X Daily Orders",
                featured: true,
              },
              {
                name: "Amit Shah",
                title: "Fine Dining, Ahmedabad",
                initials: "AS",
                review:
                  "I was sceptical at first, but the results speak for themselves. 312 new covers in 3 months, #1 on Google for 5 restaurant keywords, and our revenue has grown 80%. Best investment I've made for my restaurant.",
                growth: "312 New Covers",
              },
            ].map(({ name, title, initials, review, growth, featured }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`card-hover rounded-2xl p-6 border ${
                  featured
                    ? "bg-green-deep text-cream border-green-medium"
                    : "bg-background border-border"
                }`}
              >
                <div className="flex gap-1 mb-4">
                  {["s1", "s2", "s3", "s4", "s5"].map((id) => (
                    <Star key={id} className="w-4 h-4 fill-current text-gold" />
                  ))}
                </div>
                <p
                  className={`text-sm leading-relaxed mb-6 font-body italic ${
                    featured ? "text-cream/90" : "text-muted-foreground"
                  }`}
                >
                  "{review}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-display ${
                        featured
                          ? "bg-gold/30 text-gold"
                          : "bg-green-pale text-green-medium"
                      }`}
                    >
                      {initials}
                    </div>
                    <div>
                      <div
                        className={`font-semibold text-sm font-display ${
                          featured ? "text-cream" : "text-green-deep"
                        }`}
                      >
                        {name}
                      </div>
                      <div
                        className={`text-xs font-body ${
                          featured ? "text-cream/60" : "text-muted-foreground"
                        }`}
                      >
                        {title}
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={`text-xs ${
                      featured
                        ? "bg-gold/20 text-gold border-gold/30"
                        : "bg-green-pale text-green-medium border-0"
                    }`}
                  >
                    {growth}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-green-pale text-green-medium border-0 mb-4 px-4 py-1.5 text-sm font-medium">
              FAQs
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-green-deep mb-3">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  id: "results",
                  q: "How long does it take to see results?",
                  a: "Most restaurant clients see measurable improvements within the first 30 days — more website traffic, more table booking enquiries, and improved Google and Zomato rankings. Significant diner growth and increased covers typically begin in months 2–3. For SEO, meaningful ranking improvements appear between 60–90 days depending on your city and competition.",
                },
                {
                  id: "technical",
                  q: "Do I need to have any technical knowledge?",
                  a: "Absolutely not. We handle everything from start to finish — website design, menu pages, Zomato/Swiggy optimisation, table booking setup, and analytics. You focus on running your restaurant; we handle the digital marketing. Any menu updates or changes can be requested easily, and you'll receive a simple monthly report showing exactly what we've done.",
                },
                {
                  id: "difference",
                  q: "What makes you different from other marketing agencies?",
                  a: "We specialise in FnB and restaurant marketing. We understand food photography, seasonal menu promotions, Zomato and Swiggy algorithms, and what drives diners to choose one restaurant over another. Generic agencies don't understand why a beautifully photographed dish drives more covers than a generic banner ad.",
                },
                {
                  id: "existing",
                  q: "Can you help if I already have a website?",
                  a: "Yes, absolutely. We can audit and optimise your existing website, or rebuild it from scratch depending on what's needed. Many of our restaurant clients come with an existing website that isn't converting visitors into diners or delivery orders — we fix that. We'll tell you honestly what needs to change.",
                },
                {
                  id: "contract",
                  q: "Is there a contract or can I cancel anytime?",
                  a: "We require a 12-month commitment because SEO and digital marketing take time to show results. We don't believe in month-to-month engagements because they don't give us enough time to deliver meaningful outcomes. However, within that 12 months, we guarantee measurable growth or we work for free until we deliver results.",
                },
              ].map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="bg-white rounded-xl border border-border px-6 shadow-xs"
                >
                  <AccordionTrigger className="font-display font-semibold text-green-deep text-left hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-green-pale text-green-medium border-0 mb-4 px-4 py-1.5 text-sm font-medium">
              Pricing
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-green-deep mb-3">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              No hidden fees. No surprises.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-green-deep rounded-3xl p-8 md:p-12 text-cream shadow-[0_20px_60px_-10px_rgba(0,60,30,0.4)] relative overflow-hidden"
          >
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.7 0.1 150) 0%, transparent 70%)",
                transform: "translate(30%, -30%)",
              }}
            />

            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="text-cream/60 text-sm font-body mb-1">
                    Monthly Retainer
                  </div>
                  <div className="font-display text-5xl font-bold text-gold">
                    ₹1,00,000
                    <span className="text-2xl text-cream/60 font-normal">
                      /month
                    </span>
                  </div>
                </div>
                <Badge className="bg-gold/20 text-gold border-gold/30 px-4 py-2 text-sm w-fit">
                  Most Popular for Restaurants &amp; Cafes
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Professional restaurant website (custom design)",
                  "Online table booking & ordering page",
                  "Google Business Profile optimisation",
                  "Zomato & Swiggy listing management",
                  "Diner review collection system",
                  "Social media content (8 posts/month)",
                  "Monthly analytics & ROI report",
                  "Dedicated account manager",
                  "WhatsApp business integration",
                  "Competitor tracking & analysis",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm font-body"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span className="text-cream/90">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-cream/60 text-sm font-body">
                  Setup fee: ₹30,000 (one-time) • 12-month commitment required
                </p>
                <Button
                  onClick={scrollToForm}
                  className="bg-gold hover:bg-gold/90 text-accent-foreground font-semibold shadow-[0_4px_20px_rgba(255,200,0,0.3)] h-12 px-8 whitespace-nowrap"
                >
                  Schedule Free Consultation
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 md:py-24 bg-green-pale/50">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-full bg-green-medium mx-auto mb-6 flex items-center justify-center shadow-green">
              <UtensilsCrossed className="w-8 h-8 text-cream" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-green-deep mb-4">
              Ready to Get More Diners?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto font-body">
              Join 150+ restaurant and cafe owners who've transformed their
              customer acquisition with Kishara Digital's proven digital
              marketing system. Your competitors are already online — don't let
              them take your tables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="gradient-cta text-cream font-semibold shadow-green hover:opacity-90 h-12 px-8"
              >
                Get My Free Growth Plan
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
              <a href="tel:9999764357">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 border-green-medium text-green-medium hover:bg-green-pale w-full sm:w-auto"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Or call us: 9999764357
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-green-deep text-cream py-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <div className="w-7 h-7 rounded-full bg-cream/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4 text-gold" />
                </div>
                <span className="font-display font-bold text-lg">
                  Kishara Digital
                </span>
              </div>
              <p className="text-cream/60 text-sm font-body">
                Digital Marketing Agency for Restaurants, Cafes &amp; Cloud
                Kitchens
              </p>
              <p className="text-cream/50 text-xs mt-1 font-body">
                Contact:{" "}
                <a
                  href="tel:9999764357"
                  className="hover:text-gold transition-colors"
                >
                  9999764357
                </a>
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-4 text-sm text-cream/60">
                <button
                  type="button"
                  className="hover:text-cream transition-colors font-body cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  className="hover:text-cream transition-colors font-body cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
                <button
                  type="button"
                  className="hover:text-cream transition-colors font-body cursor-pointer"
                  onClick={scrollToForm}
                >
                  Contact Us
                </button>
              </div>
              <p className="text-cream/40 text-xs font-body">
                © {new Date().getFullYear()} Kishara Digital. All rights
                reserved.
              </p>
              <p className="text-cream/30 text-xs font-body">
                Built with ❤️ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream/60 transition-colors underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <motion.a
        href="https://wa.me/+919999764357"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full whatsapp-btn flex items-center justify-center transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="WhatsApp"
        >
          <title>WhatsApp</title>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </div>
  );
}
