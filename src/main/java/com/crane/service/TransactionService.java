package com.crane.service;

import com.crane.model.Transaction;

/**
 * Created by nixc1 on 2/17/17.
 */
public interface TransactionService {
    void save(Transaction transaction);
    Transaction saveAndReturn(Transaction transaction);
}
