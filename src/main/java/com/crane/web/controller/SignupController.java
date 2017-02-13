package com.crane.web.controller;

import com.crane.model.EventLog;
import com.crane.model.User;
import com.crane.service.EventLogService;
import com.crane.service.UserService;
import com.crane.service.SecurityService;
import com.crane.web.UserValidator;
import com.crane.web.FlashMessage;
import com.crane.web.Utility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by Calvin on 1/11/17.
 */

@Controller
public class SignupController {

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private EventLogService eventLogService;

    private static final Logger logger = LoggerFactory.getLogger(SignupController.class);

    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public String signup(Model model, HttpServletRequest request) {
        logger.info(" --- RequestMapping from /signup");

        logger.info(" --- Adding user attribute to model from new User()");
        model.addAttribute("user", new User());

        Utility.addFlashAttributeIfAvailable(model, request);

        logger.info(" --- Mapping to /signup");
        return "signup";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String signup(@ModelAttribute("user") User userForm, BindingResult bindingResult, Model model) {
        logger.info(" --- RequestMapping from /signup POST");

        logger.info(" --- Validating user");
        userValidator.validate(userForm, bindingResult);

        if (bindingResult.hasErrors()) {
            logger.info(" --- Adding flash attribute to model");
            model.addAttribute("flash",new FlashMessage("Invalid Username and/or Password", FlashMessage.Status.FAILURE));

            logger.info(" --- Mapping to /signup");
            return "signup";
        }

        logger.info(" --- Setting user as enabled by default (This should always be true during signups)");
        userForm.setEnabled(true);

        logger.info(" --- Saving user");
        userService.save(userForm);

        Calendar now = Calendar.getInstance();
        int year = now.get(Calendar.YEAR);
        int month = now.get(Calendar.MONTH) + 1; // Note: zero based!
        int day = now.get(Calendar.DAY_OF_MONTH);
        int hour = now.get(Calendar.HOUR_OF_DAY);
        int minute = now.get(Calendar.MINUTE);
        int second = now.get(Calendar.SECOND);
        int millis = now.get(Calendar.MILLISECOND);

        String currentTime = String.format("%02d-%02d-%d %02d:%02d:%02d.%03d", month, day, year, hour, minute, second, millis);


        EventLog log = new EventLog(currentTime, userForm.getUsername(), String.format(" --- Created new user: %s", userForm.getUsername()));
        eventLogService.save(log);

        logger.info(" --- Automatically logging in user");
        securityService.autoLogin(userForm.getUsername(), userForm.getPasswordConfirm());

        logger.info(" --- Redirecting to /");
        return "redirect:/";
    }

}
