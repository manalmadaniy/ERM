package ma.greensupply.erm.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Risque.
 */
@Entity
@Table(name = "risque")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Risque implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "risquenom")
    private String risquenom;

    @Column(name = "descrisque")
    private String descrisque;

    @Column(name = "impact")
    private Long impact;

    @Column(name = "probability")
    private Long probability;

    @Column(name = "detection")
    private Long detection;

    @OneToMany(mappedBy = "risque")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<RisqueAnalyse> risqueanalyses = new HashSet<>();

    @OneToMany(mappedBy = "risque")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Risqueaction> risqueactions = new HashSet<>();

    @ManyToMany(mappedBy = "risques")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Process> processuses = new HashSet<>();

    @OneToOne(mappedBy = "risque")
    @JsonIgnore
    private RisqueResiduel risqueResiduel;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRisquenom() {
        return risquenom;
    }

    public Risque risquenom(String risquenom) {
        this.risquenom = risquenom;
        return this;
    }

    public void setRisquenom(String risquenom) {
        this.risquenom = risquenom;
    }

    public String getDescrisque() {
        return descrisque;
    }

    public Risque descrisque(String descrisque) {
        this.descrisque = descrisque;
        return this;
    }

    public void setDescrisque(String descrisque) {
        this.descrisque = descrisque;
    }

    public Long getImpact() {
        return impact;
    }

    public Risque impact(Long impact) {
        this.impact = impact;
        return this;
    }

    public void setImpact(Long impact) {
        this.impact = impact;
    }

    public Long getProbability() {
        return probability;
    }

    public Risque probability(Long probability) {
        this.probability = probability;
        return this;
    }

    public void setProbability(Long probability) {
        this.probability = probability;
    }

    public Long getDetection() {
        return detection;
    }

    public Risque detection(Long detection) {
        this.detection = detection;
        return this;
    }

    public void setDetection(Long detection) {
        this.detection = detection;
    }

    public Set<RisqueAnalyse> getRisqueanalyses() {
        return risqueanalyses;
    }

    public Risque risqueanalyses(Set<RisqueAnalyse> risqueAnalyses) {
        this.risqueanalyses = risqueAnalyses;
        return this;
    }

    public Risque addRisqueanalyse(RisqueAnalyse risqueAnalyse) {
        this.risqueanalyses.add(risqueAnalyse);
        risqueAnalyse.setRisque(this);
        return this;
    }

    public Risque removeRisqueanalyse(RisqueAnalyse risqueAnalyse) {
        this.risqueanalyses.remove(risqueAnalyse);
        risqueAnalyse.setRisque(null);
        return this;
    }

    public void setRisqueanalyses(Set<RisqueAnalyse> risqueAnalyses) {
        this.risqueanalyses = risqueAnalyses;
    }

    public Set<Risqueaction> getRisqueactions() {
        return risqueactions;
    }

    public Risque risqueactions(Set<Risqueaction> risqueactions) {
        this.risqueactions = risqueactions;
        return this;
    }

    public Risque addRisqueaction(Risqueaction risqueaction) {
        this.risqueactions.add(risqueaction);
        risqueaction.setRisque(this);
        return this;
    }

    public Risque removeRisqueaction(Risqueaction risqueaction) {
        this.risqueactions.remove(risqueaction);
        risqueaction.setRisque(null);
        return this;
    }

    public void setRisqueactions(Set<Risqueaction> risqueactions) {
        this.risqueactions = risqueactions;
    }

    public Set<Process> getProcessuses() {
        return processuses;
    }

    public Risque processuses(Set<Process> processes) {
        this.processuses = processes;
        return this;
    }

    public Risque addProcessus(Process process) {
        this.processuses.add(process);
        process.getRisques().add(this);
        return this;
    }

    public Risque removeProcessus(Process process) {
        this.processuses.remove(process);
        process.getRisques().remove(this);
        return this;
    }

    public void setProcessuses(Set<Process> processes) {
        this.processuses = processes;
    }

    public RisqueResiduel getRisqueResiduel() {
        return risqueResiduel;
    }

    public Risque risqueResiduel(RisqueResiduel risqueResiduel) {
        this.risqueResiduel = risqueResiduel;
        return this;
    }

    public void setRisqueResiduel(RisqueResiduel risqueResiduel) {
        this.risqueResiduel = risqueResiduel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Risque)) {
            return false;
        }
        return id != null && id.equals(((Risque) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Risque{" +
            "id=" + getId() +
            ", risquenom='" + getRisquenom() + "'" +
            ", descrisque='" + getDescrisque() + "'" +
            ", impact=" + getImpact() +
            ", probability=" + getProbability() +
            ", detection=" + getDetection() +
            "}";
    }
}
