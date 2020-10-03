package ma.greensupply.erm.web.rest;

import ma.greensupply.erm.domain.Risque;
import ma.greensupply.erm.repository.RisqueRepository;
import ma.greensupply.erm.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link ma.greensupply.erm.domain.Risque}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RisqueResource {

    private final Logger log = LoggerFactory.getLogger(RisqueResource.class);

    private static final String ENTITY_NAME = "risque";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RisqueRepository risqueRepository;

    public RisqueResource(RisqueRepository risqueRepository) {
        this.risqueRepository = risqueRepository;
    }

    /**
     * {@code POST  /risques} : Create a new risque.
     *
     * @param risque the risque to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new risque, or with status {@code 400 (Bad Request)} if the risque has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/risques")
    public ResponseEntity<Risque> createRisque(@RequestBody Risque risque) throws URISyntaxException {
        log.debug("REST request to save Risque : {}", risque);
        if (risque.getId() != null) {
            throw new BadRequestAlertException("A new risque cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Risque result = risqueRepository.save(risque);
        return ResponseEntity.created(new URI("/api/risques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /risques} : Updates an existing risque.
     *
     * @param risque the risque to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated risque,
     * or with status {@code 400 (Bad Request)} if the risque is not valid,
     * or with status {@code 500 (Internal Server Error)} if the risque couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/risques")
    public ResponseEntity<Risque> updateRisque(@RequestBody Risque risque) throws URISyntaxException {
        log.debug("REST request to update Risque : {}", risque);
        if (risque.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Risque result = risqueRepository.save(risque);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, risque.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /risques} : get all the risques.
     *
     * @param pageable the pagination information.
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of risques in body.
     */
    @GetMapping("/risques")
    public ResponseEntity<List<Risque>> getAllRisques(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("risqueresiduel-is-null".equals(filter)) {
            log.debug("REST request to get all Risques where risqueResiduel is null");
            return new ResponseEntity<>(StreamSupport
                .stream(risqueRepository.findAll().spliterator(), false)
                .filter(risque -> risque.getRisqueResiduel() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of Risques");
        Page<Risque> page = risqueRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /risques/:id} : get the "id" risque.
     *
     * @param id the id of the risque to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the risque, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/risques/{id}")
    public ResponseEntity<Risque> getRisque(@PathVariable Long id) {
        log.debug("REST request to get Risque : {}", id);
        Optional<Risque> risque = risqueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(risque);
    }

    /**
     * {@code DELETE  /risques/:id} : delete the "id" risque.
     *
     * @param id the id of the risque to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/risques/{id}")
    public ResponseEntity<Void> deleteRisque(@PathVariable Long id) {
        log.debug("REST request to delete Risque : {}", id);
        risqueRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
