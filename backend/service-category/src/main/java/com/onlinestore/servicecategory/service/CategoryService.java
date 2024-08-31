package com.onlinestore.servicecategory.service;

import com.onlinestore.servicecategory.dto.CategoryDTO;
import com.onlinestore.servicecategory.model.Category;
import com.onlinestore.servicecategory.repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private ImageService imageService;

    @Autowired
    private CategoryRepo categoryRepo;

    public String uploadCategoryImage(MultipartFile file, String categoryId) throws IOException {
        return imageService.uploadImage(file, categoryId);
    }

    public void saveCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setCategoryId(categoryDTO.getCategoryId());
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category.setNoOfItems(categoryDTO.getNoOfItems());
        category.setCategoryImageUrl(categoryDTO.getCategoryImageUrl());
        categoryRepo.save(category);
    }

    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepo.findAll();
        return mapEntitiesToDTOs(categories);
    }

    public CategoryDTO getCategoryById(String categoryId) {
        Optional<Category> categoryOptional = categoryRepo.findById(categoryId);
        return categoryOptional.map(this::mapEntityToDTO).orElse(null);
    }

    private List<CategoryDTO> mapEntitiesToDTOs(List<Category> categories) {
        return categories.stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    private CategoryDTO mapEntityToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setCategoryId(category.getCategoryId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        dto.setNoOfItems(category.getNoOfItems());
        dto.setCategoryImageUrl(category.getCategoryImageUrl());
        return dto;
    }
}
