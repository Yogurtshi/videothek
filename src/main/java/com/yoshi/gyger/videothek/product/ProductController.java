package com.yoshi.gyger.videothek.product;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    private final ProductService productService;

    ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Tag(name = "Product", description = "Get products")
    @Operation(summary = "Get all products", description = "Returns a list of all products")
    @GetMapping("api/testproducts")
    public ResponseEntity<List<Product>> all() {
        List<Product> result = productService.getProducts();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Product found",
            content = { @Content (mediaType = "application/json",
                schema = @Schema (implementation = Product.class))
            }),
        @ApiResponse(responseCode = "404", description = "Product not found", 
            content= @Content)
    })
    @Tag(name = "Product")
    @Operation(summary = "Get a product by ID", description = "Returns a product by its ID")
    @GetMapping("api/product/{id}")
    public ResponseEntity<Product> one(@Parameter(
            description = "ID of the product to be retrieved",
            required = true,
            example = "1"
        ) 
        @PathVariable Long id) {
        Product product = productService.getProduct(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

}
