package com.onlinestore.serviceorder.service;

import com.onlinestore.serviceorder.dto.CartDTO;
import com.onlinestore.serviceorder.dto.OrderDTO;
import com.onlinestore.serviceorder.dto.OrderRequestDTO;
import com.onlinestore.serviceorder.model.Order;
import com.onlinestore.serviceorder.repo.OrderRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final WebClient.Builder webClientBuilder;

    @Autowired
    private ModelMapper modelMapper;

    public OrderService(OrderRepository orderRepository, WebClient.Builder webClientBuilder) {
        this.orderRepository = orderRepository;
        this.webClientBuilder = webClientBuilder;
    }

    public String generateOrderId() {
        return UUID.randomUUID().toString();
    }

    public OrderDTO saveOrder(OrderRequestDTO orderRequestDto) {
        // Retrieve cart details from cart-service using cartId
        String cartServiceUrl = "http://localhost:3002/api/v1/carts/" + orderRequestDto.getCartId();
        CartDTO cartDto = webClientBuilder.build()
                .get()
                .uri(cartServiceUrl)
                .retrieve()
                .bodyToMono(CartDTO.class)
                .block();

        if (cartDto == null) {
            throw new RuntimeException("Cart not found for cartId: " + orderRequestDto.getCartId());
        }

        // Create Order entity
        OrderDTO orderDto = new OrderDTO();
        orderDto.setOrderId(orderRequestDto.getOrderId());
        orderDto.setUserId(cartDto.getUserId());  // Retrieve userId from cart
        orderDto.setProducts(cartDto.getProducts()); // Retrieve products from cart
        orderDto.setTotalAmount(orderRequestDto.getTotalAmount());  // Set total amount from request
        orderDto.setPurchaseTime(LocalDateTime.now());

        // Save Order to the database
        Order order = modelMapper.map(orderDto, Order.class);
        orderRepository.save(order);

        // Delete cart after saving order
        webClientBuilder.build()
                .delete()
                .uri(cartServiceUrl)
                .retrieve()
                .bodyToMono(Void.class)
                .block();

        return orderDto;
    }

    private OrderDTO convertToDto(Order order) {
        return modelMapper.map(order, OrderDTO.class);
    }

    // Get a list of orders by userId using ModelMapper
    public List<OrderDTO> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get a single order by orderId using ModelMapper
    public OrderDTO getOrderById(String orderId) {
        Order order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        return convertToDto(order);
    }

}
