package com.example

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import java.math.BigDecimal

// Data Classes
@Serializable
data class Category(
    val id: Int,
    val name: String
)

@Serializable
data class CategoryRequest(
    val name: String
)

@Serializable
data class Product(
    val id: Int,
    val name: String,
    val description: String,
    val price: String, // Using String for BigDecimal serialization
    val stockQuantity: Int,
    val categoryId: Int
)

@Serializable
data class ProductRequest(
    val name: String,
    val description: String,
    val price: String, // Using String for BigDecimal serialization
    val stockQuantity: Int,
    val categoryId: Int
)

@Serializable
data class StockUpdateRequest(
    val quantity: Int
)

@Serializable
data class ErrorResponse(val error: String)

// Category Repository
object CategoryRepository {
    private val categories = mutableListOf<Category>(
        Category(id = 1, name = "เสื้อผ้า"),
        Category(id = 2, name = "อุปกรณ์อิเล็กทรอนิกส์"),
        Category(id = 3, name = "เครื่องใช้ในบ้าน")
    )

    private var nextId = 4

    fun getAll(): List<Category> = categories.toList()

    fun getById(id: Int): Category? = categories.find { it.id == id }

    fun add(categoryRequest: CategoryRequest): Category {
        val newCategory = Category(
            id = nextId++,
            name = categoryRequest.name
        )
        categories.add(newCategory)
        return newCategory
    }

    fun update(id: Int, categoryRequest: CategoryRequest): Category? {
        val index = categories.indexOfFirst { it.id == id }
        return if (index != -1) {
            val updatedCategory = Category(
                id = id,
                name = categoryRequest.name
            )
            categories[index] = updatedCategory
            updatedCategory
        } else {
            null
        }
    }

    fun delete(id: Int): Boolean {
        // ตรวจสอบว่ามีสินค้าที่ใช้หมวดหมู่นี้อยู่หรือไม่
        val hasProducts = ProductRepository.getAll().any { it.categoryId == id }
        if (hasProducts) {
            return false
        }
        return categories.removeIf { it.id == id }
    }

    fun exists(id: Int): Boolean = categories.any { it.id == id }
}

// Product Repository
object ProductRepository {
    private val products = mutableListOf<Product>(
        Product(id = 1, name = "เสื้อยืดสีขาว", description = "เสื้อยืดผ้าคอตตอน 100%", price = "299.00", stockQuantity = 50, categoryId = 1),
        Product(id = 2, name = "สมาร์ทโฟน", description = "สมาร์ทโฟนรุ่นล่าสุด", price = "15999.00", stockQuantity = 10, categoryId = 2),
        Product(id = 3, name = "หม้อหุงข้าว", description = "หม้อหุงข้าวไฟฟ้า 1.5 ลิตร", price = "2500.00", stockQuantity = 25, categoryId = 3)
    )

    private var nextId = 4

    fun getAll(): List<Product> = products.toList()

    fun getById(id: Int): Product? = products.find { it.id == id }

    fun add(productRequest: ProductRequest): Result<Product> {
        // ตรวจสอบว่าหมวดหมู่มีอยู่จริง
        if (!CategoryRepository.exists(productRequest.categoryId)) {
            return Result.failure(Exception("Category not found"))
        }

        // ตรวจสอบราคา
        val price = try {
            val decimal = BigDecimal(productRequest.price)
            if (decimal < BigDecimal.ZERO) {
                return Result.failure(Exception("Price must be greater than or equal to 0"))
            }
            productRequest.price
        } catch (e: NumberFormatException) {
            return Result.failure(Exception("Invalid price format"))
        }

        // ตรวจสอบจำนวนสต็อก
        if (productRequest.stockQuantity < 0) {
            return Result.failure(Exception("Stock quantity cannot be negative"))
        }

        val newProduct = Product(
            id = nextId++,
            name = productRequest.name,
            description = productRequest.description,
            price = price,
            stockQuantity = productRequest.stockQuantity,
            categoryId = productRequest.categoryId
        )
        products.add(newProduct)
        return Result.success(newProduct)
    }

