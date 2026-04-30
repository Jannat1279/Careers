//package com.project.careercounselling.controller;
//
//
//import com.project.careercounselling.model.ContactMessage;
//import com.project.careercounselling.repository.ContactMessageRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.http.ResponseEntity;
//
//@CrossOrigin(origins = "http://localhost:5173") // adjust if your React runs on a different port
//@RestController
//@RequestMapping("/api/contact")
//public class ContactMessageController {
//
//    @Autowired
//    private ContactMessageRepository contactMessageRepository;
//
//    @PostMapping
//    public ResponseEntity<String> saveMessage(@RequestBody ContactMessage message) {
//        contactMessageRepository.save(message);
//        return ResponseEntity.ok("Message received successfully!");
//    }
//}

package com.project.careercounselling.controller;

import com.project.careercounselling.model.ContactMessage;
import com.project.careercounselling.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/contact")
public class ContactMessageController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestBody ContactMessage message) {

        emailService.sendContactMessage(
                message.getUsername(),   // ✅ use getUsername()
                message.getEmail(),
                message.getMessage()
        );

        return ResponseEntity.ok("Message sent successfully!");
    }
}

