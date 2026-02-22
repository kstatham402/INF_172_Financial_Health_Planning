import { useState } from 'react';
import svgPaths from "./svg-3mjqtj2ceo";

type Scenario = 'conservative' | 'average' | 'optimistic';

interface ScenarioData {
  balance: string;
  growth: string;
  percentage: string;
  chartPath: string;
  dataPoints: Array<{ cx: string; cy: string }>;
}

const scenarioDataMap: Record<Scenario, ScenarioData> = {
  conservative: {
    balance: '$3,450',
    growth: '+$180',
    percentage: '5.5%',
    chartPath: 'M0 15.578C21.917 14.719 23.917 11.047 45.833 9.328C67.75 7.609 69.75 3.937 91.667 2.219C113.583 0.5 115.583 -3.172 137.5 -4.891C159.417 -6.609 161.417 -10.281 183.333 -12C205.25 -13.719 207.25 -17.391 229.167 -19.109C251.083 -20.828 253.083 -24.5 263 -25.359',
    dataPoints: [
      { cx: '0', cy: '15.578' },
      { cx: '23.917', cy: '11.047' },
      { cx: '47.833', cy: '9.328' },
      { cx: '71.75', cy: '7.609' },
      { cx: '95.667', cy: '5.219' },
      { cx: '119.583', cy: '3.937' },
      { cx: '143.5', cy: '2.891' },
      { cx: '167.417', cy: '1.281' },
      { cx: '191.333', cy: '0' },
      { cx: '215.25', cy: '-1.391' },
      { cx: '239.167', cy: '-2.109' }
    ]
  },
  average: {
    balance: '$3,904',
    growth: '+$234',
    percentage: '6.4%',
    chartPath: svgPaths.p199d5a00,
    dataPoints: [
      { cx: '0', cy: '15.578' },
      { cx: '23.917', cy: '9.047' },
      { cx: '47.833', cy: '6.328' },
      { cx: '71.75', cy: '3.609' },
      { cx: '95.667', cy: '2.219' },
      { cx: '119.583', cy: '0.937' },
      { cx: '143.5', cy: '-0.109' },
      { cx: '167.417', cy: '-1.719' },
      { cx: '191.333', cy: '-3' },
      { cx: '215.25', cy: '-4.391' },
      { cx: '239.167', cy: '-5.109' }
    ]
  },
  optimistic: {
    balance: '$4,520',
    growth: '+$315',
    percentage: '7.5%',
    chartPath: 'M0 15.578C21.917 9.719 23.917 4.047 45.833 1.328C67.75 -1.391 69.75 -5.063 91.667 -6.781C113.583 -8.5 115.583 -12.172 137.5 -13.891C159.417 -15.609 161.417 -19.281 183.333 -21C205.25 -22.719 207.25 -26.391 229.167 -28.109C251.083 -29.828 253.083 -33.5 263 -34.359',
    dataPoints: [
      { cx: '0', cy: '15.578' },
      { cx: '23.917', cy: '6.047' },
      { cx: '47.833', cy: '2.328' },
      { cx: '71.75', cy: '-1.391' },
      { cx: '95.667', cy: '-4.781' },
      { cx: '119.583', cy: '-7.063' },
      { cx: '143.5', cy: '-9.891' },
      { cx: '167.417', cy: '-12.719' },
      { cx: '191.333', cy: '-15' },
      { cx: '215.25', cy: '-17.391' },
      { cx: '239.167', cy: '-19.109' }
    ]
  }
};

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
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[36px] text-white top-[0.5px] tracking-[-0.1309px] transition-all duration-300">
          {data.balance}
        </p>
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
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-px transition-all duration-300">
          {data.growth} ({data.percentage}) this month
        </p>
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

function Container({ scenario }: { scenario: Scenario }) {
  return (
    <div className="absolute bg-[#2563eb] content-stretch flex flex-col h-[100px] items-start left-[39px] pl-[20px] pt-[20px] rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[525px] w-[361px] transition-all duration-300" data-name="Container">
      <Paragraph scenario={scenario} />
      <Paragraph1 scenario={scenario} />
      <Container1 scenario={scenario} />
    </div>
  );
}

