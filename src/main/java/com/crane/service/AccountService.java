package com.crane.service;

import com.crane.model.Account;

/**
 * Created by nixc1 on 2/8/17.
 */
public interface AccountService {
    Account findAccountByName(String name);
    void save(Account account);
    void update(Account account);
}