    fun update(id: Int, productRequest: ProductRequest): Result<Product?> {
        val index = products.indexOfFirst { it.id == id }
        if (index == -1) {
            return Result.success(null)
        }

        // ตรวจสอบว่าหมวดหมู่มีอยู่จริง
        if (!CategoryRepository.exists(productRequest.categoryId)) {
            return Result.failure(Exception("Category not found"))
        }

        // ตรวจสอบราคา
        val price = try {
            val decimal = BigDecimal(productRequest.price)
            if (decimal < BigDecimal.ZERO) {
                return Result.failure(Exception("Price must be greater than or equal to 0"))
            }
            productRequest.price
        } catch (e: NumberFormatException) {
            return Result.failure(Exception("Invalid price format"))
        }

        // ตรวจสอบจำนวนสต็อก
        if (productRequest.stockQuantity < 0) {
            return Result.failure(Exception("Stock quantity cannot be negative"))
        }

        val updatedProduct = Product(
            id = id,
            name = productRequest.name,
            description = productRequest.description,
            price = price,
            stockQuantity = productRequest.stockQuantity,
            categoryId = productRequest.categoryId
        )
        products[index] = updatedProduct
        return Result.success(updatedProduct)
    }

    fun delete(id: Int): Boolean {
        return products.removeIf { it.id == id }
    }

    fun updateStock(id: Int, quantity: Int): Result<Product?> {
        val index = products.indexOfFirst { it.id == id }
        if (index == -1) {
            return Result.success(null)
        }

        val product = products[index]
        val newStock = product.stockQuantity + quantity

        // ป้องกันไม่ให้สต็อกติดลบ
        if (newStock < 0) {
            return Result.failure(Exception("Insufficient stock. Current stock: ${product.stockQuantity}"))
        }

        val updatedProduct = product.copy(stockQuantity = newStock)
        products[index] = updatedProduct
        return Result.success(updatedProduct)
    }
}

