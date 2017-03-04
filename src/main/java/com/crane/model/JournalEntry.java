package com.crane.model;

import javax.persistence.*;
import java.util.List;

/**
 * Created by nixc1 on 2/19/17.
 */

@Entity
public class JournalEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany
    @JoinColumn(name = "transaction_id")
    private List<Transaction> transaction;

    @ManyToOne //todo: this may need to be OneToMany
    @JoinColumn(name = "user_id")
    private User addedBy;

    private String addedOn;

    private Long publicId;

    private Boolean posted;

    private Boolean rejected;

    private String rejectionReason;

    public JournalEntry(List<Transaction> transaction, User addedBy, String addedOn, Boolean posted) {
        this.transaction = transaction;
        this.addedBy = addedBy;
        this.addedOn = addedOn;
        this.posted = posted;
    }

    public JournalEntry() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Transaction> getTransaction() {
        return transaction;
    }

    public void setTransaction(List<Transaction> transaction) {
        this.transaction = transaction;
    }

    public User getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(User addedBy) {
        this.addedBy = addedBy;
    }

    public String getAddedOn() {
        return addedOn;
    }

    public void setAddedOn(String addedOn) {
        this.addedOn = addedOn;
    }

    public Long getPublicId() {
        return id;
    }

    public Boolean getPosted() {
        return posted;
    }

    public void setPosted(Boolean posted) {
        this.posted = posted;
    }

    public Boolean getRejected() {
        return rejected;
    }

    public void setRejected(Boolean rejected) {
        this.rejected = rejected;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}
