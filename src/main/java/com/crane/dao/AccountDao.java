package com.crane.dao;

import com.crane.model.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by nixc1 on 2/8/17.
 */

@Repository
public interface AccountDao extends CrudRepository<Account, Long> {
    Account findById(Long l);
    Account findByName(String s);
    void delete(Long l);
}
