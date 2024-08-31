package com.onlinestore.servicecarts.model;

import lombok.Data;

@Data
public class Product {
    private String productId;
    private int quantity;
    private double unitPrice;
}