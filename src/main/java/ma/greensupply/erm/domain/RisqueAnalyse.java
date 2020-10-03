package ma.greensupply.erm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A RisqueAnalyse.
 */
@Entity
@Table(name = "risque_analyse")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RisqueAnalyse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "risque_cause")
    private String risqueCause;

    @Column(name = "type_cause")
    private String typeCause;

    @Column(name = "risque_cons")
    private String risqueCons;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties(value = "risqueanalyses", allowSetters = true)
    private Risque risque;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRisqueCause() {
        return risqueCause;
    }

    public RisqueAnalyse risqueCause(String risqueCause) {
        this.risqueCause = risqueCause;
        return this;
    }

    public void setRisqueCause(String risqueCause) {
        this.risqueCause = risqueCause;
    }

    public String getTypeCause() {
        return typeCause;
    }

    public RisqueAnalyse typeCause(String typeCause) {
        this.typeCause = typeCause;
        return this;
    }

    public void setTypeCause(String typeCause) {
        this.typeCause = typeCause;
    }

    public String getRisqueCons() {
        return risqueCons;
    }

    public RisqueAnalyse risqueCons(String risqueCons) {
        this.risqueCons = risqueCons;
        return this;
    }

    public void setRisqueCons(String risqueCons) {
        this.risqueCons = risqueCons;
    }

    public String getDescription() {
        return description;
    }

    public RisqueAnalyse description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Risque getRisque() {
        return risque;
    }

    public RisqueAnalyse risque(Risque risque) {
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
        if (!(o instanceof RisqueAnalyse)) {
            return false;
        }
        return id != null && id.equals(((RisqueAnalyse) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RisqueAnalyse{" +
            "id=" + getId() +
            ", risqueCause='" + getRisqueCause() + "'" +
            ", typeCause='" + getTypeCause() + "'" +
            ", risqueCons='" + getRisqueCons() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
