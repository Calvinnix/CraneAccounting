package com.crane.service;

import com.crane.model.JournalEntry;

/**
 * Created by nixc1 on 2/19/17.
 */
public interface JournalEntryService {
    void save(JournalEntry journalEntry);
    JournalEntry findById(Long l);
}
