package com.crane.web.controller;

import com.crane.dao.AccountDao;
import com.crane.dao.TransactionDao;
import com.crane.dao.UserDao;
import com.crane.model.*;
import com.crane.service.*;
import com.crane.web.UserValidator;
import org.json.JSONArray;
import org.json.JSONObject;
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
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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
    private ChartOfAccountsService chartOfAccountsService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private JournalEntryService journalEntryService;

    @Autowired
    private UserDao userDao;

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private TransactionDao transactionDao;

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

    @RequestMapping(value = "/chartOfAccounts")
    public String chartOfAccounts() {
        logger.info(" --- RequestMapping from /chartOfAccounts");
        logger.info(" --- Mapping to /chartOfAccounts");
        return "chartOfAccounts";
    }

    @RequestMapping(value = "/ledger")
    public String ledger() {
        logger.info(" --- RequestMapping from /ledger");
        logger.info(" --- Mapping to /ledger");
        return "ledger";
    }

    @RequestMapping(value = "/postJournals")
    public String postJournals() {
        logger.info(" --- RequestMapping from /postJournals");
        logger.info(" --- Mapping to /postJournals");
        return "postJournals";
    }

    @RequestMapping(value = "/trialBalance")
    public String trialBalance() {
      logger.info(" --- RequestMapping from /trialBalance");
      logger.info(" --- Mapping to /trialBalance");
      return "trialBalance";
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

        EventLog log = new EventLog(currentTime, currentUser, String.format("Add new user: %s", username));
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

        EventLog log = new EventLog(currentTime, currentUser, String.format("Edit user: %s", username));
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
        String strBalance = request.getParameter("balance");
        String comment = request.getParameter("comment");
        String strPriority = request.getParameter("priority");
        String username = request.getParameter("username");

        User user = userDao.findByUsername(username);
        Date now = new Date();
        String date = DateFormat.getDateTimeInstance(DateFormat.MEDIUM, DateFormat.SHORT).format(now);

        Double code = Double.parseDouble(strCode);
        Boolean leftNormalSide = Boolean.parseBoolean(strLeftNormalSide);
        Double balance = Double.parseDouble(strBalance);
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
        account.setBalance(balance);
        account.setComment(comment);
        account.setPriority(priority);
        account.setActive(true); //When first saving the account always default to true

        if (balance == 0.0) {
            account.setCanDeactivate(true);
        } else {
            account.setCanDeactivate(false);
        }

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

        EventLog log = new EventLog(currentTime, currentUser, String.format("Add new account: %s | Balance: %s | Comments: %s", name, balance, comment));
        eventLogService.save(log);

        logger.info(" --- Redirecting to /");
        return "redirect:/";
    }

    @RequestMapping(value = "/editAccount", method = RequestMethod.POST)
    public String editAccount(HttpServletRequest request) {
        logger.info(" --- RequestMapping from /editAccount");

        String name = request.getParameter("name");
        String strCode = request.getParameter("code");
        String type = request.getParameter("type");
        String mGroup = request.getParameter("mGroup");
        String strLeftNormalSide = request.getParameter("leftNormalSide");
        String strBalance = request.getParameter("balance");
        String comment = request.getParameter("comment");
        String strPriority = request.getParameter("priority");
        String strActive = request.getParameter("active");

        //Need to strip $ and () from the number
        //i.e. $5.00 = 5.00
        //i.e. ($5.00) = -5.00
        if (strBalance.charAt(0) == '$') {
            //assuming positive
            strBalance = strBalance.substring(1);
        } else if (strBalance.charAt(0) == '(') {
            //assuming negative
            strBalance = "-" + strBalance.substring(2, strBalance.length() - 1);
        } else {
            logger.error("Unexpected format of balance: " + strBalance);
        }

        //remove commas
        //i.e. 1,000,000.00 = 1000000.00
        strBalance = strBalance.replace(",", "");

        Double code = Double.parseDouble(strCode);
        Boolean leftNormalSide = Boolean.parseBoolean(strLeftNormalSide);
        Double balance = Double.parseDouble(strBalance);
        Long priority = Long.parseLong(strPriority);
        Boolean active = Boolean.parseBoolean(strActive);

        Account account = new Account();
        account.setName(name);
        account.setCode(code);
        account.setType(type);
        account.setmGroup(mGroup);
        account.setLeftNormalSide(leftNormalSide);
        account.setBalance(balance);
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

        EventLog log = new EventLog(currentTime, currentUser, String.format("Edit account: %s | Comments: %s | Active: %s", name, comment, active));
        eventLogService.save(log);


        logger.info(" --- Redirecting to /");
        return "redirect:/";
    }

    @RequestMapping(value = "/chartOfAccounts/addChartOfAccount", method = RequestMethod.POST)
    public String addChartOfAccount(HttpServletRequest request) {
        logger.info(" --- RequestMapping from /chartOfAccounts/addChartOfAccount");

        String name = request.getParameter("name");
        String strCode = request.getParameter("code");
        String type = request.getParameter("type");
        String mGroup = request.getParameter("mGroup");
        String strPriority = request.getParameter("priority");
        Double code = Double.parseDouble(strCode);
        Long priority = Long.parseLong(strPriority);

        Boolean leftNormalSide = false;
        if (type.equals("Asset") || type.equals("Expense")) {
            leftNormalSide = true;
        }

        ChartOfAccounts coa = new ChartOfAccounts(code, name, type, leftNormalSide, priority, mGroup);
        chartOfAccountsService.save(coa);

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

        EventLog log = new EventLog(currentTime, currentUser, String.format("Add new account to chart of accounts: %s", name));
        eventLogService.save(log);

        logger.info(" --- Redirecting to /chartOfAccounts");
        return "redirect:/chartOfAccounts";
    }

    @RequestMapping(value = "/chartOfAccounts/editChartOfAccount", method = RequestMethod.POST)
    public String editChartOfAccount(HttpServletRequest request) {
        logger.info(" --- RequestMapping from /chartOfAccounts/editChartOfAccount");

        String strId = request.getParameter("id");
        String name = request.getParameter("name");
        String strCode = request.getParameter("code");
        String type = request.getParameter("type");
        String mGroup = request.getParameter("mGroup");
        String strPriority = request.getParameter("priority");

        Boolean leftNormalSide = false;
        if (type.equals("Asset") || type.equals("Expense")) {
            leftNormalSide = true;
        }

        Double code = Double.parseDouble(strCode);
        Long priority = Long.parseLong(strPriority);
        Long id = Long.parseLong(strId);

        ChartOfAccounts coa = new ChartOfAccounts(code, name, type, leftNormalSide, priority, mGroup);
        coa.setId(id);

        chartOfAccountsService.update(coa);

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

        EventLog log = new EventLog(currentTime, currentUser, String.format("Edit account in chart of account: %s", name));
        eventLogService.save(log);


        logger.info(" --- Redirecting to /chartOfAccounts");
        return "redirect:/chartOfAccounts";
    }

    @RequestMapping(value = "/journals/addJournal", method = RequestMethod.POST)
    public String addJournal(HttpServletRequest request) {
        logger.info(" --- RequestMapping from /journals/addJournal");

        String accounts = request.getParameter("accounts");
        String username = request.getParameter("username");

        User userFound = userService.findUserByUsername(username);

        List transactions = new ArrayList<Transaction>();

        JSONArray jsonAccountsArray = new JSONArray(accounts);
        jsonAccountsArray.length();

        Calendar now = Calendar.getInstance();
        int year = now.get(Calendar.YEAR);
        int month = now.get(Calendar.MONTH) + 1; // Note: zero based!
        int day = now.get(Calendar.DAY_OF_MONTH);
        int hour = now.get(Calendar.HOUR_OF_DAY);
        int minute = now.get(Calendar.MINUTE);
        int second = now.get(Calendar.SECOND);
        int millis = now.get(Calendar.MILLISECOND);

        String currentTime = String.format("%02d-%02d-%d %02d:%02d:%02d.%03d", month, day, year, hour, minute, second, millis);


        for (int i = 0; i < jsonAccountsArray.length(); i++) {
            JSONObject currentAccount = jsonAccountsArray.getJSONObject(i);

            Double accountCode = currentAccount.getDouble("accountCode");
            Double amount = currentAccount.getDouble("amount");
            String accountName = currentAccount.getString("accountName");
            Boolean isDebit = currentAccount.getBoolean("isDebit");

            Account accountFound = accountService.findAccountByName(accountName);
            accountFound.setCanDeactivate(false);

            Transaction transaction = new Transaction(accountFound, amount, userFound, isDebit, accountName, username);
            transaction = transactionService.saveAndReturn(transaction);

            transactions.add(transaction); //add to array of transactions that JournalEntry will use

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String currentUser = auth.getName();

            EventLog log = new EventLog(currentTime, currentUser, String.format("Add transaction | account: %s | amount: %s | isDebit: %s", accountName, amount, isDebit));
            eventLogService.save(log);
        }

        JournalEntry journalEntry = new JournalEntry(transactions, userFound, currentTime, false);

        JournalEntry journalEntryFound = journalEntryService.saveAndReturn(journalEntry);

        for (int i = 0; i < transactions.size(); i++) {
          Transaction transaction = (Transaction) transactions.get(i);
          transaction.setJournalEntry(journalEntryFound);
          transactionService.save(transaction);
        }

        logger.info(" --- Redirecting to /journals");
        return "redirect:/journals";
    }

    @RequestMapping(value = "/journals/postJournalEntry", method = RequestMethod.POST)
    public String postJournal(HttpServletRequest request) {
        logger.info(" --- RequestMapping from /journals/postJournalEntry");

        String rows = request.getParameter("rows");
        String strJournalId = request.getParameter("journalId");
        String username = request.getParameter("username");

        Long journalId = Long.parseLong(strJournalId);

        JournalEntry journalEntryFound = journalEntryService.findById(journalId);
        User userFound = userService.findUserByUsername(username);

        JSONArray jsonTransactions = new JSONArray(rows);

        for (int i = 0; i < jsonTransactions.length(); i++) {
            JSONObject currentAccount = jsonTransactions.getJSONObject(i);
            JSONObject props = currentAccount.getJSONObject("props");
            JSONObject transaction = props.getJSONObject("transaction");

            String accountName = transaction.getString("accountName");
            Double amount = transaction.getDouble("amount");
            Boolean isDebit = transaction.getBoolean("debit");

            Account accountFound = accountService.findAccountByName(accountName);
            Double beginningBalance = accountFound.getBalance();

            //update account will new balance details
            if(isDebit) {
                if (accountFound.getLeftNormalSide()) {
                    accountFound.setBalance(accountFound.getBalance() + amount);
                } else {
                    accountFound.setBalance(accountFound.getBalance() - amount);
                }
            } else {
                if (accountFound.getLeftNormalSide()) {
                    accountFound.setBalance(accountFound.getBalance() - amount);
                } else {
                    accountFound.setBalance(accountFound.getBalance() + amount);
                }
            }
            accountService.save(accountFound);

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

            EventLog log = new EventLog(currentTime, currentUser, String.format("Post Journal Entry: %s | Before: %s | After: %s", accountName, beginningBalance, accountFound.getBalance()));
            eventLogService.save(log);
        }

        journalEntryFound.setPosted(true);
        journalEntryService.save(journalEntryFound);

        List<Transaction> transactions = journalEntryFound.getTransaction();

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

        EventLog log = new EventLog(currentTime, currentUser, String.format("Approve Journal Entry: %s", journalId));
        eventLogService.save(log);


        logger.info(" --- Redirecting to /journals");
        return "redirect:/journals";
    }

  @RequestMapping(value = "/journals/rejectJournalEntry", method = RequestMethod.POST)
  public String rejectJournalEntry(HttpServletRequest request) {
    logger.info(" --- RequestMapping from /journals/rejectJournalEntry");

    String strJournalId = request.getParameter("journalId");
    String rejectionReason = request.getParameter("rejectionReason");

    Long journalId = Long.parseLong(strJournalId);

    JournalEntry journalEntryFound = journalEntryService.findById(journalId);

    journalEntryFound.setRejected(true);
    journalEntryFound.setRejectionReason(rejectionReason);
    journalEntryService.save(journalEntryFound);

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

    EventLog log = new EventLog(currentTime, currentUser, String.format("Reject Journal Entry: %s | Reason: %s", journalId, rejectionReason));
    eventLogService.save(log);

    logger.info(" --- Redirecting to /journals");
    return "redirect:/journals";
  }

}
