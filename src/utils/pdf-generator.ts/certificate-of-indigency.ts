import PDFDocument from 'pdfkit';

function generateBarangayCertificateOfIndigency() {
    const doc = new PDFDocument();

    doc.text("mark", 0, 0);

    // Save the PDF as a Data URL
    const pdfData = doc.output('datauristring');


    return pdfData;

}

export default generateBarangayCertificateOfIndigency;