import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Building, Hospital, Bank, Shop } from 'react-bootstrap-icons';

interface SectorDropdownProps {
  onSelect: (sector: string) => void;
}

const SectorDropdown: React.FC<SectorDropdownProps> = ({ onSelect }) => {
  const sectors = [
    { name: 'بلدية تونس', value: 'Tunis' },
    { name: 'بلدية المرسى', value: 'La Marsa' },
    { name: 'بلدية قرطاج', value: 'Carthage' },
    { name: 'بلدية أريانة', value: 'Ariana' },
    { name: 'بلدية بن عروس', value: 'Ben Arous' },
    { name: 'بلدية صفاقس', value: 'Sfax' },
    { name: 'بلدية سوسة', value: 'Sousse' },
    { name: 'بلدية القيروان', value: 'Kairouan' },
    { name: 'بلدية بنزرت', value: 'Bizerte' },
    { name: 'بلدية المنستير', value: 'Monastir' },
    { name: 'بلدية قابس', value: 'Gabes' },
    { name: 'بلدية نابل', value: 'Nabeul' },
    { name: 'بلدية قفصة', value: 'Gafsa' },
    { name: 'بلدية مدنين', value: 'Medenine' },
    { name: 'بلدية المهدية', value: 'Mahdia' },
    { name: 'بلدية الكاف', value: 'El Kef' },
    { name: 'بلدية توزر', value: 'Tozeur' },
    { name: 'بلدية تطاوين', value: 'Tataouine' },
    { name: 'بلدية جندوبة', value: 'Jendouba' },
    { name: 'بلدية سليانة', value: 'Siliana' },
    { name: 'بلدية منوبة', value: 'Manouba' },
    { name: 'بلدية زغوان', value: 'Zaghouan' },
    { name: 'بلدية مسكن', value: "M'saken" },
    { name: 'بلدية الحمامات', value: 'Hammamet' },
    { name: 'بلدية منزل بورقيبة', value: 'Menzel Bourguiba' },
    { name: 'بلدية الناظور', value: 'Nadhour' },
    { name: 'بلدية جربة', value: 'Djerba' },
    { name: 'بلدية قصر هلال', value: 'Ksar Hellal' },
    { name: 'بلدية سيدي بوزيد', value: 'Sidi Bouzid' },
    { name: 'بلدية بوفريحة', value: 'Bouficha' },
    { name: 'بلدية الزهراء', value: 'Ezzahra' },
    { name: 'بلدية رادس', value: 'Rades' },
    { name: 'بلدية سبيطلة', value: 'Sbeitla' },
    { name: 'بلدية تبلبة', value: 'Teboulba' },
    { name: 'بلدية مجاز الباب', value: 'Medjez el Bab' },
    { name: 'بلدية تونس 2', value: 'Tunis 2' },
    { name: 'بلدية حي الخضراء', value: 'Cité El Khadra' },
    { name: 'بلدية المنار', value: 'El Manar' },
    { name: 'بلدية عين دراهم', value: 'Ain Draham' },
    { name: 'بلدية بنزرت الجنوبية', value: 'Bizerte Sud' },
    { name: 'بلدية منزل تميم', value: 'Menzel Temime' },
    { name: 'بلدية قرمبالية', value: 'Grombalia' },
    { name: 'بلدية قبلي', value: 'Kébili' },
    { name: 'بلدية راس الجبل', value: 'Ras Jebel' },
    { name: 'بلدية جريسّة', value: 'Jérissa' },
    { name: 'بلدية الهوارية', value: 'El Haouaria' },
    { name: 'بلدية عين الزهرة', value: 'Ain Zohra' },
    { name: 'بلدية بن قردان', value: 'Ben Guerdane' },
    { name: 'بلدية سيدي علي بن عون', value: 'Sidi Ali Ben Aoun' },
    { name: 'بلدية مطماطة', value: 'Matmata' },
    { name: 'بلدية سوسة جوهرة', value: 'Sousse Jawhara' },
    { name: 'بلدية قلاعة كبيرة', value: 'Kalaa Kebira' },
    { name: 'بلدية صفاقس شفاء', value: 'Sfax Chafaâ' }
  ];

  const [selectedSector, setSelectedSector] = React.useState<string | null>(null);

  const handleSelect = (sector: string) => {
    setSelectedSector(sector);
    onSelect(sector);
  };

  const getSectorIcon = (sectorName: string) => {
    if (sectorName.includes('مستشفى') || sectorName.includes('Hospital')) {
      return <Hospital className="me-2" />;
    }
    if (sectorName.includes('بنك') || sectorName.includes('Bank')) {
      return <Bank className="me-2" />;
    }
    if (sectorName.includes('سوق') || sectorName.includes('Shop')) {
      return <Shop className="me-2" />;
    }
    return <Building className="me-2" />;
  };

  return (
    <Dropdown>
      <Dropdown.Toggle 
        variant="outline-secondary" 
        id="dropdown-sectors"
        className="d-flex align-items-center"
      >
        {selectedSector ? (
          <>
            {getSectorIcon(selectedSector)}
            {sectors.find(s => s.name === selectedSector)?.value || selectedSector}
          </>
        ) : (
          'Sélectionnez un secteur'
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        {sectors.map((sector) => (
          <Dropdown.Item 
            key={sector.name} 
            onClick={() => handleSelect(sector.name)}
            active={selectedSector === sector.name}
            className="d-flex align-items-center"
          >
            {getSectorIcon(sector.name)}
            {sector.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SectorDropdown;