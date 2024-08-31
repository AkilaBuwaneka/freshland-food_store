package com.onlinestore.servicecarts.service;

import com.onlinestore.servicecarts.dto.CartDTO;
import com.onlinestore.servicecarts.model.Cart;
import com.onlinestore.servicecarts.repo.CartRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    @Autowired
    private CartRepo cartRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Page<CartDTO> getCartsByUserId(String userId, PageRequest pageRequest) {
        Page<Cart> carts = cartRepository.findByUserId(userId, pageRequest);
        return carts.map(cart -> modelMapper.map(cart, CartDTO.class));
    }

    public CartDTO getCartById(String cartId) {
        Cart cart = cartRepository.findById(cartId).orElse(null);
        return modelMapper.map(cart, CartDTO.class);
    }

    public CartDTO createCart(CartDTO cartDto) {
        Cart cart = modelMapper.map(cartDto, Cart.class);
        cart = cartRepository.save(cart);
        return modelMapper.map(cart, CartDTO.class);
    }

    public void deleteCart(String cartId) {
        cartRepository.deleteById(cartId);
    }

    public CartDTO updateCart(String cartId, CartDTO cartDto) {
        Cart cart = modelMapper.map(cartDto, Cart.class);
        cart.setCartId(cartId);
        cart = cartRepository.save(cart);
        return modelMapper.map(cart, CartDTO.class);
    }
}