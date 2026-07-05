import { z } from "astro/zod";
import { parse } from "yaml";

import profileDocument from "../data/profile.yml?raw";

const linkSchema = z.url();

const roleSchema = z.object({
  title: z.string().min(1),
  period: z.string().min(1),
  highlights: z
    .array(
      z.object({
        text: z.string().min(1),
        technologies: z.array(z.string().min(1)).optional(),
      }),
    )
    .min(1),
});

const profileSchema = z.object({
  person: z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    birth_date: z.string().min(1),
    location_short: z.string().min(1),
    linkedin_label: z.string().min(1),
    linkedin_url: linkSchema,
    github_label: z.string().min(1),
    github_url: linkSchema,
    portrait: z.string().startsWith("/"),
    summary: z.string().min(1),
  }),
  cv: z.object({
    url: z.string().startsWith("/"),
  }),
  experience: z
    .array(
      z.object({
        company: z.string().min(1),
        location: z.string().min(1),
        period: z.string().min(1),
        website: linkSchema.optional(),
        description: z.string().min(1),
        roles: z.array(roleSchema).min(1),
      }),
    )
    .min(1),
  about: z.array(z.string().min(1)).min(1),
  projects: z
    .array(
      z.object({
        title: z.string().min(1),
        highlights: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
  education: z
    .array(
      z.object({
        period: z.string().min(1),
        title: z.string().min(1),
        institution: z.string().optional(),
        detail: z.string().min(1),
      }),
    )
    .min(1),
  skills: z.object({
    practical: z
      .array(
        z.object({
          label: z.string().min(1),
          items: z.array(z.string().min(1)).min(1),
        }),
      )
      .min(1),
    languages: z
      .array(
        z.object({
          flag: z.string().min(1),
          label: z.string().min(1),
        }),
      )
      .min(1),
    soft: z.array(z.string().min(1)).min(1),
  }),
});

export type Profile = z.infer<typeof profileSchema>;

export const profile: Profile = profileSchema.parse(parse(profileDocument));

export function publicAsset(path: string): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${base}${path.replace(/^\/+/, "")}`;
}

const countryMarkup: Record<string, string> = {
  CH: '<span class="inline-flag" aria-label="Switzerland">CH</span>',
  IT: '<span class="inline-flag" aria-label="Italy">IT</span>',
  GB: '<span class="inline-flag" aria-label="United Kingdom">GB</span>',
  DE: '<span class="inline-flag" aria-label="Germany">DE</span>',
};

export function decorateCountryReferences(text: string): string {
  const countryNames: Record<string, keyof typeof countryMarkup> = {
    Switzerland: "CH",
    Italy: "IT",
    "United Kingdom": "GB",
    Germany: "DE",
  };

  return text.replace(
    /\((CH|IT|GB|DE)\)|\b(Switzerland|Italy|United Kingdom|Germany)\b/g,
    (_match, code: string | undefined, countryName: string | undefined) => {
      const resolvedCode =
        (code as keyof typeof countryMarkup | undefined) ??
        (countryName ? countryNames[countryName] : undefined);

      return resolvedCode ? (countryMarkup[resolvedCode] ?? _match) : _match;
    },
  );
}
