package com.onlinestore.serviceorder.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
public class HashRequestDTO {
    private double amount;
    private String currency;
}
