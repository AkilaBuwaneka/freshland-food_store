package com.onlinestore.servicecarts.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class CartDTO {
    private String cartId;
    private String userId;
    private String name;
    private String description;
    private List<ProductDTO> products;
}