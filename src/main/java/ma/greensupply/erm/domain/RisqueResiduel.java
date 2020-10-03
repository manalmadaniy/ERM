package ma.greensupply.erm.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A RisqueResiduel.
 */
@Entity
@Table(name = "risque_residuel")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RisqueResiduel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "impact")
    private Integer impact;

    @Column(name = "probabilite")
    private Integer probabilite;

    @Column(name = "detection")
    private Integer detection;

    @OneToOne

    @MapsId
    @JoinColumn(name = "id")
    private Risque risque;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getImpact() {
        return impact;
    }

    public RisqueResiduel impact(Integer impact) {
        this.impact = impact;
        return this;
    }

    public void setImpact(Integer impact) {
        this.impact = impact;
    }

    public Integer getProbabilite() {
        return probabilite;
    }

    public RisqueResiduel probabilite(Integer probabilite) {
        this.probabilite = probabilite;
        return this;
    }

    public void setProbabilite(Integer probabilite) {
        this.probabilite = probabilite;
    }

    public Integer getDetection() {
        return detection;
    }

    public RisqueResiduel detection(Integer detection) {
        this.detection = detection;
        return this;
    }

    public void setDetection(Integer detection) {
        this.detection = detection;
    }

    public Risque getRisque() {
        return risque;
    }

    public RisqueResiduel risque(Risque risque) {
        this.risque = risque;
        return this;
    }

    public void setRisque(Risque risque) {
        this.risque = risque;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RisqueResiduel)) {
            return false;
        }
        return id != null && id.equals(((RisqueResiduel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RisqueResiduel{" +
            "id=" + getId() +
            ", impact=" + getImpact() +
            ", probabilite=" + getProbabilite() +
            ", detection=" + getDetection() +
            "}";
    }
}
