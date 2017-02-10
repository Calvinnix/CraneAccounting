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
    public Account findAccountByName(String name) {
        logger.info(String.format(" --- Entering: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));

        Account account = accountDao.findByName(name);

        logger.info(String.format(" --- Exiting: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));
        return account;
    }

    @Override
    public void save(Account account) {
        logger.info(String.format(" --- Entering: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));

        accountDao.save(account);

        logger.info(String.format(" --- Exiting: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));
    }

    @Override
    public void update(Account account) {
        logger.info(String.format(" --- Entering: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));

        Account accountFound = accountDao.findByName(account.getName());

        if (accountFound == null) {
            logger.error(" --- The account does not exist.");
        } else {
            account.setId(accountFound.getId());
            account.setAddedBy(accountFound.getAddedBy());
            account.setAddedOn(accountFound.getAddedOn());
            account.setAddedByUsername(accountFound.getAddedByUsername());
        }

        accountDao.save(account);

        logger.info(String.format(" --- Exiting: %s", Thread.currentThread().getStackTrace()[1].getMethodName()));
    }
}
