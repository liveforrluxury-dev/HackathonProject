import * as XLSX from 'xlsx';
import * as fs from 'fs';

const filePath = './excel/interest-data.xlsx';

export function appendDataToExcel(newData: any) {

    // Create excel folder

    if (!fs.existsSync('./excel')) {
        fs.mkdirSync('./excel');
    }

    let workbook;
    let worksheet;
    let existingData: any[] = [];

    // Check if file exists

    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
        worksheet = workbook.Sheets['Loan Data'];
        existingData = XLSX.utils.sheet_to_json(worksheet);
    } 
    else {
        workbook = XLSX.utils.book_new();
    }

    // Add new row
    existingData.push(newData);

    // Create updated worksheet
    const updatedWorksheet = XLSX.utils.json_to_sheet(existingData);

    // Replace sheet

    workbook.Sheets['Loan Data'] = updatedWorksheet;

    // Append sheet if first time

    if (!workbook.SheetNames.includes('Loan Data')) {
        XLSX.utils.book_append_sheet(workbook, updatedWorksheet, 'Loan Data');
    }

    // Save file

    XLSX.writeFile(workbook, filePath);

}