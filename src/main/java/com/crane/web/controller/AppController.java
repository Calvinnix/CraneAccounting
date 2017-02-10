package com.crane.web.controller;

import com.crane.dao.AccountDao;
import com.crane.dao.UserDao;
import com.crane.model.Account;
import com.crane.model.ChartOfAccounts;
import com.crane.model.Role;
import com.crane.model.User;
import com.crane.service.AccountService;
import com.crane.service.UserService;
import com.crane.web.UserValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;

/**
 * Created by Calvin on 1/9/17.
 */

@Controller
public class AppController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserDao userDao;

    private static final Logger logger = LoggerFactory.getLogger(AppController.class);

    @RequestMapping(value = "/")
    public String index() {
        logger.info(" --- RequestMapping from /");
        logger.info(" --- Mapping to /application");
        return "application";
    }

    @RequestMapping(value = "/admin")
    public String admin() {
        logger.info(" --- RequestMapping from /admin");
        logger.info(" --- Mapping to /admin");
        return "admin";
    }

    @RequestMapping(value = "/admin/addUser", method = RequestMethod.POST)
    public String addUser(HttpServletRequest request) {
        logger.info(" --- RequestMapping from /admin/addUser");

        /**
         * todo:ctn refact
         * A lot of code is shared between addUser and editUser
         */

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String role = request.getParameter("role");
        String enabled = request.getParameter("enabled");

        Role userRole = new Role(role);
        boolean isEnabled = (enabled.equals("true"));

        User user = new User(username, password, isEnabled, userRole);

        logger.info(" --- Saving user");
        userService.save(user);

        logger.info(" --- Redirecting to /admin");
        return "redirect:/admin";
    }

    @RequestMapping(value = "/admin/editUser", method = RequestMethod.POST)
    public String editUser(HttpServletRequest request) {
        logger.info(" --- RequestMapping from /admin/editUser");

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String role = request.getParameter("role");
        String enabled = request.getParameter("enabled");

        Role userRole = new Role(role);
        boolean isEnabled = (enabled.equals("true"));

        User user = new User(username, password, isEnabled, userRole);

        logger.info(" --- edit user");
        userService.update(user);

        logger.info(" --- Redirecting to /admin");
        return "redirect:/admin";
    }

    @RequestMapping(value = "/addAccount", method = RequestMethod.POST)
    public String addAccount(HttpServletRequest request) {
        logger.info(" --- RequestMapping from /addAccount");

        String name = request.getParameter("name");
        String strCode = request.getParameter("code");
        String type = request.getParameter("type");
        String mGroup = request.getParameter("mGroup");
        String strLeftNormalSide = request.getParameter("leftNormalSide");
        String strInitialBalance = request.getParameter("initialBalance");
        String comment = request.getParameter("comment");
        String strPriority = request.getParameter("priority");
        String username = request.getParameter("username");

        User user = userDao.findByUsername(username);
        Date date = new Date();
        Double code = Double.parseDouble(strCode);
        Boolean leftNormalSide = Boolean.parseBoolean(strLeftNormalSide);
        Long initialBalance = Long.parseLong(strInitialBalance);
        Long priority = Long.parseLong(strPriority);

        Account account = new Account();
        account.setName(name);
        account.setCode(code);
        account.setType(type);
        account.setmGroup(mGroup);
        account.setLeftNormalSide(leftNormalSide);
        account.setAddedBy(user);
        account.setAddedByUsername(username);
        account.setAddedOn(date);
        account.setInitialBalance(initialBalance);
        account.setComment(comment);
        account.setPriority(priority);
        account.setActive(true); //When first saving the account always default to true

        accountService.save(account);

        logger.info(" --- Redirecting to /");
        return "redirect:/";
    }

    @RequestMapping(value = "/editAccount", method = RequestMethod.POST)
    public String editAccount(HttpServletRequest request) {
        logger.info(" --- RequestMapping from /deactivateAccount");

        String name = request.getParameter("name");
        String strCode = request.getParameter("code");
        String type = request.getParameter("type");
        String mGroup = request.getParameter("mGroup");
        String strLeftNormalSide = request.getParameter("leftNormalSide");
        String strInitialBalance = request.getParameter("initialBalance");
        String comment = request.getParameter("comment");
        String strPriority = request.getParameter("priority");
        String strActive = request.getParameter("active");

        Double code = Double.parseDouble(strCode);
        Boolean leftNormalSide = Boolean.parseBoolean(strLeftNormalSide);
        Long initialBalance = Long.parseLong(strInitialBalance);
        Long priority = Long.parseLong(strPriority);
        Boolean active = Boolean.parseBoolean(strActive);

        Account account = new Account();
        account.setName(name);
        account.setCode(code);
        account.setType(type);
        account.setmGroup(mGroup);
        account.setLeftNormalSide(leftNormalSide);
        account.setInitialBalance(initialBalance);
        account.setComment(comment);
        account.setPriority(priority);
        account.setActive(active);

        accountService.update(account);

        logger.info(" --- Redirecting to /");
        return "redirect:/";
    }

}
