package com.onlinestore.servicecarts.repo;

import com.onlinestore.servicecarts.model.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends MongoRepository<Cart, String> {
    Page<Cart> findByUserId(String userId, Pageable pageable);
}
