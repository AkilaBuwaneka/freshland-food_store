package com.onlinestore.serviceorder.controller;

import com.onlinestore.serviceorder.dto.HashRequestDTO;
import com.onlinestore.serviceorder.dto.OrderDTO;
import com.onlinestore.serviceorder.dto.OrderRequestDTO;
import com.onlinestore.serviceorder.service.HashService;
import com.onlinestore.serviceorder.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin("http://localhost:4000")
public class OrderController {

    private final OrderService orderService;
    private final HashService hashService;

    public OrderController(OrderService orderService, HashService hashService) {
        this.orderService = orderService;
        this.hashService = hashService;
    }

    @PostMapping("/generate-hash")
    public ResponseEntity<Map> generateHash(@RequestBody HashRequestDTO request) throws NoSuchAlgorithmException {
        String orderId = orderService.generateOrderId();
        String hash = hashService.generateHash(request, orderId);
        Map<String, String> response = new HashMap<>();
        response.put("hash", hash);
        response.put("orderId", orderId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/save")
    public ResponseEntity<OrderDTO> saveOrder(@RequestBody OrderRequestDTO request) {
        OrderDTO savedOrder = orderService.saveOrder(request);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUserId(@PathVariable String userId) {
        List<OrderDTO> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable String orderId) {
        OrderDTO order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }
}
