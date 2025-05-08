
import { GrantCategory, FundingSource, GrantStatus } from "@/types/grants";

/**
 * Type validation utility functions for converting strings to enum types 
 * when loading data from the database
 */

// Valid grant categories array for validation
const validCategories: GrantCategory[] = [
  "research",
  "education",
  "community",
  "infrastructure",
  "innovation",
];

// Valid funding source types array for validation 
const validFundingSources: FundingSource[] = [
  "internal",
  "external",
  "government",
  "private",
  "foundation",
];

// Valid grant status values array for validation
const validGrantStatuses: GrantStatus[] = [
  "draft",
  "submitted",
  "under_review",
  "approved",
  "rejected",
  "modifications_requested",
  "active",
  "completed",
];

/**
 * Validates and converts a string to a GrantCategory type
 * @param value - String value from database
 * @param fallback - Optional fallback value if invalid
 * @returns A valid GrantCategory
 */
export const validateGrantCategory = (
  value: string | null | undefined,
  fallback: GrantCategory = "research"
): GrantCategory => {
  if (!value) return fallback;

  const normalizedValue = value.toLowerCase() as GrantCategory;
  return validCategories.includes(normalizedValue) ? normalizedValue : fallback;
};

/**
 * Validates and converts a string to a FundingSource type
 * @param value - String value from database
 * @param fallback - Optional fallback value if invalid
 * @returns A valid FundingSource
 */
export const validateFundingSource = (
  value: string | null | undefined,
  fallback: FundingSource = "external"
): FundingSource => {
  if (!value) return fallback;

  const normalizedValue = value.toLowerCase() as FundingSource;
  return validFundingSources.includes(normalizedValue) ? normalizedValue : fallback;
};

/**
 * Validates and converts a string to a GrantStatus type
 * @param value - String value from database
 * @param fallback - Optional fallback value if invalid
 * @returns A valid GrantStatus
 */
export const validateGrantStatus = (
  value: string | null | undefined,
  fallback: GrantStatus = "draft"
): GrantStatus => {
  if (!value) return fallback;

  const normalizedValue = value.toLowerCase() as GrantStatus;
  return validGrantStatuses.includes(normalizedValue) ? normalizedValue : fallback;
};
