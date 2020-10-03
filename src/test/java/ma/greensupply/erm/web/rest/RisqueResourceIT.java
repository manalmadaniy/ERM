package ma.greensupply.erm.web.rest;

import ma.greensupply.erm.KompliansApp;
import ma.greensupply.erm.domain.Risque;
import ma.greensupply.erm.repository.RisqueRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RisqueResource} REST controller.
 */
@SpringBootTest(classes = KompliansApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RisqueResourceIT {

    private static final String DEFAULT_RISQUENOM = "AAAAAAAAAA";
    private static final String UPDATED_RISQUENOM = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRISQUE = "AAAAAAAAAA";
    private static final String UPDATED_DESCRISQUE = "BBBBBBBBBB";

    private static final Long DEFAULT_IMPACT = 1L;
    private static final Long UPDATED_IMPACT = 2L;

    private static final Long DEFAULT_PROBABILITY = 1L;
    private static final Long UPDATED_PROBABILITY = 2L;

    private static final Long DEFAULT_DETECTION = 1L;
    private static final Long UPDATED_DETECTION = 2L;

    @Autowired
    private RisqueRepository risqueRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRisqueMockMvc;

    private Risque risque;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Risque createEntity(EntityManager em) {
        Risque risque = new Risque()
            .risquenom(DEFAULT_RISQUENOM)
            .descrisque(DEFAULT_DESCRISQUE)
            .impact(DEFAULT_IMPACT)
            .probability(DEFAULT_PROBABILITY)
            .detection(DEFAULT_DETECTION);
        return risque;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Risque createUpdatedEntity(EntityManager em) {
        Risque risque = new Risque()
            .risquenom(UPDATED_RISQUENOM)
            .descrisque(UPDATED_DESCRISQUE)
            .impact(UPDATED_IMPACT)
            .probability(UPDATED_PROBABILITY)
            .detection(UPDATED_DETECTION);
        return risque;
    }

    @BeforeEach
    public void initTest() {
        risque = createEntity(em);
    }

    @Test
    @Transactional
    public void createRisque() throws Exception {
        int databaseSizeBeforeCreate = risqueRepository.findAll().size();
        // Create the Risque
        restRisqueMockMvc.perform(post("/api/risques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(risque)))
            .andExpect(status().isCreated());

        // Validate the Risque in the database
        List<Risque> risqueList = risqueRepository.findAll();
        assertThat(risqueList).hasSize(databaseSizeBeforeCreate + 1);
        Risque testRisque = risqueList.get(risqueList.size() - 1);
        assertThat(testRisque.getRisquenom()).isEqualTo(DEFAULT_RISQUENOM);
        assertThat(testRisque.getDescrisque()).isEqualTo(DEFAULT_DESCRISQUE);
        assertThat(testRisque.getImpact()).isEqualTo(DEFAULT_IMPACT);
        assertThat(testRisque.getProbability()).isEqualTo(DEFAULT_PROBABILITY);
        assertThat(testRisque.getDetection()).isEqualTo(DEFAULT_DETECTION);
    }

    @Test
    @Transactional
    public void createRisqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = risqueRepository.findAll().size();

        // Create the Risque with an existing ID
        risque.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRisqueMockMvc.perform(post("/api/risques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(risque)))
            .andExpect(status().isBadRequest());

        // Validate the Risque in the database
        List<Risque> risqueList = risqueRepository.findAll();
        assertThat(risqueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRisques() throws Exception {
        // Initialize the database
        risqueRepository.saveAndFlush(risque);

        // Get all the risqueList
        restRisqueMockMvc.perform(get("/api/risques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(risque.getId().intValue())))
            .andExpect(jsonPath("$.[*].risquenom").value(hasItem(DEFAULT_RISQUENOM)))
            .andExpect(jsonPath("$.[*].descrisque").value(hasItem(DEFAULT_DESCRISQUE)))
            .andExpect(jsonPath("$.[*].impact").value(hasItem(DEFAULT_IMPACT.intValue())))
            .andExpect(jsonPath("$.[*].probability").value(hasItem(DEFAULT_PROBABILITY.intValue())))
            .andExpect(jsonPath("$.[*].detection").value(hasItem(DEFAULT_DETECTION.intValue())));
    }
    
    @Test
    @Transactional
    public void getRisque() throws Exception {
        // Initialize the database
        risqueRepository.saveAndFlush(risque);

        // Get the risque
        restRisqueMockMvc.perform(get("/api/risques/{id}", risque.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(risque.getId().intValue()))
            .andExpect(jsonPath("$.risquenom").value(DEFAULT_RISQUENOM))
            .andExpect(jsonPath("$.descrisque").value(DEFAULT_DESCRISQUE))
            .andExpect(jsonPath("$.impact").value(DEFAULT_IMPACT.intValue()))
            .andExpect(jsonPath("$.probability").value(DEFAULT_PROBABILITY.intValue()))
            .andExpect(jsonPath("$.detection").value(DEFAULT_DETECTION.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingRisque() throws Exception {
        // Get the risque
        restRisqueMockMvc.perform(get("/api/risques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRisque() throws Exception {
        // Initialize the database
        risqueRepository.saveAndFlush(risque);

        int databaseSizeBeforeUpdate = risqueRepository.findAll().size();

        // Update the risque
        Risque updatedRisque = risqueRepository.findById(risque.getId()).get();
        // Disconnect from session so that the updates on updatedRisque are not directly saved in db
        em.detach(updatedRisque);
        updatedRisque
            .risquenom(UPDATED_RISQUENOM)
            .descrisque(UPDATED_DESCRISQUE)
            .impact(UPDATED_IMPACT)
            .probability(UPDATED_PROBABILITY)
            .detection(UPDATED_DETECTION);

        restRisqueMockMvc.perform(put("/api/risques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRisque)))
            .andExpect(status().isOk());

        // Validate the Risque in the database
        List<Risque> risqueList = risqueRepository.findAll();
        assertThat(risqueList).hasSize(databaseSizeBeforeUpdate);
        Risque testRisque = risqueList.get(risqueList.size() - 1);
        assertThat(testRisque.getRisquenom()).isEqualTo(UPDATED_RISQUENOM);
        assertThat(testRisque.getDescrisque()).isEqualTo(UPDATED_DESCRISQUE);
        assertThat(testRisque.getImpact()).isEqualTo(UPDATED_IMPACT);
        assertThat(testRisque.getProbability()).isEqualTo(UPDATED_PROBABILITY);
        assertThat(testRisque.getDetection()).isEqualTo(UPDATED_DETECTION);
    }

    @Test
    @Transactional
    public void updateNonExistingRisque() throws Exception {
        int databaseSizeBeforeUpdate = risqueRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRisqueMockMvc.perform(put("/api/risques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(risque)))
            .andExpect(status().isBadRequest());

        // Validate the Risque in the database
        List<Risque> risqueList = risqueRepository.findAll();
        assertThat(risqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRisque() throws Exception {
        // Initialize the database
        risqueRepository.saveAndFlush(risque);

        int databaseSizeBeforeDelete = risqueRepository.findAll().size();

        // Delete the risque
        restRisqueMockMvc.perform(delete("/api/risques/{id}", risque.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Risque> risqueList = risqueRepository.findAll();
        assertThat(risqueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
