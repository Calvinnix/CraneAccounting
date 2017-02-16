package com.crane.service;

import com.crane.dao.AccountDao;
import com.crane.dao.ChartOfAccountsDao;
import com.crane.dao.UserDao;
import com.crane.model.Account;
import com.crane.model.ChartOfAccounts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by nixc1 on 2/9/17.
 */
@Service
public class ChartOfAccountsServiceImpl implements ChartOfAccountsService {

    @Autowired
    private ChartOfAccountsDao chartOfAccountsDao;

    private static final Logger logger = LoggerFactory.getLogger(ChartOfAccountsServiceImpl.class);

    @Override
    public void save(ChartOfAccounts coa) {
        logger.info(String.format(" --- Entering: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));

        chartOfAccountsDao.save(coa);

        logger.info(String.format(" --- Exiting: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));
    }

    @Override
    public void update(ChartOfAccounts coa) {
        logger.info(String.format(" --- Entering: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));

        ChartOfAccounts chartOfAccountsFound = chartOfAccountsDao.findByName(coa.getName());

        if (chartOfAccountsFound == null) {
            logger.error(" --- The chart of account does not exist.");
        } else {
            coa.setId(chartOfAccountsFound.getId());
        }

        chartOfAccountsDao.save(coa);

        logger.info(String.format(" --- Exiting: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));
    }
}
