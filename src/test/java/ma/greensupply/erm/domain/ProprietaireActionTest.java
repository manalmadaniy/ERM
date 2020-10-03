package ma.greensupply.erm.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ma.greensupply.erm.web.rest.TestUtil;

public class ProprietaireActionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProprietaireAction.class);
        ProprietaireAction proprietaireAction1 = new ProprietaireAction();
        proprietaireAction1.setId(1L);
        ProprietaireAction proprietaireAction2 = new ProprietaireAction();
        proprietaireAction2.setId(proprietaireAction1.getId());
        assertThat(proprietaireAction1).isEqualTo(proprietaireAction2);
        proprietaireAction2.setId(2L);
        assertThat(proprietaireAction1).isNotEqualTo(proprietaireAction2);
        proprietaireAction1.setId(null);
        assertThat(proprietaireAction1).isNotEqualTo(proprietaireAction2);
    }
}
