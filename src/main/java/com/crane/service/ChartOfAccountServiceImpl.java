package com.crane.service;

import com.crane.dao.ChartOfAccountDao;
import com.crane.dao.UserDao;
import com.crane.model.ChartOfAccount;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by nixc1 on 2/8/17.
 */

@Service
public class ChartOfAccountServiceImpl implements ChartOfAccountService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private ChartOfAccountDao chartOfAccountsDao;

    private static final Logger logger = LoggerFactory.getLogger(ChartOfAccountServiceImpl.class);

    @Override
    public void save(ChartOfAccount coa) {
        logger.info(String.format(" --- Entering: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));

        chartOfAccountsDao.save(coa);

        logger.info(String.format(" --- Exiting: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));
    }
}
