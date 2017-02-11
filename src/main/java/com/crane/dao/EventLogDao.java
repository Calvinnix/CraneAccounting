package com.crane.dao;

import com.crane.model.Account;
import com.crane.model.EventLog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by nixc1 on 2/10/17.
 */

@Repository
public interface EventLogDao extends CrudRepository<EventLog, Long> {
}
