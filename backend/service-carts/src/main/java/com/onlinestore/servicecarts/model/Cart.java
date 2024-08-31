package com.onlinestore.servicecarts.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "carts")
@Data
public class Cart {
    @Id
    private String cartId;
    private String userId;
    private String name;
    private String description;
    private List<Product> products;
}