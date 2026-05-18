import * as XLSX from 'xlsx';

export function readExcelData( filePath: string ) {

    // Read workbook
    const workbook = XLSX.readFile(filePath);

    // Get first sheet

    const sheetName = workbook.SheetNames[0];

    // Get worksheet

    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON

    const data = XLSX.utils.sheet_to_json( worksheet );

    return data;

}