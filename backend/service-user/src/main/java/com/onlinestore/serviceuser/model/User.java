package com.onlinestore.serviceuser.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String userId;
    private String email;
    private String role;
    private String profileImage;
}
