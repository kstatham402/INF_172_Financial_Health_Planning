import { useState } from 'react';
import svgPaths from "./svg-d7eufdalw2";

type Scenario = 'conservative' | 'average' | 'optimistic';

interface ChartData {
  balance: string;
  growth: string;
  percentage: string;
  dataPoints: number[];
}

const scenarioData: Record<Scenario, ChartData> = {
  conservative: {
    balance: '$3,450',
    growth: '+$180',
    percentage: '5.5%',
    dataPoints: [0, 5, 8, 12, 15, 18, 21, 24, 27, 30, 32]
  },
  average: {
    balance: '$3,904',
    growth: '+$234',
    percentage: '6.4%',
    dataPoints: [0, 8, 15, 22, 28, 35, 40, 45, 48, 52, 55]
  },
  optimistic: {
    balance: '$4,520',
    growth: '+$315',
    percentage: '7.5%',
    dataPoints: [0, 12, 20, 28, 36, 42, 48, 52, 56, 58, 60]
  }
};

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

function BalanceCard({ scenario }: { scenario: Scenario }) {
  const data = scenarioData[scenario];
  
  return (
    <div className="absolute bg-[#2563eb] content-stretch flex flex-col h-[100px] items-start left-[39px] pl-[20px] pt-[20px] rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[573px] w-[361px] transition-all duration-300" data-name="Container">
      <div className="h-[16px] relative shrink-0 w-[321px]">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
          <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.8)] top-px">Current HSA Balance</p>
        </div>
      </div>
      <div className="h-[36px] relative shrink-0 w-[321px]">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
          <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[36px] text-white top-[0.5px] tracking-[-0.1309px]">{data.balance}</p>
        </div>
      </div>
      <div className="h-[16px] relative shrink-0 w-[321px]">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
          <Icon />
          <div className="h-[16px] relative shrink-0 w-[146.383px]">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
              <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] top-px">{data.growth} ({data.percentage}) this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScenarioButton({ 
  label, 
  isActive, 
  onClick 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const baseClass = "h-[30px] relative rounded-[16777200px] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95";
  const activeClass = "bg-[#2563eb]";
  const inactiveClass = "bg-white";
  
  return (
    <div 
      className={`${baseClass} ${isActive ? activeClass : inactiveClass} ${label === 'Conservative' ? 'flex-[1_0_0] min-h-px min-w-px' : label === 'Average' ? 'shrink-0 w-[70.875px]' : 'shrink-0 w-[85.195px]'}`}
      onClick={onClick}
      data-name="Button"
    >
      {!isActive && (
        <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      )}
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className={`-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-1/2 not-italic text-[12px] text-center top-[8px] ${isActive ? 'text-white' : 'text-[#4a5565]'}`}>
          {label}
        </p>
      </div>
    </div>
  );
}

function ChartGrid() {
  return (
    <div className="absolute inset-[2.27%_1.57%_15.91%_18.81%]">
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

function ChartLabelsX() {
  return (
    <div className="absolute contents inset-[86.15%_-0.14%_7.04%_17.55%]">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, idx) => {
        const positions = [
          'inset-[86.15%_79.94%_7.04%_17.55%]',
          'inset-[86.15%_72.29%_7.04%_25.83%]',
          'inset-[86.15%_64.01%_7.04%_33.48%]',
          'inset-[86.15%_56.05%_7.04%_41.44%]',
          'inset-[86.15%_48.09%_7.04%_49.4%]',
          'inset-[86.15%_40.13%_7.04%_57.37%]',
          'inset-[86.15%_32.16%_7.04%_65.33%]',
          'inset-[86.15%_24.36%_7.04%_73.45%]',
          'inset-[86.15%_16.24%_7.04%_81.25%]',
          'inset-[86.15%_8.28%_7.04%_89.22%]',
          'inset-[86.15%_-0.14%_7.04%_95.75%]'
        ];
        return (
          <p key={num} className={`absolute font-['Inter:Regular',sans-serif] font-normal ${positions[idx]} leading-[normal] not-italic text-[#6b7280] text-[12px] text-center`}>
            {num}
          </p>
        );
      })}
    </div>
  );
}

