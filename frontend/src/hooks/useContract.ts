import { useState, useMemo } from "react";

export interface Amenity {
  id: number;
  name: string;
  checked: boolean;
  resorts: string[];
  price: string;
}

export interface CustomService {
  id: number;
  name: string;
  checked: boolean;
  price: string;
}

export interface ContractData {
  contractDate: string;
  clientOccasion: string;
  clientName: string;
  clientNumber: string;
  clientAddress: string;
  selectedResort: string;
  checkInDate: string;
  checkOutDate: string;
}

export const useContract = () => {
  // 1. All state variables
  const [formData, setFormData] = useState<ContractData>({
    contractDate: "2026-01-07",
    clientOccasion: "",
    clientName: "",
    clientNumber: "",
    clientAddress: "",
    selectedResort: "",
    checkInDate: "2026-12-28T07:00",
    checkOutDate: "2026-12-28T17:00",
  });

  const [amenities, setAmenities] = useState<Amenity[]>([
    {
      id: 1,
      name: "Swimming Pool",
      checked: false,
      resorts: ["Villa Prescilla 1", "Villa Prescilla 2"],
      price: "",
    },
    {
      id: 2,
      name: "Function Hall",
      checked: false,
      resorts: ["Villa Prescilla 1", "Villa Prescilla 2"],
      price: "",
    },
    {
      id: 3,
      name: "Family Room",
      checked: false,
      resorts: ["Villa Prescilla 1", "Villa Prescilla 2"],
      price: "",
    },
    {
      id: 4,
      name: "Regular Room 1",
      checked: false,
      resorts: ["Villa Prescilla 1", "Villa Prescilla 2"],
      price: "",
    },
    {
      id: 5,
      name: "Regular Room 2",
      checked: false,
      resorts: ["Villa Prescilla 1", "Villa Prescilla 2"],
      price: "",
    },
    {
      id: 6,
      name: "Kitchen Lounge",
      checked: false,
      resorts: ["Villa Prescilla 1"],
      price: "",
    },
  ]);

  const [customServices, setCustomServices] = useState<CustomService[]>([]);
  const [nextCustomId, setNextCustomId] = useState(1000); // Start with high number to avoid conflicts

  // 2. Logic Functions
  const updateField = (field: keyof ContractData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field == "selectedResort") {
      // Side effect: Reset amenities and custom services
      setAmenities((prev) =>
        prev.map((a) => ({ ...a, checked: false, price: "" }))
      );
      setCustomServices([]);
    }
  };

  const toggleAmenity = (id: number): void => {
    setAmenities((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, checked: !a.checked, price: !a.checked ? a.price : " " }
          : a
      )
    );
  };

  const updateAmenityPrice = (id: number, price: string): void => {
    setAmenities((prev) => prev.map((a) => (a.id == id ? { ...a, price } : a)));
  };

  // Custom Services Functions
  const addCustomService = (onAdded?: (id: number) => void): void => {
    const newService: CustomService = {
      id: nextCustomId,
      name: "",
      checked: false,
      price: "",
    };
    setCustomServices((prev) => [...prev, newService]);
    if (onAdded) {
      onAdded(nextCustomId);
    }
    setNextCustomId((prev) => prev + 1);
  };

  const deleteCustomService = (id: number): void => {
    setCustomServices((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleCustomService = (id: number): void => {
    setCustomServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, checked: !s.checked, price: !s.checked ? s.price : "" }
          : s
      )
    );
  };

  const updateCustomServiceName = (id: number, name: string): void => {
    setCustomServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name } : s))
    );
  };

  const updateCustomServicePrice = (id: number, price: string): void => {
    setCustomServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, price } : s))
    );
  };

  const availableAmenities = useMemo(() => {
    if (!formData.selectedResort) return [];
    return amenities.filter((a) => a.resorts.includes(formData.selectedResort));
  }, [formData.selectedResort, amenities]);

  return {
    // State values
    ...formData,
    amenities: availableAmenities,
    customServices,

    // Functions
    updateField,
    toggleAmenity,
    updateAmenityPrice,
    addCustomService,
    deleteCustomService,
    toggleCustomService,
    updateCustomServiceName,
    updateCustomServicePrice,
  };
};
