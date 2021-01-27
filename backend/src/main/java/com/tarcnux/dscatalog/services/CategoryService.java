package com.tarcnux.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tarcnux.dscatalog.dto.CategoryDTO;
import com.tarcnux.dscatalog.entities.Category;
import com.tarcnux.dscatalog.repositories.CategoryRepository;
import com.tarcnux.dscatalog.services.exceptions.DatabaseException;
import com.tarcnux.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;

	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {
		List<Category> list = repository.findAll();
		//Converting each object Category into CategoryDTO
		//First list 2 stream and finally Collectors 2 List Again
		List<CategoryDTO> listDto = list.stream()
				.map(x -> new CategoryDTO(x)).collect(Collectors.toList());
		return listDto;
		
		//It's also possible return directly
		// return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
		
	}

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Optional<Category> objOptional = repository.findById(id);
		//Category entity = objOptional.get();
		//Handling the exception
		Category entity = objOptional.orElseThrow(() -> new ResourceNotFoundException("Entity NOT found"));
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {
		try {
			Category entity = repository.getOne(id);
			entity.setName(dto.getName());		
			entity = repository.save(entity);
			return new CategoryDTO(entity);
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
	
}
