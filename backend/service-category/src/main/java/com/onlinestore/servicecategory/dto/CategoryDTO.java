package com.onlinestore.servicecategory.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class CategoryDTO {
    private String categoryId;
    private String name;
    private String description;
    private Integer noOfItems;
    private String categoryImageUrl;
}

