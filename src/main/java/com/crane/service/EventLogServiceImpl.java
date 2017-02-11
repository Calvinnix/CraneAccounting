package com.crane.service;

import com.crane.dao.EventLogDao;
import com.crane.model.EventLog;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by nixc1 on 2/10/17.
 */
@Service
public class EventLogServiceImpl implements EventLogService {

    @Autowired
    private EventLogDao eventLogDao;

    private static final Logger logger = LoggerFactory.getLogger(EventLogServiceImpl.class);

    @Override
    public void save(EventLog eventLog) {
        logger.info(String.format(" --- Entering: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));

        eventLogDao.save(eventLog);

        logger.info(String.format(" --- Exiting: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));
    }
}
