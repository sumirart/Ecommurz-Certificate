import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { EditText } from "react-edit-text";

function App() {
  const certificateRef = React.useRef();

  const handleDownloadJpg = async () => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "ecommurz-certificate.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
  const handleDownloadPdf = async () => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ecommurz-certificate.pdf");
  };

  return (
    <div className="App">
      <div className="certificate" ref={certificateRef}>
        <div className="text-area">
          <EditText
            className="appreciation"
            name="appreciation"
            defaultValue="Employee of the Century"
            style={{ textAlign: "center" }}
          />
          <div className="name">
            <EditText
              name="name"
              defaultValue="Elon Murz"
              style={{ fontSize: "4rem", textAlign: "center" }}
            />
          </div>
          <div className="description">
            <EditText
              name="description"
              defaultValue="For giving honest infos and mental support with memes and cat pics"
              style={{ textAlign: "center" }}
            />
          </div>
        </div>
        <div className="place-date">
          <EditText
            name="place"
            defaultValue="Place: Near SCBD"
            style={{ margin: 0, padding: 0 }}
          />
          <EditText
            name="date"
            defaultValue="Date: 22-2-2022"
            style={{ margin: 0, padding: 0 }}
          />
        </div>
      </div>

      <div className="download">
        <button className="button" onClick={handleDownloadJpg}>
          Download as Image
        </button>
        <button className="button" onClick={handleDownloadPdf}>
          Download as PDF
        </button>
      </div>

      <div className="credits">
        <p>
          Made with 🖤 Ecommurz by{" "}
          <a
            href="https://www.instagram.com/pratamasumirat/"
            target={"_blank"}
            rel="noreferrer"
          >
            @pratamasumirat
          </a>
        </p>
        <p>
          Stacks:{" "}
          <a href="https://www.canva.com/" target={"_blank"} rel="noreferrer">
            Canva
          </a>
          , React, html2canvas, jsPDF, react-edit-text
        </p>
      </div>
    </div>
  );
}

export default App;
