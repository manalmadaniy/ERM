package ma.greensupply.erm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Risqueaction.
 */
@Entity
@Table(name = "risqueaction")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Risqueaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "action")
    private String action;

    @Column(name = "planaction")
    private String planaction;

    @Column(name = "temps_action")
    private Long tempsAction;

    @Column(name = "cout_action")
    private Long coutAction;

    @ManyToOne
    @JsonIgnoreProperties(value = "risqueactions", allowSetters = true)
    private Risque risque;

    @ManyToOne
    @JsonIgnoreProperties(value = "risqueactions", allowSetters = true)
    private ProprietaireAction proprietaireAction;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAction() {
        return action;
    }

    public Risqueaction action(String action) {
        this.action = action;
        return this;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getPlanaction() {
        return planaction;
    }

    public Risqueaction planaction(String planaction) {
        this.planaction = planaction;
        return this;
    }

    public void setPlanaction(String planaction) {
        this.planaction = planaction;
    }

    public Long getTempsAction() {
        return tempsAction;
    }

    public Risqueaction tempsAction(Long tempsAction) {
        this.tempsAction = tempsAction;
        return this;
    }

    public void setTempsAction(Long tempsAction) {
        this.tempsAction = tempsAction;
    }

    public Long getCoutAction() {
        return coutAction;
    }

    public Risqueaction coutAction(Long coutAction) {
        this.coutAction = coutAction;
        return this;
    }

    public void setCoutAction(Long coutAction) {
        this.coutAction = coutAction;
    }

    public Risque getRisque() {
        return risque;
    }

    public Risqueaction risque(Risque risque) {
        this.risque = risque;
        return this;
    }

    public void setRisque(Risque risque) {
        this.risque = risque;
    }

    public ProprietaireAction getProprietaireAction() {
        return proprietaireAction;
    }

    public Risqueaction proprietaireAction(ProprietaireAction proprietaireAction) {
        this.proprietaireAction = proprietaireAction;
        return this;
    }

    public void setProprietaireAction(ProprietaireAction proprietaireAction) {
        this.proprietaireAction = proprietaireAction;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Risqueaction)) {
            return false;
        }
        return id != null && id.equals(((Risqueaction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Risqueaction{" +
            "id=" + getId() +
            ", action='" + getAction() + "'" +
            ", planaction='" + getPlanaction() + "'" +
            ", tempsAction=" + getTempsAction() +
            ", coutAction=" + getCoutAction() +
            "}";
    }
}
