import { useState, useRef, useEffect } from 'react';
import svgPaths from "./svg-b1keg6a4gx";

function Label() {
  return (
    <div className="absolute h-[20px] left-[20px] top-[20px] w-[321px]" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px]">Your HSA Contribution</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[32px] relative shrink-0 w-[37.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-[16px] not-italic text-[#99a1af] text-[32px] top-0 tracking-[0.4063px]">$</p>
      </div>
    </div>
  );
}

function TextInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d]/g, '');
    onChange(val);
  };

  return (
    <div className="flex-[1_0_0] h-[70px] min-h-px min-w-px relative cursor-text" data-name="Text Input" onClick={handleClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="0"
            className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#101828] text-[32px] tracking-[0.4063px] bg-transparent border-none outline-none w-full placeholder:text-[#d1d5dc]"
          />
        </div>
      </div>
    </div>
  );
}

function Container2({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="bg-white content-stretch flex h-[56px] items-center pl-[2px] pr-[-96.109px] py-[2px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Text />
      <TextInput value={value} onChange={onChange} />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[4px] not-italic text-[#6a7282] text-[12px] top-px">per paycheck</p>
    </div>
  );
}

function Container1({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[78px] items-start left-[20px] top-[52px] w-[321px]" data-name="Container">
      <Container2 value={value} onChange={onChange} />
      <Paragraph />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[15px] relative shrink-0 w-[111px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#4a5565] text-[10px] top-[0.5px] tracking-[0.1172px]">Per Paycheck</p>
      </div>
    </div>
  );
}

function Paragraph2({ amount }: { amount: string }) {
  return (
    <div className="h-[28px] relative shrink-0 w-[111px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#155dfc] text-[20px] top-0 tracking-[-0.4492px]">${amount}</p>
      </div>
    </div>
  );
}

function Container4({ amount }: { amount: string }) {
  return (
    <div className="bg-white h-[80px] relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[135px] transition-all duration-300" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between pl-[12px] pt-[12px] relative size-full">
        <Paragraph1 />
        <Paragraph2 amount={amount} />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[15px] relative shrink-0 w-[111px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#4a5565] text-[10px] top-[0.5px] tracking-[0.1172px]">Monthly</p>
      </div>
    </div>
  );
}

function Paragraph4({ amount }: { amount: string }) {
  return (
    <div className="h-[28px] relative shrink-0 w-[111px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#155dfc] text-[20px] top-0 tracking-[-0.4492px]">${amount}</p>
      </div>
    </div>
  );
}

function Container5({ amount }: { amount: string }) {
  return (
    <div className="bg-white h-[80px] relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[135px] transition-all duration-300" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between pl-[12px] pt-[12px] relative size-full">
        <Paragraph3 />
        <Paragraph4 amount={amount} />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[15px] relative shrink-0 w-[111px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#4a5565] text-[10px] top-[0.5px] tracking-[0.1172px]">Annual</p>
      </div>
    </div>
  );
}

function Paragraph6({ amount }: { amount: string }) {
  return (
    <div className="h-[28px] relative shrink-0 w-[111px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#155dfc] text-[20px] top-0 tracking-[-0.4492px]">${amount}</p>
      </div>
    </div>
  );
}

function Container6({ amount }: { amount: string }) {
  return (
    <div className="bg-white h-[80px] relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[135px] transition-all duration-300" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between pl-[12px] pt-[12px] relative size-full">
        <Paragraph5 />
        <Paragraph6 amount={amount} />
      </div>
    </div>
  );
}

function Container3({ perPaycheck, monthly, annual }: { perPaycheck: string; monthly: string; annual: string }) {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[84px] items-start left-[20px] overflow-clip top-[138px] w-[321px]" data-name="Container">
      <Container4 amount={perPaycheck} />
      <Container5 amount={monthly} />
      <Container6 amount={annual} />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Medical Factors</p>
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[205.031px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px]">Expected Hospitalizations/Year</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
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
  );
}

function Button() {
  return (
    <div className="relative shrink-0 size-[16px] cursor-help" data-name="Button" title="Select how many times per year you expect to be hospitalized">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Button />
    </div>
  );
}

function Text1({ value }: { value: number }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[7.367px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[4px] not-italic text-[#101828] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px]">{value}</p>
      </div>
    </div>
  );
}

function Icon1({ isOpen }: { isOpen: boolean }) {
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

function Button1({ value, isOpen, onClick }: { value: number; isOpen: boolean; onClick: () => void }) {
  return (
    <div 
      className="bg-white h-[50px] relative rounded-[10px] shrink-0 w-full cursor-pointer hover:bg-gray-50 transition-colors" 
      data-name="Button"
      onClick={onClick}
    >
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[17px] py-px relative size-full">
          <Text1 value={value} />
          <Icon1 isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
}

function DropdownMenu({ value, onChange, isOpen }: { value: number; onChange: (val: number) => void; isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[58px] left-0 right-0 bg-white border border-[#d1d5dc] rounded-[10px] shadow-lg z-10 max-h-[200px] overflow-y-auto">
      {[0, 1, 2, 3, 4, 5].map((num) => (
        <div
          key={num}
          className="px-[17px] py-[12px] hover:bg-blue-50 cursor-pointer transition-colors"
          onClick={() => onChange(num)}
        >
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-[#101828]">{num}</p>
        </div>
      ))}
    </div>
  );
}

function Container8({ value, onChange }: { value: number; onChange: (val: number) => void }) {
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
      <Container9 />
      <Button1 value={value} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <DropdownMenu value={value} onChange={handleSelect} isOpen={isOpen} />
    </div>
  );
}

function ToggleSwitch({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) {
  return (
    <div 
      className={`h-[24px] relative shrink-0 w-[44px] cursor-pointer transition-all duration-300 ${isOn ? 'opacity-100' : 'opacity-100'}`}
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
    <div className="content-stretch flex h-[64px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <div className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative" data-name="Container">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
          <div className={`${bgColor} relative rounded-[16777200px] shrink-0 size-[40px]`} data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#0a0a0a] text-[20px] tracking-[-0.4492px]">{emoji}</p>
            </div>
          </div>
          <div className="h-[35.75px] relative shrink-0" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
              <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Paragraph">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                  <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px]">{title}</p>
                </div>
              </div>
              <div className="h-[13.75px] relative shrink-0" data-name="Paragraph">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.75px] not-italic relative shrink-0 text-[#4a5565] text-[11px] tracking-[0.0645px]">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToggleSwitch isOn={isOn} onToggle={onToggle} />
    </div>
  );
}

function Container10({ medicalFactors, toggleFactor }: { 
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
    <div className="content-stretch flex flex-col gap-[16px] h-[464px] items-start relative shrink-0 w-full" data-name="Container">
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

function Container7({ 
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
    <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[640px] items-start left-0 pb-px pt-[21px] px-[21px] rounded-[16px] top-[260px] w-[361px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Heading />
      <Container8 value={hospitalizations} onChange={setHospitalizations} />
      <Container10 medicalFactors={medicalFactors} toggleFactor={toggleFactor} />
    </div>
  );
}

export default function Container() {
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

  const toggleFactor = (factor: string) => {
    setMedicalFactors(prev => ({
      ...prev,
      [factor]: !prev[factor]
    }));
  };

  // Calculate amounts based on input (assuming bi-weekly paychecks: 26 per year)
  const perPaycheck = contributionInput || '0';
  const monthly = contributionInput ? Math.round((parseInt(contributionInput) * 26) / 12).toString() : '0';
  const annual = contributionInput ? (parseInt(contributionInput) * 26).toString() : '0';

  return (
    <div className="relative rounded-[16px] size-full" data-name="Container" style={{ backgroundImage: "linear-gradient(146.164deg, rgb(239, 246, 255) 0%, rgb(250, 245, 255) 100%)" }}>
      <Label />
      <Container1 value={contributionInput} onChange={setContributionInput} />
      <Container3 perPaycheck={perPaycheck} monthly={monthly} annual={annual} />
      <Container7 
        hospitalizations={hospitalizations}
        setHospitalizations={setHospitalizations}
        medicalFactors={medicalFactors}
        toggleFactor={toggleFactor}
      />
    </div>
  );
}
