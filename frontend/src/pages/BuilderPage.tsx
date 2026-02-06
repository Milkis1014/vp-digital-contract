import { ContractForm } from "../components/ContractForm";
import { AmenityForm } from "../components/AmenityForm";
import { useContract } from "../hooks/useContract";
import { generateContractPDF } from "../utils/pdfGenerator";
import { supabase } from "../supabase/createClient";

const BuilderPage = () => {
  const {
    clientOccasion,
    clientName,
    clientNumber,
    clientAddress,
    selectedResort,
    checkInDate,
    checkOutDate,
    amenities,
    customServices,
    customPackages,
    updateField,
    toggleAmenity,
    updateAmenityPrice,
    addService,
    removeService,
    updateService,
    addPackage,
    removePackage,
    updatePackage,
  } = useContract();

  const handleGeneratePDF = (action: "preview" | "download") => {
    generateContractPDF(
      {
        clientOccasion,
        clientName,
        clientNumber,
        clientAddress,
        selectedResort,
        checkInDate,
        checkOutDate,
        amenities,
        customServices,
        customPackages,
      },
      action,
    );
  };

  const handleSavetoDatabase = async () => {
    const contractData = {
      clientOccasion,
      clientName,
      clientNumber,
      clientAddress,
      selectedResort,
      checkInDate,
      checkOutDate,
      amenities,
      customServices,
      customPackages,
    };

    try {
      const { data: contract, error: contractError } = await supabase
        .from("contracts")
        .insert([
          {
            contract_ref: `CNT-${clientName.substring(0, 3).toUpperCase()}-${Date.now()}`,
            status: "draft",
          },
        ])
        .select()
        .single();

      if (contractError) {
        throw contractError;
      }

      const { error: versionError } = await supabase
        .from("contract_versions")
        .insert([
          {
            contract_id: contract.id,
            version_number: 1,
            contract_snapshot: contractData,
          },
        ]);

      if (versionError) {
        throw versionError;
      }

      alert("Contract saved successfully!");
    } catch (error) {
      console.error("Error saving contract:", error);
      alert("Failed to save contract.");
    }
  };

  const handleFinalize = async () => {
    await handleSavetoDatabase();
    handleGeneratePDF("download");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Contract Builder
        </h1>

        {/* CONTRACT FORM */}
        <ContractForm
          data={{
            clientOccasion,
            clientName,
            clientNumber,
            clientAddress,
            selectedResort,
            checkInDate,
            checkOutDate,
          }}
          updateField={updateField}
        />

        {/* AMENITIES */}
        <AmenityForm
          amenities={amenities}
          toggleAmenity={toggleAmenity}
          updateAmenityPrice={updateAmenityPrice}
          selectedResort={selectedResort}
          customServices={customServices}
          addService={addService}
          removeService={removeService}
          updateService={updateService}
          customPackages={customPackages}
          addPackage={addPackage}
          removePackage={removePackage}
          updatePackage={updatePackage}
        />

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => handleGeneratePDF("preview")}
            className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 font-medium transition"
          >
            Preview Document
          </button>
          <button
            onClick={handleFinalize}
            className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium transition shadow-sm"
          >
            Save & Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
