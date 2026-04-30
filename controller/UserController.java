package com.project.careercounselling.controller;

import com.project.careercounselling.model.User;
import com.project.careercounselling.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // React frontend URL
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            userService.register(user);
            return ResponseEntity.ok("User registered successfully!");
        } catch (RuntimeException e) {
            e.printStackTrace(); // For debugging
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // For debugging
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {

        // Basic validation
        if (user.getEmail() == null || user.getEmail().isBlank() ||
                user.getPassword() == null || user.getPassword().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body("Email and password are required!");
        }

        boolean success = userService.login(user.getEmail(), user.getPassword());

        if (success) {
            return ResponseEntity.ok("Login successful!");
        } else {
            // 401 Unauthorized for invalid credentials
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials!");
        }
    }
}
