import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { GearFill } from 'react-bootstrap-icons';

interface ServiceDropdownProps {
  onSelect: (service: string) => void;
  disabled?: boolean;
}

const ServiceDropdown: React.FC<ServiceDropdownProps> = ({ onSelect, disabled = false }) => {
  const services = [
    'Consultation médicale',
    'Paiement factures',
    'Retrait documents',
    'Service client',
    'Demande de renseignements'
  ];

  const [selectedService, setSelectedService] = React.useState<string | null>(null);

  const handleSelect = (service: string) => {
    setSelectedService(service);
    onSelect(service);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle 
        variant="outline-primary" 
        id="dropdown-services"
        disabled={disabled}
        className="d-flex align-items-center"
      >
        <GearFill className="me-2" />
        {selectedService || 'Sélectionnez un service'}
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        {services.map((service) => (
          <Dropdown.Item 
            key={service} 
            onClick={() => handleSelect(service)}
            active={selectedService === service}
          >
            {service}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ServiceDropdown;