package com.crane.model;

import com.crane.model.Account;
import com.crane.model.User;

import javax.persistence.*;

/**
 * Created by nixc1 on 2/17/17.
 */
@Entity
public class Transaction {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long publicId;

  @ManyToOne
  @JoinColumn(name = "account_id")
  private Account account;

  private Double amount;

  @ManyToOne //todo: this may need to be OneToMany
  @JoinColumn(name = "user_id")
  private User addedBy;

  private Boolean isDebit;

  private String accountName;

  private Long accountId;

  private String addedByUsername;

  public Transaction(Account account, Double amount, User addedBy, Boolean isDebit, String accountName, String addByUsername) {
      this.account = account;
      this.amount = amount;
      this.addedBy = addedBy;
      this.isDebit = isDebit;
      this.accountName = accountName;
      this.addedByUsername = addByUsername;
  }

  public Transaction(Account account, Double amount, User addedBy, Boolean isDebit) {
      this.account = account;
      this.amount = amount;
      this.addedBy = addedBy;
      this.isDebit = isDebit;
  }

  public Transaction() {
  }

  public Long getId() {
      return id;
  }

  public void setId(Long id) {
      this.id = id;
  }

  public Long getPublicId() {
      return id;
  }

  public Account getAccount() {
      return account;
  }

  public void setAccount(Account account) {
      this.account = account;
  }

  public Double getAmount() {
      return amount;
  }

  public void setAmount(Double amount) {
      this.amount = amount;
  }

  public User getAddedBy() {
      return addedBy;
  }

  public void setAddedBy(User addedBy) {
      this.addedBy = addedBy;
  }

  public Boolean getDebit() {
      return isDebit;
  }

  public void setDebit(Boolean debit) {
      isDebit = debit;
  }

  public String getAccountName() {
      return accountName;
  }

  public void setAccountName(String accountName) {
      this.accountName = accountName;
  }

  public Long getAccountId() {
    Long id = -1L;
    if (account != null) {
      id = account.getId();
    }
    return id;
  }

  public String getAddedByUsername() {
        return addedByUsername;
    }

  public void setAddedByUsername(String addByUsername) {
        this.addedByUsername = addByUsername;
    }
}
