package com.onlinestore.serviceuser.service;

import com.onlinestore.serviceuser.dto.UserDTO;
import com.onlinestore.serviceuser.model.User;
import com.onlinestore.serviceuser.repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    public UserDTO addUser(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        user.setProfileImage("https://newsbimages.s3.eu-north-1.amazonaws.com/1720439488037_apple.jpg");
        User savedUser = userRepo.save(user);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    public UserDTO getUserByEmail(String email) {
        User user = userRepo.findByEmail(email);
        return modelMapper.map(user, UserDTO.class);
    }
}
