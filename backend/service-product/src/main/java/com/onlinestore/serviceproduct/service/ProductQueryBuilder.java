package com.onlinestore.serviceproduct.service;

import com.onlinestore.serviceproduct.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductQueryBuilder {

    private final MongoTemplate mongoTemplate;

    public ProductQueryBuilder(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Page<Product> getFilteredProducts(String categoryId, Double minPrice, Double maxPrice,
                                             String search, Pageable pageable) {
        Query query = new Query();

        if (categoryId != null) {
            query.addCriteria(Criteria.where("categoryId").is(categoryId));
        }
        if (minPrice != null && maxPrice != null) {
            query.addCriteria(Criteria.where("price").gte(minPrice).lte(maxPrice));
        }
        if (minPrice != null && maxPrice == null) {
            query.addCriteria(Criteria.where("price").gte(minPrice));
        }
        if (minPrice == null && maxPrice != null) {
            query.addCriteria(Criteria.where("price").lte(maxPrice));
        }
        if (search != null && !search.isEmpty()) {
            query.addCriteria(Criteria.where("name").regex(search, "i"));
        }

        long total = mongoTemplate.count(query, Product.class);

        query.with(pageable);
        List<Product> products = mongoTemplate.find(query, Product.class);

        return new PageImpl<>(products, pageable, total);
    }
}