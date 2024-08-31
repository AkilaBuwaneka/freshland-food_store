package com.onlinestore.serviceorder.service;

import com.onlinestore.serviceorder.dto.HashRequestDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class HashService {

    @Value("${payhere.merchantId}")
    private String merchantId;

    @Value("${payhere.merchantSecret}")
    private String merchantSecret;

    public String generateHash(HashRequestDTO request, String orderId) throws NoSuchAlgorithmException {
        String amount = String.format("%.2f", request.getAmount());
        String currency = request.getCurrency();

        String hashString = merchantId + orderId + amount + currency + md5(merchantSecret).toUpperCase();
        return md5(hashString).toUpperCase();
    }

    private String md5(String input) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] messageDigest = md.digest(input.getBytes());
        StringBuilder sb = new StringBuilder();
        for (byte b : messageDigest) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}