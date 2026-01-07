import { useState, useMemo } from 'react';

export interface Amenity {
    id: number;
    name: string;
    checked: boolean;
    resorts: string[];
    price: string;
    
}

export const useContract = () => {
    // 1. All state variables
    const [contractDate, setContractDate] = useState<string>('2025-12-23');
    const [clientOccasion, setClientOccasion] = useState<string>('');
    const [clientName, setClientName] = useState<string>('');
    const [clientNumber, setContactNumber] = useState<string>('');
    const [clientAddress, setClientAddress] = useState<string>('');
    const [selectedResort, setSelectedResort] = useState<string>('');
    const [checkInDate, setCheckInDate] = useState<string>('2025-12-23T07:00');
    const [checkOutDate, setCheckOutDate] = useState<string>('2025-12-23T17:00');

    const [amenities, setAmenities] = useState<Amenity[]>([
    { id: 1, name: 'Swimming Pool', checked: false, resorts: ['Villa Prescilla 1', 'Villa Prescilla 2'], price: '' },
    { id: 2, name: 'Function Hall', checked: false, resorts: ['Villa Prescilla 1', 'Villa Prescilla 2'], price: '' },
    { id: 3, name: 'Family Room', checked: false, resorts: ['Villa Prescilla 1', 'Villa Prescilla 2'], price: '' },
    { id: 4, name: 'Regular Room 1', checked: false, resorts: ['Villa Prescilla 1', 'Villa Prescilla 2'], price: '' },
    { id: 5, name: 'Regular Room 2', checked: false, resorts: ['Villa Prescilla 1', 'Villa Prescilla 2'], price: '' },
    { id: 6, name: 'Kitchen Lounge', checked: false, resorts: ['Villa Prescilla 1'], price: '' },
  ]);

  // 2. Logic Functions
    const updateField = (field: string, value: string) => {
        switch (field) {
            case 'contractDate': setContractDate(value); break;
            case 'clientOccasion': setClientOccasion(value); break;
            case 'clientName': setClientName(value); break;
            case 'clientNumber': setContactNumber(value); break;
            case 'clientAddress': setClientAddress(value); break;
            case 'selectedResort': 
            setSelectedResort(value); 
            // Reset amenity selections when resort changes
            setAmenities(prev => prev.map(a => ({ ...a, checked: false, price: '' })));
            break;
            case 'checkInDate': setCheckInDate(value); break;
            case 'checkOutDate': setCheckOutDate(value); break;
        }
  };

  const toggleAmenity = (id: number): void => {
    setAmenities(prev => prev.map(a => 
      a.id === id ? { ...a, checked: !a.checked, price: !a.checked ? a.price : ' '}: a));
  };

  const updateAmenityPrice = (id: number, price: string): void => {
    setAmenities(prev => prev.map(a =>
      a.id == id ? { ...a, price }: a
    ));
  }

  const availableAmenities = useMemo(() => {
    if (!selectedResort) return [];
    return amenities.filter(a => a.resorts.includes(selectedResort));
  }, [selectedResort, amenities])

  return {
    // State values
    contractDate,
    clientOccasion,
    clientName,
    clientNumber,
    clientAddress,
    selectedResort,
    checkInDate,
    checkOutDate,
    amenities: availableAmenities,

    // Functions
    updateField,
    toggleAmenity,
    updateAmenityPrice,
  };
};