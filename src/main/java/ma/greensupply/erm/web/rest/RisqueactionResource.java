package ma.greensupply.erm.web.rest;

import ma.greensupply.erm.domain.Risqueaction;
import ma.greensupply.erm.repository.RisqueactionRepository;
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
import java.util.Optional;

/**
 * REST controller for managing {@link ma.greensupply.erm.domain.Risqueaction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RisqueactionResource {

    private final Logger log = LoggerFactory.getLogger(RisqueactionResource.class);

    private static final String ENTITY_NAME = "risqueaction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RisqueactionRepository risqueactionRepository;

    public RisqueactionResource(RisqueactionRepository risqueactionRepository) {
        this.risqueactionRepository = risqueactionRepository;
    }

    /**
     * {@code POST  /risqueactions} : Create a new risqueaction.
     *
     * @param risqueaction the risqueaction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new risqueaction, or with status {@code 400 (Bad Request)} if the risqueaction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/risqueactions")
    public ResponseEntity<Risqueaction> createRisqueaction(@RequestBody Risqueaction risqueaction) throws URISyntaxException {
        log.debug("REST request to save Risqueaction : {}", risqueaction);
        if (risqueaction.getId() != null) {
            throw new BadRequestAlertException("A new risqueaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Risqueaction result = risqueactionRepository.save(risqueaction);
        return ResponseEntity.created(new URI("/api/risqueactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /risqueactions} : Updates an existing risqueaction.
     *
     * @param risqueaction the risqueaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated risqueaction,
     * or with status {@code 400 (Bad Request)} if the risqueaction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the risqueaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/risqueactions")
    public ResponseEntity<Risqueaction> updateRisqueaction(@RequestBody Risqueaction risqueaction) throws URISyntaxException {
        log.debug("REST request to update Risqueaction : {}", risqueaction);
        if (risqueaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Risqueaction result = risqueactionRepository.save(risqueaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, risqueaction.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /risqueactions} : get all the risqueactions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of risqueactions in body.
     */
    @GetMapping("/risqueactions")
    public List<Risqueaction> getAllRisqueactions() {
        log.debug("REST request to get all Risqueactions");
        return risqueactionRepository.findAll();
    }

    /**
     * {@code GET  /risqueactions/:id} : get the "id" risqueaction.
     *
     * @param id the id of the risqueaction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the risqueaction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/risqueactions/{id}")
    public ResponseEntity<Risqueaction> getRisqueaction(@PathVariable Long id) {
        log.debug("REST request to get Risqueaction : {}", id);
        Optional<Risqueaction> risqueaction = risqueactionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(risqueaction);
    }

    /**
     * {@code DELETE  /risqueactions/:id} : delete the "id" risqueaction.
     *
     * @param id the id of the risqueaction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/risqueactions/{id}")
    public ResponseEntity<Void> deleteRisqueaction(@PathVariable Long id) {
        log.debug("REST request to delete Risqueaction : {}", id);
        risqueactionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
