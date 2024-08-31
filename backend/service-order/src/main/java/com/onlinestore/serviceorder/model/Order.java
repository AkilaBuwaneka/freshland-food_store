package com.onlinestore.serviceorder.model;

import com.onlinestore.serviceorder.dto.ProductDTO;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Data
public class Order {

    @Id
    private String orderId;
    private String userId;
    private LocalDateTime purchaseTime;
    private double totalAmount;
    private List<Product> products;
}
