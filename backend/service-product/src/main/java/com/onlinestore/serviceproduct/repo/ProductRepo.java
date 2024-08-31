package com.onlinestore.serviceproduct.repo;

import com.onlinestore.serviceproduct.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends MongoRepository<Product, String> {
}
