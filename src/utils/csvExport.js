// src/utils/csvExport.js
/**
 * Utility functions for exporting session reports to CSV format
 */

/**
 * Convert array of objects to CSV format
 * @param {Array} data - Array of session report objects
 * @param {Array} headers - Array of header objects with key and label properties
 * @returns {string} CSV formatted string
 */
export const convertToCSV = (data, headers) => {
  if (!data || data.length === 0) {
    return '';
  }

  // Create CSV header row
  const csvHeaders = headers.map(header => header.label).join(',');
  
  // Create CSV data rows
  const csvRows = data.map(row => {
    return headers.map(header => {
      let value = row[header.key];
      
      // Handle different data types
      if (value === null || value === undefined) {
        value = '';
      } else if (typeof value === 'object' && value instanceof Date) {
        value = value.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      } else if (typeof value === 'string' && value.includes(',')) {
        value = `"${value}"`; // Wrap strings with commas in quotes
      }
      
      return value;
    }).join(',');
  });

  return [csvHeaders, ...csvRows].join('\n');
};

/**
 * Download CSV file
 * @param {string} csvContent - CSV formatted string
 * @param {string} filename - Name of the file to download
 */
export const downloadCSV = (csvContent, filename = 'session-reports.csv') => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Export session reports to CSV
 * @param {Array} reports - Array of session report objects
 * @param {string} filename - Optional filename for the export
 */
export const exportSessionReportsToCSV = (reports, filename = null) => {
  if (!reports || reports.length === 0) {
    alert('No reports to export');
    return;
  }

  const headers = [
    { key: 'agentName', label: 'Agent Name' },
    { key: 'agentCode', label: 'Agent Code' },
    { key: 'agentDepartment', label: 'Department' },
    { key: 'customerName', label: 'Customer Name' },
    { key: 'customerPhone', label: 'Customer Phone' },
    { key: 'hostelName', label: 'Hostel Name' },
    { key: 'roomType', label: 'Room Type' },
    { key: 'amountPaid', label: 'Amount Paid (GHS)' },
    { key: 'managerShare', label: 'Manager Share (GHS)' },
    { key: 'agentCommission', label: 'Agent Commission (GHS)' },
    { key: 'receiptNumber', label: 'Receipt Number' },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Date Submitted' }
  ];

  // Generate filename with timestamp if not provided
  if (!filename) {
    const timestamp = new Date().toISOString().split('T')[0];
    filename = `session-reports-${timestamp}.csv`;
  }

  const csvContent = convertToCSV(reports, headers);
  downloadCSV(csvContent, filename);
};

/**
 * Format currency value for CSV export
 * @param {number} amount - Amount to format
 * @returns {string} Formatted amount
 */
export const formatCurrencyForCSV = (amount) => {
  return (amount || 0).toFixed(2);
};

/**
 * Format date for CSV export
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
export const formatDateForCSV = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};