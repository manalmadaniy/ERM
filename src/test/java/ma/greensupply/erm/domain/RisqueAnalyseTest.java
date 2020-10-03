package ma.greensupply.erm.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ma.greensupply.erm.web.rest.TestUtil;

public class RisqueAnalyseTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RisqueAnalyse.class);
        RisqueAnalyse risqueAnalyse1 = new RisqueAnalyse();
        risqueAnalyse1.setId(1L);
        RisqueAnalyse risqueAnalyse2 = new RisqueAnalyse();
        risqueAnalyse2.setId(risqueAnalyse1.getId());
        assertThat(risqueAnalyse1).isEqualTo(risqueAnalyse2);
        risqueAnalyse2.setId(2L);
        assertThat(risqueAnalyse1).isNotEqualTo(risqueAnalyse2);
        risqueAnalyse1.setId(null);
        assertThat(risqueAnalyse1).isNotEqualTo(risqueAnalyse2);
    }
}
