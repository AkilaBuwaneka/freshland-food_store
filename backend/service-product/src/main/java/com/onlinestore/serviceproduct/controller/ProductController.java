package com.onlinestore.serviceproduct.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlinestore.serviceproduct.dto.ProductDTO;
import com.onlinestore.serviceproduct.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/products")
@CrossOrigin("http://localhost:4000")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/addProduct")
    public ResponseEntity<ProductDTO> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("product") String productDTOString) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ProductDTO productDTO = objectMapper.readValue(productDTOString, ProductDTO.class);
            ProductDTO savedProduct = productService.saveProductWithImage(file, productDTO);
            return ResponseEntity.ok(savedProduct);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getProducts(
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size, createSort(sortBy));
            Page<ProductDTO> products = productService.getFilteredProducts(categoryId, minPrice, maxPrice, search, pageable);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getProductById")
    public ResponseEntity<ProductDTO> getProductById(@RequestParam String productId) {
        return productService.getProductById(productId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private Sort createSort(String sortBy) {
    if (sortBy == null || sortBy.isEmpty()) {
        return Sort.unsorted();
    }
    switch (sortBy) {
        case "priceAsc":
            return Sort.by(Sort.Direction.ASC, "price");
        case "priceDesc":
            return Sort.by(Sort.Direction.DESC, "price");
        default:
            return Sort.unsorted();
    }
}
}