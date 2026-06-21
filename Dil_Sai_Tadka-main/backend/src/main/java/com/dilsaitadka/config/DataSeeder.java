package com.dilsaitadka.config;

import com.dilsaitadka.entity.*;
import com.dilsaitadka.partner.entity.*;
import com.dilsaitadka.partner.repository.*;
import com.dilsaitadka.analytics.entity.*;
import com.dilsaitadka.analytics.repository.*;
import com.dilsaitadka.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final MenuItemRepository menuItemRepository;
    private final RoomRepository roomRepository;
    private final ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;
    private final PartnerIntegrationRepository partnerIntegrationRepository;
    private final PartnerRestaurantRepository partnerRestaurantRepository;
    private final ApiUsageLogRepository apiUsageLogRepository;

    @Override
    public void run(String... args) {
        seedUsers();
        seedMenuItems();
        seedRooms();
        seedReviews();
        seedPartnerIntegrations();
        seedPartnerRestaurants();
        seedApiUsageLogs();
        log.info("✅ Database seeded successfully!");
    }

    private void seedUsers() {
        if (userRepository.count() > 0) return;

        userRepository.save(User.builder()
                .name("Admin")
                .email("admin@dilsaitadka.com")
                .password(passwordEncoder.encode("Admin@123"))
                .phone("+91 98765 43210")
                .role(User.Role.ROLE_ADMIN)
                .build());

        userRepository.save(User.builder()
                .name("Priya Patel")
                .email("customer@dilsaitadka.com")
                .password(passwordEncoder.encode("Customer@123"))
                .phone("+91 98765 43211")
                .role(User.Role.ROLE_CUSTOMER)
                .build());

        log.info("👤 Users seeded");
    }

    private void seedMenuItems() {
        if (menuItemRepository.count() > 0) return;

        menuItemRepository.save(MenuItem.builder().name("Tadka Garden Bowl").description("Organic greens tossed in our signature mustard temper with hints of roasted cumin and pomegranate seeds.").price(450.0).category("Main Course").tag("Nutritious").rating(4.9).reviewCount(120).image("https://lh3.googleusercontent.com/aida-public/AB6AXuB-ict95eR06Ia642ZVkiPX3txX1PEd_WOGwf-brC8akLLj20raPY3VYSRKdn-wcOpIypRP8pZTjdqvxQCtmUlM6c0wJrzk_Jl1qE9bsqfuvB5WPmfst1dA_OxE2TsQWUl4yobiRDZo5Hou9Mmrj2PRhTcQhrx6HZ7COHlIcVmy0hA4nXdgYlYwUtDom6JGn1FO_4rMBfFmmauO0Ty1ZNnlMsPD_j08047E78_PASDbq0qJxYRxCWLO4_vsOSBNa6PAtL5SQ1YccvU").build());

        menuItemRepository.save(MenuItem.builder().name("Royal Saffron Biryani").description("A slow-cooked aromatic experience using long-grain Basmati rice, infused with grade-A Kashmiri saffron.").price(680.0).category("Indian Classics").tag("Signature").rating(5.0).reviewCount(200).image("https://lh3.googleusercontent.com/aida-public/AB6AXuA3dWcMTQ7dRPUFLg4Ke7yGl-6-8T4cuXpTMaUFtf1Uu9ZanLIXkzb4UfGX_tzH_mIYSGQTmuAJIuZDff9R33JObX6aKLLvxpamxW98Bj5CQKZaEc2DfuZGpWmm5EZIYJSmUMf_gI5Z5j3l6VBSXKJM4qE29Zttx4G3kSwn4HcdxV4mFi0fHR4BuNhXFGG3jsPDJf7nvNJYcsc5GoQx3Gxi9I4_r4vSzTqnF2KAQ2kagqFhrS5umhj7uF57_FUT1vkLR6-GwQBpjWo").build());

        menuItemRepository.save(MenuItem.builder().name("Sun-Drenched Stack").description("Fluffy buttermilk pancakes topped with seasonal farm-fresh berries and artisanal organic honey.").price(320.0).category("Breakfast").tag("Breakfast").rating(4.8).reviewCount(85).image("https://lh3.googleusercontent.com/aida-public/AB6AXuBzZ53WDPBtraAvlPo0NzUIRCw3z7dkXHMnV6RpycoLQRJZypL4UAuINBZ6xfAazzaX8jhqsCCX8a3YgN-BFYKDev95ZPPCoOwcXZ2pCOf_Vo2HpUQY-dRW8LbVfEdXMT3WTn1KcR4t_eUt0vufx_AkaCBPKHCfV1IufBSGLo2iscyWYi0V-xpXH6viGFDBruqi1TnaUvW7gZ4zHTX5aRMNXnpPJwO7XLvMT0hQs3MGRa5V9d1QE916yEfHA2N-HsI5FLBB5cW_TeA").build());

        menuItemRepository.save(MenuItem.builder().name("Herb Silk Fettuccine").description("Hand-rolled pasta ribbons tossed in a delicate emulsion of cold-pressed oil and roasted garlic.").price(550.0).category("Main Course").tag("Artisanal").rating(4.7).reviewCount(62).image("https://lh3.googleusercontent.com/aida-public/AB6AXuD2NBA0VMPyM0L6DU6iIFkPmKaQ0BpmL_qIEhBtrme13vjfUixOiBcNE5dcCeDap8m078FlIBC_VfZsz9orRCMLCgsN9L7rRzxxUfMMC9pK4Q8Z2MO0aRlL_bU4vYwxlX3oVwQLIRIA2GhnTh1IcV9C8CgMmTmv0aYl2XsdGJStOwdw8oFGJeG6lOKPo196MqVfKKX4_QTxEI9av9MKTKuaOsRwEkyqegRl7sDou0NIog7jL2JYk0W-pS44SB0HjDR7BHqUGBy4sUI").build());

        menuItemRepository.save(MenuItem.builder().name("Velvet Rose Kheer").description("Traditional rice pudding slow-simmered for 6 hours, delicately scented with organic damask roses.").price(280.0).category("Sweet Endings").tag("Sweet").rating(4.9).reviewCount(145).image("https://lh3.googleusercontent.com/aida-public/AB6AXuAVkbAwP9JFkqdXjf6Bzu7qOJktdalFEGL9A5hDGCmg1UZFHfw8bf85OoBQbWIHMbe-HCvwecfxxyqoC31EdEN9klclpYG5Dtu_U53KT6xhMJwes-bHtptgHjX1fbUDuyVT0ilsBs9La8pMDJO-fzQABoYeHGpLt_v3ozNazrhhklGfirOGi-BPhzgYxGLDyDGs1Y4W_mECLgGwbp9v53-nD64axuSFevxE8laTDOcvJLfiLHMgUnnDOZR7gKqEI1x7R4E8dG5w9fE").build());

        menuItemRepository.save(MenuItem.builder().name("Smoked Clay Tikka").description("Farm-fresh cottage cheese cubes marinated in our family's 3-generation secret spice blend.").price(420.0).category("Indian Classics").tag("Grill").rating(4.8).reviewCount(110).image("https://lh3.googleusercontent.com/aida-public/AB6AXuBVqF6GAA7dU3BnnOgua_JDZjFUE_goPbHZeALnGK-i0sW1I3N98iSR9vtfKAlXyKC5r_5zkKkWE0tp-yk_33AVBI4kQ9wbvYpsH0rDk1hbreKet3FePC2opYbKk1LWq0p_73WVwuxp4PC1ulUyOoun7MwDGdV4uIbWyzIHJhK8OIY9IqKCOv1WOWR3ok-257EL6aAyc29T5b34feXHiDslcifgQXxcJRi4Ngsj4_lXs4Jw0qiDRPwT9KSqO_T6jfx6_QVKtGSJl38").build());

        log.info("🍛 Menu items seeded");
    }

    private void seedRooms() {
        if (roomRepository.count() > 0) return;

        roomRepository.save(Room.builder().name("Azure Garden Suite").floor("Ground Floor").feature("Private Patio").bedType("Queen Size").viewType("Garden View").pricePerNight(180.0).rating(4.9).available(true).image("https://lh3.googleusercontent.com/aida-public/AB6AXuB-lRaqTWt8VJaNAzNrYjdkD0SjH_Wm10-v437-66brbrKA-iyxm4_RxaLli752i6cfQRisW0AnNxqCELxir1kfQ6IFy09Dg4p1G5JKDX0t6rsPqDeddTWCeIL_S9b6V7dtr7dNbMDvBHBpWW3KNEktMlGRJ72DTVR8_TUGV2eIMBaFhFIVj17ChH8xQqSdcd4Zc23RmUxG16u3GPHxl8BFgxOCvPu4B36CaFJkq9Jh_DCWTgsDG98XLUm6CYxJCw8iGGW4Yu4256E").build());

        roomRepository.save(Room.builder().name("Sunset Loft").floor("Top Floor").feature("Sky Windows").bedType("King Size").viewType("City View").pricePerNight(240.0).rating(5.0).available(true).image("https://lh3.googleusercontent.com/aida-public/AB6AXuC1Y6fNL9Ff19v8qYcgwvppSYUUcLQetLUBXsMTfTksWD8G2alWUJ8M2RKGoAGLsV675pugx22CLlFgZs8QtKN-3fYz-toePGKhv7QokyhNTzqO8WV9tLxdBy4r5Heg0WrctRWpFAmX4hdN6ZmrykpohVjeqFHLDP2WKbzSiN0NM5XozSuNv9InyloM23lr53cS7hIm7HegtFWeFsk6wmKAjPD8CFpY7L3zKFAFYXBnbIMWGnw4EcE017l0-TrIhT1V3P-Zz5ESS3I").build());

        roomRepository.save(Room.builder().name("Olive Grove Suite").floor("Internal Courtyard").feature("Quiet Zone").bedType("Double").viewType("Quiet Zone").pricePerNight(165.0).rating(4.8).available(true).image("https://lh3.googleusercontent.com/aida-public/AB6AXuAnUQJE0p5m1xPdFeBlWL1cWxBX4oGsy7Yf-6147j79pgyT3gRkEMntIKprh8HnaI07J5lTtoaB-JLjaLTRVJcmGPwt0V760MEIWiQCzfBl_ssO-pwtKl_hjmFwPwbHOb-Hrt71vkYX1shvel86sX-fo4B-6UIn9wOYyNdYz1VoXDDAAo1bCoT8XqHZx2BakCq_39vIXa3JtZYX_Ka91VdaNG_V0Cuhfu7HTOdA1_OZBoYI3Pz_XQlxgCXixlzWkF2c2vAy7Nrn6pc").build());

        log.info("🏨 Rooms seeded");
    }

    private void seedReviews() {
        if (reviewRepository.count() > 0) return;
        var customer = userRepository.findByEmail("customer@dilsaitadka.com").orElse(null);
        if (customer == null) return;

        reviewRepository.save(Review.builder().user(customer).rating(5).text("The Tadka Paneer was transformative. The service feels like being at a friend's luxury estate.").build());
        reviewRepository.save(Review.builder().user(customer).rating(5).text("Beautiful atmosphere and the morning coffee by the pool is a highlight of my week.").build());
        reviewRepository.save(Review.builder().user(customer).rating(5).text("Absolutely stunning rooms and the food is to die for. Best boutique stay in the city.").build());

        log.info("⭐ Reviews seeded");
    }

    private void seedPartnerIntegrations() {
        if (partnerIntegrationRepository.count() > 0) return;

        partnerIntegrationRepository.save(PartnerIntegration.builder()
                .name("Zomato Partner")
                .apiKey("zomato-partner-key-2026")
                .status(PartnerIntegration.Status.ACTIVE)
                .build());

        partnerIntegrationRepository.save(PartnerIntegration.builder()
                .name("Swiggy Merchant")
                .apiKey("swiggy-partner-key-2026")
                .status(PartnerIntegration.Status.ACTIVE)
                .build());

        partnerIntegrationRepository.save(PartnerIntegration.builder()
                .name("Airbnb Bookings")
                .apiKey("booking-provider-key-2026")
                .status(PartnerIntegration.Status.ACTIVE)
                .build());

        log.info("🤝 Partner Integrations seeded");
    }

    private void seedPartnerRestaurants() {
        if (partnerRestaurantRepository.count() > 0) return;

        partnerRestaurantRepository.save(PartnerRestaurant.builder().name("Dil Sai Tadka - Signature").cuisineType("Indian Gourmet Fusion").address("12 Palace Road, Jaipur").rating(4.9).active(true).build());
        partnerRestaurantRepository.save(PartnerRestaurant.builder().name("Sai Palace Gourmet").cuisineType("Royal Awadhi").address("Ground Floor Court, Mumbai").rating(4.8).active(true).build());
        partnerRestaurantRepository.save(PartnerRestaurant.builder().name("Tadka Fusion Bistro").cuisineType("Contemporary Vegetarian").address("7th Cross Metro Street, Bangalore").rating(4.7).active(true).build());

        log.info("🍽️ Partner Restaurants seeded");
    }

    private void seedApiUsageLogs() {
        if (apiUsageLogRepository.count() > 0) return;

        // Seed 10 recent API logs representing realistic Stripe/Postman data
        LocalDateTime baseTime = LocalDateTime.now().minusHours(2);
        
        apiUsageLogRepository.save(ApiUsageLog.builder().partnerName("Zomato Partner").endpoint("/api/partner/menu").method("GET").statusCode(200).responseTimeMs(85L).timestamp(baseTime.minusMinutes(45)).build());
        apiUsageLogRepository.save(ApiUsageLog.builder().partnerName("Swiggy Merchant").endpoint("/api/partner/orders").method("POST").statusCode(201).responseTimeMs(142L).timestamp(baseTime.minusMinutes(32)).build());
        apiUsageLogRepository.save(ApiUsageLog.builder().partnerName("Airbnb Bookings").endpoint("/api/partner/bookings").method("POST").statusCode(201).responseTimeMs(225L).timestamp(baseTime.minusMinutes(20)).build());
        apiUsageLogRepository.save(ApiUsageLog.builder().partnerName("Zomato Partner").endpoint("/api/partner/orders").method("POST").statusCode(400).responseTimeMs(48L).errorMessage("Bad Request: Invalid menu item ID").timestamp(baseTime.minusMinutes(15)).build());
        apiUsageLogRepository.save(ApiUsageLog.builder().partnerName("Swiggy Merchant").endpoint("/api/partner/menu").method("GET").statusCode(200).responseTimeMs(72L).timestamp(baseTime.minusMinutes(8)).build());
        apiUsageLogRepository.save(ApiUsageLog.builder().partnerName("Zomato Partner").endpoint("/api/partner/restaurants").method("GET").statusCode(200).responseTimeMs(94L).timestamp(baseTime.minusMinutes(2)).build());
        apiUsageLogRepository.save(ApiUsageLog.builder().partnerName("Airbnb Bookings").endpoint("/api/partner/rooms").method("GET").statusCode(200).responseTimeMs(118L).timestamp(LocalDateTime.now().minusSeconds(30)).build());

        log.info("📊 API Usage Logs seeded");
    }
}
