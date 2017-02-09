package com.crane.dao;

import com.crane.model.ChartOfAccounts;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by nixc1 on 2/9/17.
 */
@Repository
public interface ChartOfAccountsDao extends CrudRepository<ChartOfAccounts, Long> {
}
