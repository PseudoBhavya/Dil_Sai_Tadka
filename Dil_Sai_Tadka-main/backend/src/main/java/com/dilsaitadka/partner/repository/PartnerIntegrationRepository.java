package com.dilsaitadka.partner.repository;

import com.dilsaitadka.partner.entity.PartnerIntegration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PartnerIntegrationRepository extends JpaRepository<PartnerIntegration, Long> {
    Optional<PartnerIntegration> findByApiKey(String apiKey);
    Optional<PartnerIntegration> findByName(String name);
}
