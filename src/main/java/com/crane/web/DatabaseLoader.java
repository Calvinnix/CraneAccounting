package com.crane.web;

import com.crane.dao.ChartOfAccountDao;
import com.crane.dao.UserDao;
import com.crane.dao.RoleDao;
import com.crane.model.ChartOfAccount;
import com.crane.model.User;
import com.crane.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Created by Calvin on 1/9/17.
 */

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserDao userDao;
    private final RoleDao roleDao;
    private final ChartOfAccountDao chartOfAccountsDao;

    @Autowired
    public DatabaseLoader(UserDao userDao, RoleDao roleDao, ChartOfAccountDao chartOfAccountsDao) {
        this.userDao = userDao;
        this.roleDao = roleDao;
        this.chartOfAccountsDao = chartOfAccountsDao;
    }

    @Override
    public void run(String... strings) throws Exception {

        Role ROLE_USER = new Role("ROLE_USER");
        this.roleDao.save(ROLE_USER);
        Role ROLE_ADMIN = new Role("ROLE_ADMIN");
        this.roleDao.save(ROLE_ADMIN);

        final String password = "$2a$08$wgwoMKfYl5AUE9QtP4OjheNkkSDoqDmFGjjPE2XTPLDe9xso/hy7u"; // == password
        final String username = "cnix";

        this.userDao.save(new User(username, password, true, ROLE_ADMIN));
        this.userDao.save(new User("TEST1", password, true, ROLE_USER));
        this.userDao.save(new User("TEST2", password, true, ROLE_USER));
    }
}
