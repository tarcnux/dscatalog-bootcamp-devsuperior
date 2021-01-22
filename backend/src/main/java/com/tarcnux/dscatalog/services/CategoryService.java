package com.tarcnux.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tarcnux.dscatalog.dto.CategoryDTO;
import com.tarcnux.dscatalog.entities.Category;
import com.tarcnux.dscatalog.repositories.CategoryRepository;

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
}
