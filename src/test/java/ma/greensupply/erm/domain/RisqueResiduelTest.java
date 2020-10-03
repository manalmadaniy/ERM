package ma.greensupply.erm.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ma.greensupply.erm.web.rest.TestUtil;

public class RisqueResiduelTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RisqueResiduel.class);
        RisqueResiduel risqueResiduel1 = new RisqueResiduel();
        risqueResiduel1.setId(1L);
        RisqueResiduel risqueResiduel2 = new RisqueResiduel();
        risqueResiduel2.setId(risqueResiduel1.getId());
        assertThat(risqueResiduel1).isEqualTo(risqueResiduel2);
        risqueResiduel2.setId(2L);
        assertThat(risqueResiduel1).isNotEqualTo(risqueResiduel2);
        risqueResiduel1.setId(null);
        assertThat(risqueResiduel1).isNotEqualTo(risqueResiduel2);
    }
}
