import React, { useState } from "react";
import jsPDF from "jspdf";
import "./Usercertificate.css";

const Certificate = (name, date, setShowPreview) => {
  try {
    // Create a new jsPDF instance
    const doc = new jsPDF({ orientation: "landscape" });


    // Add background image
    doc.addImage(
      // "/a.jpg",
      "/Certificate-red-blood.png",
      "PNG",
      0,
      0,
      doc.internal.pageSize.getWidth(),
      doc.internal.pageSize.getHeight()
    );
    doc.setFont("italic");
    doc.setFontSize(25);
    doc.text(name, 150, 100, { align: "center" });
    doc.setFontSize(14);
    doc.text(date, 85, 156.5);

    ///////////////////////

    // Save the PDF
    const pdfFileName = `${name}.pdf`;
    doc.save(pdfFileName);
  } catch (error) {
    console.log(error);
  }
};
function CertificateGenerator(props) {
  return (
    <div>
      <button
        onClick={() => Certificate(props.name, props.date)}
        className="usercertificate-download-button"
      >
        Download
        <img
          src="/download.png"
          alt=""
          className="usercertificate-download-img"
        />
      </button>
    </div>
  );
}

export default CertificateGenerator;
