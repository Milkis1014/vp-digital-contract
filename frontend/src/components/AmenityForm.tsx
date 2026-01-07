import React from 'react';
import type { Amenity } from '../hooks/useContract';

interface AmenityFormProps {
    amenities: Amenity[];
    toggleAmenity: (id: number) => void;
    updateAmenityPrice: (id: number, price: string) => void;
    selectedResort: string;
}

export const AmenityForm: React.FC<AmenityFormProps> = ({ amenities, toggleAmenity, updateAmenityPrice, selectedResort }) => {
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
                {amenities.map(amenity => (
                    <div 
                        key={amenity.id} 
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            amenity.checked ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
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
                                onChange={(e) => updateAmenityPrice(amenity.id, e.target.value)}
                                className="w-32 border border-gray-300 rounded-md p-2 text-sm"
                                min="0"
                                step="500"
                            />
                        </div>
                    )}
                    </div>
                ))}
            </div>
        </div>
    );
};