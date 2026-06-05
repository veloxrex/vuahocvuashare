import Papa from 'papaparse';
import type { Product } from '../types/product';

// Published CSV URL từ Google Sheets
export const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW_p5wcB-8H3yz16wzH5X7qNBfXGawENUUexjSgejRAKyf1Zi8OBF_jyDISyegZd1QVSsl9_Deev1P/pub?output=csv&gid=919908513';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(SHEET_CSV_URL);

  if (!response.ok) {
    throw new Error(`Không thể tải dữ liệu từ Google Sheets (HTTP ${response.status})`);
  }

  const csv = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(csv, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (results) => {
        const products: Product[] = results.data
          .filter((row) =>
            row['Tên sách']?.trim() &&
            row['Tác giả']?.trim() &&
            row['Link mua']?.trim()
          )
          .map((row, index) => ({
            id: String(index + 1),
            name: row['Tên sách']?.trim() ?? '',
            author: row['Tác giả']?.trim() ?? '',
            description: row['Mô tả ngắn']?.trim() ?? '',
            image: row['Ảnh bìa']?.trim() ?? '',
            videoLink: row['Link video']?.trim() ?? '',
            link: row['Link mua']?.trim() ?? '#',
            timestamp: row['Dấu thời gian']?.trim() ?? '',
          }));
        resolve(products);
      },
      error: (err: Error) => reject(err),
    });
  });
}
