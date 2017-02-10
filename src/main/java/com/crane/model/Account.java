package com.crane.model;

import javax.persistence.*;
import java.util.*;

/**
 * Created by nixc1 on 2/8/17.
 */

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double code;

    @Column(unique = true)
    private String name;

    private String type;

    private Boolean isLeftNormalSide;

    private Long initialBalance;

    private Long priority;

    @ManyToOne //todo: this may need to be OneToMany
    @JoinColumn(name = "user_id")
    private User addedBy;

    private String addedByUsername;

    private Date addedOn;

    private Boolean active;

    private String mGroup;

    public Account(Double code, String name, String type, Boolean isLeftNormalSide, Long initialBalance, Long priority, User addedBy, Date addedOn, Boolean active, String mGroup, String comment) {
        this.code = code;
        this.name = name;
        this.type = type;
        this.isLeftNormalSide = isLeftNormalSide;
        this.initialBalance = initialBalance;
        this.priority = priority;
        this.addedBy = addedBy;
        this.addedOn = addedOn;
        this.active = active;
        this.mGroup = mGroup;
        this.comment = comment;
    }

    private String comment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getCode() {
        return code;
    }

    public void setCode(Double code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getLeftNormalSide() {
        return isLeftNormalSide;
    }

    public void setLeftNormalSide(Boolean leftNormalSide) {
        isLeftNormalSide = leftNormalSide;
    }

    public Long getInitialBalance() {
        return initialBalance;
    }

    public void setInitialBalance(Long initialBalance) {
        this.initialBalance = initialBalance;
    }

    public Long getPriority() {
        return priority;
    }

    public void setPriority(Long priority) {
        this.priority = priority;
    }

    public User getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(User addedBy) {
        this.addedBy = addedBy;
    }

    public String getAddedByUsername() {
        return addedByUsername;
    }

    public void setAddedByUsername(String addedByUsername) {
        this.addedByUsername = addedByUsername;
    }

    public Date getAddedOn() {
        return addedOn;
    }

    public void setAddedOn(Date addedOn) {
        this.addedOn = addedOn;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getmGroup() {
        return mGroup;
    }

    public void setmGroup(String mGroup) {
        this.mGroup = mGroup;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Account() {
    }

    public Account(String name, Double code, Long initialBalance, User addedBy, Date addedOn, String comment) {
        this.name = name;
        this.code = code;
        this.initialBalance = initialBalance;
        this.addedBy = addedBy;
        this.addedOn = addedOn;
        this.comment = comment;
    }

    public Account(String name, String type, Boolean isLeftNormalSide, Long priority, String mGroup) {
        this.name = name;
        this.type = type;
        this.isLeftNormalSide = isLeftNormalSide;
        this.priority = priority;
        this.mGroup = mGroup;
    }
}
