package com.onlinestore.servicecategory.repo;

import com.onlinestore.servicecategory.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends MongoRepository<Category, String> {
}
