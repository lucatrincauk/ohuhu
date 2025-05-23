'use server';

/**
 * @fileOverview Flow to find similar colors in the user's marker inventory.
 *
 * - findSimilarColors - A function that takes a target color (hex value) and returns a list of similar markers from the inventory.
 * - FindSimilarColorsInput - The input type for the findSimilarColors function.
 * - FindSimilarColorsOutput - The return type for the findSimilarColors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindSimilarColorsInputSchema = z.object({
  targetColorHex: z
    .string()
    .describe('The target color in hex format (e.g., #A59AC4).'),
  markerInventory: z.array(
    z.object({
      id: z.string().describe('The unique identifier of the marker.'),
      name: z.string().describe('The name of the marker.'),
      hex: z.string().describe('The hex value of the marker color.'),
    })
  ).describe('The user\u2019s marker inventory, an array of marker objects.'),
});

export type FindSimilarColorsInput = z.infer<typeof FindSimilarColorsInputSchema>;

const FindSimilarColorsOutputSchema = z.array(
  z.object({
    id: z.string().describe('The unique identifier of the similar marker.'),
    name: z.string().describe('The name of the similar marker.'),
    hex: z.string().describe('The hex value of the similar marker color.'),
    similarityScore: z.number().describe('A score indicating how similar the marker is to the target color, from 0 to 1.'),
  })
).describe('A list of markers from the inventory that are similar to the target color.');

export type FindSimilarColorsOutput = z.infer<typeof FindSimilarColorsOutputSchema>;

export async function findSimilarColors(input: FindSimilarColorsInput): Promise<FindSimilarColorsOutput> {
  return findSimilarColorsFlow(input);
}

const findSimilarColorsPrompt = ai.definePrompt({
  name: 'findSimilarColorsPrompt',
  input: {schema: FindSimilarColorsInputSchema},
  output: {schema: FindSimilarColorsOutputSchema},
  prompt: `You are a color expert helping a user find similar colors in their marker inventory to a target color.

  The user provides a target color in hex format and their marker inventory.

  Your task is to:
  1.  Compare each marker in the inventory to the target color.
  2.  Determine a similarity score between 0 and 1 (1 being the most similar).
  3.  Return a list of markers from the inventory, sorted by similarity score (highest to lowest).
  4. Return an empty array if no markers are similar to target color.

  Target Color: {{{targetColorHex}}}

  Marker Inventory:
  {{#each markerInventory}}
  -   ID: {{this.id}}, Name: {{this.name}}, Hex: {{this.hex}}
  {{/each}}
  `,
});

const findSimilarColorsFlow = ai.defineFlow(
  {
    name: 'findSimilarColorsFlow',
    inputSchema: FindSimilarColorsInputSchema,
    outputSchema: FindSimilarColorsOutputSchema,
  },
  async input => {
    const {output} = await findSimilarColorsPrompt(input);
    return output!;
  }
);
