package ma.greensupply.erm.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ma.greensupply.erm.web.rest.TestUtil;

public class RisqueactionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Risqueaction.class);
        Risqueaction risqueaction1 = new Risqueaction();
        risqueaction1.setId(1L);
        Risqueaction risqueaction2 = new Risqueaction();
        risqueaction2.setId(risqueaction1.getId());
        assertThat(risqueaction1).isEqualTo(risqueaction2);
        risqueaction2.setId(2L);
        assertThat(risqueaction1).isNotEqualTo(risqueaction2);
        risqueaction1.setId(null);
        assertThat(risqueaction1).isNotEqualTo(risqueaction2);
    }
}
