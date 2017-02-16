package com.crane.model;

import javax.persistence.*;

/**
 * Created by nixc1 on 2/8/17.
 */
@Entity
public class ChartOfAccounts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long publicId;

    @Column(unique = true)
    private Double code;

    @Column(unique = true)
    private String name;

    private String type;
    private Boolean isLeftNormalSide;

    @Column(unique = true)
    private Long priority;
    private String mGroup;

    public ChartOfAccounts() {
    }

    public ChartOfAccounts(Double code, String name, String type, Boolean isLeftNormalSide, Long priority, String mGroup) {
        this.publicId = id;
        this.code = code;
        this.name = name;
        this.type = type;
        this.isLeftNormalSide = isLeftNormalSide;
        this.priority = priority;
        this.mGroup = mGroup;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Long getPublicId() {
        return id;
    }

    public Double getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public Boolean getLeftNormalSide() {
        return isLeftNormalSide;
    }

    public Long getPriority() {
        return priority;
    }

    public String getmGroup() {
        return mGroup;
    }

}
