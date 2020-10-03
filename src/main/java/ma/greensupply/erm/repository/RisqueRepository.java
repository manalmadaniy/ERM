package ma.greensupply.erm.repository;

import ma.greensupply.erm.domain.Risque;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Risque entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RisqueRepository extends JpaRepository<Risque, Long> {
}
