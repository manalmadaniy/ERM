package ma.greensupply.erm.repository;

import ma.greensupply.erm.domain.Risqueaction;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Risqueaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RisqueactionRepository extends JpaRepository<Risqueaction, Long> {
}
