import type { ContractData } from "../hooks/useContract";
interface ContractFormProps {
  data: {
    clientOccasion: string;
    clientName: string;
    clientNumber: string;
    clientAddress: string;
    selectedResort: string;
    checkInDate: string;
    checkOutDate: string;
  };
  updateField: (field: keyof ContractData, value: string) => void;
}

export const ContractForm = ({ data, updateField }: ContractFormProps) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Check-in & Check-out */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Check-in
          </label>
          <input
            type="datetime-local"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
            value={data.checkInDate}
            onChange={(e) => updateField("checkInDate", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Check-out
          </label>
          <input
            type="datetime-local"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
            value={data.checkOutDate}
            onChange={(e) => updateField("checkOutDate", e.target.value)}
          />
        </div>
      </div>

      {/* Occasion */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Occasion
        </label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
          value={data.clientOccasion}
          onChange={(e) => updateField("clientOccasion", e.target.value)}
          placeholder="e.g. Swimming / Birthday / Wedding"
        />
      </div>

      {/* Client Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Client Name
        </label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
          value={data.clientName}
          onChange={(e) => updateField("clientName", e.target.value)}
        />
      </div>

      {/* Client's Contact Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contact Number
        </label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
          value={data.clientNumber}
          onChange={(e) => updateField("clientNumber", e.target.value)}
          placeholder="e.g. 09123456789"
        />
      </div>

      {/* Client's Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
          value={data.clientAddress}
          onChange={(e) => updateField("clientAddress", e.target.value)}
          placeholder="e.g. 123 Sesame St., New York City"
        />
      </div>

      {/* Resort Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Resort
        </label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
          value={data.selectedResort}
          onChange={(e) => updateField("selectedResort", e.target.value)}
        >
          <option value="">-- Choose a Resort --</option>
          <option value="Villa Prescilla 1">Villa Prescilla 1</option>
          <option value="Villa Prescilla 2">Villa Prescilla 2</option>
        </select>
      </div>
    </div>
  );
};
