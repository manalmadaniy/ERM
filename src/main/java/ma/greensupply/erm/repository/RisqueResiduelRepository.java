package ma.greensupply.erm.repository;

import ma.greensupply.erm.domain.RisqueResiduel;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RisqueResiduel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RisqueResiduelRepository extends JpaRepository<RisqueResiduel, Long> {
}
