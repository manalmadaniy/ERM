package ma.greensupply.erm.web.rest;

import ma.greensupply.erm.KompliansApp;
import ma.greensupply.erm.domain.Risqueaction;
import ma.greensupply.erm.repository.RisqueactionRepository;

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
 * Integration tests for the {@link RisqueactionResource} REST controller.
 */
@SpringBootTest(classes = KompliansApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RisqueactionResourceIT {

    private static final String DEFAULT_ACTION = "AAAAAAAAAA";
    private static final String UPDATED_ACTION = "BBBBBBBBBB";

    private static final String DEFAULT_PLANACTION = "AAAAAAAAAA";
    private static final String UPDATED_PLANACTION = "BBBBBBBBBB";

    private static final Long DEFAULT_TEMPS_ACTION = 1L;
    private static final Long UPDATED_TEMPS_ACTION = 2L;

    private static final Long DEFAULT_COUT_ACTION = 1L;
    private static final Long UPDATED_COUT_ACTION = 2L;

    @Autowired
    private RisqueactionRepository risqueactionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRisqueactionMockMvc;

    private Risqueaction risqueaction;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Risqueaction createEntity(EntityManager em) {
        Risqueaction risqueaction = new Risqueaction()
            .action(DEFAULT_ACTION)
            .planaction(DEFAULT_PLANACTION)
            .tempsAction(DEFAULT_TEMPS_ACTION)
            .coutAction(DEFAULT_COUT_ACTION);
        return risqueaction;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Risqueaction createUpdatedEntity(EntityManager em) {
        Risqueaction risqueaction = new Risqueaction()
            .action(UPDATED_ACTION)
            .planaction(UPDATED_PLANACTION)
            .tempsAction(UPDATED_TEMPS_ACTION)
            .coutAction(UPDATED_COUT_ACTION);
        return risqueaction;
    }

    @BeforeEach
    public void initTest() {
        risqueaction = createEntity(em);
    }

    @Test
    @Transactional
    public void createRisqueaction() throws Exception {
        int databaseSizeBeforeCreate = risqueactionRepository.findAll().size();
        // Create the Risqueaction
        restRisqueactionMockMvc.perform(post("/api/risqueactions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(risqueaction)))
            .andExpect(status().isCreated());

        // Validate the Risqueaction in the database
        List<Risqueaction> risqueactionList = risqueactionRepository.findAll();
        assertThat(risqueactionList).hasSize(databaseSizeBeforeCreate + 1);
        Risqueaction testRisqueaction = risqueactionList.get(risqueactionList.size() - 1);
        assertThat(testRisqueaction.getAction()).isEqualTo(DEFAULT_ACTION);
        assertThat(testRisqueaction.getPlanaction()).isEqualTo(DEFAULT_PLANACTION);
        assertThat(testRisqueaction.getTempsAction()).isEqualTo(DEFAULT_TEMPS_ACTION);
        assertThat(testRisqueaction.getCoutAction()).isEqualTo(DEFAULT_COUT_ACTION);
    }

    @Test
    @Transactional
    public void createRisqueactionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = risqueactionRepository.findAll().size();

        // Create the Risqueaction with an existing ID
        risqueaction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRisqueactionMockMvc.perform(post("/api/risqueactions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(risqueaction)))
            .andExpect(status().isBadRequest());

        // Validate the Risqueaction in the database
        List<Risqueaction> risqueactionList = risqueactionRepository.findAll();
        assertThat(risqueactionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRisqueactions() throws Exception {
        // Initialize the database
        risqueactionRepository.saveAndFlush(risqueaction);

        // Get all the risqueactionList
        restRisqueactionMockMvc.perform(get("/api/risqueactions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(risqueaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION)))
            .andExpect(jsonPath("$.[*].planaction").value(hasItem(DEFAULT_PLANACTION)))
            .andExpect(jsonPath("$.[*].tempsAction").value(hasItem(DEFAULT_TEMPS_ACTION.intValue())))
            .andExpect(jsonPath("$.[*].coutAction").value(hasItem(DEFAULT_COUT_ACTION.intValue())));
    }
    
    @Test
    @Transactional
    public void getRisqueaction() throws Exception {
        // Initialize the database
        risqueactionRepository.saveAndFlush(risqueaction);

        // Get the risqueaction
        restRisqueactionMockMvc.perform(get("/api/risqueactions/{id}", risqueaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(risqueaction.getId().intValue()))
            .andExpect(jsonPath("$.action").value(DEFAULT_ACTION))
            .andExpect(jsonPath("$.planaction").value(DEFAULT_PLANACTION))
            .andExpect(jsonPath("$.tempsAction").value(DEFAULT_TEMPS_ACTION.intValue()))
            .andExpect(jsonPath("$.coutAction").value(DEFAULT_COUT_ACTION.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingRisqueaction() throws Exception {
        // Get the risqueaction
        restRisqueactionMockMvc.perform(get("/api/risqueactions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRisqueaction() throws Exception {
        // Initialize the database
        risqueactionRepository.saveAndFlush(risqueaction);

        int databaseSizeBeforeUpdate = risqueactionRepository.findAll().size();

        // Update the risqueaction
        Risqueaction updatedRisqueaction = risqueactionRepository.findById(risqueaction.getId()).get();
        // Disconnect from session so that the updates on updatedRisqueaction are not directly saved in db
        em.detach(updatedRisqueaction);
        updatedRisqueaction
            .action(UPDATED_ACTION)
            .planaction(UPDATED_PLANACTION)
            .tempsAction(UPDATED_TEMPS_ACTION)
            .coutAction(UPDATED_COUT_ACTION);

        restRisqueactionMockMvc.perform(put("/api/risqueactions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRisqueaction)))
            .andExpect(status().isOk());

        // Validate the Risqueaction in the database
        List<Risqueaction> risqueactionList = risqueactionRepository.findAll();
        assertThat(risqueactionList).hasSize(databaseSizeBeforeUpdate);
        Risqueaction testRisqueaction = risqueactionList.get(risqueactionList.size() - 1);
        assertThat(testRisqueaction.getAction()).isEqualTo(UPDATED_ACTION);
        assertThat(testRisqueaction.getPlanaction()).isEqualTo(UPDATED_PLANACTION);
        assertThat(testRisqueaction.getTempsAction()).isEqualTo(UPDATED_TEMPS_ACTION);
        assertThat(testRisqueaction.getCoutAction()).isEqualTo(UPDATED_COUT_ACTION);
    }

    @Test
    @Transactional
    public void updateNonExistingRisqueaction() throws Exception {
        int databaseSizeBeforeUpdate = risqueactionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRisqueactionMockMvc.perform(put("/api/risqueactions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(risqueaction)))
            .andExpect(status().isBadRequest());

        // Validate the Risqueaction in the database
        List<Risqueaction> risqueactionList = risqueactionRepository.findAll();
        assertThat(risqueactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRisqueaction() throws Exception {
        // Initialize the database
        risqueactionRepository.saveAndFlush(risqueaction);

        int databaseSizeBeforeDelete = risqueactionRepository.findAll().size();

        // Delete the risqueaction
        restRisqueactionMockMvc.perform(delete("/api/risqueactions/{id}", risqueaction.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Risqueaction> risqueactionList = risqueactionRepository.findAll();
        assertThat(risqueactionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
