import { PDFDocument, rgb } from 'pdf-lib';
import fetch, { Response } from 'node-fetch';

interface Proposal {
    number: string;
    // Add other proposal properties as needed
}

interface LogoDimensions {
    width: number;
    height: number;
}

export const generatePDF = async (proposal: Proposal, logoUri?: string): Promise<Uint8Array> => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    if (logoUri) {
        const logoBytes = await fetch(logoUri).then((res: Response) => res.arrayBuffer());
        const logoImage = await pdfDoc.embedPng(logoBytes);
        const logoDims: LogoDimensions = logoImage.scale(0.5);
        page.drawImage(logoImage, {
            x: 50,
            y: page.getHeight() - logoDims.height - 50,
            width: logoDims.width,
            height: logoDims.height,
        });
    }

    page.drawText(`Proposal No: ${proposal.number}`, {
        x: 50,
        y: page.getHeight() - 150,
        size: 20,
        color: rgb(0, 0, 0),
    });

    // Add more proposal details to the PDF

    const pdfBytes = await pdfDoc.save();
    // Handle the generated PDF bytes (e.g., save to file, send to server, etc.)
    return pdfBytes;
};
