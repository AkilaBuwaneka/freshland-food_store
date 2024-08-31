package com.onlinestore.servicecarts.controller;

import com.onlinestore.servicecarts.dto.CartDTO;
import com.onlinestore.servicecarts.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/carts")
@CrossOrigin("http://localhost:4000")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<CartDTO>> getCartsByUserId(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<CartDTO> carts = cartService.getCartsByUserId(userId, pageRequest);
        return ResponseEntity.ok(carts);
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<CartDTO> getCartById(@PathVariable String cartId) {
        CartDTO cart = cartService.getCartById(cartId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping
    public ResponseEntity<CartDTO> createCart(@RequestBody CartDTO cartDto) {
        CartDTO newCart = cartService.createCart(cartDto);
        return ResponseEntity.ok(newCart);
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> deleteCart(@PathVariable String cartId) {
        cartService.deleteCart(cartId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{cartId}")
    public ResponseEntity<CartDTO> updateCart(@PathVariable String cartId, @RequestBody CartDTO cartDto) {
        CartDTO updatedCart = cartService.updateCart(cartId, cartDto);
        return ResponseEntity.ok(updatedCart);
    }
}