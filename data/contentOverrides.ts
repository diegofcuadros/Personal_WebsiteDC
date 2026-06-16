import type { ContentOverrides } from "./contentRegistry"
import contentOverridesData from "./content-overrides.json"

export const contentOverrides: Partial<ContentOverrides> = (contentOverridesData ?? {}) as Partial<ContentOverrides>
