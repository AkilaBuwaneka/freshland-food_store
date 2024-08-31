package com.onlinestore.servicecategory.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "category")
@Data
public class Category {
    @Id
    private String categoryId;
    private String name;
    private String description;
    private Integer noOfItems;
    private String categoryImageUrl; // New field
}