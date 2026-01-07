import React from 'react';
import { ContractForm } from './components/ContractForm';
import { AmenityForm } from './components/AmenityForm';
import { useContract } from './hooks/useContract';
import { generateContractPDF } from './utils/pdfGenerator';

const App: React.FC = () => {
  const {
    clientOccasion,
    clientName,
    clientNumber,
    clientAddress,
    selectedResort,
    checkInDate,
    checkOutDate,
    amenities,
    updateField,
    toggleAmenity,
    updateAmenityPrice,
  } = useContract();

  const handleGeneratePDF = (action: 'preview' | 'download') => {
    generateContractPDF({
      clientOccasion,
      clientName,
      clientNumber,
      clientAddress,
      selectedResort,
      checkInDate,
      checkOutDate,
      amenities,
    }, action);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contract Builder</h1>

        {/* CONTRACT FORM */}
        <ContractForm 
          data={{ 
            clientOccasion, 
            clientName, 
            clientNumber, 
            clientAddress, 
            selectedResort, 
            checkInDate, 
            checkOutDate 
          }} 
          updateField={updateField} 
        />

        {/* AMENITIES */}
        <AmenityForm 
          amenities={amenities}
          toggleAmenity={toggleAmenity} 
          updateAmenityPrice={updateAmenityPrice}
          selectedResort={selectedResort}/>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => handleGeneratePDF('preview')} 
            className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 font-medium transition"
          >
            Preview Document
          </button>
          <button 
            onClick={() => handleGeneratePDF('download')} 
            className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium transition shadow-sm"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;