package com.crane.web;

import com.crane.dao.AccountDao;
import com.crane.dao.ChartOfAccountsDao;
import com.crane.dao.UserDao;
import com.crane.dao.RoleDao;
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


    @Autowired
    public DatabaseLoader(UserDao userDao, RoleDao roleDao, ChartOfAccountsDao chartOfAccountsDao) {
        this.userDao = userDao;
        this.roleDao = roleDao;
        this.chartOfAccountsDao = chartOfAccountsDao;
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
        this.chartOfAccountsDao.save(new ChartOfAccounts(221.0, "FUTA Tax Payable", "Liabilities", false, priority++, "Employer Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(222.0, "SUTA Tax Payable", "Liabilities", false, priority++, "Employer Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(223.0, "Workers' Compensation insurance payable", "Liabilities", false, priority++, "Employer Payroll Related Payables"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(231.0, "Sales Tax Payable", "Liabilities", false, priority++, "Sales Tax"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(241.0, "Unearned Subscription Revenue (Also Unearned Ticket Revenue, Unearned Repair Fees)", "Liabilities", false, priority++, "Deferred Revenues and Current Portion of Long-Term Dept"));
        this.chartOfAccountsDao.save(new ChartOfAccounts(242.0, "Current Portion of Mortgage Payable", "Liabilities", false, priority++, "Deferred Revenues and Current Portion of Long-Term Dept"));
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


    }
}
