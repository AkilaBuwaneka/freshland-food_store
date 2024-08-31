package com.onlinestore.serviceorder.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class ProductDTO {
    private String productId;
    private int quantity;
    private double unitPrice;
}