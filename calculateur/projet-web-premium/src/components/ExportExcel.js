import React from 'react';
import { saveAs } from 'file-saver';
import { exportToExcel } from '../utils/excelExport';

const ExportExcel = ({ data }) => {
  const handleExport = () => {
    const excelBlob = exportToExcel(data);
    saveAs(excelBlob, 'resultats_estimation.xlsx');
  };

  return (
    <button onClick={handleExport} className="export-excel-button">
      Exporter vers Excel
    </button>
  );
};

export default ExportExcel;