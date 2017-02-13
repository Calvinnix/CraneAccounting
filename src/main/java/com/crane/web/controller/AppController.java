package com.crane.web.controller;

import com.crane.dao.AccountDao;
import com.crane.dao.UserDao;
import com.crane.model.*;
import com.crane.service.AccountService;
import com.crane.service.EventLogService;
import com.crane.service.UserService;
import com.crane.web.UserValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.util.Calendar;
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
    private EventLogService eventLogService;

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

    @RequestMapping(value = "/events")
    public String events() {
        logger.info(" --- RequestMapping from /events");
        logger.info(" --- Mapping to /events");
        return "events";
    }

    @RequestMapping(value = "/accounts")
    public String accounts() {
        logger.info(" --- RequestMapping from /accounts");
        logger.info(" --- Mapping to /accounts");
        return "accounts";
    }

    @RequestMapping(value = "/journals")
    public String journals() {
        logger.info(" --- RequestMapping from /journals");
        logger.info(" --- Mapping to /journals");
        return "journals";
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

        Calendar now = Calendar.getInstance();
        int year = now.get(Calendar.YEAR);
        int month = now.get(Calendar.MONTH) + 1; // Note: zero based!
        int day = now.get(Calendar.DAY_OF_MONTH);
        int hour = now.get(Calendar.HOUR_OF_DAY);
        int minute = now.get(Calendar.MINUTE);
        int second = now.get(Calendar.SECOND);
        int millis = now.get(Calendar.MILLISECOND);

        String currentTime = String.format("%02d-%02d-%d %02d:%02d:%02d.%03d", month, day, year, hour, minute, second, millis);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = auth.getName();

        EventLog log = new EventLog(currentTime, currentUser, String.format(" --- Added new user: %s", username));
        eventLogService.save(log);

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

        Calendar now = Calendar.getInstance();
        int year = now.get(Calendar.YEAR);
        int month = now.get(Calendar.MONTH) + 1; // Note: zero based!
        int day = now.get(Calendar.DAY_OF_MONTH);
        int hour = now.get(Calendar.HOUR_OF_DAY);
        int minute = now.get(Calendar.MINUTE);
        int second = now.get(Calendar.SECOND);
        int millis = now.get(Calendar.MILLISECOND);

        String currentTime = String.format("%02d-%02d-%d %02d:%02d:%02d.%03d", month, day, year, hour, minute, second, millis);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = auth.getName();

        EventLog log = new EventLog(currentTime, currentUser, String.format(" --- Edited user: %s", username));
        eventLogService.save(log);

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
        Date now = new Date();
        String date = DateFormat.getDateTimeInstance(DateFormat.MEDIUM, DateFormat.SHORT).format(now);

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

        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1; // Note: zero based!
        int day = cal.get(Calendar.DAY_OF_MONTH);
        int hour = cal.get(Calendar.HOUR_OF_DAY);
        int minute = cal.get(Calendar.MINUTE);
        int second = cal.get(Calendar.SECOND);
        int millis = cal.get(Calendar.MILLISECOND);

        String currentTime = String.format("%02d-%02d-%d %02d:%02d:%02d.%03d", month, day, year, hour, minute, second, millis);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = auth.getName();

        EventLog log = new EventLog(currentTime, currentUser, String.format(" --- Added new account: %s --- Initial Balance: %s --- Comments: %s", name, initialBalance, comment));
        eventLogService.save(log);

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

        Calendar now = Calendar.getInstance();
        int year = now.get(Calendar.YEAR);
        int month = now.get(Calendar.MONTH) + 1; // Note: zero based!
        int day = now.get(Calendar.DAY_OF_MONTH);
        int hour = now.get(Calendar.HOUR_OF_DAY);
        int minute = now.get(Calendar.MINUTE);
        int second = now.get(Calendar.SECOND);
        int millis = now.get(Calendar.MILLISECOND);

        String currentTime = String.format("%02d-%02d-%d %02d:%02d:%02d.%03d", month, day, year, hour, minute, second, millis);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = auth.getName();

        EventLog log = new EventLog(currentTime, currentUser, String.format(" --- Edited account: %s --- Initial Balance: %s --- Comments: %s --- Active: %s", name, initialBalance, comment, active));
        eventLogService.save(log);


        logger.info(" --- Redirecting to /");
        return "redirect:/";
    }

}
