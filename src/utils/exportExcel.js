import * as XLSX from 'xlsx';

export const exportToExcel = (ref, nomeArquivo) => {
    if (ref.current) {
        const wb = XLSX.utils.table_to_book(ref.current);
        XLSX.writeFile(wb, `${nomeArquivo}.xlsx`);
    }
};