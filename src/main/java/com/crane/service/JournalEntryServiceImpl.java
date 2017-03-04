package com.crane.service;

import com.crane.dao.JournalEntryDao;
import com.crane.model.JournalEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by nixc1 on 2/19/17.
 */

@Service
public class JournalEntryServiceImpl implements JournalEntryService {

    @Autowired
    private JournalEntryDao journalEntryDao;

    private static final Logger logger = LoggerFactory.getLogger(JournalEntryServiceImpl.class);

    @Override
    public void save(JournalEntry journalEntry) {
        logger.info(String.format(" --- Entering: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));

        journalEntryDao.save(journalEntry);

        logger.info(String.format(" --- Exiting: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));
    }

    @Override
    public JournalEntry saveAndReturn(JournalEntry journalEntry) {
        logger.info(String.format(" --- Entering: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));

        JournalEntry journalEntry1 = journalEntryDao.save(journalEntry);

        logger.info(String.format(" --- Exiting: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));
        return journalEntry1;
    }

    @Override
    public JournalEntry findById(Long l) {
        return journalEntryDao.findById(l);
    }
}
