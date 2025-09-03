package com.example

import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.testing.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlin.test.*

class InventoryApiTest {

    @Test
    fun testGetAllCategories() = testApplication {
        application {
            module()
        }

        val response = client.get("/categories")
        assertEquals(HttpStatusCode.OK, response.status)

        val categories = Json.decodeFromString<List<Category>>(response.bodyAsText())
        assertTrue(categories.size >= 3)
        assertEquals("เสื้อผ้า", categories[0].name)
    }

    @Test
    fun testGetCategoryByIdNotFound() = testApplication {
        application {
            module()
        }

        val response = client.get("/categories/999")
        assertEquals(HttpStatusCode.NotFound, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertEquals("Category not found", error.error)
    }

    @Test
    fun testCreateCategory() = testApplication {
        application {
            module()
        }

        val categoryRequest = CategoryRequest("ของเล่น")
        val response = client.post("/categories") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(categoryRequest))
        }

        assertEquals(HttpStatusCode.Created, response.status)

        val category = Json.decodeFromString<Category>(response.bodyAsText())
        assertEquals("ของเล่น", category.name)
        assertTrue(category.id > 0)
    }

    @Test
    fun testCreateCategoryEmptyName() = testApplication {
        application {
            module()
        }

        val categoryRequest = CategoryRequest("")
        val response = client.post("/categories") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(categoryRequest))
        }

        assertEquals(HttpStatusCode.BadRequest, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertEquals("Category name cannot be empty", error.error)
    }

    @Test
    fun testUpdateCategory() = testApplication {
        application {
            module()
        }

        val categoryRequest = CategoryRequest("เสื้อผ้า (อัพเดท)")
        val response = client.put("/categories/1") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(categoryRequest))
        }

        assertEquals(HttpStatusCode.OK, response.status)

        val category = Json.decodeFromString<Category>(response.bodyAsText())
        assertEquals(1, category.id)
        assertEquals("เสื้อผ้า (อัพเดท)", category.name)
    }

    @Test
    fun testDeleteCategory() = testApplication {
        application {
            module()
        }

        // สร้างหมวดหมู่ใหม่ก่อน
        val categoryRequest = CategoryRequest("หมวดหมู่ทดสอบ")
        val createResponse = client.post("/categories") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(categoryRequest))
        }
        val category = Json.decodeFromString<Category>(createResponse.bodyAsText())

        // ลบหมวดหมู่
        val deleteResponse = client.delete("/categories/${category.id}")
        assertEquals(HttpStatusCode.NoContent, deleteResponse.status)

        // ตรวจสอบว่าลบแล้ว
        val getResponse = client.get("/categories/${category.id}")
        assertEquals(HttpStatusCode.NotFound, getResponse.status)
    }


    @Test
    fun testCreateProduct() = testApplication {
        application {
            module()
        }

        val productRequest = ProductRequest(
            name = "เสื้อยืดสีแดง",
            description = "เสื้อยืดผ้าคอตตอน สีแดง",
            price = "399.00",
            stockQuantity = 20,
            categoryId = 1
        )

        val response = client.post("/products") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(productRequest))
        }

        assertEquals(HttpStatusCode.Created, response.status)

        val product = Json.decodeFromString<Product>(response.bodyAsText())
        assertEquals("เสื้อยืดสีแดง", product.name)
        assertEquals("399.00", product.price)
        assertEquals(20, product.stockQuantity)
    }

    @Test
    fun testCreateProductInvalidCategory() = testApplication {
        application {
            module()
        }

        val productRequest = ProductRequest(
            name = "สินค้าทดสอบ",
            description = "คำอธิบาย",
            price = "100.00",
            stockQuantity = 10,
            categoryId = 999
        )

        val response = client.post("/products") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(productRequest))
        }

        assertEquals(HttpStatusCode.BadRequest, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertEquals("Category not found", error.error)
    }

    @Test
    fun testCreateProductInvalidPrice() = testApplication {
        application {
            module()
        }

        val productRequest = ProductRequest(
            name = "สินค้าทดสอบ",
            description = "คำอธิบาย",
            price = "invalid",
            stockQuantity = 10,
            categoryId = 1
        )

        val response = client.post("/products") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(productRequest))
        }

        assertEquals(HttpStatusCode.BadRequest, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertEquals("Invalid price format", error.error)
    }

    @Test
    fun testCreateProductNegativeStock() = testApplication {
        application {
            module()
        }

        val productRequest = ProductRequest(
            name = "สินค้าทดสอบ",
            description = "คำอธิบาย",
            price = "100.00",
            stockQuantity = -5,
            categoryId = 1
        )

        val response = client.post("/products") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(productRequest))
        }

        assertEquals(HttpStatusCode.BadRequest, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertEquals("Stock quantity cannot be negative", error.error)
    }

    @Test
    fun testUpdateProduct() = testApplication {
        application {
            module()
        }

        val productRequest = ProductRequest(
            name = "เสื้อยืดสีขาว (อัพเดท)",
            description = "เสื้อยืดผ้าคอตตอน 100% สีขาว",
            price = "350.00",
            stockQuantity = 60,
            categoryId = 1
        )

        val response = client.put("/products/1") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(productRequest))
        }

        assertEquals(HttpStatusCode.OK, response.status)

        val product = Json.decodeFromString<Product>(response.bodyAsText())
        assertEquals("เสื้อยืดสีขาว (อัพเดท)", product.name)
        assertEquals("350.00", product.price)
    }

    @Test
    fun testDeleteProduct() = testApplication {
        application {
            module()
        }

        // สร้างสินค้าใหม่ก่อน
        val productRequest = ProductRequest(
            name = "สินค้าทดสอบ",
            description = "คำอธิบาย",
            price = "100.00",
            stockQuantity = 10,
            categoryId = 1
        )

        val createResponse = client.post("/products") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(productRequest))
        }
        val product = Json.decodeFromString<Product>(createResponse.bodyAsText())

        // ลบสินค้า
        val deleteResponse = client.delete("/products/${product.id}")
        assertEquals(HttpStatusCode.NoContent, deleteResponse.status)

        // ตรวจสอบว่าลบแล้ว
        val getResponse = client.get("/products/${product.id}")
        assertEquals(HttpStatusCode.NotFound, getResponse.status)
    }

    @Test
    fun testAddStock() = testApplication {
        application {
            module()
        }

        // ดูสต็อกเริ่มต้น
        val getResponse = client.get("/products/1")
        val originalProduct = Json.decodeFromString<Product>(getResponse.bodyAsText())

        // เพิ่มสต็อก
        val stockRequest = StockUpdateRequest(15)
        val response = client.post("/products/1/add-stock") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(stockRequest))
        }

        assertEquals(HttpStatusCode.OK, response.status)

        val product = Json.decodeFromString<Product>(response.bodyAsText())
        assertEquals(originalProduct.stockQuantity + 15, product.stockQuantity)
    }

    @Test
    fun testRemoveStock() = testApplication {
        application {
            module()
        }

        // ดูสต็อกเริ่มต้น
        val getResponse = client.get("/products/1")
        val originalProduct = Json.decodeFromString<Product>(getResponse.bodyAsText())

        // ลดสต็อก
        val stockRequest = StockUpdateRequest(5)
        val response = client.post("/products/1/remove-stock") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(stockRequest))
        }

        assertEquals(HttpStatusCode.OK, response.status)

        val product = Json.decodeFromString<Product>(response.bodyAsText())
        assertEquals(originalProduct.stockQuantity - 5, product.stockQuantity)
    }

    @Test
    fun testRemoveStockInsufficientStock() = testApplication {
        application {
            module()
        }

        // ลดสต็อกเกินจำนวนที่มี
        val stockRequest = StockUpdateRequest(1000)
        val response = client.post("/products/1/remove-stock") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(stockRequest))
        }

        assertEquals(HttpStatusCode.BadRequest, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertTrue(error.error.contains("Insufficient stock"))
    }

    @Test
    fun testAddStockInvalidQuantity() = testApplication {
        application {
            module()
        }

        val stockRequest = StockUpdateRequest(0)
        val response = client.post("/products/1/add-stock") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(stockRequest))
        }

        assertEquals(HttpStatusCode.BadRequest, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertEquals("Quantity must be greater than 0", error.error)
    }

    @Test
    fun testRemoveStockInvalidQuantity() = testApplication {
        application {
            module()
        }

        val stockRequest = StockUpdateRequest(-5)
        val response = client.post("/products/1/remove-stock") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(stockRequest))
        }

        assertEquals(HttpStatusCode.BadRequest, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertEquals("Quantity must be greater than 0", error.error)
    }

    @Test
    fun testStockUpdateProductNotFound() = testApplication {
        application {
            module()
        }

        val stockRequest = StockUpdateRequest(10)
        val response = client.post("/products/999/add-stock") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(stockRequest))
        }

        assertEquals(HttpStatusCode.NotFound, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertEquals("Product not found", error.error)
    }

    @Test
    fun testDeleteCategoryWithProducts() = testApplication {
        application {
            module()
        }

        // พยายามลบหมวดหมู่ที่มีสินค้าอยู่
        val response = client.delete("/categories/1")
        assertEquals(HttpStatusCode.BadRequest, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertEquals("Cannot delete category with existing products", error.error)
    }

    @Test
    fun testInvalidRequestBody() = testApplication {
        application {
            module()
        }

        val response = client.post("/products") {
            contentType(ContentType.Application.Json)
            setBody("invalid json")
        }

        assertEquals(HttpStatusCode.BadRequest, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertEquals("Invalid request body", error.error)
    }

    @Test
    fun testInvalidProductId() = testApplication {
        application {
            module()
        }

        val response = client.get("/products/invalid")
        assertEquals(HttpStatusCode.BadRequest, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertEquals("Invalid product ID", error.error)
    }

    @Test
    fun testInvalidCategoryId() = testApplication {
        application {
            module()
        }

        val response = client.get("/categories/invalid")
        assertEquals(HttpStatusCode.BadRequest, response.status)

        val error = Json.decodeFromString<ErrorResponse>(response.bodyAsText())
        assertEquals("Invalid category ID", error.error)
    }

    @Test
    fun testCompleteWorkflow() = testApplication {
        application {
            module()
        }

        // 1. สร้างหมวดหมู่ใหม่
        val categoryRequest = CategoryRequest("กีฬา")
        val categoryResponse = client.post("/categories") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(categoryRequest))
        }
        val category = Json.decodeFromString<Category>(categoryResponse.bodyAsText())

        // 2. สร้างสินค้าในหมวดหมู่นั้น
        val productRequest = ProductRequest(
            name = "รองเท้าวิ่ง",
            description = "รองเท้าวิ่งคุณภาพสูง",
            price = "2500.00",
            stockQuantity = 10,
            categoryId = category.id
        )
        val productResponse = client.post("/products") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(productRequest))
        }
        val product = Json.decodeFromString<Product>(productResponse.bodyAsText())

        // 3. เพิ่มสต็อก
        val addStockRequest = StockUpdateRequest(20)
        val addStockResponse = client.post("/products/${product.id}/add-stock") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(addStockRequest))
        }
        val updatedProduct = Json.decodeFromString<Product>(addStockResponse.bodyAsText())
        assertEquals(30, updatedProduct.stockQuantity)

        // 4. ลดสต็อก (เมื่อมีการขาย)
        val removeStockRequest = StockUpdateRequest(5)
        val removeStockResponse = client.post("/products/${product.id}/remove-stock") {
            contentType(ContentType.Application.Json)
            setBody(Json.encodeToString(removeStockRequest))
        }
        val finalProduct = Json.decodeFromString<Product>(removeStockResponse.bodyAsText())
        assertEquals(25, finalProduct.stockQuantity)

        // 5. ลบสินค้า
        val deleteProductResponse = client.delete("/products/${product.id}")
        assertEquals(HttpStatusCode.NoContent, deleteProductResponse.status)

        // 6. ลบหมวดหมู่
        val deleteCategoryResponse = client.delete("/categories/${category.id}")
        assertEquals(HttpStatusCode.NoContent, deleteCategoryResponse.status)
    }
}