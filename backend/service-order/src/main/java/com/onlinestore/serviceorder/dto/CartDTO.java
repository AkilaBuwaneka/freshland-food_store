package com.onlinestore.serviceorder.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CartDTO {
    private String cartId;
    private String userId;
    private String name;
    private String description;
    private List<ProductDTO> products;
}
