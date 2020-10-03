package ma.greensupply.erm.repository;

import ma.greensupply.erm.domain.ProprietaireAction;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ProprietaireAction entity.
 */
@Repository
public interface ProprietaireActionRepository extends JpaRepository<ProprietaireAction, Long> {

    @Query(value = "select distinct proprietaireAction from ProprietaireAction proprietaireAction left join fetch proprietaireAction.risqueactions",
        countQuery = "select count(distinct proprietaireAction) from ProprietaireAction proprietaireAction")
    Page<ProprietaireAction> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct proprietaireAction from ProprietaireAction proprietaireAction left join fetch proprietaireAction.risqueactions")
    List<ProprietaireAction> findAllWithEagerRelationships();

    @Query("select proprietaireAction from ProprietaireAction proprietaireAction left join fetch proprietaireAction.risqueactions where proprietaireAction.id =:id")
    Optional<ProprietaireAction> findOneWithEagerRelationships(@Param("id") Long id);
}
