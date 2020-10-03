package ma.greensupply.erm.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ProprietaireAction.
 */
@Entity
@Table(name = "proprietaire_action")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProprietaireAction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "email")
    private String email;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "proprietaire_action_risqueaction",
               joinColumns = @JoinColumn(name = "proprietaire_action_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "risqueaction_id", referencedColumnName = "id"))
    private Set<Risqueaction> risqueactions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public ProprietaireAction nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public ProprietaireAction prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public ProprietaireAction email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Risqueaction> getRisqueactions() {
        return risqueactions;
    }

    public ProprietaireAction risqueactions(Set<Risqueaction> risqueactions) {
        this.risqueactions = risqueactions;
        return this;
    }

    public ProprietaireAction addRisqueaction(Risqueaction risqueaction) {
        this.risqueactions.add(risqueaction);
        risqueaction.getProprietaireActions().add(this);
        return this;
    }

    public ProprietaireAction removeRisqueaction(Risqueaction risqueaction) {
        this.risqueactions.remove(risqueaction);
        risqueaction.getProprietaireActions().remove(this);
        return this;
    }

    public void setRisqueactions(Set<Risqueaction> risqueactions) {
        this.risqueactions = risqueactions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProprietaireAction)) {
            return false;
        }
        return id != null && id.equals(((ProprietaireAction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProprietaireAction{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
