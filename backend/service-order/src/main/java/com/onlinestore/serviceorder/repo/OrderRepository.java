package com.onlinestore.serviceorder.repo;

import com.onlinestore.serviceorder.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserId(String userId);
    Optional<Order> findByOrderId(String orderId);
}
