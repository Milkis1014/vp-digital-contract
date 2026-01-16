import { jsPDF } from "jspdf";
import type { Amenity, Service, Package } from "../hooks/useContract";

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
  customServices: Service[];
  customPackages: Package[];
}

export const generateContractPDF = (
  data: ContractData,
  action: PDFAction = "preview"
): void => {
  const doc = new jsPDF();
  let y: number = 20;
  const margin: number = 20;
  const lineHeight: number = 7;

  // Title
  doc.setFontSize(20);
  doc.text("SERVICE AGREEMENT", margin, y);
  y += 15;

  // Client Information
  doc.setFontSize(12);
  doc.text(`Resort: ${data.selectedResort || "N/A"}`, margin, y);
  doc.text(`Check-in: ${data.checkInDate}`, margin + 118, y);
  y += lineHeight;
  doc.text(
    `Occasion: ${data.clientOccasion || "____________________"}`,
    margin,
    y
  );
  doc.text(`Check-out: ${data.checkOutDate}`, margin + 118, y);
  y += 20;

  doc.text(`Client: ${data.clientName || "____________________"}`, margin, y);
  y += lineHeight;
  doc.text(
    `Contact: ${data.clientNumber || "____________________"}`,
    margin,
    y
  );
  y += lineHeight;
  doc.text(
    `Address: ${data.clientAddress || "____________________"}`,
    margin,
    y
  );
  y += 20;

  // Amenities Section
  const checkedAmenities = data.amenities.filter((a) => a.checked);
  let total = 0;

  if (
    checkedAmenities.length > 0 ||
    data.customServices.length > 0 ||
    data.customPackages.length > 0
  ) {
    doc.setFontSize(14);
    doc.text("Services Availed:", margin, y);
    y += 10;
    doc.setFontSize(12);

    // Standard Amenities
    checkedAmenities.forEach((amenity) => {
      const price = parseFloat(amenity.price) || 0;
      const priceText = price > 0 ? `PHP ${price.toFixed(2)}` : "Price TBD";

      doc.text(`• ${amenity.name}`, margin + 5, y);
      doc.text(`${priceText}`, margin + 100, y);
      total += price;

      y += lineHeight;
    });

    // Custom Services
    data.customServices.forEach((service) => {
      const price = parseFloat(service.price) || 0;
      const priceText = price > 0 ? `PHP ${price.toFixed(2)}` : "Price TBD";

      doc.text(`• ${service.name}`, margin + 5, y);
      doc.text(`${priceText}`, margin + 100, y);
      total += price;

      y += lineHeight;
    });

    // Custom Packages
    data.customPackages.forEach((pkg) => {
      const price = parseFloat(pkg.price) || 0;
      const priceText = price > 0 ? `PHP ${price.toFixed(2)}` : "Price TBD";

      // Package name and price
      doc.text(`• ${pkg.name}`, margin + 5, y);
      doc.text(`${priceText}`, margin + 100, y);
      total += price;
      y += lineHeight;

      // Package inclusions (indented)
      if (pkg.inclusions && pkg.inclusions.length > 0) {
        pkg.inclusions.forEach((inclusion) => {
          if (inclusion.trim()) {
            doc.setFontSize(10);
            doc.text(`  - ${inclusion}`, margin + 10, y);
            y += 6;
            doc.setFontSize(12);
          }
        });
      }
    });

    y += lineHeight;
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
