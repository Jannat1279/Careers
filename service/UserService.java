package com.project.careercounselling.service;

import com.project.careercounselling.model.User;
import com.project.careercounselling.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User register(User user) {

        // Basic null/blank validation
        if (user.getName() == null || user.getName().isBlank() ||
                user.getEmail() == null || user.getEmail().isBlank() ||
                user.getPassword() == null || user.getPassword().isBlank()) {

            throw new RuntimeException("Name, email and password are required!");
        }

        // Trim email to avoid accidental spaces
        String email = user.getEmail().trim();
        user.setEmail(email);

        // Email uniqueness check
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }

        // Encode password and save
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean login(String email, String password) {
        // Basic validation
        if (email == null || email.isBlank() ||
                password == null || password.isBlank()) {
            return false;
        }

        email = email.trim();

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isEmpty()) {
            return false; // Email not found in DB
        }

        // Compare raw password with encoded password in DB
        return encoder.matches(password, existingUser.get().getPassword());
    }
}
