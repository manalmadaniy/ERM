package ma.greensupply.erm.web.rest;

import ma.greensupply.erm.KompliansApp;
import ma.greensupply.erm.domain.RisqueAnalyse;
import ma.greensupply.erm.repository.RisqueAnalyseRepository;

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
 * Integration tests for the {@link RisqueAnalyseResource} REST controller.
 */
@SpringBootTest(classes = KompliansApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RisqueAnalyseResourceIT {

    private static final String DEFAULT_RISQUE_CAUSE = "AAAAAAAAAA";
    private static final String UPDATED_RISQUE_CAUSE = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE_CAUSE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_CAUSE = "BBBBBBBBBB";

    private static final String DEFAULT_RISQUE_CONS = "AAAAAAAAAA";
    private static final String UPDATED_RISQUE_CONS = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private RisqueAnalyseRepository risqueAnalyseRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRisqueAnalyseMockMvc;

    private RisqueAnalyse risqueAnalyse;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RisqueAnalyse createEntity(EntityManager em) {
        RisqueAnalyse risqueAnalyse = new RisqueAnalyse()
            .risqueCause(DEFAULT_RISQUE_CAUSE)
            .typeCause(DEFAULT_TYPE_CAUSE)
            .risqueCons(DEFAULT_RISQUE_CONS)
            .description(DEFAULT_DESCRIPTION);
        return risqueAnalyse;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RisqueAnalyse createUpdatedEntity(EntityManager em) {
        RisqueAnalyse risqueAnalyse = new RisqueAnalyse()
            .risqueCause(UPDATED_RISQUE_CAUSE)
            .typeCause(UPDATED_TYPE_CAUSE)
            .risqueCons(UPDATED_RISQUE_CONS)
            .description(UPDATED_DESCRIPTION);
        return risqueAnalyse;
    }

    @BeforeEach
    public void initTest() {
        risqueAnalyse = createEntity(em);
    }

    @Test
    @Transactional
    public void createRisqueAnalyse() throws Exception {
        int databaseSizeBeforeCreate = risqueAnalyseRepository.findAll().size();
        // Create the RisqueAnalyse
        restRisqueAnalyseMockMvc.perform(post("/api/risque-analyses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(risqueAnalyse)))
            .andExpect(status().isCreated());

        // Validate the RisqueAnalyse in the database
        List<RisqueAnalyse> risqueAnalyseList = risqueAnalyseRepository.findAll();
        assertThat(risqueAnalyseList).hasSize(databaseSizeBeforeCreate + 1);
        RisqueAnalyse testRisqueAnalyse = risqueAnalyseList.get(risqueAnalyseList.size() - 1);
        assertThat(testRisqueAnalyse.getRisqueCause()).isEqualTo(DEFAULT_RISQUE_CAUSE);
        assertThat(testRisqueAnalyse.getTypeCause()).isEqualTo(DEFAULT_TYPE_CAUSE);
        assertThat(testRisqueAnalyse.getRisqueCons()).isEqualTo(DEFAULT_RISQUE_CONS);
        assertThat(testRisqueAnalyse.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createRisqueAnalyseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = risqueAnalyseRepository.findAll().size();

        // Create the RisqueAnalyse with an existing ID
        risqueAnalyse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRisqueAnalyseMockMvc.perform(post("/api/risque-analyses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(risqueAnalyse)))
            .andExpect(status().isBadRequest());

        // Validate the RisqueAnalyse in the database
        List<RisqueAnalyse> risqueAnalyseList = risqueAnalyseRepository.findAll();
        assertThat(risqueAnalyseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRisqueAnalyses() throws Exception {
        // Initialize the database
        risqueAnalyseRepository.saveAndFlush(risqueAnalyse);

        // Get all the risqueAnalyseList
        restRisqueAnalyseMockMvc.perform(get("/api/risque-analyses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(risqueAnalyse.getId().intValue())))
            .andExpect(jsonPath("$.[*].risqueCause").value(hasItem(DEFAULT_RISQUE_CAUSE)))
            .andExpect(jsonPath("$.[*].typeCause").value(hasItem(DEFAULT_TYPE_CAUSE)))
            .andExpect(jsonPath("$.[*].risqueCons").value(hasItem(DEFAULT_RISQUE_CONS)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getRisqueAnalyse() throws Exception {
        // Initialize the database
        risqueAnalyseRepository.saveAndFlush(risqueAnalyse);

        // Get the risqueAnalyse
        restRisqueAnalyseMockMvc.perform(get("/api/risque-analyses/{id}", risqueAnalyse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(risqueAnalyse.getId().intValue()))
            .andExpect(jsonPath("$.risqueCause").value(DEFAULT_RISQUE_CAUSE))
            .andExpect(jsonPath("$.typeCause").value(DEFAULT_TYPE_CAUSE))
            .andExpect(jsonPath("$.risqueCons").value(DEFAULT_RISQUE_CONS))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingRisqueAnalyse() throws Exception {
        // Get the risqueAnalyse
        restRisqueAnalyseMockMvc.perform(get("/api/risque-analyses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRisqueAnalyse() throws Exception {
        // Initialize the database
        risqueAnalyseRepository.saveAndFlush(risqueAnalyse);

        int databaseSizeBeforeUpdate = risqueAnalyseRepository.findAll().size();

        // Update the risqueAnalyse
        RisqueAnalyse updatedRisqueAnalyse = risqueAnalyseRepository.findById(risqueAnalyse.getId()).get();
        // Disconnect from session so that the updates on updatedRisqueAnalyse are not directly saved in db
        em.detach(updatedRisqueAnalyse);
        updatedRisqueAnalyse
            .risqueCause(UPDATED_RISQUE_CAUSE)
            .typeCause(UPDATED_TYPE_CAUSE)
            .risqueCons(UPDATED_RISQUE_CONS)
            .description(UPDATED_DESCRIPTION);

        restRisqueAnalyseMockMvc.perform(put("/api/risque-analyses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRisqueAnalyse)))
            .andExpect(status().isOk());

        // Validate the RisqueAnalyse in the database
        List<RisqueAnalyse> risqueAnalyseList = risqueAnalyseRepository.findAll();
        assertThat(risqueAnalyseList).hasSize(databaseSizeBeforeUpdate);
        RisqueAnalyse testRisqueAnalyse = risqueAnalyseList.get(risqueAnalyseList.size() - 1);
        assertThat(testRisqueAnalyse.getRisqueCause()).isEqualTo(UPDATED_RISQUE_CAUSE);
        assertThat(testRisqueAnalyse.getTypeCause()).isEqualTo(UPDATED_TYPE_CAUSE);
        assertThat(testRisqueAnalyse.getRisqueCons()).isEqualTo(UPDATED_RISQUE_CONS);
        assertThat(testRisqueAnalyse.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingRisqueAnalyse() throws Exception {
        int databaseSizeBeforeUpdate = risqueAnalyseRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRisqueAnalyseMockMvc.perform(put("/api/risque-analyses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(risqueAnalyse)))
            .andExpect(status().isBadRequest());

        // Validate the RisqueAnalyse in the database
        List<RisqueAnalyse> risqueAnalyseList = risqueAnalyseRepository.findAll();
        assertThat(risqueAnalyseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRisqueAnalyse() throws Exception {
        // Initialize the database
        risqueAnalyseRepository.saveAndFlush(risqueAnalyse);

        int databaseSizeBeforeDelete = risqueAnalyseRepository.findAll().size();

        // Delete the risqueAnalyse
        restRisqueAnalyseMockMvc.perform(delete("/api/risque-analyses/{id}", risqueAnalyse.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RisqueAnalyse> risqueAnalyseList = risqueAnalyseRepository.findAll();
        assertThat(risqueAnalyseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
