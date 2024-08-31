package com.onlinestore.serviceorder.dto;

import lombok.Data;

@Data
public class OrderRequestDTO {
    private String orderId;
    private String cartId;
    private double totalAmount;
}
