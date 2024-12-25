import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import { ItemData } from '../types/item';
import { generateItemUrl } from '../utils/urlGenerator';

interface QRCodeDisplayProps {
  data: ItemData;
}

export function QRCodeDisplay({ data }: QRCodeDisplayProps) {
  const qrValue = generateItemUrl(data.id);
  const qrRef = React.useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `${data.itemName}-qr-code.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div ref={qrRef} className="bg-white p-4 rounded-lg shadow-md">
        <QRCodeSVG value={qrValue} size={200} level="H" />
      </div>
      <button
        onClick={downloadQRCode}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        <Download size={20} />
        <span>نزل كود كر</span>
      </button>
      <div className="mt-4 text-sm text-gray-600">
        <p>السلعة: {data.itemName}</p>
        <p>المالك: {data.ownerName}</p>
        <p className="mt-2 text-xs text-gray-500">
          اضغط هنا باش تشوف: <a href={qrValue} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{qrValue}</a>
        </p>
      </div>
    </div>
  );
}
