package org.tokenator.opentokenizer.domain.entity;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.ForeignKey;
import org.tokenator.opentokenizer.util.DateSerializer;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Date;

import static org.tokenator.opentokenizer.util.DateSerializer.DATE_FORMAT;

@Entity
@Table(name = "surrogate_data", indexes = {
        @Index(name = "sur_san_ex_idx",  columnList="san,expr,time", unique = true)
    }
)
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
@JsonPropertyOrder({"id", "san", "expr","time"})
public class SurrogateData {

    @Id
    @GeneratedValue
    private Long id;


    @Column(name = "san", nullable = false)
    private String san; // surrogate account number
    
    @Column(name = "time",nullable = false)
    private String time;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "expr", nullable = false)
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern=DATE_FORMAT, timezone="UTC")
    @JsonSerialize(using = DateSerializer.class)
    private Date expr;

    @ManyToOne
    @NotNull
    @JoinColumn(name="primary_data_id", nullable = false)
    @ForeignKey(name="fk_surrogate_primary")
    @JsonBackReference
    private PrimaryData primaryData;

    public SurrogateData() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSan() {
        return san;
    }

    public void setSan(String san) {
        this.san = san;
    }
    
    
    public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Date getExpr() {
        return expr;
    }

    public void setExpr(Date expr) {
        this.expr = expr;
    }

    public PrimaryData getPrimaryData() {
        return primaryData;
    }

    public void setPrimaryData(PrimaryData primaryData) {
        this.primaryData = primaryData;
    }
}