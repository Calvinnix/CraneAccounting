package com.crane.model;

import javax.persistence.*;
import java.util.ArrayList;
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

    public JournalEntry(List<Transaction> transaction, User addedBy) {
        this.transaction = transaction;
        this.addedBy = addedBy;
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

    public void setTransaction(ArrayList<Transaction> transaction) {
        this.transaction = transaction;
    }

    public User getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(User addedBy) {
        this.addedBy = addedBy;
    }
}
