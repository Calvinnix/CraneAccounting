package com.crane.dao;

import com.crane.model.JournalEntry;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by nixc1 on 2/19/17.
 */

@Repository
public interface JournalEntryDao extends CrudRepository<JournalEntry, Long> {
    JournalEntry findById(Long l);
}