// Routing Configuration
fun Application.configureRouting() {
    routing {
        // Categories Routes
        route("/categories") {
            // GET /categories: ดึงหมวดหมู่ทั้งหมด
            get {
                val categories = CategoryRepository.getAll()
                call.respond(HttpStatusCode.OK, categories)
            }

            // GET /categories/{id}: ดึงหมวดหมู่ตาม ID
            get("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                if (id == null) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid category ID"))
                    return@get
                }

                val category = CategoryRepository.getById(id)
                if (category != null) {
                    call.respond(HttpStatusCode.OK, category)
                } else {
                    call.respond(HttpStatusCode.NotFound, ErrorResponse("Category not found"))
                }
            }

            // POST /categories: สร้างหมวดหมู่ใหม่
            post {
                try {
                    val categoryRequest = call.receive<CategoryRequest>()

                    // Validation
                    if (categoryRequest.name.isBlank()) {
                        call.respond(HttpStatusCode.BadRequest, ErrorResponse("Category name cannot be empty"))
                        return@post
                    }

                    val newCategory = CategoryRepository.add(categoryRequest)
                    call.respond(HttpStatusCode.Created, newCategory)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid request body"))
                }
            }

            // PUT /categories/{id}: อัพเดทหมวดหมู่
            put("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                if (id == null) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid category ID"))
                    return@put
                }

                try {
                    val categoryRequest = call.receive<CategoryRequest>()

                    // Validation
                    if (categoryRequest.name.isBlank()) {
                        call.respond(HttpStatusCode.BadRequest, ErrorResponse("Category name cannot be empty"))
                        return@put
                    }

                    val updatedCategory = CategoryRepository.update(id, categoryRequest)
                    if (updatedCategory != null) {
                        call.respond(HttpStatusCode.OK, updatedCategory)
                    } else {
                        call.respond(HttpStatusCode.NotFound, ErrorResponse("Category not found"))
                    }
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid request body"))
                }
            }

            // DELETE /categories/{id}: ลบหมวดหมู่
            delete("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                if (id == null) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid category ID"))
                    return@delete
                }

                val deleted = CategoryRepository.delete(id)
                if (deleted) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Cannot delete category with existing products"))
                }
            }
        }

        // Products Routes
        route("/products") {
            // GET /products: ดึงสินค้าทั้งหมด
            get {
                val products = ProductRepository.getAll()
                call.respond(HttpStatusCode.OK, products)
            }

            // GET /products/{id}: ดึงสินค้าตาม ID
            get("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                if (id == null) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid product ID"))
                    return@get
                }

                val product = ProductRepository.getById(id)
                if (product != null) {
                    call.respond(HttpStatusCode.OK, product)
                } else {
                    call.respond(HttpStatusCode.NotFound, ErrorResponse("Product not found"))
                }
            }

            // POST /products: สร้างสินค้าใหม่
            post {
                try {
                    val productRequest = call.receive<ProductRequest>()

                    // Validation
                    if (productRequest.name.isBlank()) {
                        call.respond(HttpStatusCode.BadRequest, ErrorResponse("Product name cannot be empty"))
                        return@post
                    }

                    val result = ProductRepository.add(productRequest)
                    result.fold(
                        onSuccess = { product ->
                            call.respond(HttpStatusCode.Created, product)
                        },
                        onFailure = { exception ->
                            when (exception.message) {
                                "Category not found" -> call.respond(HttpStatusCode.BadRequest, ErrorResponse(exception.message!!))
                                else -> call.respond(HttpStatusCode.BadRequest, ErrorResponse(exception.message ?: "Invalid request"))
                            }
                        }
                    )
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid request body"))
                }
            }

            // PUT /products/{id}: อัพเดทสินค้า
            put("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                if (id == null) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid product ID"))
                    return@put
                }

                try {
                    val productRequest = call.receive<ProductRequest>()

                    // Validation
                    if (productRequest.name.isBlank()) {
                        call.respond(HttpStatusCode.BadRequest, ErrorResponse("Product name cannot be empty"))
                        return@put
                    }

                    val result = ProductRepository.update(id, productRequest)
                    result.fold(
                        onSuccess = { product ->
                            if (product != null) {
                                call.respond(HttpStatusCode.OK, product)
                            } else {
                                call.respond(HttpStatusCode.NotFound, ErrorResponse("Product not found"))
                            }
                        },
                        onFailure = { exception ->
                            when (exception.message) {
                                "Category not found" -> call.respond(HttpStatusCode.BadRequest, ErrorResponse(exception.message!!))
                                else -> call.respond(HttpStatusCode.BadRequest, ErrorResponse(exception.message ?: "Invalid request"))
                            }
                        }
                    )
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid request body"))
                }
            }

            // DELETE /products/{id}: ลบสินค้า
            delete("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                if (id == null) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid product ID"))
                    return@delete
                }

                val deleted = ProductRepository.delete(id)
                if (deleted) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    call.respond(HttpStatusCode.NotFound, ErrorResponse("Product not found"))
                }
            }

            // POST /products/{id}/add-stock: เพิ่มสต็อกสินค้า
            post("/{id}/add-stock") {
                val id = call.parameters["id"]?.toIntOrNull()
                if (id == null) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid product ID"))
                    return@post
                }

                try {
                    val stockRequest = call.receive<StockUpdateRequest>()

                    if (stockRequest.quantity <= 0) {
                        call.respond(HttpStatusCode.BadRequest, ErrorResponse("Quantity must be greater than 0"))
                        return@post
                    }

                    val result = ProductRepository.updateStock(id, stockRequest.quantity)
                    result.fold(
                        onSuccess = { product ->
                            if (product != null) {
                                call.respond(HttpStatusCode.OK, product)
                            } else {
                                call.respond(HttpStatusCode.NotFound, ErrorResponse("Product not found"))
                            }
                        },
                        onFailure = { exception ->
                            call.respond(HttpStatusCode.BadRequest, ErrorResponse(exception.message ?: "Invalid request"))
                        }
                    )
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid request body"))
                }
            }

            // POST /products/{id}/remove-stock: ลดสต็อกสินค้า
            post("/{id}/remove-stock") {
                val id = call.parameters["id"]?.toIntOrNull()
                if (id == null) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid product ID"))
                    return@post
                }

                try {
                    val stockRequest = call.receive<StockUpdateRequest>()

                    if (stockRequest.quantity <= 0) {
                        call.respond(HttpStatusCode.BadRequest, ErrorResponse("Quantity must be greater than 0"))
                        return@post
                    }

                    val result = ProductRepository.updateStock(id, -stockRequest.quantity)
                    result.fold(
                        onSuccess = { product ->
                            if (product != null) {
                                call.respond(HttpStatusCode.OK, product)
                            } else {
                                call.respond(HttpStatusCode.NotFound, ErrorResponse("Product not found"))
                            }
                        },
                        onFailure = { exception ->
                            call.respond(HttpStatusCode.BadRequest, ErrorResponse(exception.message ?: "Invalid request"))
                        }
                    )
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Invalid request body"))
                }
            }
        }
    }
}