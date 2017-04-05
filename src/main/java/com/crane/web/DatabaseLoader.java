package com.crane.web;

import com.crane.dao.AccountDao;
import com.crane.dao.ChartOfAccountsDao;
import com.crane.dao.UserDao;
import com.crane.dao.RoleDao;
import com.crane.model.Account;
import com.crane.model.ChartOfAccounts;
import com.crane.model.User;
import com.crane.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Created by Calvin on 1/9/17.
 */

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserDao userDao;
    private final RoleDao roleDao;
    private final ChartOfAccountsDao chartOfAccountsDao;
    private final AccountDao accountDao;


    @Autowired
    public DatabaseLoader(UserDao userDao, RoleDao roleDao, ChartOfAccountsDao chartOfAccountsDao,AccountDao accountDao) {
        this.userDao = userDao;
        this.roleDao = roleDao;
        this.chartOfAccountsDao = chartOfAccountsDao;
        this.accountDao = accountDao;
    }

    @Override
    public void run(String... strings) throws Exception {

        Role ROLE_USER = new Role("ROLE_USER");
        this.roleDao.save(ROLE_USER);
        Role ROLE_MANAGER = new Role("ROLE_MANAGER");
        this.roleDao.save(ROLE_MANAGER);
        Role ROLE_ADMIN = new Role("ROLE_ADMIN");
        this.roleDao.save(ROLE_ADMIN);

        final String password = "$2a$08$wgwoMKfYl5AUE9QtP4OjheNkkSDoqDmFGjjPE2XTPLDe9xso/hy7u"; // == password
        final String username = "cnix";

        this.userDao.save(new User(username, password, true, ROLE_ADMIN));
        this.userDao.save(new User("admin", password, true, ROLE_ADMIN));
        this.userDao.save(new User("manager", password, true, ROLE_MANAGER));
        this.userDao.save(new User("user", password, true, ROLE_USER));
        this.userDao.save(new User("TEST1", password, true, ROLE_USER));
        this.userDao.save(new User("TEST2", password, true, ROLE_USER));


        Long priority = new Long(1);

        this.chartOfAccountsDao.save(new ChartOfAccounts(101.0, "Cash", "Asset", true, priority++, "Cash Related Accounts"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(105.0, "Petty Cash", "Asset", true, priority++, "Cash Related Accounts"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(121.0, "Notes Receivable", "Asset", true, priority++, "Receivables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(122.0, "Accounts Receivable", "Asset", true, priority++, "Receivables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(122.1, "Allowed for Bad Debts", "Asset", true, priority++, "Receivables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(123.0, "Interest Receivable (Also Accrued Interest Receivable)", "Asset", true, priority++, "Receivables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(125.0, "Common Stock Subscriptions Receivable", "Asset", true, priority++, "Receivables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(126.0, "Preferred Stock Subscriptions Receivable", "Asset", true, priority++, "Receivables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(131.0, "Merchandise Inventory", "Asset", true, priority++, "Inventories"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(132.0, "Raw Materials", "Asset", true, priority++, "Inventories"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(133.0, "Work in Process", "Asset", true, priority++, "Inventories"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(134.0, "Finished Goods", "Asset", true, priority++, "Inventories"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(141.0, "Supplies (Specialty Items like Medical, Bicycle, Tailoring, etc.", "Asset", true, priority++, "Prepaid Items"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(142.0, "Office Supplies", "Asset", true, priority++, "Prepaid Items"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(144.0, "Food Supplies", "Asset", true, priority++, "Prepaid Items"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(145.0, "Prepaid Insurance", "Asset", true, priority++, "Prepaid Items"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(146.0, "Prepaid Rent", "Asset", true, priority++, "Prepaid Items"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(153.0, "Bond Sinking Fund", "Asset", true, priority++, "Long-Term Investments"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(161.0, "Land", "Asset", true, priority++, "Land"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(162.0, "Natural Resources", "Asset", true, priority++, "Land"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(162.1, "Accumulated Depletion", "Asset", true, priority++, "Land"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(171.0, "Buildings", "Asset", true, priority++, "Buildings"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(171.1, "Accumulated Depreciation-Buildings", "Asset", true, priority++, "Buildings"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(181.0, "Office Equipment (Also Store Equipment)", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(181.1, "Accumulated Depreciation-Office Equipment(Also Store Equipment)", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(182.0, "Office Furniture", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(183.0, "Athletic Equipment (Also Tailoring, Lawn, Cleaning)", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(183.1, "Accumulated Depreciation-Athletic Equipment (Also Tailoring, Lawn, Cleaning) ", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(184.0, "Tennis Facilities (Also Basketball Facilities)", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(184.1, "Accumulated Depreciation-Tennis Facilities (Also Basketball Facilities)", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(185.0, "Delivery Equipment (Also Medical, Van)", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(185.1, "Accumulated Depreciation-Delivery Equipment (Also Medical, Van)", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(186.0, "Exercise Equipment", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(186.1, "Accumulated Depreciation-Exercise Equipment", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(187.0, "Computer Equipment", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(187.1, "Accumulated Depreciation-Computer Equipment", "Asset", true, priority++, "Equipment"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(190.0, "Patents", "Asset", true, priority++, "Intangibles"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(192.0, "Copyrights", "Asset", true, priority++, "Intangibles"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(193.0, "Organization Costs", "Asset", true, priority++, "Intangibles"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(201.0, "Notes Payable", "Liabilities", false, priority++, "Short-term Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(201.1, "Discount on Notes Payable", "Liabilities", false, priority++, "Short-term Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(202.0, "Accounts Payable (Also Vouchers Payable)", "Liabilities", false, priority++, "Short-term Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(203.0, "United Way Contribution Payable", "Liabilities", false, priority++, "Short-term Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(204.0, "Income Tax Payable", "Liabilities", false, priority++, "Short-term Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(205.0, "Common Dividends Payable", "Liabilities", false, priority++, "Short-term Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(206.0, "Preferred Dividends Payable", "Liabilities", false, priority++, "Short-term Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(211.0, "Employee Income Tax Payables", "Liabilities", false, priority++, "Employee Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(212.0, "Social Security Tax Payables", "Liabilities", false, priority++, "Employee Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(213.0, "Medicare tax Payable", "Liabilities", false, priority++, "Employee Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(215.0, "City Earnings Tax Payable", "Liabilities", false, priority++, "Employee Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(216.0, "Health Insurance Premiums Payable", "Liabilities", false, priority++, "Employee Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(217.0, "Credit Union Payable", "Liabilities", false, priority++, "Employee Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(218.0, "Savings Bond Deductions Payable", "Liabilities", false, priority++, "Employee Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(219.0, "Wages Payable", "Liabilities", false, priority++, "Employee Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(220.0, "Salaries Payable", "Liabilities", false, priority++, "Employee Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(221.0, "FUTA Tax Payable", "Liabilities", false, priority++, "Employer Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(222.0, "SUTA Tax Payable", "Liabilities", false, priority++, "Employer Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(223.0, "Workers' Compensation insurance payable", "Liabilities", false, priority++, "Employer Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(231.0, "Sales Tax Payable", "Liabilities", false, priority++, "Sales Tax"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(241.0, "Unearned Subscription Revenue (Also Unearned Ticket Revenue, Unearned Repair Fees)", "Liabilities", false, priority++, "Deferred Revenues and Current Portion of Long-Term Dept"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(242.0, "Current Portion of Mortgage Payable", "Liabilities", false, priority++, "Deferred Revenues and Current Portion of Long-Term Dept"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(243.0, "Unearned Revenue", "Liabilities", false, priority++, "Deferred Revenues and Current Portion of Long-Term Dept"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(251.0, "Mortgage Payable", "Liabilities", false, priority++, "Long-Term Liabilities"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(252.0, "Bonds Payable", "Liabilities", false, priority++, "Long-Term Liabilities"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(252.1, "Discount on Bonds Payable", "Liabilities", false, priority++, "Long-Term Liabilities"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(311.0, "Jessica Jane, Capital", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(312.0, "Jessica Jane, Drawing", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(313.0, "Income Summary", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(321.0, "Common Stock", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(321.1, "Common Treasury Stock", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(322.0, "Paid in Capital in Excess of Par/Stated Value-Common Stock", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(323.0, "Preferred Stock", "Owner's Equity", false, priority++, "SOwner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(323.1, "Preferred Treasury Stock", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(323.2, "Discount on Preferred Stock", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(324.0, "Paid in Capital in Excess of Par/Stated Value-Preferred Stock", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(325.0, "Retained Earnings", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(326.0, "Retained Earnings Approciated for...", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(327.0, "Common Stock Subscribed", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(328.0, "Preferred Stock Subscribed", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(329.0, "Paid in Capital from Sale of Treasury Stock", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(330.0, "Contributed Capital", "Owner's Equity", false, priority++, "Owner's Equity"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(401.1, "Delivery Fees", "Revenues", false, priority++, "Operating Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(401.2, "Appraisal Fees", "Revenues", false, priority++, "Operating Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(401.3, "Service Fees", "Revenues", false, priority++, "Operating Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(401.4, "Repair Fees", "Revenues", false, priority++, "Operating Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(401.5, "Sales", "Revenues", false, priority++, "Operating Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(401.6, "Sales Returns and Allowances", "Revenues", false, priority++, "Operating Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(401.7, "Sales Discounts", "Revenues", false, priority++, "Operating Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(402.0, "Boarding and Grooming Revenue", "Revenues", false, priority++, "Operating Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(403.0, "Subscriptions Revenue (If main line of business)", "Revenues", false, priority++, "Operating Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(411.0, "Interest Revenue", "Revenues", false, priority++, "Other Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(412.0, "Rent Revenue", "Revenues", false, priority++, "Other Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(413.0, "Subscription Revenue (If not main line of business)", "Revenues", false, priority++, "Other Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(414.0, "Sinking Fund Earning", "Revenues", false, priority++, "Other Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(415.0, "Uncollectible Accounts Recovered", "Revenues", false, priority++, "Other Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(416.0, "Gain on Sale/Exchange of Equipment", "Revenues", false, priority++, "Other Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(417.0, "Gain on Bonds Redeemed", "Revenues", false, priority++, "Other Revenues"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(501.0, "Purchases", "Operating Expenses", true, priority++, "Cost of Goods Sold"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(501.1, "Purchases Returns and Allowances", "Operating Expenses", true, priority++, "Cost of Goods Sold"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(501.2, "Purchases Discounts", "Operating Expenses", true, priority++, "Cost of Goods Sold"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(502.0, "Freight-in", "Operating Expenses", true, priority++, "Cost of Goods Sold"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(504.0, "Overhead", "Operating Expenses", true, priority++, "Cost of Goods Sold"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(505.0, "Cost of Goods Sold", "Operating Expenses", true, priority++, "Cost of Goods Sold"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(511.0, "Wages Expense (Also Wages and Salaries Expense)", "Operating Expenses", true, priority++, "Selling Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(512.0, "Advertising Expense", "Operating Expenses", true, priority++, "Selling Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(513.0, "Bank Credit Card Expense", "Operating Expenses", true, priority++, "Selling Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(514.0, "Store Supplies Expense", "Operating Expenses", true, priority++, "Selling Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(515.0, "Travel and Entertainment Expense", "Operating Expenses", true, priority++, "Selling Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(516.0, "Cash Short and Over", "Operating Expenses", true, priority++, "Selling Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(519.0, "Depreciation Expense-Store Equipment and Fixtures", "Operating Expenses", true, priority++, "Selling Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(521.0, "Rent Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(522.0, "Office Salaries Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(523.0, "Office Supplies Expenses (Also Medial)", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(524.0, "Other Supplies: Food Supplies Expense (Also Laboratory, Travel)", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(525.0, "Telephone Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(526.0, "Transportation/Automobile Expense (Also Laboratory, Travel", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(527.0, "Collection Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(528.0, "Inventory Short and Over", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(529.0, "Loss on Write Down of Inventory", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(530.0, "Payroll Taxes Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(531.0, "Workers' Compensation Insurance Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(532.0, "Bad Debt Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(533.0, "Electricity Expense, Utilities Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(534.0, "Charitable Contributions Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(535.0, "Insurance Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(536.0, "Postage Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(537.0, "Repair Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(538.0, "Oil and Gas Expense (Also Automobile Expense)", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(539.0, "Supplies Expenses", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(540.0, "Depreciation Expense-Building", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(541.0, "Depreciation Expense-Equipment (Also Tennis, Facilities, Delivery Equipment, Furniture)", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(542.0, "Depreciation Expense-Other Equipment (Medical Equipment,Exercise Equipment, Computer Equipment)", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(543.0, "Depletion Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(544.0, "Patent Amortization", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(545.0, "Amortization of Organization Cost", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(549.0, "Miscellaneous Expense", "Operating Expenses", true, priority++, "General And Administrative Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(551.0, "Interest Expense (Also Bond Interest Expense)", "Operating Expenses", true, priority++, "Other Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(552.0, "Loss on Discarded Equipment", "Operating Expenses", true, priority++, "Other Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(553.0, "Loss on Sale/Exchange of Equipment", "Operating Expenses", true, priority++, "Other Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(554.0, "Loss on Bonds Redeemed", "Operating Expenses", true, priority++, "Other Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(555.0, "Income Tax Expense", "Operating Expenses", true, priority++, "Other Expenses"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(560.0, "Dividends Declared", "Operating Expenses", true, priority++, "Other Expenses"));

        Account Temp = new Account(chartOfAccountsDao.findByName("Cash").getCode(), chartOfAccountsDao.findByName("Cash").getName(),chartOfAccountsDao.findByName("Cash").getType(), chartOfAccountsDao.findByName("Cash").getLeftNormalSide(), 0.00, chartOfAccountsDao.findByName("Cash").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Cash").getmGroup(), "");
        accountDao.save(Temp);
        Account Temp1 = new Account(chartOfAccountsDao.findByName("Accounts Receivable").getCode(), chartOfAccountsDao.findByName("Accounts Receivable").getName(),chartOfAccountsDao.findByName("Accounts Receivable").getType(), chartOfAccountsDao.findByName("Notes Receivable").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Accounts Receivable").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Accounts Receivable").getmGroup(), "");
        accountDao.save(Temp1);
        Account Temp2 = new Account(chartOfAccountsDao.findByName("Prepaid Insurance").getCode(), chartOfAccountsDao.findByName("Prepaid Insurance").getName(),chartOfAccountsDao.findByName("Prepaid Insurance").getType(), chartOfAccountsDao.findByName("Prepaid Insurance").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Prepaid Insurance").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Prepaid Insurance").getmGroup(), "");
        accountDao.save(Temp2);
        Account Temp3 = new Account(chartOfAccountsDao.findByName("Supplies (Specialty Items like Medical, Bicycle, Tailoring, etc.").getCode(), chartOfAccountsDao.findByName("Supplies (Specialty Items like Medical, Bicycle, Tailoring, etc.").getName(),chartOfAccountsDao.findByName("Supplies (Specialty Items like Medical, Bicycle, Tailoring, etc.").getType(), chartOfAccountsDao.findByName("Supplies (Specialty Items like Medical, Bicycle, Tailoring, etc.").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Supplies (Specialty Items like Medical, Bicycle, Tailoring, etc.").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Supplies (Specialty Items like Medical, Bicycle, Tailoring, etc.").getmGroup(), "");
        accountDao.save(Temp3);
        Account Temp4 = new Account(chartOfAccountsDao.findByName("Accumulated Depreciation-Office Equipment(Also Store Equipment)").getCode(), chartOfAccountsDao.findByName("Accumulated Depreciation-Office Equipment(Also Store Equipment)").getName(),chartOfAccountsDao.findByName("Accumulated Depreciation-Office Equipment(Also Store Equipment)").getType(), chartOfAccountsDao.findByName("Accumulated Depreciation-Office Equipment(Also Store Equipment)").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Accumulated Depreciation-Office Equipment(Also Store Equipment)").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Accumulated Depreciation-Office Equipment(Also Store Equipment)").getmGroup(), "");
        accountDao.save(Temp4);
        Account Temp5 = new Account(chartOfAccountsDao.findByName("Office Equipment (Also Store Equipment)").getCode(), chartOfAccountsDao.findByName("Office Equipment (Also Store Equipment)").getName(),chartOfAccountsDao.findByName("Office Equipment (Also Store Equipment)").getType(), chartOfAccountsDao.findByName("Office Equipment (Also Store Equipment)").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Office Equipment (Also Store Equipment)").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Office Equipment (Also Store Equipment)").getmGroup(), "");
        accountDao.save(Temp5);
        Account Temp6 = new Account(chartOfAccountsDao.findByName("Accounts Payable (Also Vouchers Payable)").getCode(), chartOfAccountsDao.findByName("Accounts Payable (Also Vouchers Payable)").getName(),chartOfAccountsDao.findByName("Accounts Payable (Also Vouchers Payable)").getType(), chartOfAccountsDao.findByName("Accounts Payable (Also Vouchers Payable)").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Accounts Payable (Also Vouchers Payable)").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Accounts Payable (Also Vouchers Payable)").getmGroup(), "");
        accountDao.save(Temp6);
        Account Temp7 = new Account(chartOfAccountsDao.findByName("Prepaid Rent").getCode(), chartOfAccountsDao.findByName("Prepaid Rent").getName(),chartOfAccountsDao.findByName("Prepaid Rent").getType(), chartOfAccountsDao.findByName("Prepaid Rent").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Prepaid Rent").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Prepaid Rent").getmGroup(), "");
        accountDao.save(Temp7);
        Account Temp8 = new Account(chartOfAccountsDao.findByName("Insurance Expense").getCode(), chartOfAccountsDao.findByName("Insurance Expense").getName(),chartOfAccountsDao.findByName("Insurance Expense").getType(), chartOfAccountsDao.findByName("Insurance Expense").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Insurance Expense").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Insurance Expense").getmGroup(), "");
        accountDao.save(Temp8);
        Account Temp9 = new Account(chartOfAccountsDao.findByName("Retained Earnings").getCode(), chartOfAccountsDao.findByName("Retained Earnings").getName(),chartOfAccountsDao.findByName("Retained Earnings").getType(), chartOfAccountsDao.findByName("Retained Earnings").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Retained Earnings").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Retained Earnings").getmGroup(), "");
        accountDao.save(Temp9);
        Account Temp10 = new Account(chartOfAccountsDao.findByName("Service Fees").getCode(), chartOfAccountsDao.findByName("Service Fees").getName(),chartOfAccountsDao.findByName("Service Fees").getType(), chartOfAccountsDao.findByName("Service Fees").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Service Fees").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Service Fees").getmGroup(), "");
        accountDao.save(Temp10);
        Account Temp11 = new Account(chartOfAccountsDao.findByName("Depreciation Expense-Store Equipment and Fixtures").getCode(), chartOfAccountsDao.findByName("Depreciation Expense-Store Equipment and Fixtures").getName(),chartOfAccountsDao.findByName("Depreciation Expense-Store Equipment and Fixtures").getType(), chartOfAccountsDao.findByName("Depreciation Expense-Store Equipment and Fixtures").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Depreciation Expense-Store Equipment and Fixtures").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Depreciation Expense-Store Equipment and Fixtures").getmGroup(), "");
        accountDao.save(Temp11);
        Account Temp12 = new Account(chartOfAccountsDao.findByName("Rent Expense").getCode(), chartOfAccountsDao.findByName("Rent Expense").getName(),chartOfAccountsDao.findByName("Rent Expense").getType(), chartOfAccountsDao.findByName("Rent Expense").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Rent Expense").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Rent Expense").getmGroup(), "");
        accountDao.save(Temp12);
        Account Temp13 = new Account(chartOfAccountsDao.findByName("Office Salaries Expense").getCode(), chartOfAccountsDao.findByName("Office Salaries Expense").getName(),chartOfAccountsDao.findByName("Office Salaries Expense").getType(), chartOfAccountsDao.findByName("Office Salaries Expense").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Office Salaries Expense").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Office Salaries Expense").getmGroup(), "");
        accountDao.save(Temp13);
        Account Temp14 = new Account(chartOfAccountsDao.findByName("Telephone Expense").getCode(), chartOfAccountsDao.findByName("Telephone Expense").getName(),chartOfAccountsDao.findByName("Telephone Expense").getType(), chartOfAccountsDao.findByName("Telephone Expense").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Telephone Expense").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Telephone Expense").getmGroup(), "");
        accountDao.save(Temp14);
        Account Temp15 = new Account(chartOfAccountsDao.findByName("Electricity Expense, Utilities Expense").getCode(), chartOfAccountsDao.findByName("Electricity Expense, Utilities Expense").getName(),chartOfAccountsDao.findByName("Electricity Expense, Utilities Expense").getType(), chartOfAccountsDao.findByName("Electricity Expense, Utilities Expense").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Electricity Expense, Utilities Expense").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Electricity Expense, Utilities Expense").getmGroup(), "");
        accountDao.save(Temp15);
        Account Temp16 = new Account(chartOfAccountsDao.findByName("Advertising Expense").getCode(), chartOfAccountsDao.findByName("Advertising Expense").getName(),chartOfAccountsDao.findByName("Advertising Expense").getType(), chartOfAccountsDao.findByName("Advertising Expense").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Advertising Expense").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Advertising Expense").getmGroup(), "");
        accountDao.save(Temp16);
        Account Temp17 = new Account(chartOfAccountsDao.findByName("Unearned Revenue").getCode(), chartOfAccountsDao.findByName("Unearned Revenue").getName(),chartOfAccountsDao.findByName("Unearned Revenue").getType(), chartOfAccountsDao.findByName("Unearned Revenue").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Unearned Revenue").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Unearned Revenue").getmGroup(), "");
        accountDao.save(Temp17);
        Account Temp18 = new Account(chartOfAccountsDao.findByName("Supplies Expenses").getCode(), chartOfAccountsDao.findByName("Supplies Expenses").getName(),chartOfAccountsDao.findByName("Supplies Expenses").getType(), chartOfAccountsDao.findByName("Supplies Expenses").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Supplies Expenses").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Supplies Expenses").getmGroup(), "");
        accountDao.save(Temp18);
        Account Temp19 = new Account(chartOfAccountsDao.findByName("Contributed Capital").getCode(), chartOfAccountsDao.findByName("Contributed Capital").getName(),chartOfAccountsDao.findByName("Contributed Capital").getType(), chartOfAccountsDao.findByName("Contributed Capital").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Contributed Capital").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Contributed Capital").getmGroup(), "");
        accountDao.save(Temp19);
        Account Temp20 = new Account(chartOfAccountsDao.findByName("Dividends Declared").getCode(), chartOfAccountsDao.findByName("Dividends Declared").getName(),chartOfAccountsDao.findByName("Dividends Declared").getType(), chartOfAccountsDao.findByName("Dividends Declared").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Dividends Declared").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Dividends Declared").getmGroup(), "");
        accountDao.save(Temp20);
        Account Temp21 = new Account(chartOfAccountsDao.findByName("Salaries Payable").getCode(), chartOfAccountsDao.findByName("Salaries Payable").getName(),chartOfAccountsDao.findByName("Salaries Payable").getType(), chartOfAccountsDao.findByName("Salaries Payable").getLeftNormalSide(), 0.0, chartOfAccountsDao.findByName("Salaries Payable").getPriority(), userDao.findByUsername("cnix"),"4/03/2017", true, chartOfAccountsDao.findByName("Salaries Payable").getmGroup(), "");
        accountDao.save(Temp21);
    }
}
