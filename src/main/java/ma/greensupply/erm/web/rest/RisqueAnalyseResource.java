package ma.greensupply.erm.web.rest;

import ma.greensupply.erm.domain.RisqueAnalyse;
import ma.greensupply.erm.repository.RisqueAnalyseRepository;
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
 * REST controller for managing {@link ma.greensupply.erm.domain.RisqueAnalyse}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RisqueAnalyseResource {

    private final Logger log = LoggerFactory.getLogger(RisqueAnalyseResource.class);

    private static final String ENTITY_NAME = "risqueAnalyse";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RisqueAnalyseRepository risqueAnalyseRepository;

    public RisqueAnalyseResource(RisqueAnalyseRepository risqueAnalyseRepository) {
        this.risqueAnalyseRepository = risqueAnalyseRepository;
    }

    /**
     * {@code POST  /risque-analyses} : Create a new risqueAnalyse.
     *
     * @param risqueAnalyse the risqueAnalyse to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new risqueAnalyse, or with status {@code 400 (Bad Request)} if the risqueAnalyse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/risque-analyses")
    public ResponseEntity<RisqueAnalyse> createRisqueAnalyse(@RequestBody RisqueAnalyse risqueAnalyse) throws URISyntaxException {
        log.debug("REST request to save RisqueAnalyse : {}", risqueAnalyse);
        if (risqueAnalyse.getId() != null) {
            throw new BadRequestAlertException("A new risqueAnalyse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RisqueAnalyse result = risqueAnalyseRepository.save(risqueAnalyse);
        return ResponseEntity.created(new URI("/api/risque-analyses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /risque-analyses} : Updates an existing risqueAnalyse.
     *
     * @param risqueAnalyse the risqueAnalyse to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated risqueAnalyse,
     * or with status {@code 400 (Bad Request)} if the risqueAnalyse is not valid,
     * or with status {@code 500 (Internal Server Error)} if the risqueAnalyse couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/risque-analyses")
    public ResponseEntity<RisqueAnalyse> updateRisqueAnalyse(@RequestBody RisqueAnalyse risqueAnalyse) throws URISyntaxException {
        log.debug("REST request to update RisqueAnalyse : {}", risqueAnalyse);
        if (risqueAnalyse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RisqueAnalyse result = risqueAnalyseRepository.save(risqueAnalyse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, risqueAnalyse.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /risque-analyses} : get all the risqueAnalyses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of risqueAnalyses in body.
     */
    @GetMapping("/risque-analyses")
    public List<RisqueAnalyse> getAllRisqueAnalyses() {
        log.debug("REST request to get all RisqueAnalyses");
        return risqueAnalyseRepository.findAll();
    }

    /**
     * {@code GET  /risque-analyses/:id} : get the "id" risqueAnalyse.
     *
     * @param id the id of the risqueAnalyse to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the risqueAnalyse, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/risque-analyses/{id}")
    public ResponseEntity<RisqueAnalyse> getRisqueAnalyse(@PathVariable Long id) {
        log.debug("REST request to get RisqueAnalyse : {}", id);
        Optional<RisqueAnalyse> risqueAnalyse = risqueAnalyseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(risqueAnalyse);
    }

    /**
     * {@code DELETE  /risque-analyses/:id} : delete the "id" risqueAnalyse.
     *
     * @param id the id of the risqueAnalyse to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/risque-analyses/{id}")
    public ResponseEntity<Void> deleteRisqueAnalyse(@PathVariable Long id) {
        log.debug("REST request to delete RisqueAnalyse : {}", id);
        risqueAnalyseRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
