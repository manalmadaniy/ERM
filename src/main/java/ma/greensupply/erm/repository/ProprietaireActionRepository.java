package ma.greensupply.erm.repository;

import ma.greensupply.erm.domain.ProprietaireAction;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProprietaireAction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProprietaireActionRepository extends JpaRepository<ProprietaireAction, Long> {
}
