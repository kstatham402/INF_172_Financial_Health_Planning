import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { HSAButton } from '../components/hsa-button';
import { HSACard } from '../components/hsa-card';
import { MetricCard } from '../components/metric-card';
import { AlertBanner } from '../components/alert-banner';
import { SegmentedControl } from '../components/segmented-control';
import { ArrowLeft, DollarSign, TrendingUp, Wallet, RotateCcw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import backgroundImage from 'figma:asset/c79af24386aadbd20a6ea4794c2bc96996f85c06.png';

interface ExpenseCategory {
  name: string;
  status: 'off' | 'insured' | 'uninsured';
  insuredCost: number;
  uninsuredCost: number;
}

// Default values for resetting
const DEFAULT_INITIAL_SAVINGS = 6500;
const DEFAULT_PAYCHECK = 900;
const DEFAULT_HSA_CONTRIBUTION = 150;
const DEFAULT_EXPENSES: ExpenseCategory[] = [
  { name: 'Routine Checkups', status: 'off', insuredCost: 15, uninsuredCost: 25 },
  { name: 'Dental Cleanings', status: 'off', insuredCost: 8, uninsuredCost: 30 },
  { name: 'Vision Care', status: 'off', insuredCost: 12, uninsuredCost: 35 },
  { name: 'Prescriptions', status: 'off', insuredCost: 50, uninsuredCost: 200 },
  { name: 'Urgent Care', status: 'off', insuredCost: 10, uninsuredCost: 25 },
  { name: 'Specialist Visits', status: 'off', insuredCost: 25, uninsuredCost: 75 }
];

export function SimulationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get recommendation from navigation state (if coming from assessment)
  const recommendedContribution = location.state?.recommendation || DEFAULT_HSA_CONTRIBUTION;
  
  const [initialSavings, setInitialSavings] = useState(DEFAULT_INITIAL_SAVINGS);
  const [paycheckAmount, setPaycheckAmount] = useState(DEFAULT_PAYCHECK);
  const [hsaContribution, setHsaContribution] = useState(recommendedContribution);
  
  const [expenses, setExpenses] = useState<ExpenseCategory[]>([...DEFAULT_EXPENSES]);

  const updateExpenseStatus = (index: number, status: 'off' | 'insured' | 'uninsured') => {
    const newExpenses = [...expenses];
    newExpenses[index].status = status;
    setExpenses(newExpenses);
  };

  // Input handlers with positive value validation
  const handleInitialSavingsChange = (value: string) => {
    const numValue = parseFloat(value);
    if (value === '' || numValue >= 0) {
      setInitialSavings(value === '' ? 0 : numValue);
    }
  };

  const handlePaycheckAmountChange = (value: string) => {
    const numValue = parseFloat(value);
    if (value === '' || numValue > 0) {
      setPaycheckAmount(value === '' ? 0 : numValue);
    }
  };

  const handleHsaContributionChange = (value: string) => {
    const numValue = parseFloat(value);
    if (value === '' || numValue >= 0) {
      setHsaContribution(value === '' ? 0 : numValue);
    }
  };

  // Reset all values to defaults
  const handleReset = () => {
    setInitialSavings(DEFAULT_INITIAL_SAVINGS);
    setPaycheckAmount(DEFAULT_PAYCHECK);
    setHsaContribution(DEFAULT_HSA_CONTRIBUTION);
    setExpenses([...DEFAULT_EXPENSES]);
  };

  // Calculate projections
  const projections = useMemo(() => {
    const years = 20;
    const paychecksPerYear = 26;
    const annualContribution = hsaContribution * paychecksPerYear;
    const annualExpenses = expenses.reduce((total, exp) => {
      if (exp.status === 'insured') return total + exp.insuredCost * 12;
      if (exp.status === 'uninsured') return total + exp.uninsuredCost * 12;
      return total;
    }, 0);

    // HSA starts at 0, general savings starts at initialSavings
    let hsaBalance = 0;
    let generalSavings = initialSavings;
    const data = [];

    for (let year = 0; year <= years; year++) {
      if (year > 0) {
        hsaBalance += annualContribution;
        hsaBalance -= annualExpenses;
        // Simple 3% growth on positive HSA balance
        if (hsaBalance > 0) {
          hsaBalance *= 1.03;
        }
        
        // General savings grows separately (10% of remaining paycheck after HSA contribution)
        const remainingAfterHSA = (paycheckAmount - hsaContribution) * paychecksPerYear;
        const yearlySavings = remainingAfterHSA * 0.10;
        generalSavings += yearlySavings;
      }

      data.push({
        year: year,
        id: `year-${year}`,
        balance: Math.round(hsaBalance),
        savings: Math.round(generalSavings),
        contributions: year === 0 ? 0 : Math.round(annualContribution),
        expenses: Math.round(annualExpenses)
      });
    }

    return data;
  }, [initialSavings, paycheckAmount, hsaContribution, expenses]);

  const finalBalance = projections[projections.length - 1].balance;
  const totalContributions = projections.reduce((sum, p) => sum + p.contributions, 0);
  const isNegative = finalBalance < 0;

  const contributionPercentage = ((hsaContribution / paycheckAmount) * 100).toFixed(1);
  const monthlyContribution = ((hsaContribution * 26) / 12).toFixed(0);
  const annualContribution = (hsaContribution * 26).toLocaleString();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: `url(${backgroundImage}) no-repeat center center fixed`, backgroundSize: 'cover' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-[#FF8A5C] transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <HSAButton
              variant="secondary"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Defaults
            </HSAButton>
          </div>
          <h1 className="mb-2 text-white">HSA Simulation Dashboard</h1>
          <p className="text-white">Adjust your contributions and expenses to see long-term projections</p>
        </div>

        {/* Contribution Settings - Full Width at Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <HSACard>
            <h3 className="mb-4">Contribution Settings</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 text-[#1F2937] font-medium">Initial Savings Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={initialSavings}
                    onChange={(e) => handleInitialSavingsChange(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8A5C] focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs text-[#6B7280] mt-1">How much you currently have in savings</p>
              </div>

              <div>
                <label className="block mb-2 text-[#1F2937] font-medium">Paycheck Amount (Bi-Weekly)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={paycheckAmount}
                    onChange={(e) => handlePaycheckAmountChange(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8A5C] focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs text-[#6B7280] mt-1">Your bi-weekly take-home pay</p>
              </div>

              <div>
                <label className="block mb-2 text-[#1F2937] font-medium">HSA Contribution per Paycheck</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={hsaContribution}
                    onChange={(e) => handleHsaContributionChange(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8A5C] focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs text-[#6B7280] mt-1">Amount to contribute each paycheck to HSA</p>
              </div>
            </div>

            <div className="bg-[#F9FAFB] rounded-xl p-4 mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <span className="block text-xs text-[#6B7280] mb-1">% of Paycheck</span>
                <span className="block text-lg font-semibold text-[#1F2937]">{contributionPercentage}%</span>
              </div>
              <div className="text-center">
                <span className="block text-xs text-[#6B7280] mb-1">Monthly Amount</span>
                <span className="block text-lg font-semibold text-[#1F2937]">${monthlyContribution}</span>
              </div>
              <div className="text-center">
                <span className="block text-xs text-[#6B7280] mb-1">Annual Amount</span>
                <span className="block text-lg font-semibold text-[#1F2937]">${annualContribution}</span>
              </div>
            </div>
          </HSACard>
        </motion.div>

        {/* Desktop: Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel: Metrics and Chart */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="mb-4 text-white">Projected Outcome (20 Years)</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <MetricCard
                  label="Total Contributions"
                  value={`$${totalContributions.toLocaleString()}`}
                  trend="up"
                  icon={<DollarSign className="w-5 h-5 text-[#4F8EF7]" />}
                />
                <MetricCard
                  label="Final HSA Balance"
                  value={isNegative ? `-$${Math.abs(finalBalance).toLocaleString()}` : `$${finalBalance.toLocaleString()}`}
                  trend={isNegative ? 'down' : 'up'}
                  icon={<Wallet className="w-5 h-5 text-[#FF8A5C]" />}
                />
              </div>

              {isNegative && (
                <AlertBanner type="warning" className="mt-4">
                  <strong>Warning:</strong> Your expenses exceed contributions. Consider increasing your HSA contributions or reducing expected medical costs.
                </AlertBanner>
              )}

              {!isNegative && finalBalance > 50000 && (
                <AlertBanner type="success" className="mt-4">
                  <strong>Great work!</strong> You're on track to build a strong healthcare savings cushion.
                </AlertBanner>
              )}
            </motion.div>

            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <HSACard>
                <h3 className="mb-6">Balance Over Time</h3>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%" minHeight={400}>
                    <BarChart data={projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="year" 
                        stroke="#6B7280"
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Year', position: 'insideBottom', offset: -5, style: { fill: '#6B7280' } }}
                      />
                      <YAxis 
                        stroke="#6B7280"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft', style: { fill: '#6B7280' } }}
                      />
                      <Tooltip 
                        formatter={(value: number) => `$${value.toLocaleString()}`}
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                      />
                      <Bar 
                        key="savings-bar"
                        dataKey="savings" 
                        fill="#4F8EF7" 
                        radius={[8, 8, 0, 0]}
                        name="General Savings"
                      />
                      <Bar 
                        key="balance-bar"
                        dataKey="balance" 
                        fill="#FF8A5C" 
                        radius={[8, 8, 0, 0]}
                        name="HSA Balance"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </HSACard>
            </motion.div>
          </div>

          {/* Right Panel: Medical Expense Categories */}
          <div className="space-y-6">
            {/* Medical Expense Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <HSACard>
                <h3 className="mb-4">Medical Expense Categories</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Select how you expect to use each type of healthcare service
                </p>
                
                <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
                  {expenses.map((expense, index) => (
                    <div key={expense.name} className="border border-[#E5E7EB] rounded-xl p-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex-1">
                          <div className="font-medium text-[#1F2937] mb-1">{expense.name}</div>
                          <div className="text-xs text-[#6B7280]">
                            Insured: ${expense.insuredCost}/mo · Uninsured: ${expense.uninsuredCost}/mo
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => updateExpenseStatus(index, 'off')}
                            className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                              expense.status === 'off'
                                ? 'border-[#6B7280] bg-[#6B7280] text-white'
                                : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#6B7280]'
                            }`}
                          >
                            Off
                          </button>
                          <button
                            onClick={() => updateExpenseStatus(index, 'insured')}
                            className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                              expense.status === 'insured'
                                ? 'border-[#4F8EF7] bg-[#4F8EF7] text-white'
                                : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#4F8EF7]'
                            }`}
                          >
                            Insured
                          </button>
                          <button
                            onClick={() => updateExpenseStatus(index, 'uninsured')}
                            className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                              expense.status === 'uninsured'
                                ? 'border-[#FF8A5C] bg-[#FF8A5C] text-white'
                                : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#FF8A5C]'
                            }`}
                          >
                            Uninsured
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </HSACard>
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <HSAButton
                variant="secondary"
                className="w-full"
                onClick={() => navigate('/survey')}
              >
                Retake Contribution Assessment
              </HSAButton>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}