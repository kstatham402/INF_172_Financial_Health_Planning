import { useState, useRef, useEffect } from 'react';
import svgPaths from "./svg-9w5oh6atp0";

type Scenario = 'conservative' | 'average' | 'optimistic';

interface ScenarioData {
  balance: string;
  growth: string;
  percentage: string;
}

const scenarioDataMap: Record<Scenario, ScenarioData> = {
  conservative: {
    balance: '$3,450',
    growth: '+$180',
    percentage: '5.5%'
  },
  average: {
    balance: '$3,904',
    growth: '+$234',
    percentage: '6.4%'
  },
  optimistic: {
    balance: '$4,520',
    growth: '+$315',
    percentage: '7.5%'
  }
};

// Balance Card Components
function Paragraph({ scenario }: { scenario: Scenario }) {
  return (
    <div className="h-[16px] relative shrink-0 w-[321px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.8)] top-px">Current HSA Balance</p>
      </div>
    </div>
  );
}

function Paragraph1({ scenario }: { scenario: Scenario }) {
  const data = scenarioDataMap[scenario];
  return (
    <div className="h-[36px] relative shrink-0 w-[321px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[36px] text-white top-[0.5px] tracking-[-0.1309px] transition-all duration-300">{data.balance}</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pea6a680} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3155f180} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text({ scenario }: { scenario: Scenario }) {
  const data = scenarioDataMap[scenario];
  return (
    <div className="h-[16px] relative shrink-0 w-[146.383px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-px transition-all duration-300">{data.growth} ({data.percentage}) this month</p>
      </div>
    </div>
  );
}

function Container1({ scenario }: { scenario: Scenario }) {
  return (
    <div className="h-[16px] relative shrink-0 w-[321px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Icon />
        <Text scenario={scenario} />
      </div>
    </div>
  );
}

function BalanceCard({ scenario }: { scenario: Scenario }) {
  return (
    <div className="absolute bg-[#2563eb] content-stretch flex flex-col h-[100px] items-start left-[39px] pl-[20px] pt-[20px] rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[525px] w-[361px] transition-all duration-300" data-name="Container">
      <Paragraph scenario={scenario} />
      <Paragraph1 scenario={scenario} />
      <Container1 scenario={scenario} />
    </div>
  );
}

