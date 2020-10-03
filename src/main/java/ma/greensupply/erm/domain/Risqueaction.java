package ma.greensupply.erm.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany(mappedBy = "risqueactions")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<ProprietaireAction> proprietaireActions = new HashSet<>();

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

    public Set<ProprietaireAction> getProprietaireActions() {
        return proprietaireActions;
    }

    public Risqueaction proprietaireActions(Set<ProprietaireAction> proprietaireActions) {
        this.proprietaireActions = proprietaireActions;
        return this;
    }

    public Risqueaction addProprietaireAction(ProprietaireAction proprietaireAction) {
        this.proprietaireActions.add(proprietaireAction);
        proprietaireAction.getRisqueactions().add(this);
        return this;
    }

    public Risqueaction removeProprietaireAction(ProprietaireAction proprietaireAction) {
        this.proprietaireActions.remove(proprietaireAction);
        proprietaireAction.getRisqueactions().remove(this);
        return this;
    }

    public void setProprietaireActions(Set<ProprietaireAction> proprietaireActions) {
        this.proprietaireActions = proprietaireActions;
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
