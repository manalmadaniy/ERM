package ma.greensupply.erm.web.rest;

import ma.greensupply.erm.KompliansApp;
import ma.greensupply.erm.domain.RisqueResiduel;
import ma.greensupply.erm.domain.Risque;
import ma.greensupply.erm.repository.RisqueResiduelRepository;
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
 * Integration tests for the {@link RisqueResiduelResource} REST controller.
 */
@SpringBootTest(classes = KompliansApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RisqueResiduelResourceIT {

    private static final Integer DEFAULT_IMPACT = 1;
    private static final Integer UPDATED_IMPACT = 2;

    private static final Integer DEFAULT_PROBABILITE = 1;
    private static final Integer UPDATED_PROBABILITE = 2;

    private static final Integer DEFAULT_DETECTION = 1;
    private static final Integer UPDATED_DETECTION = 2;

    @Autowired
    private RisqueResiduelRepository risqueResiduelRepository;
    @Autowired
    private RisqueRepository risqueRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRisqueResiduelMockMvc;

    private RisqueResiduel risqueResiduel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RisqueResiduel createEntity(EntityManager em) {
        RisqueResiduel risqueResiduel = new RisqueResiduel()
            .impact(DEFAULT_IMPACT)
            .probabilite(DEFAULT_PROBABILITE)
            .detection(DEFAULT_DETECTION);
        // Add required entity
        Risque risque;
        if (TestUtil.findAll(em, Risque.class).isEmpty()) {
            risque = RisqueResourceIT.createEntity(em);
            em.persist(risque);
            em.flush();
        } else {
            risque = TestUtil.findAll(em, Risque.class).get(0);
        }
        risqueResiduel.setRisque(risque);
        return risqueResiduel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RisqueResiduel createUpdatedEntity(EntityManager em) {
        RisqueResiduel risqueResiduel = new RisqueResiduel()
            .impact(UPDATED_IMPACT)
            .probabilite(UPDATED_PROBABILITE)
            .detection(UPDATED_DETECTION);
        // Add required entity
        Risque risque;
        if (TestUtil.findAll(em, Risque.class).isEmpty()) {
            risque = RisqueResourceIT.createUpdatedEntity(em);
            em.persist(risque);
            em.flush();
        } else {
            risque = TestUtil.findAll(em, Risque.class).get(0);
        }
        risqueResiduel.setRisque(risque);
        return risqueResiduel;
    }

    @BeforeEach
    public void initTest() {
        risqueResiduel = createEntity(em);
    }

    @Test
    @Transactional
    public void createRisqueResiduel() throws Exception {
        int databaseSizeBeforeCreate = risqueResiduelRepository.findAll().size();
        // Create the RisqueResiduel
        restRisqueResiduelMockMvc.perform(post("/api/risque-residuels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(risqueResiduel)))
            .andExpect(status().isCreated());

        // Validate the RisqueResiduel in the database
        List<RisqueResiduel> risqueResiduelList = risqueResiduelRepository.findAll();
        assertThat(risqueResiduelList).hasSize(databaseSizeBeforeCreate + 1);
        RisqueResiduel testRisqueResiduel = risqueResiduelList.get(risqueResiduelList.size() - 1);
        assertThat(testRisqueResiduel.getImpact()).isEqualTo(DEFAULT_IMPACT);
        assertThat(testRisqueResiduel.getProbabilite()).isEqualTo(DEFAULT_PROBABILITE);
        assertThat(testRisqueResiduel.getDetection()).isEqualTo(DEFAULT_DETECTION);

        // Validate the id for MapsId, the ids must be same
        assertThat(testRisqueResiduel.getId()).isEqualTo(testRisqueResiduel.getRisque().getId());
    }

    @Test
    @Transactional
    public void createRisqueResiduelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = risqueResiduelRepository.findAll().size();

        // Create the RisqueResiduel with an existing ID
        risqueResiduel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRisqueResiduelMockMvc.perform(post("/api/risque-residuels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(risqueResiduel)))
            .andExpect(status().isBadRequest());

        // Validate the RisqueResiduel in the database
        List<RisqueResiduel> risqueResiduelList = risqueResiduelRepository.findAll();
        assertThat(risqueResiduelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void updateRisqueResiduelMapsIdAssociationWithNewId() throws Exception {
        // Initialize the database
        risqueResiduelRepository.saveAndFlush(risqueResiduel);
        int databaseSizeBeforeCreate = risqueResiduelRepository.findAll().size();

        // Add a new parent entity
        Risque risque = RisqueResourceIT.createUpdatedEntity(em);
        em.persist(risque);
        em.flush();

        // Load the risqueResiduel
        RisqueResiduel updatedRisqueResiduel = risqueResiduelRepository.findById(risqueResiduel.getId()).get();
        // Disconnect from session so that the updates on updatedRisqueResiduel are not directly saved in db
        em.detach(updatedRisqueResiduel);

        // Update the Risque with new association value
        updatedRisqueResiduel.setRisque(risque);

        // Update the entity
        restRisqueResiduelMockMvc.perform(put("/api/risque-residuels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRisqueResiduel)))
            .andExpect(status().isOk());

        // Validate the RisqueResiduel in the database
        List<RisqueResiduel> risqueResiduelList = risqueResiduelRepository.findAll();
        assertThat(risqueResiduelList).hasSize(databaseSizeBeforeCreate);
        RisqueResiduel testRisqueResiduel = risqueResiduelList.get(risqueResiduelList.size() - 1);

        // Validate the id for MapsId, the ids must be same
        // Uncomment the following line for assertion. However, please note that there is a known issue and uncommenting will fail the test.
        // Please look at https://github.com/jhipster/generator-jhipster/issues/9100. You can modify this test as necessary.
        // assertThat(testRisqueResiduel.getId()).isEqualTo(testRisqueResiduel.getRisque().getId());
    }

    @Test
    @Transactional
    public void getAllRisqueResiduels() throws Exception {
        // Initialize the database
        risqueResiduelRepository.saveAndFlush(risqueResiduel);

        // Get all the risqueResiduelList
        restRisqueResiduelMockMvc.perform(get("/api/risque-residuels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(risqueResiduel.getId().intValue())))
            .andExpect(jsonPath("$.[*].impact").value(hasItem(DEFAULT_IMPACT)))
            .andExpect(jsonPath("$.[*].probabilite").value(hasItem(DEFAULT_PROBABILITE)))
            .andExpect(jsonPath("$.[*].detection").value(hasItem(DEFAULT_DETECTION)));
    }
    
    @Test
    @Transactional
    public void getRisqueResiduel() throws Exception {
        // Initialize the database
        risqueResiduelRepository.saveAndFlush(risqueResiduel);

        // Get the risqueResiduel
        restRisqueResiduelMockMvc.perform(get("/api/risque-residuels/{id}", risqueResiduel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(risqueResiduel.getId().intValue()))
            .andExpect(jsonPath("$.impact").value(DEFAULT_IMPACT))
            .andExpect(jsonPath("$.probabilite").value(DEFAULT_PROBABILITE))
            .andExpect(jsonPath("$.detection").value(DEFAULT_DETECTION));
    }
    @Test
    @Transactional
    public void getNonExistingRisqueResiduel() throws Exception {
        // Get the risqueResiduel
        restRisqueResiduelMockMvc.perform(get("/api/risque-residuels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRisqueResiduel() throws Exception {
        // Initialize the database
        risqueResiduelRepository.saveAndFlush(risqueResiduel);

        int databaseSizeBeforeUpdate = risqueResiduelRepository.findAll().size();

        // Update the risqueResiduel
        RisqueResiduel updatedRisqueResiduel = risqueResiduelRepository.findById(risqueResiduel.getId()).get();
        // Disconnect from session so that the updates on updatedRisqueResiduel are not directly saved in db
        em.detach(updatedRisqueResiduel);
        updatedRisqueResiduel
            .impact(UPDATED_IMPACT)
            .probabilite(UPDATED_PROBABILITE)
            .detection(UPDATED_DETECTION);

        restRisqueResiduelMockMvc.perform(put("/api/risque-residuels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRisqueResiduel)))
            .andExpect(status().isOk());

        // Validate the RisqueResiduel in the database
        List<RisqueResiduel> risqueResiduelList = risqueResiduelRepository.findAll();
        assertThat(risqueResiduelList).hasSize(databaseSizeBeforeUpdate);
        RisqueResiduel testRisqueResiduel = risqueResiduelList.get(risqueResiduelList.size() - 1);
        assertThat(testRisqueResiduel.getImpact()).isEqualTo(UPDATED_IMPACT);
        assertThat(testRisqueResiduel.getProbabilite()).isEqualTo(UPDATED_PROBABILITE);
        assertThat(testRisqueResiduel.getDetection()).isEqualTo(UPDATED_DETECTION);
    }

    @Test
    @Transactional
    public void updateNonExistingRisqueResiduel() throws Exception {
        int databaseSizeBeforeUpdate = risqueResiduelRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRisqueResiduelMockMvc.perform(put("/api/risque-residuels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(risqueResiduel)))
            .andExpect(status().isBadRequest());

        // Validate the RisqueResiduel in the database
        List<RisqueResiduel> risqueResiduelList = risqueResiduelRepository.findAll();
        assertThat(risqueResiduelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRisqueResiduel() throws Exception {
        // Initialize the database
        risqueResiduelRepository.saveAndFlush(risqueResiduel);

        int databaseSizeBeforeDelete = risqueResiduelRepository.findAll().size();

        // Delete the risqueResiduel
        restRisqueResiduelMockMvc.perform(delete("/api/risque-residuels/{id}", risqueResiduel.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RisqueResiduel> risqueResiduelList = risqueResiduelRepository.findAll();
        assertThat(risqueResiduelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
