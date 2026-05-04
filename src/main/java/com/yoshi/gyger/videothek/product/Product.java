package com.yoshi.gyger.videothek.product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    @Size(max = 255)
    @NotEmpty
    private String name;

    @Column(nullable = false)
    @Size(max = 255)
    @NotEmpty
    private BigDecimal price;

    public Product() {
    }

    public Product(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
