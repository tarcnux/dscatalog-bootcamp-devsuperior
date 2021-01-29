package com.tarcnux.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tarcnux.dscatalog.dto.CategoryDTO;
import com.tarcnux.dscatalog.dto.ProductDTO;
import com.tarcnux.dscatalog.entities.Category;
import com.tarcnux.dscatalog.entities.Product;
import com.tarcnux.dscatalog.repositories.CategoryRepository;
import com.tarcnux.dscatalog.repositories.ProductRepository;
import com.tarcnux.dscatalog.services.exceptions.DatabaseException;
import com.tarcnux.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Autowired 
	private CategoryRepository categoryRepository;

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {
		Page<Product> list = repository.findAll(pageRequest);
		//Converting each object Product into ProductDTO
		//First list 2 stream and finally Collectors 2 List Again
		Page<ProductDTO> listDto = list.map(product -> new ProductDTO(product));
		//return list.map(x -> new ProductDTO(x));
		return listDto;
		
		//It's also possible return directly
		// return list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
		
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> objOptional = repository.findById(id);
		//Product entity = objOptional.get();
		//Handling the exception
		Product entity = objOptional.orElseThrow(() -> new ResourceNotFoundException("Entity NOT found"));
		return new ProductDTO(entity, entity.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new ProductDTO(entity);
	}

	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		try {
			Product entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new ProductDTO(entity);
		} catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found: " + id);
		}		
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found: " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
	private void copyDtoToEntity(ProductDTO dto, Product entity) {
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setImgUrl(dto.getImgUrl());
		entity.setPrice(dto.getPrice());
		
		entity.getCategories().clear();
		for (CategoryDTO catDto : dto.getCategories()) {
			Category category = categoryRepository.getOne(catDto.getId());
			entity.getCategories().add(category);
		}
	}
	
}
