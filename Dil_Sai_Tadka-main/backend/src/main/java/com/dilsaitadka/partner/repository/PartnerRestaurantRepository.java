package com.dilsaitadka.partner.repository;

import com.dilsaitadka.partner.entity.PartnerRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerRestaurantRepository extends JpaRepository<PartnerRestaurant, Long> {
}
