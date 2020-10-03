package ma.greensupply.erm.repository;

import ma.greensupply.erm.domain.RisqueAnalyse;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RisqueAnalyse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RisqueAnalyseRepository extends JpaRepository<RisqueAnalyse, Long> {
}
