package com.onlinestore.serviceproduct.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
public class ImageService {

    @Value("${aws.s3.region}")
    private String region;

    @Autowired
    private S3Client s3Client;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public String uploadImage(MultipartFile file, String productId) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        s3Client.putObject(PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build(),
                RequestBody.fromBytes(file.getBytes()));

        String imageUrl = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName;

        return imageUrl;
    }
}
