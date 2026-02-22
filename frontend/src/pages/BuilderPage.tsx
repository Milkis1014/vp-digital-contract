import { useState, useEffect } from "react";
import { ContractForm } from "../components/ContractForm";
import { AmenityForm } from "../components/AmenityForm";
import { useContract } from "../hooks/useContract";
import { generateContractPDF } from "../utils/pdfGenerator";
import { supabase } from "../supabase/createClient";
import { contractApi } from "../api/contracts";

interface BuilderPageProps {
  initialCheckin?: string;
  initialCheckout?: string;
  onClose?: () => void;
}

const BuilderPage = ({
  initialCheckin,
  initialCheckout,
  onClose,
}: BuilderPageProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [contractId, setContractId] = useState<string | null>(null);

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
  } = useContract({ initialCheckin, initialCheckout });

  const validateContract = (): string | null => {
    if (!checkInDate || !checkOutDate) {
      return "Please select check-in and check-out dates";
    }
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      return "Check-out must be after check-in";
    }
    if (!selectedResort) {
      return "Please select a resort";
    }
    if (!clientName.trim()) {
      return "Please enter client name";
    }
    return null;
  };

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

  // Returns the resolved contract ID so handleFinalize can use it directly,
  // avoiding the setState async race condition.
  const handleSave = async (): Promise<string | undefined> => {
    const validationError = validateContract();
    if (validationError) {
      alert(validationError);
      return undefined;
    }

    setIsSaving(true);

    // Prepare data for the 'contracts' table
    const contractRecord = {
      start_time: checkInDate,
      end_time: checkOutDate,
    };

    // Prepare the full snapshot for 'contract_versions'
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
      let id: string;
      if (contractId) {
        id = await contractApi.updateContract(
          contractId,
          contractRecord,
          contractData,
        );

        alert("Contract saved successfully!");
        return id;
      } else {
        const newContract = await contractApi.createContract(
          contractRecord,
          contractData,
        );

        id = newContract.id;
        setContractId(id);
      }
    } catch (error: any) {
      console.error("Error saving contract:", error);
      alert(`Failed to save: ${error.message}`);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleFinalize = async () => {
    try {
      const resolvedId = await handleSave(); // ← use returned ID, not contractId state

      if (resolvedId) {
        await supabase
          .from("contracts")
          .update({ status: "confirmed" })
          .eq("id", resolvedId);
      }

      handleGeneratePDF("download");
      onClose?.();
    } catch {
      // Errors are already alerted in handleSave
    }
  };

  useEffect(
    () => {
      if (!contractId) return;

      const timer = setTimeout(() => {
        handleSave();
      }, 30000);

      return () => clearTimeout(timer);
    },
    [
      // clientName,
      // clientOccasion,
      // selectedResort,
      // amenities,
      // customServices,
      // customPackages,
    ],
  );

  return (
    <div className="font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Contract Builder
      </h1>

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

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 font-medium transition disabled:opacity-50"
        >
          {isSaving ? "Saving..." : contractId ? "Save Changes" : "Save Draft"}
        </button>

        <button
          onClick={() => handleGeneratePDF("preview")}
          className="flex-1 bg-gray-100 border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-200 font-medium transition"
        >
          Preview PDF
        </button>

        <button
          onClick={handleFinalize}
          disabled={isSaving}
          className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium transition shadow-sm disabled:opacity-50"
        >
          Finalize & Download
        </button>
      </div>
    </div>
  );
};

export default BuilderPage;
