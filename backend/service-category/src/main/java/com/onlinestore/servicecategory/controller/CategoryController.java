package com.onlinestore.servicecategory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlinestore.servicecategory.dto.CategoryDTO;
import com.onlinestore.servicecategory.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/categories")
@CrossOrigin("http://localhost:4000")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/addCategory")
    public ResponseEntity<CategoryDTO> addCategory(
            @RequestParam("file") MultipartFile file,
            @RequestParam("category") String categoryDTOString) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            CategoryDTO categoryDTO = objectMapper.readValue(categoryDTOString, CategoryDTO.class);
            String imageUrl = categoryService.uploadCategoryImage(file, categoryDTO.getCategoryId());

            categoryDTO.setCategoryImageUrl(imageUrl);

            categoryService.saveCategory(categoryDTO);

            return new ResponseEntity<>(categoryDTO, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/getCategoryById")
    public ResponseEntity<CategoryDTO> getCategoryById(@RequestParam String categoryId) {
        CategoryDTO category = categoryService.getCategoryById(categoryId);
        if (category != null) {
            return new ResponseEntity<>(category, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
