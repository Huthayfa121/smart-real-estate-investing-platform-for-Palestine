import Recommendation from '../models/Recommendation.model';
import { IInvestorProfile } from '../models/InvestorProfile.model';

// Sample property data for recommendations (in production, this would come from a database)
const sampleProperties = [
  {
    propertyTitle: 'Modern Apartment in Ramallah',
    propertyDescription: 'Luxury 3-bedroom apartment in the heart of Ramallah with stunning views',
    location: 'Ramallah',
    propertyType: 'residential',
    price: 150000,
    expectedReturn: 8.5,
    riskLevel: 'low' as const,
    imageUrl: 'https://example.com/property1.jpg',
    propertyDetails: {
      size: 120,
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2020,
      features: ['Parking', 'Balcony', 'Central Heating'],
    },
  },
  {
    propertyTitle: 'Commercial Space in Jerusalem',
    propertyDescription: 'Prime commercial space in central Jerusalem, ideal for retail',
    location: 'Jerusalem',
    propertyType: 'commercial',
    price: 300000,
    expectedReturn: 12.0,
    riskLevel: 'medium' as const,
    imageUrl: 'https://example.com/property2.jpg',
    propertyDetails: {
      size: 200,
      yearBuilt: 2018,
      features: ['High Traffic Area', 'Parking', 'Modern Facilities'],
    },
  },
  {
    propertyTitle: 'Agricultural Land in Hebron',
    propertyDescription: 'Fertile agricultural land with water access',
    location: 'Hebron',
    propertyType: 'agricultural',
    price: 80000,
    expectedReturn: 6.5,
    riskLevel: 'low' as const,
    imageUrl: 'https://example.com/property3.jpg',
    propertyDetails: {
      size: 5000,
      yearBuilt: 2000,
      features: ['Water Access', 'Fertile Soil', 'Road Access'],
    },
  },
  {
    propertyTitle: 'Villa in Bethlehem',
    propertyDescription: 'Spacious villa with garden in quiet neighborhood',
    location: 'Bethlehem',
    propertyType: 'residential',
    price: 250000,
    expectedReturn: 7.0,
    riskLevel: 'medium' as const,
    imageUrl: 'https://example.com/property4.jpg',
    propertyDetails: {
      size: 250,
      bedrooms: 5,
      bathrooms: 3,
      yearBuilt: 2019,
      features: ['Garden', 'Garage', 'Security System'],
    },
  },
  {
    propertyTitle: 'Industrial Warehouse in Nablus',
    propertyDescription: 'Large industrial warehouse with loading docks',
    location: 'Nablus',
    propertyType: 'industrial',
    price: 400000,
    expectedReturn: 10.0,
    riskLevel: 'high' as const,
    imageUrl: 'https://example.com/property5.jpg',
    propertyDetails: {
      size: 1000,
      yearBuilt: 2015,
      features: ['Loading Docks', 'High Ceiling', 'Security'],
    },
  },
];

// Calculate match score based on investor profile
const calculateMatchScore = (property: any, profile: IInvestorProfile): number => {
  let score = 0;

  // Price match (40 points)
  if (property.price >= profile.budgetRange.min && property.price <= profile.budgetRange.max) {
    score += 40;
  } else if (property.price < profile.budgetRange.min) {
    score += 20;
  }

  // Location match (20 points)
  if (profile.preferredLocations.includes(property.location)) {
    score += 20;
  }

  // Property type match (20 points)
  if (profile.propertyTypes.includes(property.propertyType)) {
    score += 20;
  }

  // Risk tolerance match (10 points)
  if (property.riskLevel === profile.riskTolerance) {
    score += 10;
  }

  // Expected return match (10 points)
  if (property.expectedReturn >= 8) {
    score += 10;
  } else if (property.expectedReturn >= 6) {
    score += 5;
  }

  return score;
};

// Generate reasons for recommendation
const generateReasons = (property: any, profile: IInvestorProfile): string[] => {
  const reasons: string[] = [];

  if (property.price >= profile.budgetRange.min && property.price <= profile.budgetRange.max) {
    reasons.push('Fits within your budget range');
  }

  if (profile.preferredLocations.includes(property.location)) {
    reasons.push('Located in your preferred area');
  }

  if (profile.propertyTypes.includes(property.propertyType)) {
    reasons.push('Matches your preferred property type');
  }

  if (property.riskLevel === profile.riskTolerance) {
    reasons.push('Aligns with your risk tolerance');
  }

  if (property.expectedReturn >= 8) {
    reasons.push('High expected return on investment');
  }

  if (property.riskLevel === 'low') {
    reasons.push('Low risk investment');
  }

  return reasons.length > 0 ? reasons : ['Good investment opportunity'];
};

export const generateRecommendations = async (profile: IInvestorProfile) => {
  try {
    // Calculate match scores for all properties
    const scoredProperties = sampleProperties.map((property) => ({
      ...property,
      matchScore: calculateMatchScore(property, profile),
      reasons: generateReasons(property, profile),
    }));

    // Sort by match score and take top 5
    const topProperties = scoredProperties
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5)
      .filter((p) => p.matchScore >= 30); // Only include properties with at least 30% match

    // Create recommendations in database
    const recommendations = await Promise.all(
      topProperties.map(async (property) => {
        // Check if recommendation already exists
        const existing = await Recommendation.findOne({
          userId: profile.userId,
          propertyTitle: property.propertyTitle,
        });

        if (existing) {
          return existing;
        }

        return await Recommendation.create({
          userId: profile.userId,
          propertyTitle: property.propertyTitle,
          propertyDescription: property.propertyDescription,
          location: property.location,
          propertyType: property.propertyType,
          price: property.price,
          expectedReturn: property.expectedReturn,
          riskLevel: property.riskLevel,
          matchScore: property.matchScore,
          reasons: property.reasons,
          imageUrl: property.imageUrl,
          propertyDetails: property.propertyDetails,
          status: 'active',
        });
      })
    );

    return recommendations;
  } catch (error) {
    throw error;
  }
};