function Button({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  return (
    <div 
      className={`flex-[1_0_0] h-[30px] min-h-px min-w-px relative rounded-[16777200px] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${
        isActive ? 'bg-[#2563eb]' : 'bg-white'
      }`}
      onClick={onClick}
      data-name="Button"
    >
      {!isActive && <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[16777200px]" />}
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className={`-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[51.5px] not-italic text-[12px] text-center top-[8px] ${
          isActive ? 'text-white' : 'text-[#4a5565]'
        }`}>
          Conservative
        </p>
      </div>
    </div>
  );
}

function Button1({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  return (
    <div 
      className={`h-[30px] relative rounded-[16777200px] shrink-0 w-[70.875px] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${
        isActive ? 'bg-[#2563eb]' : 'bg-white'
      }`}
      onClick={onClick}
      data-name="Button"
    >
      {!isActive && <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[16777200px]" />}
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className={`-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[35px] not-italic text-[12px] text-center top-[8px] ${
          isActive ? 'text-white' : 'text-[#4a5565]'
        }`}>
          Average
        </p>
      </div>
    </div>
  );
}

function Button2({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  return (
    <div 
      className={`h-[30px] relative rounded-[16777200px] shrink-0 w-[85.195px] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${
        isActive ? 'bg-[#2563eb]' : 'bg-white'
      }`}
      onClick={onClick}
      data-name="Button"
    >
      {!isActive && <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[16777200px]" />}
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className={`-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[43.5px] not-italic text-[#4a5565] text-[12px] text-center top-[8px] ${
          isActive ? 'text-white' : 'text-[#4a5565]'
        }`}>
          Optimistic
        </p>
      </div>
    </div>
  );
}

function Container4({ 
  selectedScenario, 
  onSelectScenario 
}: { 
  selectedScenario: Scenario;
  onSelectScenario: (scenario: Scenario) => void;
}) {
  return (
    <div className="h-[30px] relative shrink-0 w-[273.734px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <Button 
          isActive={selectedScenario === 'conservative'} 
          onClick={() => onSelectScenario('conservative')}
        />
        <Button1 
          isActive={selectedScenario === 'average'} 
          onClick={() => onSelectScenario('average')}
        />
        <Button2 
          isActive={selectedScenario === 'optimistic'} 
          onClick={() => onSelectScenario('optimistic')}
        />
      </div>
    </div>
  );
}

function Heading() {
  return <div className="h-[72px] shrink-0 w-[39px]" data-name="Heading 2" />;
}

function Container3({ 
  selectedScenario, 
  onSelectScenario 
}: { 
  selectedScenario: Scenario;
  onSelectScenario: (scenario: Scenario) => void;
}) {
  return (
    <div className="absolute content-stretch flex h-[72px] items-center justify-between left-[42px] pr-[-6.805px] top-[30px] w-[319px]" data-name="Container">
      <Container4 selectedScenario={selectedScenario} onSelectScenario={onSelectScenario} />
      <Heading />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[2.27%_1.57%_15.91%_18.81%]" data-name="Group">
      <div className="absolute inset-[-0.28%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 254 181">
          <g id="Group">
            <path d="M0 180.5H254" id="Vector" stroke="var(--stroke-0, #E5E7EB)" />
            <path d="M0 150.5H254" id="Vector_2" stroke="var(--stroke-0, #E5E7EB)" />
            <path d="M0 120.5H254" id="Vector_3" stroke="var(--stroke-0, #E5E7EB)" />
            <path d="M0 90.5H254" id="Vector_4" stroke="var(--stroke-0, #E5E7EB)" />
            <path d="M0 60.5H254" id="Vector_5" stroke="var(--stroke-0, #E5E7EB)" />
            <path d="M0 0.5H254" id="Vector_6" stroke="var(--stroke-0, #E5E7EB)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[2.27%_1.57%_15.91%_18.81%]" data-name="Group">
      <Group1 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[86.15%_79.94%_7.04%_17.55%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.15%_79.94%_7.04%_17.55%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center">0</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[86.15%_72.29%_7.04%_25.83%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.15%_72.29%_7.04%_25.83%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center">1</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[86.15%_64.01%_7.04%_33.48%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.15%_64.01%_7.04%_33.48%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center">2</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[86.15%_56.05%_7.04%_41.44%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.15%_56.05%_7.04%_41.44%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center">3</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[86.15%_48.09%_7.04%_49.4%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.15%_48.09%_7.04%_49.4%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center">4</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[86.15%_40.13%_7.04%_57.37%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.15%_40.13%_7.04%_57.37%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center">5</p>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[86.15%_32.16%_7.04%_65.33%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.15%_32.16%_7.04%_65.33%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center">6</p>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[86.15%_24.36%_7.04%_73.45%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.15%_24.36%_7.04%_73.45%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center">7</p>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[86.15%_16.24%_7.04%_81.25%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.15%_16.24%_7.04%_81.25%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center">8</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[86.15%_8.28%_7.04%_89.22%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.15%_8.28%_7.04%_89.22%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center">9</p>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[86.15%_-0.14%_7.04%_95.75%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.15%_-0.14%_7.04%_95.75%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center">10</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[86.15%_-0.14%_7.04%_17.55%]" data-name="Group">
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
      <Group8 />
      <Group9 />
      <Group10 />
      <Group11 />
      <Group12 />
      <Group13 />
      <Group14 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[86.15%_-0.14%_7.04%_17.55%]" data-name="Group">
      <Group3 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[80.57%_83.7%_12.61%_11.29%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[80.57%_83.7%_12.61%_11.29%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-right">$0</p>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[66.94%_83.7%_26.25%_7.52%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[66.94%_83.7%_26.25%_7.52%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-right">$10k</p>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[53.3%_83.7%_39.88%_7.21%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[53.3%_83.7%_39.88%_7.21%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-right">$20k</p>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[39.66%_83.7%_53.52%_6.9%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[39.66%_83.7%_53.52%_6.9%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-right">$30k</p>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents inset-[26.03%_83.7%_67.15%_6.9%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[26.03%_83.7%_67.15%_6.9%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-right">$40k</p>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[12.39%_83.7%_80.79%_7.21%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[12.39%_83.7%_80.79%_7.21%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-right">$50k</p>
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[0.57%_83.7%_92.61%_6.9%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0.57%_83.7%_92.61%_6.9%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-right">$60k</p>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[0.57%_83.7%_12.61%_6.9%]" data-name="Group">
      <Group17 />
      <Group18 />
      <Group19 />
      <Group20 />
      <Group21 />
      <Group22 />
      <Group23 />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[0.57%_83.7%_12.61%_6.9%]" data-name="Group">
      <Group16 />
    </div>
  );
}

function Group24({ scenario }: { scenario: Scenario }) {
  const data = scenarioDataMap[scenario];
  
  return (
    <div className="absolute inset-[73.5%_0.31%_19.41%_17.55%]" data-name="Group">
      <div className="absolute inset-[-6.42%_-0.38%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264 17.578">
          <g id="Group">
            <path 
              d={data.chartPath} 
              id="Vector" 
              stroke="var(--stroke-0, #3B82F6)" 
              strokeWidth="3"
              className="transition-all duration-700 ease-in-out"
            />
            <g id="Group_2">
              {data.dataPoints.map((point, idx) => (
                <circle
                  key={idx}
                  cx={point.cx}
                  cy={point.cy}
                  r="4"
                  fill="white"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  className="transition-all duration-700 ease-in-out hover:r-6 cursor-pointer"
                />
              ))}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Surface({ scenario }: { scenario: Scenario }) {
  return (
    <div className="absolute h-[220px] left-0 overflow-clip top-0 w-[319px]" data-name="Surface">
      <Group />
      <Group2 />
      <Group15 />
      <Group24 scenario={scenario} />
    </div>
  );
}

function LineChart({ scenario }: { scenario: Scenario }) {
  return (
    <div className="absolute h-[220px] left-[20px] top-[116px] w-[319px]" data-name="LineChart">
      <Surface scenario={scenario} />
    </div>
  );
}

function Paragraph2() {
  return <div className="absolute h-[16.25px] left-[20px] top-[348px] w-[319px]" data-name="Paragraph" />;
}

function Container2({ 
  selectedScenario, 
  onSelectScenario 
}: { 
  selectedScenario: Scenario;
  onSelectScenario: (scenario: Scenario) => void;
}) {
  return (
    <div className="absolute bg-white border border-[#e5e7eb] border-solid h-[365px] left-[39px] rounded-[16px] top-[140px] w-[361px]" data-name="Container">
      <Container3 selectedScenario={selectedScenario} onSelectScenario={onSelectScenario} />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold h-[73px] leading-[24px] left-[116px] not-italic text-[#101828] text-[16px] top-[14px] tracking-[-0.3125px] w-[139px] whitespace-pre-wrap">Your HSA Growth</p>
      <LineChart scenario={selectedScenario} />
      <Paragraph2 />
    </div>
  );
}

function Frame({ onClick, isSimulating }: { onClick: () => void; isSimulating: boolean }) {
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

export default function IPhone1617ProMax() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>('average');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 2000);
  };

  return (
    <div className="bg-white relative size-full" data-name="iPhone 16 & 17 Pro Max - 1">
      <Container scenario={selectedScenario} />
      <Container2 selectedScenario={selectedScenario} onSelectScenario={setSelectedScenario} />
      <div className="absolute bg-[#155dfc] h-[103px] left-0 top-0 w-[440px]" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold h-[36px] leading-[normal] left-[89px] not-italic text-[32px] text-white top-[34px] w-[261px] whitespace-pre-wrap">Simulation Page</p>
      <Frame onClick={handleSimulate} isSimulating={isSimulating} />
    </div>
  );
}
