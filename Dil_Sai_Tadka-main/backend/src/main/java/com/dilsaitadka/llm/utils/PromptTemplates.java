package com.dilsaitadka.llm.utils;

public class PromptTemplates {

    public static String getReviewSummaryPrompt(String reviewsJson) {
        return "You are an expert hospitality and culinary analyst. " +
               "Given the following list of customer reviews and complaints, perform a deep hospitality analysis. " +
               "Generate a structured JSON response containing: \n" +
               "1. 'summary': A comprehensive 2-3 sentence overview of guest sentiment.\n" +
               "2. 'sentimentScore': A double value between 0.0 (completely negative) and 1.0 (completely positive).\n" +
               "3. 'satisfactionRating': A percentage string (e.g. '85%').\n" +
               "4. 'strengths': A list of positive aspects (maximum 3 points).\n" +
               "5. 'complaints': A list of customer issues/complaints (maximum 3 points).\n" +
               "6. 'actionableInsights': Actionable recommendations to improve service or quality (maximum 3 points).\n\n" +
               "Review Data:\n" + reviewsJson + "\n\n" +
               "Respond ONLY with valid JSON. Do not include markdown code blocks or extra text.";
    }

    public static String getFoodRecommendationPrompt(String menuJson, String userQuery) {
        return "You are a world-class luxury culinary advisor for 'Dil Sai Tadka'. " +
               "Given our menu items, recommend the best choices based on the guest request.\n\n" +
               "Menu Items:\n" + menuJson + "\n\n" +
               "Guest Request: \"" + userQuery + "\"\n\n" +
               "Provide a cinematic, enticing, and premium culinary recommendation (2-3 short paragraphs). " +
               "Highlight specific items from the menu, explaining their flavor profiles and why they fit. " +
               "Use professional, elegant, and warm language.";
    }
}
