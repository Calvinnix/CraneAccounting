package com.crane.dao;

import com.crane.model.ChartOfAccount;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by nixc1 on 2/8/17.
 */

@Repository
public interface ChartOfAccountDao extends CrudRepository<ChartOfAccount, Long> {

    ChartOfAccount findById(Long l);
    void delete(Long l);
}
