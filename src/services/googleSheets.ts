import Papa from 'papaparse';

// Coloca aquí tu ID de Google Sheets (proporcionado por el usuario)
export const SHEET_ID = '1XG4ifCVo8ZziQytvgZRFvZLu4Bgv0XoUo4yJYB-ClFw';

export interface SheetDish {
  categoría: string;
  'nombre del plato': string;
  descripción: string;
  precio: string;
  'URL de imagen'?: string;
}

export interface SheetCategory {
  nombre: string;
  'URL de imagen'?: string;
}

export const fetchSheetData = async <T>(sheetName: string): Promise<T[]> => {
  if (!SHEET_ID) return [];
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`No se pudo obtener la hoja "${sheetName}" (status: ${response.status}). Usando datos locales.`);
      return [];
    }
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data as T[]),
        error: (error: any) => reject(error),
      });
    });
  } catch (error) {
    console.error(`Error fetching sheet ${sheetName}:`, error);
    return [];
  }
};

// Configura aquí la URL de tu Google Apps Script Web App
export const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbztknhQghHuJ8O09buiA6GnqRLmbqEFIpr9zqaX0-rtTtZlyCOyFkxQtpoTn3OrLq3DzQ/exec';

export const submitSheetData = async (sheetName: string, data: any): Promise<boolean> => {
  if (!WEB_APP_URL) {
    console.warn('Falta configurar WEB_APP_URL. Simulando envío a:', sheetName, data);
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
  }

  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // Evita problemas de CORS con Apps Script
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        sheetName,
        data,
      }),
    });
    
    return true;
  } catch (error) {
    console.error(`Error submitting to sheet ${sheetName}:`, error);
    return false;
  }
};

