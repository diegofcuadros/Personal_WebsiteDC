import { contentOverrides } from "./contentOverrides"
import { allPublications as allPublicationsBase } from "@/lib/publications-data"

export const allPublications = contentOverrides.allPublications ?? allPublicationsBase
