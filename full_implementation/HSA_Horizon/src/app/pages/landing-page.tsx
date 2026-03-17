import { Link } from 'react-router';
import { HSAButton } from '../components/hsa-button';
import { HSACard } from '../components/hsa-card';
import { Calculator, TrendingUp, Heart, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import backgroundImage from 'figma:asset/c79af24386aadbd20a6ea4794c2bc96996f85c06.png';

export function LandingPage() {
  const [isHSAOpen, setIsHSAOpen] = useState(false);
  const [isWhoCanOpenOpen, setIsWhoCanOpenOpen] = useState(false);
  const [isHowHSAWorksOpen, setIsHowHSAWorksOpen] = useState(false);

  return (
    <div 
      className="min-h-screen overflow-x-hidden bg-cover bg-center bg-fixed" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header/Navigation */}
      <header className="py-6 relative z-50 border-b border-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            HSA Horizons
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="mb-6 text-white">
              Plan Your Healthcare Savings with Confidence
            </h1>
            <p className="text-xl text-white mb-8">
              Experiment today to prepare for tomorrow. Get personalized HSA contribution recommendations and simulate scenarios for smarter financial planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/survey">
                <HSAButton size="lg" className="w-full sm:w-auto">
                  Start Assessment
                </HSAButton>
              </Link>
              <Link to="/simulation">
                <HSAButton variant="secondary" size="lg" className="w-full sm:w-auto">
                  Run Simulation
                </HSAButton>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF8A5C] opacity-20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4F8EF7] opacity-20 rounded-full blur-3xl" />
      </section>

      {/* What is an HSA Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Collapse/Expand All Buttons */}
            <div className="flex justify-end gap-3 mb-4">
              <HSAButton
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsHSAOpen(true);
                  setIsWhoCanOpenOpen(true);
                  setIsHowHSAWorksOpen(true);
                }}
                className="text-sm text-white hover:text-[#FF8A5C]"
              >
                Expand All
              </HSAButton>
              <HSAButton
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsHSAOpen(false);
                  setIsWhoCanOpenOpen(false);
                  setIsHowHSAWorksOpen(false);
                }}
                className="text-sm text-white hover:text-[#FF8A5C]"
              >
                Collapse All
              </HSAButton>
            </div>

            <div className="space-y-4">
              {/* What is an HSA Dropdown */}
              <HSACard className="bg-white/95 backdrop-blur-sm">
                <button
                  onClick={() => setIsHSAOpen(!isHSAOpen)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <h2 className="mb-0">What is an HSA?</h2>
                  <motion.div
                    animate={{ rotate: isHSAOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-[#FF8A5C] group-hover:text-[#FF9A72] transition-colors" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isHSAOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-6 text-[#1F2937]">
                        <p className="leading-relaxed">
                          An HSA, or Health Savings Account, is a special type of savings account in the U.S. that lets you save money specifically for medical expenses tax-free. Here's a simple breakdown:
                        </p>

                        <div>
                          <h4 className="font-semibold mb-2">Who can have one:</h4>
                          <p className="text-[#6B7280]">
                            You need to be enrolled in a High-Deductible Health Plan (HDHP).
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">How it works:</h4>
                          <ul className="list-disc list-inside space-y-2 text-[#6B7280]">
                            <li>You put money into the account (you, your employer, or both can contribute).</li>
                            <li>The money you contribute is tax-deductible.</li>
                            <li>You can use the money to pay for qualified medical expenses like doctor visits, prescriptions, or dental care without paying taxes.</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Extra benefits:</h4>
                          <ul className="list-disc list-inside space-y-2 text-[#6B7280]">
                            <li>Money in an HSA rolls over year to year; it doesn't expire like a Flexible Spending Account (FSA).</li>
                            <li>You can invest HSA funds in stocks, mutual funds, etc., potentially growing your savings.</li>
                            <li>After age 65, you can use HSA funds for non-medical expenses without penalties (though you'll pay regular income tax).</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-[#F0F9FF] border-l-4 border-[#4F8EF7] rounded-r-lg">
                          <p className="text-[#1F2937] italic">
                            <strong>In short:</strong> An HSA is a tax-advantaged account that helps you save for health costs while giving some flexibility for the future.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </HSACard>

              {/* Who Can Open an HSA Dropdown */}
              <HSACard className="bg-white/95 backdrop-blur-sm">
                <button
                  onClick={() => setIsWhoCanOpenOpen(!isWhoCanOpenOpen)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <h2 className="mb-0">Who Can Open an HSA?</h2>
                  <motion.div
                    animate={{ rotate: isWhoCanOpenOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-[#FF8A5C] group-hover:text-[#FF9A72] transition-colors" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isWhoCanOpenOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-6 text-[#1F2937]">
                        <div>
                          <h4 className="font-semibold mb-3">Requirements:</h4>
                          <ul className="list-disc list-inside space-y-2 text-[#6B7280]">
                            <li>Must be enrolled in a High-Deductible Health Plan (HDHP).</li>
                            <li>Cannot be claimed as a dependent on someone else's tax return.</li>
                            <li>Generally must be under 65 (before Medicare enrollment).</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Who Cannot Open an HSA:</h4>
                          <ul className="list-disc list-inside space-y-2 text-[#6B7280]">
                            <li>People enrolled in Medicare.</li>
                            <li>Those with other disqualifying health coverage, like some traditional health insurance plans, general-purpose FSAs, or VA benefits.</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </HSACard>

              {/* How HSAs Work Dropdown */}
              <HSACard className="bg-white/95 backdrop-blur-sm">
                <button
                  onClick={() => setIsHowHSAWorksOpen(!isHowHSAWorksOpen)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <h2 className="mb-0">How HSAs Work</h2>
                  <motion.div
                    animate={{ rotate: isHowHSAWorksOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-[#FF8A5C] group-hover:text-[#FF9A72] transition-colors" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isHowHSAWorksOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-6 text-[#1F2937]">
                        <div>
                          <h4 className="font-semibold mb-3">Contributions:</h4>
                          <p className="text-[#6B7280] mb-3">
                            You, your employer, or both can contribute.
                          </p>
                          <div className="bg-[#F9FAFB] p-4 rounded-lg">
                            <p className="font-semibold text-sm mb-2">Annual contribution limits (2026):</p>
                            <ul className="list-disc list-inside space-y-1 text-[#6B7280]">
                              <li>Individual: $4,150</li>
                              <li>Family: $8,300</li>
                              <li>Age 55+ can contribute an extra $1,000 ("catch-up contribution").</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Spending on Qualified Medical Expenses:</h4>
                          <ul className="list-disc list-inside space-y-2 text-[#6B7280]">
                            <li>Use funds for doctor visits, prescriptions, dental, vision, and other IRS-approved medical expenses.</li>
                            <li>Payments for non-qualified expenses may incur taxes + 20% penalty (except after age 65, penalty is waived).</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Tax Advantages:</h4>
                          <ul className="list-disc list-inside space-y-2 text-[#6B7280]">
                            <li>Pre-tax contributions lower your taxable income.</li>
                            <li>Tax-free growth if invested.</li>
                            <li>Tax-free withdrawals when used for qualified medical expenses.</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </HSACard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-white drop-shadow-lg">Everything You Need to Plan Ahead</h2>
            <p className="text-lg text-white drop-shadow-md max-w-2xl mx-auto">
              Make informed decisions about your healthcare savings with powerful tools designed for clarity and confidence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <HSACard hover className="h-full bg-white/95 backdrop-blur-sm">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF8A5C] to-[#FF9A72] rounded-2xl flex items-center justify-center shadow-lg">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-center mb-3">Contribution Assessment</h3>
                <p className="text-black text-center">
                  Answer a few quick questions to receive a personalized HSA contribution suggestion based on your financial habits and health situation.
                </p>
              </HSACard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HSACard hover className="h-full bg-white/95 backdrop-blur-sm">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4F8EF7] to-[#3B7AE0] rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-center mb-3">Scenario Simulation</h3>
                <p className="text-black text-center">
                  Experiment with HSA contributions and medical expenses to explore how different choices impact your HSA balance and long-term savings.
                </p>
              </HSACard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <HSACard hover className="h-full bg-white/95 backdrop-blur-sm">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-center mb-3">Long-Term Projections</h3>
                <p className="text-black text-center">
                  Visualize your healthcare savings growth over 20 years with clear charts that show how your choices today affect tomorrow.
                </p>
              </HSACard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#1F2937] mb-6">Ready to Take Control of Your Healthcare Savings?</h2>
            <p className="text-xl text-[#1F2937] mb-8">
              Start with a quick assessment or jump straight into exploring different scenarios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/survey">
                <HSAButton size="lg" className="w-full sm:w-auto">
                  Take Assessment
                </HSAButton>
              </Link>
              <Link to="/simulation">
                <HSAButton variant="secondary" size="lg" className="w-full sm:w-auto">
                  Explore Simulation
                </HSAButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E7EB] py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-black text-sm">© 2026 HSA Horizon. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-black hover:text-[#FF8A5C] transition-colors text-sm">Privacy</a>
              <a href="#" className="text-black hover:text-[#FF8A5C] transition-colors text-sm">Terms</a>
              <a href="#" className="text-black hover:text-[#FF8A5C] transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}