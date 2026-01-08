import React from "react";

interface AddServiceButtonProps {
  onAddService: () => void;
}

export const AddServiceButton: React.FC<AddServiceButtonProps> = ({
  onAddService,
}) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={onAddService}
        className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-md"
        aria-label="Add custom service"
      >
        ➕
      </button>
    </div>
  );
};