// Chart Components
function LineGraph() {
  // Data points for 5, 10, and 20 years
  const dataPoints = [
    { years: 0, amount: 3904 },
    { years: 5, amount: 18000 },
    { years: 10, amount: 45000 },
    { years: 20, amount: 105000 }
  ];

  const maxAmount = 120000;
  const chartWidth = 280;
  const chartHeight = 200;

  // Calculate positions for line path
  const getX = (years: number) => (years / 20) * chartWidth;
  const getY = (amount: number) => chartHeight - (amount / maxAmount) * chartHeight;

  // Create SVG path
  const pathData = dataPoints
    .map((point, idx) => {
      const x = getX(point.years);
      const y = getY(point.amount);
      return idx === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ');

  return (
    <div className="absolute left-[20px] top-[60px] w-[319px] h-[280px]" data-name="LineGraph">
      <div className="relative size-full px-8 py-4">
        {/* Grid lines */}
        <div className="absolute left-12 right-4 top-4 bottom-16 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-px bg-[#E5E7EB]" />
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-4 bottom-16 flex flex-col justify-between text-right w-10">
          {['$120k', '$90k', '$60k', '$30k', '$0'].map((label) => (
            <p key={label} className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-[#6b7280] -mt-1">
              {label}
            </p>
          ))}
        </div>

        {/* Chart area */}
        <div className="absolute left-12 right-4 top-4 bottom-16">
          <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
            {/* Gradient fill under line */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            {/* Area fill */}
            <path
              d={`${pathData} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`}
              fill="url(#lineGradient)"
              className="transition-all duration-500"
            />
            
            {/* Line */}
            <path
              d={pathData}
              stroke="#3B82F6"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-500"
            />
            
            {/* Data points */}
            {dataPoints.map((point, idx) => (
              <g key={idx}>
                <circle
                  cx={getX(point.years)}
                  cy={getY(point.amount)}
                  r="5"
                  fill="white"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  className="cursor-pointer hover:r-7 transition-all"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-12 right-4 bottom-0 flex justify-between">
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6b7280]">0</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6b7280]">5 yrs</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6b7280]">10 yrs</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6b7280]">20 yrs</p>
        </div>
      </div>
    </div>
  );
}

// Chart Container
function ChartContainer() {
  return (
    <div className="absolute bg-white border border-[#e5e7eb] border-solid h-[365px] left-[39px] rounded-[16px] top-[140px] w-[361px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[20px] not-italic text-[#101828] text-[16px] top-[20px] tracking-[-0.3125px]">HSA Growth</p>
      <LineGraph />
    </div>
  );
}

// Contribution Input
function ContributionInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d]/g, '');
    onChange(val);
  };

  return (
    <div className="relative w-full" data-name="Container" onClick={handleClick}>
      <div className="bg-white border-2 border-[#e5e7eb] content-stretch flex h-[56px] items-center pl-[16px] pr-[16px] py-[2px] rounded-[14px] w-full cursor-text transition-all duration-200 hover:border-[#2563eb] focus-within:border-[#2563eb]" data-name="Input Container">
        <div className="h-[32px] relative shrink-0 mr-2" data-name="Text">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32px] not-italic text-[#99a1af] text-[32px] tracking-[0.4063px]">$</p>
        </div>
        <div className="flex-1 h-[52px] relative" data-name="Text Input">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center relative size-full">
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="0"
                className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic text-[#101828] text-[32px] tracking-[0.4063px] bg-transparent border-none outline-none w-full placeholder:text-[#d1d5dc]"
              />
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic text-[#6a7282] text-[12px] mt-2 ml-1">per paycheck</p>
    </div>
  );
}

function ContributionLabel() {
  return (
    <div className="h-[20px] relative w-full mb-3" data-name="Label">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic text-[#364153] text-[14px] tracking-[-0.1504px]">Your HSA Contribution</p>
    </div>
  );
}

function ContributionAmountCard({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="bg-white h-[80px] relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] flex-1 transition-all duration-300" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between p-[12px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic text-[#4a5565] text-[10px] tracking-[0.1172px]">{label}</p>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic text-[#155dfc] text-[20px] tracking-[-0.4492px]">${amount}</p>
      </div>
    </div>
  );
}

function ContributionAmounts({ perPaycheck, monthly, annual }: { perPaycheck: string; monthly: string; annual: string }) {
  return (
    <div className="flex gap-[8px] w-full mt-4" data-name="Container">
      <ContributionAmountCard label="Per Paycheck" amount={perPaycheck} />
      <ContributionAmountCard label="Monthly" amount={monthly} />
      <ContributionAmountCard label="Annual" amount={annual} />
    </div>
  );
}

function ContributionContainer({ 
  contributionInput, 
  setContributionInput,
  perPaycheck,
  monthly,
  annual
}: { 
  contributionInput: string;
  setContributionInput: (val: string) => void;
  perPaycheck: string;
  monthly: string;
  annual: string;
}) {
  return (
    <div className="absolute bg-white border border-[#e5e7eb] border-solid flex flex-col left-[39px] p-[20px] rounded-[16px] top-[645px] w-[361px]" data-name="Container">
      <ContributionLabel />
      <ContributionInput value={contributionInput} onChange={setContributionInput} />
      <ContributionAmounts perPaycheck={perPaycheck} monthly={monthly} annual={annual} />
    </div>
  );
}

// Medical Factors
function MedicalFactorsHeading() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Medical Factors</p>
    </div>
  );
}

function InfoIcon() {
  return (
    <div className="relative shrink-0 size-[16px] cursor-help" data-name="Button" title="Select how many times per year you expect to be hospitalized">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
          <div className="absolute inset-[8.33%]" data-name="Vector">
            <div className="absolute inset-[-5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <path d={svgPaths.p3d62dd80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-[33.33%] left-1/2 right-1/2 top-1/2" data-name="Vector">
            <div className="absolute inset-[-25%_-0.67px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 4">
                <path d="M0.666667 3.33333V0.666667" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-[66.67%] left-1/2 right-[49.96%] top-[33.33%]" data-name="Vector">
            <div className="absolute inset-[-0.67px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.34 1.33333">
                <path d="M0.666667 0.666667H0.673334" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HospitalizationsLabel() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="h-[20px] relative shrink-0 w-[205.031px]" data-name="Label">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
          <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px]">Expected Hospitalizations/Year</p>
        </div>
      </div>
      <InfoIcon />
    </div>
  );
}

function DropdownIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={`relative shrink-0 size-[20px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function HospitalizationsDropdown({ value, onChange }: { value: number; onChange: (val: number) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: number) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="content-stretch flex flex-col gap-[8px] h-[78px] items-start relative shrink-0 w-full" data-name="Container">
      <HospitalizationsLabel />
      <div 
        className="bg-white h-[50px] relative rounded-[10px] shrink-0 w-full cursor-pointer hover:bg-gray-50 transition-colors" 
        data-name="Button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[17px] py-px relative size-full">
            <div className="h-[24px] relative shrink-0 w-[7.367px]" data-name="Text">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[4px] not-italic text-[#101828] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px]">{value}</p>
              </div>
            </div>
            <DropdownIcon isOpen={isOpen} />
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-[58px] left-0 right-0 bg-white border border-[#d1d5dc] rounded-[10px] shadow-lg z-10 max-h-[200px] overflow-y-auto">
          {[0, 1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className="px-[17px] py-[12px] hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => handleSelect(num)}
            >
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-[#101828]">{num}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ToggleSwitch({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) {
  return (
    <div 
      className="h-[24px] relative shrink-0 w-[44px] cursor-pointer"
      onClick={onToggle}
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div 
          className={`absolute content-stretch flex flex-col h-[24px] items-start rounded-[16777200px] top-0 w-[44px] transition-all duration-300 ${
            isOn ? 'bg-[#2563eb] pl-[22px] pr-[2px]' : 'bg-[#d1d5dc] pl-[2px] pr-[22px]'
          } pt-[4px]`}
          data-name="Primitive.button"
        >
          <div className="bg-white h-[20px] rounded-[16777200px] shrink-0 w-full shadow-sm" data-name="Primitive.span" />
        </div>
      </div>
    </div>
  );
}

function MedicalFactorItem({ 
  emoji, 
  bgColor, 
  title, 
  description, 
  isOn, 
  onToggle 
}: { 
  emoji: string; 
  bgColor: string; 
  title: string; 
  description: string;
  isOn: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full py-1" data-name="Container">
      <div className="flex gap-[12px] items-center" data-name="Container">
        <div className={`${bgColor} relative rounded-full shrink-0 size-[40px] flex items-center justify-center`} data-name="Container">
          <p className="font-['Inter:Regular',sans-serif] font-normal not-italic text-[20px]">{emoji}</p>
        </div>
        <div className="flex flex-col gap-[2px]" data-name="Container">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold not-italic text-[#101828] text-[14px]">{title}</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal not-italic text-[#4a5565] text-[11px]">{description}</p>
        </div>
      </div>
      <ToggleSwitch isOn={isOn} onToggle={onToggle} />
    </div>
  );
}

function MedicalFactorsList({ medicalFactors, toggleFactor }: { 
  medicalFactors: Record<string, boolean>;
  toggleFactor: (factor: string) => void;
}) {
  const factors = [
    { id: 'dental', emoji: '🦷', bgColor: 'bg-[#dbeafe]', title: 'Dental Care', description: 'Regular checkups, cleanings' },
    { id: 'vision', emoji: '👓', bgColor: 'bg-[#e0e7ff]', title: 'Vision Care', description: 'Eye exams, glasses' },
    { id: 'prescriptions', emoji: '💊', bgColor: 'bg-[#fce7f3]', title: 'Prescriptions', description: 'Ongoing medications' },
    { id: 'mentalHealth', emoji: '🧠', bgColor: 'bg-[#dcfce7]', title: 'Mental Health', description: 'Therapy, counseling' },
    { id: 'physicalTherapy', emoji: '🏃', bgColor: 'bg-[#fef3c7]', title: 'Physical Therapy', description: 'Injury recovery' },
    { id: 'chronicCondition', emoji: '❤️', bgColor: 'bg-[#fee2e2]', title: 'Chronic Condition', description: 'Ongoing treatment' },
  ];

  return (
    <div className="flex flex-col gap-[12px] w-full" data-name="Container">
      {factors.map((factor) => (
        <MedicalFactorItem
          key={factor.id}
          emoji={factor.emoji}
          bgColor={factor.bgColor}
          title={factor.title}
          description={factor.description}
          isOn={medicalFactors[factor.id]}
          onToggle={() => toggleFactor(factor.id)}
        />
      ))}
    </div>
  );
}

function MedicalFactorsContainer({ 
  hospitalizations, 
  setHospitalizations,
  medicalFactors,
  toggleFactor
}: { 
  hospitalizations: number;
  setHospitalizations: (val: number) => void;
  medicalFactors: Record<string, boolean>;
  toggleFactor: (factor: string) => void;
}) {
  return (
    <div className="absolute bg-white border border-[#e5e7eb] border-solid flex flex-col gap-[20px] left-[39px] p-[20px] rounded-[16px] top-[908px] w-[361px]" data-name="Container">
      <MedicalFactorsHeading />
      <HospitalizationsDropdown value={hospitalizations} onChange={setHospitalizations} />
      <MedicalFactorsList medicalFactors={medicalFactors} toggleFactor={toggleFactor} />
    </div>
  );
}

// Simulate Button
function SimulateButton({ onClick, isSimulating }: { onClick: () => void; isSimulating: boolean }) {
  return (
    <div 
      className={`absolute bg-[#3b82f6] content-stretch flex items-center justify-center left-[90px] p-[10px] rounded-[10px] top-[1604px] w-[260px] cursor-pointer transition-all duration-300 hover:bg-[#2563eb] hover:scale-105 active:scale-95 ${
        isSimulating ? 'animate-pulse' : ''
      }`}
      onClick={onClick}
    >
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[24px] text-white">
        {isSimulating ? 'Simulating...' : 'Simulate!'}
      </p>
    </div>
  );
}

// Main Component
export default function IPhone1617ProMax() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>('average');
  const [contributionInput, setContributionInput] = useState('');
  const [hospitalizations, setHospitalizations] = useState(1);
  const [medicalFactors, setMedicalFactors] = useState({
    dental: false,
    vision: false,
    prescriptions: false,
    mentalHealth: false,
    physicalTherapy: false,
    chronicCondition: false,
  });
  const [isSimulating, setIsSimulating] = useState(false);

  const toggleFactor = (factor: string) => {
    setMedicalFactors(prev => ({
      ...prev,
      [factor]: !prev[factor]
    }));
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 2000);
  };

  // Calculate amounts based on input (assuming bi-weekly paychecks: 26 per year)
  const perPaycheck = contributionInput || '0';
  const monthly = contributionInput ? Math.round((parseInt(contributionInput) * 26) / 12).toString() : '0';
  const annual = contributionInput ? (parseInt(contributionInput) * 26).toString() : '0';

  return (
    <div className="bg-white relative size-full" data-name="iPhone 16 & 17 Pro Max - 1">
      <BalanceCard scenario={selectedScenario} />
      <ChartContainer />
      
      <div className="absolute bg-[#155dfc] h-[103px] left-0 top-0 w-[440px]" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold h-[36px] leading-[normal] left-[89px] not-italic text-[32px] text-white top-[34px] w-[261px] whitespace-pre-wrap">Simulation Page</p>
      
      <ContributionContainer 
        contributionInput={contributionInput} 
        setContributionInput={setContributionInput}
        perPaycheck={perPaycheck}
        monthly={monthly}
        annual={annual}
      />
      
      <MedicalFactorsContainer 
        hospitalizations={hospitalizations}
        setHospitalizations={setHospitalizations}
        medicalFactors={medicalFactors}
        toggleFactor={toggleFactor}
      />
      
      <SimulateButton onClick={handleSimulate} isSimulating={isSimulating} />
    </div>
  );
}