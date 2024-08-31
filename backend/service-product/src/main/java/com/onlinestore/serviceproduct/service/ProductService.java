package com.onlinestore.serviceproduct.service;

import com.onlinestore.serviceproduct.dto.ProductDTO;
import com.onlinestore.serviceproduct.model.Product;
import com.onlinestore.serviceproduct.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private ProductQueryBuilder productQueryBuilder;

    public ProductDTO saveProductWithImage(MultipartFile file, ProductDTO productDTO) throws IOException {
        String imageUrl = uploadImage(file, productDTO.getProductId());
        productDTO.setImageUrl(imageUrl);
        return saveProduct(productDTO);
    }

    public String uploadImage(MultipartFile file, String productId) throws IOException {
        return imageService.uploadImage(file, productId);
    }

    public ProductDTO saveProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    public Page<ProductDTO> getFilteredProducts(String categoryId, Double minPrice, Double maxPrice,
                                                String search, Pageable pageable) {
        Page<Product> productPage = productQueryBuilder.getFilteredProducts(categoryId, minPrice, maxPrice, search, pageable);
        return productPage.map(this::convertToDTO);
    }

    public Optional<ProductDTO> getProductById(String productId) {
        return productRepository.findById(productId).map(this::convertToDTO);
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setProductId(product.getProductId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setQuantity(product.getQuantity());
        dto.setPrice(product.getPrice());
        dto.setCategoryId(product.getCategoryId());
        dto.setImageUrl(product.getImageUrl());
        return dto;
    }

    private Product convertToEntity(ProductDTO productDTO) {
        Product product = new Product();
        product.setProductId(productDTO.getProductId());
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setQuantity(productDTO.getQuantity());
        product.setPrice(productDTO.getPrice());
        product.setCategoryId(productDTO.getCategoryId());
        product.setImageUrl(productDTO.getImageUrl());
        return product;
    }
}
