# Kotlin-Workshop-Final
# Inventory Management API

API สำหรับจัดการสินค้าคงคลังและหมวดหมู่สินค้า เขียนด้วย Kotlin + Ktor

## Features

- 🏷️ **จัดการหมวดหมู่สินค้า** (CRUD)
- 📦 **จัดการสินค้า** (CRUD)
- 📊 **จัดการสต็อก** (เพิ่ม/ลด)
- ✅ **Data Validation** ครอบคลุม
- 🔒 **ป้องกันการลบหมวดหมู่** ที่มีสินค้าอยู่

## API Endpoints

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | ดึงหมวดหมู่ทั้งหมด |
| GET | `/categories/{id}` | ดึงหมวดหมู่ตาม ID |
| POST | `/categories` | สร้างหมวดหมู่ใหม่ |
| PUT | `/categories/{id}` | อัพเดทหมวดหมู่ |
| DELETE | `/categories/{id}` | ลบหมวดหมู่ |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | ดึงสินค้าทั้งหมด |
| GET | `/products/{id}` | ดึงสินค้าตาม ID |
| POST | `/products` | สร้างสินค้าใหม่ |
| PUT | `/products/{id}` | อัพเดทสินค้า |
| DELETE | `/products/{id}` | ลบสินค้า |
| POST | `/products/{id}/add-stock` | เพิ่มสต็อก |
| POST | `/products/{id}/remove-stock` | ลดสต็อก |

## Request Examples

### สร้างหมวดหมู่ใหม่
```http
POST /categories
Content-Type: application/json

{
  "name": "อาหารและเครื่องดื่ม"
}
```

### สร้างสินค้าใหม่
```http
POST /products
Content-Type: application/json

{
  "name": "กาแฟ",
  "description": "กาแฟคั่วเข้ม",
  "price": "150.00",
  "stockQuantity": 100,
  "categoryId": 1
}
```

### เพิ่มสต็อก
```http
POST /products/1/add-stock
Content-Type: application/json

{
  "quantity": 20
}
```

## Data Validation

### Categories
- `name` ต้องไม่ว่างเปล่า

### Products
- `name` ต้องไม่ว่างเปล่า
- `price` ต้องเป็นตัวเลขที่ ≥ 0
- `stockQuantity` ต้อง ≥ 0
- `categoryId` ต้องเป็นหมวดหมู่ที่มีอยู่จริง

### Stock Updates
- `quantity` ต้อง > 0
- ไม่สามารถลดสต็อกให้ติดลบได้

## Error Handling

API จะคืนค่า HTTP Status Code ที่เหมาะสมพร้อม Error Message:

```json
{
  "error": "Category not found"
}
```

### Common Status Codes
- `200 OK` - สำเร็จ
- `201 Created` - สร้างใหม่สำเร็จ
- `204 No Content` - ลบสำเร็จ
- `400 Bad Request` - ข้อมูลผิดพลาด
- `404 Not Found` - ไม่พบข้อมูล

## Business Rules

1. **ไม่สามารถลบหมวดหมู่ที่มีสินค้าอยู่** - ป้องกันการสูญหายของข้อมูลสินค้า
2. **สต็อกไม่สามารถติดลบได้** - มีการตรวจสอบก่อนการลดสต็อก
3. **ราคาต้องเป็นค่าบวก** - ป้องกันการใส่ราคาผิดพลาด
4. **หมวดหมู่ต้องมีอยู่จริง** - ตรวจสอบก่อนสร้าง/อัพเดทสินค้า

## Sample Data

API มาพร้อมข้อมูลตัวอย่าง:

**Categories:**
- เสื้อผ้า
- อุปกรณ์อิเล็กทรอนิกส์
- เครื่องใช้ในบ้าน

**Products:**
- เสื้อยืดสีขาว (฿299)
- สมาร์ทโฟน (฿15,999)
- หม้อหุงข้าว (฿2,500)

---

*Built with Kotlin + Ktor*
