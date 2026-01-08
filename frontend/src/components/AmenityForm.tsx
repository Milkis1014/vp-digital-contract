import React, { useState } from "react";
import type { Amenity, CustomService } from "../hooks/useContract";
import { AddServiceButton } from "./AddServiceButton";

interface AmenityFormProps {
  amenities: Amenity[];
  customServices: CustomService[];
  toggleAmenity: (id: number) => void;
  updateAmenityPrice: (id: number, price: string) => void;
  selectedResort: string;
  addCustomService: (onAdded?: (id: number) => void) => void;
  deleteCustomService: (id: number) => void;
  toggleCustomService: (id: number) => void;
  updateCustomServiceName: (id: number, name: string) => void;
  updateCustomServicePrice: (id: number, price: string) => void;
}

export const AmenityForm: React.FC<AmenityFormProps> = ({
  amenities,
  customServices,
  toggleAmenity,
  updateAmenityPrice,
  selectedResort,
  addCustomService,
  deleteCustomService,
  toggleCustomService,
  updateCustomServiceName,

  updateCustomServicePrice,
}) => {
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);

  const handleAddService = () => {
    addCustomService((newId) => {
      setEditingServiceId(newId);
    });
  };

  if (!selectedResort) {
    return (
      <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          Please select a resort to view available amenities
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Amenities</h2>
      <div className="grid grid-cols-1 gap-2">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              amenity.checked
                ? "bg-blue-50 border-blue-200"
                : "hover:bg-gray-50"
            }`}
          >
            <label className="flex items-center flex-1 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 rounded"
                checked={amenity.checked}
                onChange={() => toggleAmenity(amenity.id)}
              />
              <span className="ml-3 text-sm text-gray-600">
                <span className="font-bold text-gray-800">{amenity.name}</span>
              </span>
            </label>

            {amenity.checked && (
              <div className="flex items-center gap-2 ml-4">
                <span className="text-sm text-gray-600">₱</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amenity.price}
                  onChange={(e) =>
                    updateAmenityPrice(amenity.id, e.target.value)
                  }
                  className="w-32 border border-gray-300 rounded-md p-2 text-sm"
                  min="0"
                  step="500"
                />
              </div>
            )}
          </div>
        ))}

        {/* Other services section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-700">
              Other services
            </h2>
            <AddServiceButton onAddService={handleAddService} />
          </div>

          {customServices.length > 0 && (
            <div className="grid grid-cols-1 gap-2">
              {customServices.map((service) => (
                <div
                  key={service.id}
                  className={`flex items-center p-3 border rounded-lg transition-colors ${
                    service.checked
                      ? "bg-blue-50 border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <label className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded cursor-pointer"
                      checked={service.checked}
                      onChange={() => toggleCustomService(service.id)}
                    />
                    <div className="ml-3 flex-1">
                      {editingServiceId === service.id ? (
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) =>
                            updateCustomServiceName(service.id, e.target.value)
                          }
                          onBlur={() => {
                            // Only exit edit mode if the service has a name
                            if (service.name.trim()) {
                              setEditingServiceId(null);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && service.name.trim()) {
                              setEditingServiceId(null);
                            }
                          }}
                          autoFocus
                          placeholder="Enter service name"
                          className="w-full border border-gray-300 rounded-md p-1 text-sm font-bold text-gray-800"
                        />
                      ) : (
                        <span
                          onClick={() => setEditingServiceId(service.id)}
                          className="text-sm text-gray-600 cursor-pointer"
                        >
                          <span className="font-bold text-gray-800">
                            {service.name}
                          </span>
                        </span>
                      )}
                    </div>
                  </label>

                  {service.checked && (
                    <div className="flex items-center gap-2 ml-4">
                      <span className="text-sm text-gray-600">₱</span>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={service.price}
                        onChange={(e) =>
                          updateCustomServicePrice(service.id, e.target.value)
                        }
                        className="w-32 border border-gray-300 rounded-md p-2 text-sm"
                        min="0"
                        step="500"
                      />
                    </div>
                  )}

                  <button
                    onClick={() => deleteCustomService(service.id)}
                    className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Delete service"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
