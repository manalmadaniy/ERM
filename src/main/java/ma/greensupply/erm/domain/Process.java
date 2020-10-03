package ma.greensupply.erm.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Process.
 */
@Entity
@Table(name = "process")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Process implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_process")
    private String nameProcess;

    @Column(name = "fonction")
    private String fonction;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private String date;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "process_risque",
               joinColumns = @JoinColumn(name = "process_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "risque_id", referencedColumnName = "id"))
    private Set<Risque> risques = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameProcess() {
        return nameProcess;
    }

    public Process nameProcess(String nameProcess) {
        this.nameProcess = nameProcess;
        return this;
    }

    public void setNameProcess(String nameProcess) {
        this.nameProcess = nameProcess;
    }

    public String getFonction() {
        return fonction;
    }

    public Process fonction(String fonction) {
        this.fonction = fonction;
        return this;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
    }

    public String getDescription() {
        return description;
    }

    public Process description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public Process date(String date) {
        this.date = date;
        return this;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Set<Risque> getRisques() {
        return risques;
    }

    public Process risques(Set<Risque> risques) {
        this.risques = risques;
        return this;
    }

    public Process addRisque(Risque risque) {
        this.risques.add(risque);
        risque.getProcessuses().add(this);
        return this;
    }

    public Process removeRisque(Risque risque) {
        this.risques.remove(risque);
        risque.getProcessuses().remove(this);
        return this;
    }

    public void setRisques(Set<Risque> risques) {
        this.risques = risques;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Process)) {
            return false;
        }
        return id != null && id.equals(((Process) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Process{" +
            "id=" + getId() +
            ", nameProcess='" + getNameProcess() + "'" +
            ", fonction='" + getFonction() + "'" +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
