package com.example.learnSpring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Country {

    private static final Logger logger = LoggerFactory.getLogger(Country.class);

    private String code;
    private String name;

    public Country() {
        logger.debug("Inside Country Constructor.");
    }

    public String getCode() {
        logger.debug("Inside getCode() method.");
        return code;
    }

    public void setCode(String code) {
        logger.debug("Inside setCode() method. Value: {}", code);
        this.code = code;
    }

    public String getName() {
        logger.debug("Inside getName() method.");
        return name;
    }

    public void setName(String name) {
        logger.debug("Inside setName() method. Value: {}", name);
        this.name = name;
    }

    @Override
    public String toString() {
        return "Country [code=" + code + ", name=" + name + "]";
    }
}