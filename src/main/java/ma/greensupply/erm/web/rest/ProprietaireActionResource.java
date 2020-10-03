package ma.greensupply.erm.web.rest;

import ma.greensupply.erm.domain.ProprietaireAction;
import ma.greensupply.erm.repository.ProprietaireActionRepository;
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
 * REST controller for managing {@link ma.greensupply.erm.domain.ProprietaireAction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProprietaireActionResource {

    private final Logger log = LoggerFactory.getLogger(ProprietaireActionResource.class);

    private static final String ENTITY_NAME = "proprietaireAction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProprietaireActionRepository proprietaireActionRepository;

    public ProprietaireActionResource(ProprietaireActionRepository proprietaireActionRepository) {
        this.proprietaireActionRepository = proprietaireActionRepository;
    }

    /**
     * {@code POST  /proprietaire-actions} : Create a new proprietaireAction.
     *
     * @param proprietaireAction the proprietaireAction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proprietaireAction, or with status {@code 400 (Bad Request)} if the proprietaireAction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/proprietaire-actions")
    public ResponseEntity<ProprietaireAction> createProprietaireAction(@RequestBody ProprietaireAction proprietaireAction) throws URISyntaxException {
        log.debug("REST request to save ProprietaireAction : {}", proprietaireAction);
        if (proprietaireAction.getId() != null) {
            throw new BadRequestAlertException("A new proprietaireAction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProprietaireAction result = proprietaireActionRepository.save(proprietaireAction);
        return ResponseEntity.created(new URI("/api/proprietaire-actions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /proprietaire-actions} : Updates an existing proprietaireAction.
     *
     * @param proprietaireAction the proprietaireAction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proprietaireAction,
     * or with status {@code 400 (Bad Request)} if the proprietaireAction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proprietaireAction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/proprietaire-actions")
    public ResponseEntity<ProprietaireAction> updateProprietaireAction(@RequestBody ProprietaireAction proprietaireAction) throws URISyntaxException {
        log.debug("REST request to update ProprietaireAction : {}", proprietaireAction);
        if (proprietaireAction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProprietaireAction result = proprietaireActionRepository.save(proprietaireAction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, proprietaireAction.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /proprietaire-actions} : get all the proprietaireActions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of proprietaireActions in body.
     */
    @GetMapping("/proprietaire-actions")
    public List<ProprietaireAction> getAllProprietaireActions(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all ProprietaireActions");
        return proprietaireActionRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /proprietaire-actions/:id} : get the "id" proprietaireAction.
     *
     * @param id the id of the proprietaireAction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proprietaireAction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/proprietaire-actions/{id}")
    public ResponseEntity<ProprietaireAction> getProprietaireAction(@PathVariable Long id) {
        log.debug("REST request to get ProprietaireAction : {}", id);
        Optional<ProprietaireAction> proprietaireAction = proprietaireActionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(proprietaireAction);
    }

    /**
     * {@code DELETE  /proprietaire-actions/:id} : delete the "id" proprietaireAction.
     *
     * @param id the id of the proprietaireAction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/proprietaire-actions/{id}")
    public ResponseEntity<Void> deleteProprietaireAction(@PathVariable Long id) {
        log.debug("REST request to delete ProprietaireAction : {}", id);
        proprietaireActionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
