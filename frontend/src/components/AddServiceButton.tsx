import { Plus, Trash2 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: string;
}

interface AddServiceButtonProps {
  onAddService: (service: Service) => void;
  services: Service[];
  onRemoveService: (id: string) => void;
  onUpdateService: (id: string, service: Service) => void;
}

export const AddServiceButton = ({
  onAddService,
  services,
  onRemoveService,
  onUpdateService,
}: AddServiceButtonProps) => {
  const handleAddService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: "",
      price: "",
    };
    onAddService(newService);
  };

  return (
    <div className="space-y-2">
      {/* Display existing services */}
      {services.map((service) => (
        <div
          key={service.id}
          className="flex items-center p-3 border rounded-lg bg-white hover:bg-gray-50"
        >
          <input
            type="text"
            value={service.name}
            onChange={(e) =>
              onUpdateService(service.id, { ...service, name: e.target.value })
            }
            className="flex-1 font-bold text-gray-800 text-sm outline-none bg-transparent"
            placeholder="Service name"
          />

          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-gray-600">₱</span>
            <input
              type="number"
              placeholder="0.00"
              value={service.price}
              onChange={(e) =>
                onUpdateService(service.id, {
                  ...service,
                  price: e.target.value,
                })
              }
              className="w-32 border border-gray-300 rounded-md p-2 text-sm"
              min="0"
              step="500"
            />
          </div>

          <button
            onClick={() => onRemoveService(service.id)}
            className="text-gray-400 hover:text-red-500 p-1 ml-2"
            title="Remove service"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}

      {/* Add new service button */}
      <button
        onClick={handleAddService}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        <span className="text-sm">Add Service</span>
      </button>
    </div>
  );
};
