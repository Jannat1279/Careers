package com.project.careercounselling.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendContactMessage(String username, String email, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();

        // must be a verified sender in Brevo
        mail.setFrom("careers4guidance@gmail.com");

        // where you want to receive all contact messages
        mail.setTo("careers4guidance@gmail.com");

        // when you hit "Reply" in Gmail, it goes to the user
        mail.setReplyTo(email);

        mail.setSubject("New Contact Form Message");
        mail.setText(
                "Username: " + username +
                        "\nEmail: " + email +
                        "\n\nMessage:\n" + message
        );

        mailSender.send(mail);
    }
}
