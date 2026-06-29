package com.library.service;
import com.library.repository.BookRepository;
//Service class
public class BookService {
    private BookRepository bookRepository;
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
    public void displayServiceInfo() {
        System.out.println("Book Service is active.");
        bookRepository.displayRepositoryInfo();
    }
}