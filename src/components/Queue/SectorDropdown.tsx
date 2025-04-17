import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Building, Hospital, Bank, Shop } from 'react-bootstrap-icons';

interface SectorDropdownProps {
  onSelect: (sector: string) => void;
}

const SectorDropdown: React.FC<SectorDropdownProps> = ({ onSelect }) => {
  const sectors = [
    { name: 'Santé', icon: <Hospital className="me-2" /> },
    { name: 'Banque', icon: <Bank className="me-2" /> },
    { name: 'Administration', icon: <Building className="me-2" /> },
    { name: 'Commerce', icon: <Shop className="me-2" /> }
  ];

  const [selectedSector, setSelectedSector] = React.useState<string | null>(null);

  const handleSelect = (sector: string) => {
    setSelectedSector(sector);
    onSelect(sector);
  };

  const getSectorIcon = (sectorName: string) => {
    const sector = sectors.find(s => s.name === sectorName);
    return sector ? sector.icon : <Building className="me-2" />;
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
            {selectedSector}
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
            {sector.icon}
            {sector.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SectorDropdown;
