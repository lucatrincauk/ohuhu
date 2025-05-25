
'use server';
/**
 * @fileOverview Generates a range of lighter and darker shades based on a selected color,
 * by finding the closest matches within the user's marker inventory.
 *
 * - generateShadeVariations - A function that handles the shade variation generation process.
 * - GenerateShadeVariationsInput - The input type for the generateShadeVariations function.
 * - GenerateShadeVariationsOutput - The return type for the generateShadeVariations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { MarkerInventoryItem } from '@/lib/types'; // Assuming MarkerInventoryItem is defined in types

const GenerateShadeVariationsInputSchema = z.object({
  hexColor: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/)
    .describe('The hex color code to find variations for (e.g., #A59AC4).'),
  numShades: z
    .number()
    .int()
    .min(3)
    .max(9)
    .default(5)
    .describe('The number of shades to suggest from the inventory, including the closest match to the original color.'),
  markerInventory: z.array(
    z.object({
      id: z.string().describe('The unique identifier of the marker.'),
      name: z.string().describe('The name of the marker.'),
      hex: z.string().describe('The hex value of the marker color.'),
      setId: z.string().describe('The ID of the marker set this marker belongs to.'), // Added setId here
    })
  ).describe('The user\u2019s marker inventory, an array of marker objects.'),
});
export type GenerateShadeVariationsInput = z.infer<typeof GenerateShadeVariationsInputSchema>;

const ShadeVariationOutputItemSchema = z.object({
  id: z.string().describe('The ID of the suggested marker from the inventory.'),
  name: z.string().describe('The name of the suggested marker from the inventory.'),
  hex: z.string().regex(/^#([0-9A-Fa-f]{3}){1,2}$/).describe('The hex color code of the suggested marker.'),
  setId: z.string().describe('The ID of the marker set this marker belongs to.'), // Added setId
  similarityScore: z.number().optional().describe('A score indicating how close this marker is to being a good shade variation (0-1). Higher is better.')
});

const GenerateShadeVariationsOutputSchema = z.object({
  shades: z
    .array(ShadeVariationOutputItemSchema)
    .describe('An array of marker objects from the inventory representing the suggested shades.'),
});
export type GenerateShadeVariationsOutput = z.infer<typeof GenerateShadeVariationsOutputSchema>;
export type ShadeVariationResult = z.infer<typeof ShadeVariationOutputItemSchema>;


export async function generateShadeVariations(input: GenerateShadeVariationsInput): Promise<GenerateShadeVariationsOutput> {
  return generateShadeVariationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateShadeVariationsPrompt',
  input: {schema: GenerateShadeVariationsInputSchema},
  output: {schema: GenerateShadeVariationsOutputSchema},
  prompt: `You are a color expert. Given a base hex color, a desired number of shades, and a list of available markers (inventory), your task is to select markers from the inventory that represent a good range of lighter and darker variations of the base color.

  Base Color: {{{hexColor}}}
  Number of Shades to Suggest (including base color match): {{{numShades}}}

  Marker Inventory:
  {{#each markerInventory}}
  - ID: {{this.id}}, Name: {{this.name}}, Hex: {{this.hex}}, SetID: {{this.setId}}
  {{/each}}

  Instructions:
  1. Find the marker in the inventory that is the closest match to the base hex color. This should be one of the suggested shades.
  2. Based on the \`numShades\` parameter, select additional markers from the inventory to create a palette of lighter and darker variations around the base color match.
  3. The total number of returned markers should be exactly \`numShades\`.
  4. Prioritize markers that create a harmonious and visually appealing sequence of shades.
  5. Calculate a 'similarityScore' for each suggested shade relative to the base color and its position in the shade sequence (e.g., how well it fits as a lighter/darker variant). This can be a subjective score from 0 to 1.
  6. Return the selected markers as an array of objects, each containing 'id', 'name', 'hex', 'setId', and 'similarityScore'.
  7. If the inventory is small or lacks good variations, try your best to pick the closest available options. If no reasonable shades can be found, you can return fewer than numShades, or an empty array if truly nothing fits.
  8. Ensure the final output is an object with a 'shades' property containing the array of marker objects.
  Return the list of shades as marker objects from the inventory. Do not include any explanations or additional text outside the JSON structure.`,
});

const generateShadeVariationsFlow = ai.defineFlow(
  {
    name: 'generateShadeVariationsFlow',
    inputSchema: GenerateShadeVariationsInputSchema,
    outputSchema: GenerateShadeVariationsOutputSchema,
  },
  async input => {
    // Ensure numShades is reasonable given inventory size, though the prompt handles it
    if (input.markerInventory.length < input.numShades && input.markerInventory.length > 0) {
      // The AI should handle this, but as a fallback we could adjust numShades here
      // console.warn(`Requested ${input.numShades} shades, but inventory only has ${input.markerInventory.length}. AI will attempt to pick the best available.`);
    }
    const {output} = await prompt(input);
    return output!;
  }
);

