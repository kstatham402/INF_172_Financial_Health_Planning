import { useState } from 'react';
import { useNavigate } from 'react-router';
import { HSAButton } from '../components/hsa-button';
import { HSACard } from '../components/hsa-card';
import { ProgressBar } from '../components/progress-bar';
import { SegmentedControl } from '../components/segmented-control';
import { HSATooltip } from '../components/hsa-tooltip';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import backgroundImage from 'figma:asset/c79af24386aadbd20a6ea4794c2bc96996f85c06.png';

interface SurveyData {
  savingHabit: string;
  emergencyFund: string;
  riskTolerance: string;
  healthStatus: string;
  chronicConditions: string;
  plannedProcedures: string;
  incomeStability: string;
  financialGoals: string;
  stressLevel: string;
  timeHorizon: string;
}

const initialData: SurveyData = {
  savingHabit: '',
  emergencyFund: '',
  riskTolerance: '',
  healthStatus: '',
  chronicConditions: '',
  plannedProcedures: '',
  incomeStability: '',
  financialGoals: '',
  stressLevel: '',
  timeHorizon: ''
};

export function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<SurveyData>(initialData);
  const [recommendation, setRecommendation] = useState<number | null>(null);
  const navigate = useNavigate();

  const totalSteps = 4;

  const updateData = (field: keyof SurveyData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const calculateRecommendation = () => {
    // Simple recommendation algorithm
    let baseAmount = 150;
    
    if (data.savingHabit === 'aggressive') baseAmount += 50;
    if (data.savingHabit === 'moderate') baseAmount += 25;
    
    if (data.healthStatus === 'poor' || data.healthStatus === 'fair') baseAmount += 40;
    if (data.chronicConditions === 'yes') baseAmount += 30;
    if (data.plannedProcedures === 'yes') baseAmount += 50;
    
    if (data.emergencyFund === 'comfortable') baseAmount += 30;
    if (data.incomeStability === 'very-stable') baseAmount += 20;
    
    if (data.stressLevel === 'high') baseAmount -= 20;
    
    setRecommendation(Math.max(50, Math.min(400, baseAmount)));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateRecommendation();
      setCurrentStep(5); // Results screen
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep <= totalSteps) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 5) {
      // Allow going back from results to last step
      setCurrentStep(totalSteps);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.savingHabit && data.emergencyFund && data.riskTolerance;
      case 2:
        return data.healthStatus && data.chronicConditions && data.plannedProcedures;
      case 3:
        return data.incomeStability && data.financialGoals;
      case 4:
        return data.stressLevel && data.timeHorizon;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: `url(${backgroundImage}) no-repeat center center fixed`, backgroundSize: 'cover' }}>
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-white hover:text-[#FF8A5C] transition-colors flex items-center gap-2 mb-4 drop-shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <h1 className="mb-2 text-white drop-shadow-lg">HSA Assessment</h1>
          <p className="text-white drop-shadow-md">Help us understand your situation to provide personalized recommendations</p>
        </div>

        {/* Progress Bar */}
        {currentStep <= totalSteps && (
          <div className="mb-8">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        )}

        {/* Survey Steps */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <Step1 key="step1" data={data} updateData={updateData} />
          )}
          {currentStep === 2 && (
            <Step2 key="step2" data={data} updateData={updateData} />
          )}
          {currentStep === 3 && (
            <Step3 key="step3" data={data} updateData={updateData} />
          )}
          {currentStep === 4 && (
            <Step4 key="step4" data={data} updateData={updateData} />
          )}
          {currentStep === 5 && recommendation !== null && (
            <ResultsStep key="results" recommendation={recommendation} navigate={navigate} onEditAnswers={() => setCurrentStep(1)} />
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentStep <= totalSteps && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between mt-8"
          >
            <HSAButton
              variant="secondary"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </HSAButton>
            <HSAButton
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === totalSteps ? 'Get Recommendation' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </HSAButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Step 1: Financial Behavior
function Step1({ data, updateData }: { data: SurveyData; updateData: (field: keyof SurveyData, value: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <HSACard>
        <h2 className="mb-6">Financial Behavior</h2>

        <div className="space-y-6">
          <div>
            <div className="mb-3">
              <label className="block mb-1">
                How would you describe your saving habits?
              </label>
              <HSATooltip content="Aggressive savers can comfortably contribute more to their HSA. We'll recommend higher contributions (+$25-50/paycheck) for moderate to aggressive savers, while keeping recommendations conservative for minimal savers." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'minimal', label: 'Minimal' },
                { value: 'moderate', label: 'Moderate' },
                { value: 'aggressive', label: 'Aggressive' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateData('savingHabit', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    data.savingHabit === option.value
                      ? 'border-[#FF8A5C] bg-[#FFF5F0]'
                      : 'border-[#E5E7EB] hover:border-[#FF9A72]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3">
              <label className="block mb-1">
                Do you have an emergency fund?
              </label>
              <HSATooltip content="A solid emergency fund (3-6 months of expenses) means you can contribute more to your HSA without worry. We'll add up to +$30/paycheck for those with comfortable emergency funds, since your HSA won't be your only safety net." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'none', label: 'No Fund' },
                { value: 'some', label: 'Some Savings' },
                { value: 'comfortable', label: '3-6 Months' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateData('emergencyFund', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    data.emergencyFund === option.value
                      ? 'border-[#FF8A5C] bg-[#FFF5F0]'
                      : 'border-[#E5E7EB] hover:border-[#FF9A72]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3">
              <label className="block mb-1">
                What's your financial risk tolerance?
              </label>
              <HSATooltip content="Higher risk tolerance means you're comfortable with more aggressive HSA contributions." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'low', label: 'Conservative' },
                { value: 'moderate', label: 'Moderate' },
                { value: 'high', label: 'Aggressive' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateData('riskTolerance', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    data.riskTolerance === option.value
                      ? 'border-[#FF8A5C] bg-[#FFF5F0]'
                      : 'border-[#E5E7EB] hover:border-[#FF9A72]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </HSACard>
    </motion.div>
  );
}

// Step 2: Health & Risk
function Step2({ data, updateData }: { data: SurveyData; updateData: (field: keyof SurveyData, value: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <HSACard>
        <h2 className="mb-6">Health & Risk Profile</h2>

        <div className="space-y-6">
          <div>
            <div className="mb-3">
              <label className="block mb-1">
                How would you rate your overall health?
              </label>
              <HSATooltip content="Your health status directly impacts your expected medical costs. If you rated fair or poor health, we'll increase your recommended contribution by +$40/paycheck to help cover higher anticipated expenses." />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: 'excellent', label: 'Excellent' },
                { value: 'good', label: 'Good' },
                { value: 'fair', label: 'Fair' },
                { value: 'poor', label: 'Poor' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateData('healthStatus', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    data.healthStatus === option.value
                      ? 'border-[#FF8A5C] bg-[#FFF5F0]'
                      : 'border-[#E5E7EB] hover:border-[#FF9A72]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3">
              <label className="block mb-1">
                Do you have any chronic health conditions?
              </label>
              <HSATooltip content="Chronic conditions require regular doctor visits, prescriptions, and ongoing care. Having any chronic condition adds +$30/paycheck to account for these consistent healthcare needs." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Yes' },
                { value: 'multiple', label: 'Multiple' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateData('chronicConditions', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    data.chronicConditions === option.value
                      ? 'border-[#FF8A5C] bg-[#FFF5F0]'
                      : 'border-[#E5E7EB] hover:border-[#FF9A72]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3">
              <label className="block mb-1">
                Any planned medical procedures in the next year?
              </label>
              <HSATooltip content="Planning a surgery, procedure, or major medical event? We'll add +$50/paycheck if you have confirmed plans to help you prepare financially. Even if you're unsure, it's wise to consider building a buffer." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Yes' },
                { value: 'unsure', label: 'Unsure' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateData('plannedProcedures', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    data.plannedProcedures === option.value
                      ? 'border-[#FF8A5C] bg-[#FFF5F0]'
                      : 'border-[#E5E7EB] hover:border-[#FF9A72]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </HSACard>
    </motion.div>
  );
}

// Step 3: Financial Stability
function Step3({ data, updateData }: { data: SurveyData; updateData: (field: keyof SurveyData, value: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <HSACard>
        <h2 className="mb-6">Financial Stability</h2>

        <div className="space-y-6">
          <div>
            <div className="mb-3">
              <label className="block mb-1">
                How stable is your income?
              </label>
              <HSATooltip content="Stable or very stable income gives you confidence to commit to higher HSA contributions. Very stable income earners get +$20/paycheck since you can reliably set aside these funds without risk of income disruption." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'variable', label: 'Variable' },
                { value: 'stable', label: 'Stable' },
                { value: 'very-stable', label: 'Very Stable' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateData('incomeStability', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    data.incomeStability === option.value
                      ? 'border-[#FF8A5C] bg-[#FFF5F0]'
                      : 'border-[#E5E7EB] hover:border-[#FF9A72]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3">
              <label className="block mb-1">
                What are your primary financial goals?
              </label>
              <HSATooltip content="Your goals shape our recommendation philosophy. Healthcare preparedness and retirement goals align well with HSA contributions, while debt payoff or emergency fund building may suggest keeping contributions moderate to maintain financial flexibility." />
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'debt', label: 'Pay Off Debt' },
                { value: 'savings', label: 'Build Emergency Savings' },
                { value: 'healthcare', label: 'Healthcare Preparedness' },
                { value: 'retirement', label: 'Long-term Retirement' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateData('financialGoals', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    data.financialGoals === option.value
                      ? 'border-[#FF8A5C] bg-[#FFF5F0]'
                      : 'border-[#E5E7EB] hover:border-[#FF9A72]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </HSACard>
    </motion.div>
  );
}

// Step 4: Preferences & Stress
function Step4({ data, updateData }: { data: SurveyData; updateData: (field: keyof SurveyData, value: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <HSACard>
        <h2 className="mb-6">Preferences & Stress Tolerance</h2>

        <div className="space-y-6">
          <div>
            <div className="mb-3">
              <label className="block mb-1">
                How much financial stress can you handle?
              </label>
              <HSATooltip content="If you prefer comfort and low stress, we'll be conservative with our recommendation. However, if you handle stress well, we reduce the contribution by -$20/paycheck for those who prefer maximum financial cushion elsewhere." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'low', label: 'Prefer Comfortable' },
                { value: 'moderate', label: 'Can Handle Some' },
                { value: 'high', label: 'Very Resilient' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateData('stressLevel', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    data.stressLevel === option.value
                      ? 'border-[#FF8A5C] bg-[#FFF5F0]'
                      : 'border-[#E5E7EB] hover:border-[#FF9A72]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3">
              <label className="block mb-1">
                What's your planning time horizon?
              </label>
              <HSATooltip content="Longer time horizons mean your HSA can grow through investment and compound returns. This question helps us understand your overall financial planning approach, though it doesn't directly change your recommended contribution amount." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'short', label: '1-3 Years' },
                { value: 'medium', label: '4-10 Years' },
                { value: 'long', label: '10+ Years' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateData('timeHorizon', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    data.timeHorizon === option.value
                      ? 'border-[#FF8A5C] bg-[#FFF5F0]'
                      : 'border-[#E5E7EB] hover:border-[#FF9A72]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </HSACard>
    </motion.div>
  );
}

// Results Step
function ResultsStep({ recommendation, navigate, onEditAnswers }: { recommendation: number; navigate: (path: string) => void; onEditAnswers: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HSACard className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
        </div>

        <h2 className="mb-4">Your Recommended Contribution</h2>
        
        <div className="my-8">
          <div className="text-6xl text-[#FF8A5C] mb-2">
            ${recommendation}
          </div>
          <p className="text-xl text-[#6B7280]">per paycheck</p>
        </div>

        <div className="bg-[#F9FAFB] rounded-xl p-6 mb-8 text-left">
          <h3 className="mb-3">Why this amount?</h3>
          <p className="text-[#6B7280]">
            Based on your financial situation, health profile, and goals, this contribution level balances
            healthcare preparedness with your other financial priorities. This amount should help you build
            a safety net without causing financial strain.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <HSAButton
            size="lg"
            onClick={() => navigate('/simulation', { state: { recommendation } })}
          >
            Run Simulation
            <ArrowRight className="w-5 h-5" />
          </HSAButton>
          <HSAButton
            variant="ghost"
            size="lg"
            onClick={onEditAnswers}
          >
            <ArrowLeft className="w-5 h-5" />
            Edit Answers
          </HSAButton>
          <HSAButton
            variant="secondary"
            size="lg"
            onClick={() => window.location.reload()}
          >
            Retake Assessment
          </HSAButton>
        </div>
      </HSACard>
    </motion.div>
  );
}