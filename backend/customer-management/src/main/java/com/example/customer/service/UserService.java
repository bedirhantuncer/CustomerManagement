package com.example.customer.service;

import com.example.customer.model.User;
import com.example.customer.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public void createDefaultUser() {
        userRepository.findByUsername("admin").orElseGet(() -> {
            User user = new User();
            user.setUsername("admin");
            user.setPassword(encoder.encode("admin123"));
            return userRepository.save(user);
        });
    }

    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        if (!encoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Eski şifre yanlış");
        }

        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);
    }
}
