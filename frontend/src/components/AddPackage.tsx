import { useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";

interface Package {
  id: string;
  name: string;
  price: string;
  inclusions: string[];
}

interface AddPackageProps {
  onAddPackage: (pkg: Package) => void;
  packages: Package[];
  onRemovePackage: (id: string) => void;
  onUpdatePackage: (id: string, pkg: Package) => void;
}

export const AddPackage = ({
  onAddPackage,
  packages,
  onRemovePackage,
  onUpdatePackage,
}: AddPackageProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [inclusions, setInclusions] = useState<string[]>([""]);

  const handleAddInclusion = () => {
    setInclusions([...inclusions, ""]);
  };

  const handleRemoveInclusion = (index: number) => {
    setInclusions(inclusions.filter((_, i) => i !== index));
  };

  const handleUpdateInclusion = (index: number, value: string) => {
    const updated = [...inclusions];
    updated[index] = value;
    setInclusions(updated);
  };

  const handleSavePackage = () => {
    if (!packageName.trim()) return;

    const newPackage: Package = {
      id: Date.now().toString(),
      name: packageName,
      price: packagePrice,
      inclusions: inclusions.filter((inc) => inc.trim() !== ""),
    };

    onAddPackage(newPackage);

    // Reset form
    setPackageName("");
    setPackagePrice("");
    setInclusions([""]);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setPackageName("");
    setPackagePrice("");
    setInclusions([""]);
    setIsAdding(false);
  };

  return (
    <div className="space-y-2">
      {/* Display existing packages */}
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className="p-3 border border-gray-300 rounded-lg bg-white"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 flex items-center gap-3">
              <input
                type="text"
                value={pkg.name}
                onChange={(e) =>
                  onUpdatePackage(pkg.id, { ...pkg, name: e.target.value })
                }
                className="flex-1 font-bold text-gray-800 text-sm outline-none bg-transparent"
                placeholder="Package name"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">₱</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={pkg.price}
                  onChange={(e) =>
                    onUpdatePackage(pkg.id, { ...pkg, price: e.target.value })
                  }
                  className="w-32 border border-gray-300 rounded-md p-2 text-sm"
                  min="0"
                  step="500"
                />
              </div>
            </div>
            <button
              onClick={() => onRemovePackage(pkg.id)}
              className="text-gray-400 hover:text-red-500 p-1 ml-2"
              title="Remove package"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Inclusions */}
          <div className="ml-4 space-y-1">
            {pkg.inclusions.map((inclusion, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2"
              >
                <span className="text-gray-600">•</span>
                <input
                  type="text"
                  value={inclusion}
                  onChange={(e) => {
                    const updated = [...pkg.inclusions];
                    updated[idx] = e.target.value;
                    onUpdatePackage(pkg.id, { ...pkg, inclusions: updated });
                  }}
                  className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
                  placeholder="Inclusion description"
                />
                <button
                  onClick={() => {
                    const updated = pkg.inclusions.filter((_, i) => i !== idx);
                    onUpdatePackage(pkg.id, { ...pkg, inclusions: updated });
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                onUpdatePackage(pkg.id, {
                  ...pkg,
                  inclusions: [...pkg.inclusions, ""],
                });
              }}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mt-1"
            >
              <Plus size={14} />
              Inclusion
            </button>
          </div>
        </div>
      ))}

      {/* Add new package form */}
      {isAdding ? (
        <div className="p-4 border border-blue-300 rounded-lg bg-blue-50">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Package name (e.g., Wedding Package)"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md p-2 text-sm font-medium"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">₱</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={packagePrice}
                  onChange={(e) => setPackagePrice(e.target.value)}
                  className="w-32 border border-gray-300 rounded-md p-2 text-sm"
                  min="0"
                  step="500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Inclusions:
              </label>
              {inclusions.map((inclusion, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <span className="text-gray-600">•</span>
                  <input
                    type="text"
                    placeholder="e.g., Decorated venue"
                    value={inclusion}
                    onChange={(e) =>
                      handleUpdateInclusion(index, e.target.value)
                    }
                    className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                  />
                  {inclusions.length > 1 && (
                    <button
                      onClick={() => handleRemoveInclusion(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddInclusion}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus size={16} />
                Inclusion
              </button>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSavePackage}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Save Package
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          <span className="text-sm">Add Package</span>
        </button>
      )}
    </div>
  );
};
