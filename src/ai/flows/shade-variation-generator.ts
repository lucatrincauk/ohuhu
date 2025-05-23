// 'use server';
/**
 * @fileOverview Generates a range of lighter and darker shades based on a selected color.
 *
 * - generateShadeVariations - A function that handles the shade variation generation process.
 * - GenerateShadeVariationsInput - The input type for the generateShadeVariations function.
 * - GenerateShadeVariationsOutput - The return type for the generateShadeVariations function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateShadeVariationsInputSchema = z.object({
  hexColor: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/)
    .describe('The hex color code to generate shades for (e.g., #A59AC4).'),
  numShades: z
    .number()
    .int()
    .min(3)
    .max(9)
    .default(5)
    .describe('The number of shades to generate, including the original color.'),
});
export type GenerateShadeVariationsInput = z.infer<typeof GenerateShadeVariationsInputSchema>;

const GenerateShadeVariationsOutputSchema = z.object({
  shades: z
    .array(z.string().regex(/^#([0-9A-Fa-f]{3}){1,2}$/))
    .describe('An array of hex color codes representing the generated shades.'),
});
export type GenerateShadeVariationsOutput = z.infer<typeof GenerateShadeVariationsOutputSchema>;

export async function generateShadeVariations(input: GenerateShadeVariationsInput): Promise<GenerateShadeVariationsOutput> {
  return generateShadeVariationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateShadeVariationsPrompt',
  input: {schema: GenerateShadeVariationsInputSchema},
  output: {schema: GenerateShadeVariationsOutputSchema},
  prompt: `You are a color palette generator. Generate a range of lighter and darker shades based on the provided hex color code.

  The number of shades to generate is {{{numShades}}}, and the original color should be included in the result.

  Original Color: {{{hexColor}}}

  Ensure the shades are valid hex color codes.
  Return the list of colors. Do not include any explanations or additional text.`,
});

const generateShadeVariationsFlow = ai.defineFlow(
  {
    name: 'generateShadeVariationsFlow',
    inputSchema: GenerateShadeVariationsInputSchema,
    outputSchema: GenerateShadeVariationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
