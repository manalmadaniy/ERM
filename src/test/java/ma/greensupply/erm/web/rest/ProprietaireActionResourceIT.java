package ma.greensupply.erm.web.rest;

import ma.greensupply.erm.KompliansApp;
import ma.greensupply.erm.domain.ProprietaireAction;
import ma.greensupply.erm.repository.ProprietaireActionRepository;

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
 * Integration tests for the {@link ProprietaireActionResource} REST controller.
 */
@SpringBootTest(classes = KompliansApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProprietaireActionResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private ProprietaireActionRepository proprietaireActionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProprietaireActionMockMvc;

    private ProprietaireAction proprietaireAction;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProprietaireAction createEntity(EntityManager em) {
        ProprietaireAction proprietaireAction = new ProprietaireAction()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .email(DEFAULT_EMAIL);
        return proprietaireAction;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProprietaireAction createUpdatedEntity(EntityManager em) {
        ProprietaireAction proprietaireAction = new ProprietaireAction()
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .email(UPDATED_EMAIL);
        return proprietaireAction;
    }

    @BeforeEach
    public void initTest() {
        proprietaireAction = createEntity(em);
    }

    @Test
    @Transactional
    public void createProprietaireAction() throws Exception {
        int databaseSizeBeforeCreate = proprietaireActionRepository.findAll().size();
        // Create the ProprietaireAction
        restProprietaireActionMockMvc.perform(post("/api/proprietaire-actions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proprietaireAction)))
            .andExpect(status().isCreated());

        // Validate the ProprietaireAction in the database
        List<ProprietaireAction> proprietaireActionList = proprietaireActionRepository.findAll();
        assertThat(proprietaireActionList).hasSize(databaseSizeBeforeCreate + 1);
        ProprietaireAction testProprietaireAction = proprietaireActionList.get(proprietaireActionList.size() - 1);
        assertThat(testProprietaireAction.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testProprietaireAction.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testProprietaireAction.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createProprietaireActionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = proprietaireActionRepository.findAll().size();

        // Create the ProprietaireAction with an existing ID
        proprietaireAction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProprietaireActionMockMvc.perform(post("/api/proprietaire-actions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proprietaireAction)))
            .andExpect(status().isBadRequest());

        // Validate the ProprietaireAction in the database
        List<ProprietaireAction> proprietaireActionList = proprietaireActionRepository.findAll();
        assertThat(proprietaireActionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProprietaireActions() throws Exception {
        // Initialize the database
        proprietaireActionRepository.saveAndFlush(proprietaireAction);

        // Get all the proprietaireActionList
        restProprietaireActionMockMvc.perform(get("/api/proprietaire-actions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proprietaireAction.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));
    }
    
    @Test
    @Transactional
    public void getProprietaireAction() throws Exception {
        // Initialize the database
        proprietaireActionRepository.saveAndFlush(proprietaireAction);

        // Get the proprietaireAction
        restProprietaireActionMockMvc.perform(get("/api/proprietaire-actions/{id}", proprietaireAction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(proprietaireAction.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL));
    }
    @Test
    @Transactional
    public void getNonExistingProprietaireAction() throws Exception {
        // Get the proprietaireAction
        restProprietaireActionMockMvc.perform(get("/api/proprietaire-actions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProprietaireAction() throws Exception {
        // Initialize the database
        proprietaireActionRepository.saveAndFlush(proprietaireAction);

        int databaseSizeBeforeUpdate = proprietaireActionRepository.findAll().size();

        // Update the proprietaireAction
        ProprietaireAction updatedProprietaireAction = proprietaireActionRepository.findById(proprietaireAction.getId()).get();
        // Disconnect from session so that the updates on updatedProprietaireAction are not directly saved in db
        em.detach(updatedProprietaireAction);
        updatedProprietaireAction
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .email(UPDATED_EMAIL);

        restProprietaireActionMockMvc.perform(put("/api/proprietaire-actions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProprietaireAction)))
            .andExpect(status().isOk());

        // Validate the ProprietaireAction in the database
        List<ProprietaireAction> proprietaireActionList = proprietaireActionRepository.findAll();
        assertThat(proprietaireActionList).hasSize(databaseSizeBeforeUpdate);
        ProprietaireAction testProprietaireAction = proprietaireActionList.get(proprietaireActionList.size() - 1);
        assertThat(testProprietaireAction.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testProprietaireAction.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testProprietaireAction.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingProprietaireAction() throws Exception {
        int databaseSizeBeforeUpdate = proprietaireActionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProprietaireActionMockMvc.perform(put("/api/proprietaire-actions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proprietaireAction)))
            .andExpect(status().isBadRequest());

        // Validate the ProprietaireAction in the database
        List<ProprietaireAction> proprietaireActionList = proprietaireActionRepository.findAll();
        assertThat(proprietaireActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProprietaireAction() throws Exception {
        // Initialize the database
        proprietaireActionRepository.saveAndFlush(proprietaireAction);

        int databaseSizeBeforeDelete = proprietaireActionRepository.findAll().size();

        // Delete the proprietaireAction
        restProprietaireActionMockMvc.perform(delete("/api/proprietaire-actions/{id}", proprietaireAction.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProprietaireAction> proprietaireActionList = proprietaireActionRepository.findAll();
        assertThat(proprietaireActionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
