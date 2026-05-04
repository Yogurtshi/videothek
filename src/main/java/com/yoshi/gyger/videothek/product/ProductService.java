package com.yoshi.gyger.videothek.product;

import com.yoshi.gyger.videothek.storage.EntityNotFoundException;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository; 
    
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getProducts () {
        return repository.findAll();
    }

    public Product getProduct(@NonNull Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, Product.class));
    }

}