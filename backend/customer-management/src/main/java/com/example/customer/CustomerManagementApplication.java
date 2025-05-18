package com.example.customer;

import com.example.customer.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CustomerManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(CustomerManagementApplication.class, args);
    }

    @Bean
    CommandLineRunner init(UserService userService) {
        return args -> userService.createDefaultUser();
    }
}
