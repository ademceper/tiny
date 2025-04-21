import * as z from 'zod';

// Define the Zod schema for OrganizationRequest
export const OrganizationSchema = z
  .object({
    name: z.string().min(1, { message: 'Organization name is required' }), // Name is required
    domain: z.string().nullable().optional(), // `domain` can be a string, null, or undefined
  })
  .strict(); // Prevent extra fields

// Export the type inferred from the schema
export type OrganizationRequest = z.infer<typeof OrganizationSchema>;
