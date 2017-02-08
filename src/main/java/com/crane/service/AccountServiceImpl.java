package com.crane.service;

import com.crane.dao.AccountDao;
import com.crane.dao.UserDao;
import com.crane.model.Account;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by nixc1 on 2/8/17.
 */

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private AccountDao accountDao;

    private static final Logger logger = LoggerFactory.getLogger(AccountServiceImpl.class);

    @Override
    public void save(Account coa) {
        logger.info(String.format(" --- Entering: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));

        accountDao.save(coa);

        logger.info(String.format(" --- Exiting: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));
    }
}
