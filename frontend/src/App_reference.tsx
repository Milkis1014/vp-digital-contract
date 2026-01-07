import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

// 1. Define the shape of our dynamic data
interface Amenity {
  id: number;
  name: string;
  desc: string;
  checked: boolean;
}

// 2. Define the types for our PDF action
type PDFAction = 'preview' | 'download';

const App: React.FC = () => {
  // Static States with inferred types
  const [contractDate, setContractDate] = useState<string>('2025-12-23');
  const [clientOccasion, setClientOccasion] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [clientAddress, setClientAddress] = useState<string>('');
  const [selectedResort, setSelectedResort] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<string>('2025-12-23 07:00:00');
  const [checkOutDate, setCheckOutDate] = useState<string>('2025-12-23 17:00:00');

  // Dynamic States with explicit Amenity interface
  const [amenities, setAmenities] = useState<Amenity[]>([
    { id: 1, name: 'Swimming Pool', desc: 'Full access to the aquatic center.', checked: false },
    { id: 2, name: 'Function Hall', desc: 'Priority booking for corporate events.', checked: false },
    { id: 3, name: 'Gym Access', desc: '24/7 access to fitness equipment.', checked: false },
  ]);

  const toggleAmenity = (id: number): void => {
    setAmenities(prev => 
      prev.map(a => a.id === id ? { ...a, checked: !a.checked } : a)
    );
  };

  const generatePDF = (action: PDFAction = 'preview'): void => {
    const doc = new jsPDF();
    let y: number = 20;
    const margin: number = 20;
    const pageWidth: number = doc.internal.pageSize.width;
    const maxWidth: number = pageWidth - (margin * 2);

    // Title
    doc.setFontSize(20);
    doc.text("SERVICE AGREEMENT", margin, y);
    y += 15;

    // Static Data
    doc.setFontSize(12);
    doc.text(`Date: ${contractDate}`, margin, y);
    y += 7;
    doc.text(`Client: ${clientName || '____________________'}`, margin, y);
    y += 15;

    // Body text
    doc.setFontSize(10);
    const body: string = "This agreement confirms the partnership between the provider and the client. The terms outlined below are binding for the duration of the fiscal year.";
    const bodyLines: string[] = doc.splitTextToSize(body, maxWidth);
    doc.text(bodyLines, margin, y);
    y += (bodyLines.length * 5) + 10;

    // Dynamic Section: Amenities
    const selected = amenities.filter(a => a.checked);
    if (selected.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Included Amenities:", margin, y);
      y += 7;
      doc.setFont("helvetica", "normal");

      selected.forEach(item => {
        const text: string = `• ${item.name}: ${item.desc}`;
        const lines: string[] = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, margin, y);
        y += (lines.length * 5) + 2;
      });
      y += 10;
    }

    // Signatures (Static)
    y += 20;
    doc.line(margin, y, margin + 60, y);
    doc.text("Provider Signature", margin, y + 5);

    doc.line(pageWidth - margin - 60, y, pageWidth - margin, y);
    doc.text("Client Signature", pageWidth - margin - 60, y + 5);

    // ACTION Logic
    if (action === 'preview') {
      const blob: Blob = doc.output('blob');
      const url: string = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } else {
      doc.save(`Contract_${clientName.replace(/\s+/g, '_') || 'Draft'}.pdf`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contract Builder</h1>

        {/* Static Inputs */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contract Date</label>
            <input 
              type="date" 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={contractDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContractDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Occasion</label>
            <input 
              type="text" 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={clientOccasion}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientOccasion(e.target.value)}
              placeholder="e.g. Debut"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client Name</label>
            <input 
              type="text" 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={clientName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientName(e.target.value)}
              placeholder="e.g. Acme Corp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input 
              type="text" 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={contactNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactNumber(e.target.value)}
              placeholder="e.g. 09123456789"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input 
              type="text" 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={clientAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientAddress(e.target.value)}
              placeholder="e.g. 123 Some Street"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Resort</label>
            <select 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={selectedResort}
              onChange={(e) => setSelectedResort(e.target.value)}
            >
              <option value="">-- Choose a Resort --</option>
              <option value="VP1">Villa Prescilla 1</option>
              <option value="VP2">Villa Prescilla 2</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Check-in</label>
            <input 
              type="datetime-local" 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={checkInDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckInDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Check-in</label>
            <input 
              type="datetime-local" 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={checkOutDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckOutDate(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Inputs (Amenities) */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Optional Amenities</h2>
          <div className="grid grid-cols-1 gap-2">
            {amenities.map(amenity => (
              <label 
                key={amenity.id} 
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${amenity.checked ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
              >
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-blue-600 rounded"
                  checked={amenity.checked}
                  onChange={() => toggleAmenity(amenity.id)}
                />
                <span className="ml-3 text-sm text-gray-600">
                  <span className="font-bold text-gray-800">{amenity.name}</span> — {amenity.desc}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => generatePDF('preview')}
            className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 font-medium transition"
          >
            Preview Document
          </button>
          <button 
            onClick={() => generatePDF('download')}
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