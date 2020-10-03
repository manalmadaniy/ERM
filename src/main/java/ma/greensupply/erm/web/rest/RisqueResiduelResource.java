package ma.greensupply.erm.web.rest;

import ma.greensupply.erm.domain.RisqueResiduel;
import ma.greensupply.erm.repository.RisqueResiduelRepository;
import ma.greensupply.erm.repository.RisqueRepository;
import ma.greensupply.erm.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * REST controller for managing {@link ma.greensupply.erm.domain.RisqueResiduel}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RisqueResiduelResource {

    private final Logger log = LoggerFactory.getLogger(RisqueResiduelResource.class);

    private static final String ENTITY_NAME = "risqueResiduel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RisqueResiduelRepository risqueResiduelRepository;

    private final RisqueRepository risqueRepository;

    public RisqueResiduelResource(RisqueResiduelRepository risqueResiduelRepository, RisqueRepository risqueRepository) {
        this.risqueResiduelRepository = risqueResiduelRepository;
        this.risqueRepository = risqueRepository;
    }

    /**
     * {@code POST  /risque-residuels} : Create a new risqueResiduel.
     *
     * @param risqueResiduel the risqueResiduel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new risqueResiduel, or with status {@code 400 (Bad Request)} if the risqueResiduel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/risque-residuels")
    public ResponseEntity<RisqueResiduel> createRisqueResiduel(@RequestBody RisqueResiduel risqueResiduel) throws URISyntaxException {
        log.debug("REST request to save RisqueResiduel : {}", risqueResiduel);
        if (risqueResiduel.getId() != null) {
            throw new BadRequestAlertException("A new risqueResiduel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (Objects.isNull(risqueResiduel.getRisque())) {
            throw new BadRequestAlertException("Invalid association value provided", ENTITY_NAME, "null");
        }
        Long risqueId = risqueResiduel.getRisque().getId();
        risqueRepository.findById(risqueId).ifPresent(risqueResiduel::risque);
        RisqueResiduel result = risqueResiduelRepository.save(risqueResiduel);
        return ResponseEntity.created(new URI("/api/risque-residuels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /risque-residuels} : Updates an existing risqueResiduel.
     *
     * @param risqueResiduel the risqueResiduel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated risqueResiduel,
     * or with status {@code 400 (Bad Request)} if the risqueResiduel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the risqueResiduel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/risque-residuels")
    public ResponseEntity<RisqueResiduel> updateRisqueResiduel(@RequestBody RisqueResiduel risqueResiduel) throws URISyntaxException {
        log.debug("REST request to update RisqueResiduel : {}", risqueResiduel);
        if (risqueResiduel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RisqueResiduel result = risqueResiduelRepository.save(risqueResiduel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, risqueResiduel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /risque-residuels} : get all the risqueResiduels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of risqueResiduels in body.
     */
    @GetMapping("/risque-residuels")
    @Transactional(readOnly = true)
    public List<RisqueResiduel> getAllRisqueResiduels() {
        log.debug("REST request to get all RisqueResiduels");
        return risqueResiduelRepository.findAll();
    }

    /**
     * {@code GET  /risque-residuels/:id} : get the "id" risqueResiduel.
     *
     * @param id the id of the risqueResiduel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the risqueResiduel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/risque-residuels/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<RisqueResiduel> getRisqueResiduel(@PathVariable Long id) {
        log.debug("REST request to get RisqueResiduel : {}", id);
        Optional<RisqueResiduel> risqueResiduel = risqueResiduelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(risqueResiduel);
    }

    /**
     * {@code DELETE  /risque-residuels/:id} : delete the "id" risqueResiduel.
     *
     * @param id the id of the risqueResiduel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/risque-residuels/{id}")
    public ResponseEntity<Void> deleteRisqueResiduel(@PathVariable Long id) {
        log.debug("REST request to delete RisqueResiduel : {}", id);
        risqueResiduelRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
