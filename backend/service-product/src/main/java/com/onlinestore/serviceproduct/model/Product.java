package com.onlinestore.serviceproduct.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection =  "product")
@Data
public class Product {
    @Id
    private String productId;
    private String name;
    private String description;
    private Double quantity;
    private Double price;
    private String categoryId;
    private String imageUrl;
}
