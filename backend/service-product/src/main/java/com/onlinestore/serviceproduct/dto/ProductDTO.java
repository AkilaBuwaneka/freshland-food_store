package com.onlinestore.serviceproduct.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class ProductDTO {
    private String productId;
    private String name;
    private String description;
    private Double quantity;
    private Double price;
    private String categoryId;
    private String imageUrl;
}
