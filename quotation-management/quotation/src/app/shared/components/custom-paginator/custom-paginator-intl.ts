import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'แสดงรายการต่อหน้า:';
  override nextPageLabel = 'หน้าถัดไป';
  override previousPageLabel = 'หน้าก่อนหน้า';
  override firstPageLabel = 'หน้าแรก';
  override lastPageLabel = 'หน้าสุดท้าย';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 จาก 0 รายการ`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // Fix the end index to list length
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `แสดง ${startIndex + 1} – ${endIndex} จาก ${length} รายการ`;
  };
}
