package com.onlinestore.serviceorder.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class OrderDTO {
    private String orderId;
    private String userId;
    private LocalDateTime purchaseTime;
    private double totalAmount;
    private List<ProductDTO> products;
}