function ChartLabelsY() {
  return (
    <div className="absolute contents inset-[0.57%_83.7%_12.61%_6.9%]">
      {['$0', '$10k', '$20k', '$30k', '$40k', '$50k', '$60k'].map((label, idx) => {
        const positions = [
          'inset-[80.57%_83.7%_12.61%_11.29%]',
          'inset-[66.94%_83.7%_26.25%_7.52%]',
          'inset-[53.3%_83.7%_39.88%_7.21%]',
          'inset-[39.66%_83.7%_53.52%_6.9%]',
          'inset-[26.03%_83.7%_67.15%_6.9%]',
          'inset-[12.39%_83.7%_80.79%_7.21%]',
          'inset-[0.57%_83.7%_92.61%_6.9%]'
        ];
        return (
          <p key={label} className={`absolute font-['Inter:Regular',sans-serif] font-normal ${positions[idx]} leading-[normal] not-italic text-[#6b7280] text-[12px] text-right`}>
            {label}
          </p>
        );
      })}
    </div>
  );
}

function AnimatedChartLine({ dataPoints }: { dataPoints: number[] }) {
  // Create path data from points
  const createPath = (points: number[]) => {
    const width = 263;
    const height = 180;
    const xStep = width / (points.length - 1);
    
    return points.map((y, i) => {
      const x = i * xStep;
      const yPos = height - (y / 60 * height);
      return `${x},${yPos}`;
    }).join(' ');
  };

  const pathData = createPath(dataPoints);
  
  return (
    <div className="absolute inset-[73.5%_0.31%_19.41%_17.55%]" data-name="Group">
      <div className="absolute inset-[-6.42%_-0.38%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264 17.578">
          <g id="Group">
            <polyline 
              points={pathData}
              stroke="var(--stroke-0, #3B82F6)" 
              strokeWidth="3" 
              fill="none"
              className="transition-all duration-700 ease-in-out"
            />
            <g id="Group_2">
              {dataPoints.map((_, idx) => {
                const x = (idx * 263 / (dataPoints.length - 1));
                const y = 180 - (dataPoints[idx] / 60 * 180);
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="white"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    className="transition-all duration-700 ease-in-out hover:r-6 cursor-pointer"
                  />
                );
              })}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function LineChart({ scenario }: { scenario: Scenario }) {
  const data = scenarioData[scenario];
  
  return (
    <div className="absolute h-[220px] left-[20px] top-[116px] w-[319px]" data-name="LineChart">
      <div className="absolute h-[220px] left-0 overflow-clip top-0 w-[319px]">
        <ChartGrid />
        <ChartLabelsX />
        <ChartLabelsY />
        <AnimatedChartLine dataPoints={data.dataPoints} />
      </div>
    </div>
  );
}

export default function IPhone1617ProMax() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>('average');

  return (
    <div className="bg-white relative size-full" data-name="iPhone 16 & 17 Pro Max - 1">
      <BalanceCard scenario={selectedScenario} />
      
      <div className="absolute bg-white border border-[#e5e7eb] border-solid h-[365px] left-[39px] rounded-[16px] top-[180px] w-[361px]" data-name="Container">
        <div className="absolute content-stretch flex h-[72px] items-center justify-between left-[42px] pr-[-6.805px] top-[30px] w-[319px]">
          <div className="h-[30px] relative shrink-0 w-[273.734px]">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
              <ScenarioButton 
                label="Conservative" 
                isActive={selectedScenario === 'conservative'}
                onClick={() => setSelectedScenario('conservative')}
              />
              <ScenarioButton 
                label="Average" 
                isActive={selectedScenario === 'average'}
                onClick={() => setSelectedScenario('average')}
              />
              <ScenarioButton 
                label="Optimistic" 
                isActive={selectedScenario === 'optimistic'}
                onClick={() => setSelectedScenario('optimistic')}
              />
            </div>
          </div>
          <div className="h-[72px] shrink-0 w-[39px]" />
        </div>
        
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold h-[73px] leading-[24px] left-[116px] not-italic text-[#101828] text-[16px] top-[14px] tracking-[-0.3125px] w-[139px] whitespace-pre-wrap">Your HSA Growth</p>
        
        <LineChart scenario={selectedScenario} />
        
        <div className="absolute h-[16.25px] left-[20px] top-[348px] w-[319px]" />
      </div>
    </div>
  );
}
