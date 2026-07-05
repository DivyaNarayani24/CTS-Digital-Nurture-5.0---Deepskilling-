package com.example.learnSpring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class LearnSpringApplication {

	private static final Logger logger = LoggerFactory.getLogger(LearnSpringApplication.class);

	public static void main(String[] args) {
		logger.info("Starting LearnSpringApplication...");
		SpringApplication.run(LearnSpringApplication.class, args);
		logger.info("LearnSpringApplication started successfully.");

		displayCountry();
	}

	public static void displayCountry() {
		ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
		Country country = context.getBean("country", Country.class);
		logger.debug("Country : {}", country.toString());
	}
}