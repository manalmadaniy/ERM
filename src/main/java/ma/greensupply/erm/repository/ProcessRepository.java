package ma.greensupply.erm.repository;

import ma.greensupply.erm.domain.Process;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Process entity.
 */
@Repository
public interface ProcessRepository extends JpaRepository<Process, Long> {

    @Query(value = "select distinct process from Process process left join fetch process.risques",
        countQuery = "select count(distinct process) from Process process")
    Page<Process> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct process from Process process left join fetch process.risques")
    List<Process> findAllWithEagerRelationships();

    @Query("select process from Process process left join fetch process.risques where process.id =:id")
    Optional<Process> findOneWithEagerRelationships(@Param("id") Long id);
}
