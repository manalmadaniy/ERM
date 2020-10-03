package ma.greensupply.erm;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("ma.greensupply.erm");

        noClasses()
            .that()
                .resideInAnyPackage("ma.greensupply.erm.service..")
            .or()
                .resideInAnyPackage("ma.greensupply.erm.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..ma.greensupply.erm.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
