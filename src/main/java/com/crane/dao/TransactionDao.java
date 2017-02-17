package com.crane.dao;

import com.crane.model.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by nixc1 on 2/17/17.
 */

@Repository
public interface TransactionDao extends CrudRepository<Transaction, Long> {
    Transaction findById(Long l);
}
