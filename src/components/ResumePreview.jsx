import { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, Printer, Save, Loader2, Eye } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import ModernTemplate from '../templates/ModernTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import TemplateSelector from './TemplateSelector';
import './ResumePreview.css';

const templateMap = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate,
};

export default function ResumePreview() {
  const { resumeData, saveResumeToStorage } = useResume();
  const previewRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);

  const Template = templateMap[resumeData.template] || ModernTemplate;

  useEffect(() => {
    const handleScroll = () => {
      setShowToolbar(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const downloadPDF = async () => {
    const node = previewRef.current;
    if (!node) return;
    setDownloading(true);
    try {
      await document.fonts.ready;
      const a4Width = 210;
      const a4Height = 297;

      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgWidth = a4Width;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = a4Height;
      let heightLeft = imgHeight;
      let position = 0;

      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save(`${resumeData.personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}_Resume.pdf`);
    } catch (error) {
      console.error('PDF download failed', error);
    } finally {
      setDownloading(false);
    }
  };

  const printResume = () => {
    const original = document.body.innerHTML;
    const content = previewRef.current ? previewRef.current.cloneNode(true) : null;
    document.body.innerHTML =
      content ? `<div style="padding:20px;max-width:800px;margin:0 auto;">${content.innerHTML}</div>` : '';
    window.print();
    document.body.innerHTML = original;
    window.location.reload();
  };

  return (
    <div className="preview-wrap">
      <TemplateSelector />

      <div className="preview-toolbar">
        <button className="btn btn-success" onClick={saveResumeToStorage}>
          <Save size={16} />
          Save Resume
        </button>
        <button className="btn btn-primary" onClick={downloadPDF} disabled={downloading}>
          {downloading ? <Loader2 size={16} className="spin" /> : <Download size={16} />}
          {downloading ? 'Generating...' : 'Download PDF'}
        </button>
        <button className="btn btn-outline" onClick={printResume}>
          <Printer size={16} />
          Print
        </button>
      </div>

      <div className="preview-scroll-area">
        <div className="resume-preview" ref={previewRef}>
          <Template data={resumeData} />
        </div>
      </div>

      {showToolbar && (
        <button className="floating-preview-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Eye size={18} />
          Back to Top
        </button>
      )}
    </div>
  );
}
