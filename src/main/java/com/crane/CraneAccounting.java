package com.crane;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CraneAccounting {

	//todo:ctn JavaScript frontend validation
	//todo:ctn Finish adding journalizing
	//todo:ctn Add reporting (visualization.... D3.js ??)
	//todo:ctn Add search ability for the select box
	//todo:ctn Add search ability for accounts
	//todo:ctn Write test scripts
	//todo:ctn Add ability to upload documents in journalizing step
	//todo:ctn Add check during editing account for make sure type and code are valid

	public static void main(String[] args) {
		SpringApplication.run(CraneAccounting.class, args);
	}
}