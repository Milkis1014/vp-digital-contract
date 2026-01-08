import { jsPDF } from "jspdf";
import type { Amenity, CustomService } from "../hooks/useContract";

export type PDFAction = "preview" | "download";

interface ContractData {
  clientOccasion: string;
  clientName: string;
  clientNumber: string;
  clientAddress: string;
  selectedResort: string;
  checkInDate: string;
  checkOutDate: string;
  amenities: Amenity[];
  customServices: CustomService[];
}

export const generateContractPDF = (
  data: ContractData,
  action: PDFAction = "preview"
): void => {
  const doc = new jsPDF();
  let y: number = 20;
  const margin: number = 20;

  // Title
  doc.setFontSize(20);
  doc.text("SERVICE AGREEMENT", margin, y);
  y += 15;

  // Client Information
  doc.setFontSize(12);
  doc.text(`Resort: ${data.selectedResort || "N/A"}`, margin, y);
  doc.text(`Check-in: ${data.checkInDate}`, margin + 118, y);
  y += 7;
  doc.text(
    `Occasion: ${data.clientOccasion || "____________________"}`,
    margin,
    y
  );
  doc.text(`Check-out: ${data.checkOutDate}`, margin + 118, y);
  y += 20;

  doc.text(`Client: ${data.clientName || "____________________"}`, margin, y);
  y += 7;
  doc.text(
    `Contact: ${data.clientNumber || "____________________"}`,
    margin,
    y
  );
  y += 7;
  doc.text(
    `Address: ${data.clientAddress || "____________________"}`,
    margin,
    y
  );
  y += 20;

  // Amenities Section
  const checkedAmenities = data.amenities.filter((a) => a.checked);
  const checkedCustomServices = data.customServices.filter((s) => s.checked);

  if (checkedAmenities.length > 0 || checkedCustomServices.length > 0) {
    doc.setFontSize(14);
    doc.text("Services Availed:", margin, y);
    y += 10;
    doc.setFontSize(12);

    let total = 0;

    // Regular amenities
    checkedAmenities.forEach((amenity) => {
      const price = parseFloat(amenity.price) || 0;
      const priceText = price > 0 ? `PHP ${price.toFixed(2)}` : "Price TBD";

      doc.text(`• ${amenity.name}`, margin + 5, y);
      doc.text(`${priceText}`, margin + 100, y);
      total += parseFloat(amenity.price) || 0;

      y += 7;
    });

    // Custom services
    checkedCustomServices.forEach((service) => {
      const price = parseFloat(service.price) || 0;
      const priceText = price > 0 ? `PHP ${price.toFixed(2)}` : "Price TBD";
      const serviceName = service.name || "Custom Service";

      doc.text(`• ${serviceName}`, margin + 5, y);
      doc.text(`${priceText}`, margin + 100, y);
      total += parseFloat(service.price) || 0;

      y += 7;
    });

    y += 7;
    doc.text(`Total: PHP ${total.toFixed(2)}`, margin + 88, y);
  }

  // Output PDF
  if (action === "preview") {
    const blob = doc.output("blob");
    window.open(URL.createObjectURL(blob), "_blank");
  } else {
    doc.save(`Contract_${data.clientName.replace(/\s+/g, "_") || "Draft"}.pdf`);
  }
};
