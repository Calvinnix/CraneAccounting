package com.crane;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CraneAccounting {

	//todo:ctn JavaScript frontend validation
	//todo:ctn Make the ChartOfAccounts editable/addable
	//todo:ctn Finish adding journalizing
	//todo:ctn Make the amount field a double with the format of $xxx.xx
	//todo:ctn Add reporting (visualization.... D3.js ??)
	//todo:ctn Add search ability for the select box
	//todo:ctn Add search ability for accounts
	//todo:ctn Write test scripts

	public static void main(String[] args) {
		SpringApplication.run(CraneAccounting.class, args);
	}
}