"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Link as LinkIcon, Search, Tag, PresentationIcon, Microscope, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

// Real publications data for Dr. Diego F. Cuadros organized by research categories
const allPublications = [
  // 1. HIV Hotspots  
  {
    title: "Mapping HIV clustering: a strategy for identifying populations at high risk of HIV infection in sub-Saharan Africa",
    authors: "Cuadros D.F., Awad S.F., Abu-Raddad L.J.",
    journal: "International Journal of Health Geographics",
    year: 2013,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/Publications/publication-1.png",
    summary: "This foundational study establishes spatial clustering techniques to identify geographic areas with concentrated HIV transmission in sub-Saharan Africa. Using geospatial methods, the research maps HIV hotspots and demonstrates how geographic targeting can optimize resource allocation and intervention strategies. The approach provides a strategic framework for identifying populations at highest risk, enabling more efficient deployment of prevention and treatment programs. This methodology has become essential for public health planning, allowing targeted interventions in areas with greatest need and supporting evidence-based policy decisions for HIV prevention and control efforts across the region.",
    showFullSummary: false,
  },
  {
    title: "Spatial variability in HIV prevalence declines in several countries in sub-Saharan Africa",
    authors: "Cuadros D.F., Abu-Raddad L.J.",
    journal: "Health & Place",
    year: 2014,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/Publications/publication-2.png",
    summary: "This comprehensive analysis documents uneven HIV prevalence declines across sub-Saharan African countries from 2003-2013, revealing significant spatial heterogeneity in epidemic control. Some communities experienced dramatic reductions exceeding 50%, while others remained static or showed minimal improvement. The study demonstrates that national average declines can obscure critical localized stagnation, highlighting areas where interventions have been less effective. These findings underscore the importance of spatially disaggregated monitoring and targeted interventions rather than uniform national strategies. The research advocates for localized approaches that address specific community needs and emphasizes the necessity of geographic precision in HIV surveillance and response planning.",
  },
  {
    title: "Geographical patterns of HIV sero-discordancy in high HIV prevalence countries in sub-Saharan Africa",
    authors: "Cuadros D.F., Abu-Raddad L.J.",
    journal: "International Journal of Environmental Research and Public Health",
    year: 2016,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/Publications/publication-3.png",
    summary: "Analyzing demographic and health survey data from seven high-prevalence countries, this study maps spatial patterns of HIV sero-discordant couples across sub-Saharan Africa. The research found that sero-discordant couple clusters overlapped with high-prevalence areas in Kenya, Malawi, and Tanzania, with no distinct discordancy hotspots independent of overall prevalence. With epidemic decline, projections suggest sero-discordant couple fractions will rise to 70-92% by 2030. These findings highlight the growing importance of couple-based testing and prevention strategies, emphasizing the need for targeted interventions that address both partners' needs and support prevention within relationships.",
  },
  {
    title: "Towards UNAIDS Fast-Track goals: Targeting priority geographic areas for HIV prevention and care in Zimbabwe",
    authors: "Cuadros D.F., et al.",
    journal: "AIDS",
    year: 2019,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/Publications/publication-4.png",
    summary: "Using ZDHS (2015) and ZIMPHIA (2016) data, this study generated high-resolution maps of HIV prevalence, ART coverage, and viral suppression across Zimbabwe. The research identified geographic areas—particularly in urban centers like Harare, Bulawayo, and Matabeleland regions—where high-density HIV populations lacked adequate services. Despite overall progress toward 90-90-90 targets, many hotspots remained under-resourced. The study recommends locally tailored intervention strategies, increased service coverage in identified hotspots, and integration of geospatial analysis into resource allocation processes. This approach enables efficient targeting to close gaps in HIV diagnosis, treatment, and viral suppression at the community level.",
  },
  {
    title: "Beyond HIV prevalence: identifying people living with HIV within underserved areas in South Africa",
    authors: "Kim H., Tanser F., Tomita A., Vandormael A., Cuadros D.F.",
    journal: "BMJ Global Health",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/Publications/publication-5.png",
    summary: "This innovative study applies spatial accessibility models and health-facility catchment analyses to identify communities where people living with HIV face the greatest travel burdens to access care. By overlaying residence data with road-network travel times to clinics, the research defines \"underserved\" areas as those beyond 30- or 60-minute travel thresholds. Findings highlighted rural districts in KwaZulu-Natal and Eastern Cape as critical service gaps. The study advocates for decentralized ART delivery and mobile services to bridge spatial barriers, demonstrating how geographic analysis can inform service delivery strategies to improve HIV care accessibility and reduce treatment disparities.",
  },
  {
    title: "Role of high-risk communities in HIV spread in rural South Africa",
    authors: "Cuadros D.F., de Oliveira T., Gräf T., et al.",
    journal: "PLOS Global Public Health",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/Publications/publication-6.png",
    summary: "Using transmission network analysis, this study identifies communities acting as reservoir hubs in rural KwaZulu-Natal HIV transmission. Researchers found that individuals in these high-risk geographic hubs had elevated onward transmission potential, even while receiving treatment. These communities served as epidemiological bridges connecting to wider regions, perpetuating viral spread across geographic boundaries. The molecular epidemiology approach reveals how specific locations drive ongoing transmission despite treatment scale-up. The study recommends prioritizing hub locations for intensified testing, PrEP delivery, and enhanced community engagement strategies to disrupt established transmission pathways and reduce epidemic persistence in rural settings.",
  },

  // 2. HIV Care Access
  {
    title: "Geospatial Patterns of Progress towards UNAIDS \"95-95-95\" Targets and Community Vulnerability in Zambia",
    authors: "Cuadros D.F., Chowdhury M.D.T., Milali M., et al.",
    journal: "BMJ Global Health",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Care Access"],
    imageUrl: "/Images/Publications/publication-7.png",
    summary: "Analyzing 2016 ZAMPHIA data using Gaussian kernel interpolation, hotspot mapping, and geospatial k-means clustering, this study mapped progress and gaps in each \"95\" target (diagnosis, treatment, viral suppression) across Zambia. Each cascade indicator displayed unique spatial patterns, resulting in four distinct regional clusters with varying performance levels. Key factors linked to gaps included younger age, male sex, and low wealth status. Performance did not correlate with HIV prevalence, highlighting the need for targeted approaches. The study calls for region-specific interventions—tailoring testing access, treatment availability, and community engagement strategies—to efficiently close gaps in the HIV care continuum.",
  },
  {
    title: "Progress Towards UNAIDS 95-95-95 Targets in Zimbabwe: Sociodemographic Constraints and Geospatial Heterogeneity",
    authors: "Chowdhury M.D.T., Bershteyn A., Milali M., Citron D.T., Nyimbili S., Musuka G., Cuadros D.F.",
    journal: "Communications Medicine",
    year: 2025,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Care Access"],
    imageUrl: "/Images/Publications/publication-8.png",
    summary: "This comprehensive analysis of 2020 Zimbabwe Population-based HIV Impact Assessment data evaluates progress on UNAIDS 95-95-95 goals using geospatial methods including kernel interpolation, hotspot analysis, and k-means clustering. The research uncovered four distinct regional clusters with differing performance gaps across diagnosis, treatment, and viral suppression. Key risk factors for falling short of targets included being young, male, employed, or of minority/no religion. Border and underserved areas—particularly Mashonaland West and Midlands—showed slower progress. The study recommends tailored local interventions, emphasizing enhanced testing and treatment access in lagging districts to achieve equitable progress toward epidemic control.",
  },
  {
    title: "Moving Beyond HIV Prevalence Hotspots: Shifting the Focus Towards Geospatial Hotspots of UNAIDS 95-95-95 Targets in Sub-Saharan Africa",
    authors: "Cuadros D.F., et al.",
    journal: "BMJ Global Health",
    year: 2024,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Care Access"],
    imageUrl: "/Images/Publications/publication-9.png",
    summary: "This paradigm-shifting study examines spatial distributions of HIV prevalence versus geospatial coverage of UNAIDS 95-95-95 cascade targets across sub-Saharan Africa. The research argues that traditional prevalence-based hotspot mapping overlooks critical gaps in care—regions may have low prevalence but poor viral suppression or treatment reach. Drawing on examples from Zambia and Zimbabwe, the study highlights regional disparities in treatment and viral load metrics. The authors propose shifting geospatial targeting to address care cascade gaps rather than focusing solely on prevalence. They advocate using viral-load and ART coverage maps to guide interventions aimed at closing diagnosis, treatment, and suppression gaps.",
  },
  {
    title: "When distance matters: Mapping HIV healthcare–underserved communities in Sub-Saharan Africa",
    authors: "Kim H., Musuka G., Mukandavire Z., Cuadros D.F.",
    journal: "PLOS Global Public Health",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Care Access"],
    imageUrl: "/Images/Publications/publication-10.png",
    summary: "This groundbreaking study generated high-resolution maps identifying areas in sub-Saharan Africa where travel time to healthcare exceeds 10, 30, or 60 minutes, overlaying these with people living with HIV density estimates. The research identified over 7 million people living with HIV residing more than 10 minutes away on foot, and approximately 1.5 million more than 60 minutes away. Underserved zones were predominant in central and southern Africa. The study highlights critical spatial barriers to care access, advocating for decentralized services, mobile clinics, and geographically targeted interventions to reduce delays in ART access and ultimately prevent new HIV infections through improved treatment coverage.",
  },

  // 3. HIV Co-infections
  {
    title: "From individuals to populations: Immunological and epidemiological significance of co-infection in the dynamics of HIV",
    authors: "Cuadros D.F., Abu-Raddad L.J.",
    journal: "Journal of Clinical & Cellular Immunology",
    year: 2012,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-11.png",
    summary: "This theoretical framework explores the dual-scale impact of co-infection on HIV dynamics, examining how co-infections affect individuals immunologically and subsequently alter population-level transmission patterns. Using mathematical modeling approaches, the study demonstrates that co-infections such as malaria, tuberculosis, or sexually transmitted infections can significantly amplify HIV transmission at the community level. The research argues that co-infections create biological interactions that enhance HIV susceptibility and infectiousness, necessitating integrated health strategies that account for these syndemic effects. The findings emphasize the importance of addressing multiple pathogens simultaneously rather than treating diseases in isolation, informing more effective public health interventions.",
  },
  {
    title: "Association between HCV infection and diabetes type 2 in Egypt: is it time to split up?",
    authors: "Cuadros D.F., Miller F.D., Nagelkerke N., Abu-Raddad L.J.",
    journal: "Annals of Epidemiology",
    year: 2015,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-12.png",
    summary: "This epidemiological analysis found a modest but significant association between hepatitis C virus infection and type 2 diabetes in Egypt using national survey data, with an odds ratio of approximately 1.3. The study noted geographic overlap in clusters of both conditions, suggesting common underlying risk factors or potential causal relationships. Spatial mapping revealed that certain regions exhibited elevated prevalence of both diseases simultaneously. The research recommends integrated screening and management programs targeting hotspot communities where both conditions co-occur. These findings highlight the importance of considering comorbidities in public health planning and suggest potential benefits from coordinated surveillance and intervention strategies for both hepatitis C and diabetes.",
  },
  {
    title: "Convergence of HIV and Non-communicable Disease Epidemics: Geospatial Mapping of the Unmet Health Needs in an HIV Hyperendemic South African Community",
    authors: "Cuadros D.F., Devi C., Singh U., et al.",
    journal: "BMJ Global Health",
    year: 2024,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-13.png",
    summary: "This innovative study assessed unmet health needs across HIV, hypertension, and diabetes in KwaZulu-Natal using a novel need-score framework ranging from controlled disease to undiagnosed/uncontrolled status. Applied spatial clustering methods mapped areas of greatest unmet needs across an 18,041-individual survey. HIV-related unmet needs clustered in southern urban/peri-urban zones, while chronic non-communicable disease needs concentrated in rural central/northern and southern rural areas. Crucially, areas with overlapping high unmet needs across all three conditions were identified, providing guidance for integrated service delivery targeting the most vulnerable communities. The study demonstrates the value of mapping convergent epidemics for resource allocation.",
  },
  {
    title: "HIV-malaria co-infection: effects of malaria on the prevalence of HIV in East sub-Saharan Africa",
    authors: "Cuadros D.F., Branscum A.J., Crowley P.D.",
    journal: "International Journal of Epidemiology",
    year: 2011,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-14.png",
    summary: "This groundbreaking ecological analysis using data from Kenya, Malawi, and Tanzania (2003-2004; n ≈ 19,735) found that living in areas with high Plasmodium falciparum prevalence (>0.42) doubled the odds of being HIV-positive for both men (OR 2.24) and women (OR 2.44) compared to low-malaria areas (<0.10), after adjusting for covariates. The study demonstrates malaria as a significant ecological cofactor in HIV prevalence across Eastern Africa, revealing geographic synergy between these infections. These findings support integrated disease control strategies targeting both infections simultaneously, highlighting the importance of considering co-infection dynamics in public health planning and the potential benefits of coordinated malaria and HIV prevention efforts.",
  },
  {
    title: "No evidence of association between HIV-1 and malaria in populations with low HIV-1 prevalence",
    authors: "Cuadros D.F., Branscum A.J., Crowley P.D.",
    journal: "PLOS ONE",
    year: 2011,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-15.png",
    summary: "Following the East Africa analysis, this study assessed demographic and health survey data with malaria information across six western and central African countries. Unlike the strong association found in East Africa, this research found no significant association between malaria endemicity and HIV prevalence (overall OR 1.14, CI 0.86–1.50), except in Cameroon (OR 1.56). These contrasting results suggest the malaria–HIV interaction observed in East Africa doesn't generalize to regions with lower HIV prevalence, emphasizing the importance of local epidemiological context. The findings highlight that disease interactions may vary geographically and underscore the need for region-specific research and intervention strategies rather than universal approaches.",
  },
  {
    title: "Effect of variable transmission rate on the dynamics of HIV in sub-Saharan Africa",
    authors: "Cuadros D.F., Crowley P.D., Augustine T., Stewart G., García-Ramos G.",
    journal: "BMC Infectious Diseases",
    year: 2011,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-16.png",
    summary: "Using individual-based sexual network simulations informed by Malawian behavioral data, this study demonstrated that co-infections (HSV-2, syphilis, gonorrhea, malaria) are necessary to reproduce observed HIV epidemic levels—without them, HIV transmission dies out in models. Notably, over 70% of HIV transmissions were attributable to individuals co-infected with another pathogen, highlighting the critical role of syndemics in fueling HIV spread. The research emphasizes that co-infections significantly enhance HIV transmission efficiency and epidemic sustainability. Authors recommend incorporating co-infection dynamics into HIV prevention modeling and interventions, demonstrating the importance of integrated disease control strategies that address multiple pathogens simultaneously for effective epidemic control.",
  },
  {
    title: "Understanding the role of intimate partner violence on HIV transmission in Zimbabwe: Secondary data analysis of data from the Zimbabwe demographic survey 2015–2016",
    authors: "Mapingure M., Dzinamarira T., Mukandavire Z., Cuadros D.F.",
    journal: "BMJ Global Health",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-17.png",
    summary: "This analysis of ZDHS 2015–16 data evaluates intimate partner violence as an HIV risk factor among women in Zimbabwe. The study finds that physical, emotional, and sexual IPV is significantly associated with higher HIV prevalence, likely through both forced transmission and reduced negotiation power over safe sex practices. Spatial mapping reveals geographic heterogeneity, with IPV-HIV correlations concentrating in rural and underserved regions. The research demonstrates how violence against women creates biological and social vulnerabilities that increase HIV acquisition risk. The study underscores the need for integrated HIV and gender-based violence interventions targeting high-IPV areas, highlighting the importance of addressing social determinants of health in HIV prevention strategies.",
  },
  {
    title: "Syndemics and a renewed path for addressing intimate partner violence among women in South Africa's aging HIV endemic era",
    authors: "Tomita A., Cuadros D.F., Slotow R.",
    journal: "Scientific Reports",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-18.png",
    summary: "This syndemic analysis examined 5,874 ever-partnered women from South Africa Demographic and Health Survey 2016 data to explore geospatial overlap of intimate partner violence, alcohol misuse, and HIV. The study found significant clusters of physical IPV co-occurring with HIV and harmful alcohol use in Eastern Cape/Free State regions (e.g., RERI = 4.42, AP = 0.56, Synergy index = 2.77). Emotional and sexual IPV did not show similar clustering patterns. This syndemic mapping highlights areas needing integrated public health responses addressing multiple interlinked epidemics and gender-based violence. The research demonstrates the value of spatial analysis in identifying areas where multiple health and social problems converge, informing targeted interventions.",
  },
  {
    title: "Geospatial assessment of the convergence of communicable and non-communicable diseases in South Africa",
    authors: "Cuadros D.F., et al.",
    journal: "Journal of Multimorbidity and Comorbidity",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-19.png",
    summary: "This comprehensive study used South Africa Demographic and Health Survey 2016 data to map spatial distributions of HIV, tuberculosis, cardiovascular, respiratory, and metabolic diseases. HIV prevalence clustered in eastern provinces (Gauteng, Mpumalanga, KwaZulu-Natal), while non-communicable diseases concentrated in southern regions (Eastern and Western Cape). No geospatial overlap was found between HIV and NCD hotspots, suggesting distinct epidemic landscapes. Individual-level analysis also revealed no association between HIV status and NCD presence. The authors emphasize that interventions should account for this spatial divergence—integrating services locally but targeting unique regional disease burdens through geographically-informed health system planning and resource allocation strategies.",
  },

  // 4. Male Circumcision
  {
    title: "Are geographical \"cold spots\" of male circumcision driving differential HIV dynamics in Tanzania?",
    authors: "Cuadros D.F., Branscum A.J., Miller F.D., Awad S.F., Abu-Raddad L.J.",
    journal: "Frontiers in Public Health",
    year: 2015,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Male Circumcision"],
    imageUrl: "/Images/Publications/publication-20.png",
    summary: "This spatial analysis of Tanzanian national data identified geographic \"cold spots\" where male circumcision uptake remained persistently low, particularly in northern and central rural areas with MC prevalence below 40%. Geospatial modeling demonstrated that lower circumcision coverage correlated with higher HIV incidence rates, creating differential HIV transmission dynamics across regions. The study revealed that geographic gaps in circumcision services contributed to sustained HIV transmission in underserved areas. Authors recommend deploying mobile circumcision services and culturally tailored campaigns in underserved zones to reduce HIV transmission. The research demonstrates how geographic targeting of biomedical prevention interventions can address spatial heterogeneity in HIV risk and improve epidemic control efforts.",
  },
  {
    title: "Geospatial assessment of the voluntary medical male circumcision programme in Tanzania, 2011–2016",
    authors: "Kim H., Cuadros D.F., et al.",
    journal: "BMJ Global Health",
    year: 2019,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Male Circumcision"],
    imageUrl: "/Images/Publications/publication-21.png",
    summary: "Using Tanzania Demographic and Health Survey data (2011–2016), this study mapped male circumcision prevalence over time, finding national coverage rose from 73.5% to 80%. However, spatial clusters of low uptake (<60%) persisted—especially among 20–34-year-olds in high-risk areas. The research estimated approximately 1.57 million uncircumcised males in identified hotspots and found low-coverage zones near urban centers contrasted with rural gaps. Geographic analysis revealed persistent service coverage inequities despite overall national progress. The study recommends targeted outreach including mobile clinics, peer education, and youth engagement to close coverage disparities in high-risk areas, demonstrating the continued need for geographically-informed service delivery strategies to achieve equitable circumcision coverage.",
  },

  // 5. COVID-19 Transmission
  {
    title: "Quantifying early COVID-19 outbreak transmission in South Africa and exploring vaccine efficacy scenarios",
    authors: "Mukandavire Z., Cuadros D.F., et al.",
    journal: "PLOS ONE",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Transmission"],
    imageUrl: "/Images/Publications/publication-22.png",
    summary: "This modeling study analyzed South Africa's early COVID-19 transmission dynamics, estimating the basic reproduction number (R₀) at approximately 2.95. The research projected vaccine coverage requirements for herd immunity, finding that a 70% efficacious vaccine would require more than 94% population coverage, while a 100% efficacious vaccine would need approximately 66% coverage. The study also demonstrated that social distancing measures reduced effective contacts by approximately 80%, underscoring these interventions' critical role before vaccine availability. These findings informed early pandemic response planning by quantifying transmission parameters and vaccination thresholds necessary for epidemic control, providing crucial evidence for public health policy decisions during the initial pandemic response phase.",
  },
  {
    title: "Spatiotemporal transmission dynamics of the COVID-19 pandemic and its impact on critical healthcare capacity",
    authors: "Cuadros D.F., Xiao Y., Mukandavire Z., et al.",
    journal: "PLOS ONE",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Transmission"],
    imageUrl: "/Images/Publications/publication-23.png",
    summary: "This early pandemic analysis developed a spatial SEIR model at U.S. county level, demonstrating how urban outbreaks preceded rural ones and forecasting ICU bed shortages in vulnerable counties. The study mapped how early exponential growth in urban hubs propagated to rural areas, predicting healthcare capacity constraints. Model outputs guided recommendations for pre-emptive surge capacity in peripheral hospitals and staggered mitigation measures by region. The research highlighted the necessity of proactive resource reallocation and geographically-informed mitigation policies rather than uniform national strategies. This work provided crucial evidence for understanding how epidemic timing varied geographically and informed healthcare system preparedness and response planning during the critical early pandemic period.",
  },
  {
    title: "Spatiotemporal dynamics of the COVID-19 epidemic in rural and urban US areas",
    authors: "Cuadros D.F., Branscum A.J., Mukandavire Z., Miller F.D., MacKinnon N.J.",
    journal: "Annals of Epidemiology",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Transmission"],
    imageUrl: "/Images/Publications/publication-24.png",
    summary: "This comprehensive analysis examined COVID-19 transmission patterns across U.S. counties during early 2020, revealing distinct epidemic dynamics between urban and rural areas. The study found non-linear epidemic waves with earlier onset and higher peaks in urban areas; however, later rural surges resulted in prolonged epidemic tails. Vulnerable rural counties experienced delayed peaks but similar cumulative incidence compared to urban areas. The research demonstrated that geographic context significantly influenced epidemic timing and progression patterns. These findings supported region-specific mitigation timing and resource distribution strategies tailored to urban-rural epidemic staging differences, informing more effective geographically-targeted pandemic response strategies and highlighting the importance of considering spatial heterogeneity in epidemic planning and response.",
  },
  {
    title: "Association between vaccination coverage disparity and dynamics of COVID-19 Delta and Omicron waves in the US",
    authors: "Cuadros D.F., et al.",
    journal: "Frontiers in Medicine",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Transmission"],
    imageUrl: "/Images/Publications/publication-25.png",
    summary: "This study tracked county-level vaccination coverage during Delta and Omicron waves, finding that counties with lower vaccination rates experienced disproportionately higher relative infection rates and steeper epidemic curves. Spatial overlap was seen between low vaccine coverage and surges, especially in rural and socially vulnerable counties. The analysis demonstrated how vaccination disparities influenced variant-driven wave dynamics across different geographic areas. Counties with lower coverage had significantly higher incidence during both variant waves. The study emphasizes addressing geographic inequities in vaccination coverage and maintaining targeted outreach to mitigate future variant-driven waves, highlighting the importance of sustaining high vaccination coverage to reduce epidemic impact.",
  },

  // 6. COVID-19 Vaccination
  {
    title: "Analysis of vaccination rates and new COVID-19 infections by US county",
    authors: "Cuadros D.F., Miller I.D., Awad S., et al.",
    journal: "JAMA Network Open",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Vaccination"],
    imageUrl: "/Images/Publications/publication-26.png",
    summary: "This ecological analysis demonstrated that each 10% increase in county vaccination was associated with approximately 0.1 decrease in new COVID-19 cases per 100,000 population. Low-coverage counties experienced 3× higher incidence during the study period compared to high-coverage areas. Spatial mapping revealed distinct clusters of high-incidence correlating with low vaccination coverage, particularly in rural and socially vulnerable regions. The study provided crucial early evidence for vaccination effectiveness at the population level and informed policy decisions about vaccine distribution priorities. Results urged precise geospatial targeting of vaccine campaigns and community-based interventions to reduce case-cluster \"pockets\" and demonstrated the importance of achieving high coverage for community protection.",
  },
  {
    title: "Implementation of a Vaccination Program Based on Epidemic Geospatial Attributes: COVID-19 in Ohio",
    authors: "Awad S., Musuka G., Mukandavire Z., Froass S., MacKinnon N.J., Cuadros D.F.",
    journal: "Vaccines",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Vaccination"],
    imageUrl: "/Images/Publications/publication-27.png",
    summary: "This study used a spatially explicit compartmental model to simulate COVID-19 vaccine distribution across Ohio counties, comparing uniform versus geospatially targeted strategies. While equitable distribution averted approximately 2,954 cases and 165 hospitalizations, a strategy prioritizing high-infection intensity areas prevented more cases (~3,756) and hospitalizations (213). Results support geospatial targeting during early vaccine rollout—especially when supplies are constrained—to maximize public health impact. The modeling demonstrated how geographic intelligence could optimize vaccine allocation decisions. The study provided evidence for incorporating epidemic geospatial attributes into vaccination program planning and informed policy discussions about balancing equity and efficiency in vaccine distribution strategies.",
  },
  {
    title: "Impact of healthcare capacity disparities on the COVID-19 vaccination coverage in the United States: A cross-sectional study",
    authors: "Cuadros D.F., et al.",
    journal: "PLOS ONE",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Vaccination"],
    imageUrl: "/Images/Publications/publication-28.png",
    summary: "This analysis of 2,417 U.S. counties found that counties with limited healthcare capacity had significantly lower COVID-19 vaccination rates (≤ 50%), with a 35% higher healthcare constraint in low-coverage areas than in high-coverage ones. Spatial scan analysis revealed distinct \"vaccination coldspots\" tied to structural deficits—not just hesitancy. The study demonstrated that healthcare infrastructure limitations, rather than just vaccine hesitancy, significantly contributed to geographic disparities in vaccination coverage. The research concludes that bolstering healthcare infrastructure—especially in rural and underserved areas—is critical to improving vaccine uptake and managing future public health crises through enhanced system capacity and accessibility.",
  },
  {
    title: "Assessing access to digital services in healthcare-underserved communities in the United States: A cross-sectional study",
    authors: "Cuadros D.F., et al.",
    journal: "PLOS ONE",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Vaccination"],
    imageUrl: "/Images/Publications/publication-29.png",
    summary: "This comprehensive study examined broadband access in relation to healthcare equity across 3,108 U.S. counties, finding that digitally underserved areas—particularly in the U.S. South and Southeast—often coincided with higher social vulnerability, healthcare access barriers, and constrained health system capacity. One cluster contained 815 counties where only approximately 64% had broadband access, compared to 76% elsewhere, with 78% being rural areas. The study warns that \"digital deserts\" may widen health disparities by limiting telehealth adoption and digital health interventions. The research advocates for investment in broadband infrastructure and digital literacy to address systematic inequities affecting healthcare access and pandemic preparedness.",
  },

  // 7. COVID-19 Capacity
  {
    title: "A year of genomic surveillance reveals how the SARS-CoV-2 pandemic unfolded in Africa",
    authors: "Wilkinson E., Giovanetti M., Tegally H., San J.E., Lessells R., Cuadros D.F., et al.",
    journal: "Science",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Capacity"],
    imageUrl: "/Images/Publications/publication-30.png",
    summary: "This continent-wide genomic surveillance study across Africa in 2020 sequenced thousands of SARS-CoV-2 samples to identify introduction events, lineage diversification, and multiple local transmission clusters. The research documented the emergence and spread of variants of concern (e.g., Beta, Alpha) and highlighted critical gaps in diagnostic and sequencing infrastructure across the continent. The study revealed multiple independent viral introductions and local transmission patterns that varied significantly across different African regions. The findings emphasize the importance of building regional genomic capacity and real-time surveillance systems to enable timely detection and response to new variants, supporting enhanced pandemic preparedness and response capabilities across Africa.",
  },
  {
    title: "COVID-19 response in Zimbabwe: A Call for Urgent Scale-up of Testing to meet National Capacity",
    authors: "Dzinamarira T., Mukwenha S., Mukandavire Z., Cuadros D.F.",
    journal: "Clinical Infectious Diseases",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Capacity"],
    imageUrl: "/Images/Publications/publication-31.png",
    summary: "This study analyzed Zimbabwe's COVID-19 testing capacity during early 2020, documenting testing rates per province and laboratory turnaround times. The research highlighted rural–urban and socioeconomic inequities in testing access, with provinces like Masvingo and Matabeleland South conducting fewer than 10 tests per 10,000 population—leading to significant under-ascertainment of cases. Testing rates varied dramatically across provinces, with underperforming regions achieving less than 20% of the national average. The authors called for urgent expansion of decentralized testing capabilities, improved laboratory capacity, deployment of mobile diagnostic units, and better data integration into national public health response systems to address critical gaps in pandemic surveillance and response capacity.",
  },
  {
    title: "Changes of Grocery Shopping Frequencies and Associations with Food Deserts during the COVID-19 Pandemic in the United States",
    authors: "Li M., Changjoo S., Cuadros D.F., Tao D., Jia L.",
    journal: "PLOS ONE",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Capacity"],
    imageUrl: "/Images/Publications/publication-32.png",
    summary: "This study analyzed monthly county-level grocery store visit frequency during the pandemic (March 2020–December 2021), reporting a distinct \"W-shaped\" trend: steep decline during initial lockdowns, partial rebound, another dip during Delta/Omicron waves, and gradual stabilization. Importantly, residents in food deserts—especially rural areas—had smaller rebounds in shopping frequency, likely due to mobility restrictions, risk avoidance, or lack of nearby stores. The authors highlight the need for emergency food access planning and targeted support for food desert communities during health crises. The research demonstrates how pandemic responses differentially affected vulnerable communities and underscores the importance of considering geographic food access in emergency planning.",
  },

  // 8. Spatial Methods
  {
    title: "Spatial epidemiology of diabetes: Methods and insights",
    authors: "Cuadros D.F., Li J., Musuka G., Awad S.F.",
    journal: "World Journal of Diabetes",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Spatial Methods"],
    imageUrl: "/Images/Publications/publication-33.png",
    summary: "This methods review synthesizes spatial epidemiology applications to diabetes research, discussing geocoding, cluster detection (SaTScan, Getis-Ord Gi*), spatial regression, and GIS mapping for identifying hotspots and social determinants. Case studies highlight U.S. county-level variation and low- and middle-income country disparities in diabetes burden. The review demonstrates how spatial analytics combined with socioeconomic data can guide resource allocation, prevention programs, and health equity interventions. The work provides practical guidance for researchers and public health practitioners on implementing spatial analysis methods for diabetes surveillance and control. It emphasizes combining spatial techniques with demographic and social data to understand diabetes patterns and inform targeted interventions for reducing disease burden.",
  },
  {
    title: "Mapping the spatial variability of HIV infection in Sub-Saharan Africa",
    authors: "Cuadros D.F., Li J., Branscum A.J., Akullian A., Peng G., Mziray J., Tanser F.",
    journal: "Scientific Reports",
    year: 2017,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Spatial Methods"],
    imageUrl: "/Images/Publications/publication-34.png",
    summary: "Using HIV survey data and GIS, this work produced fine-scale (grid-level) prevalence maps showing dramatic within-country heterogeneity across sub-Saharan Africa. Combining spatial and demographic risk data, the research identifies high-burden pockets for targeted prevention—a method that supports micro-targeting for UNAIDS goals. The analysis revealed substantial geographic variation in HIV prevalence that national averages obscured, with prevalence ranging from 0.5% to over 40% in different clusters within countries. Factors like male circumcision, poverty, and rural proximity influenced local prevalence patterns. This work demonstrates the critical importance of geographic precision in HIV prevention and control, supporting evidence-based targeting of interventions to areas with greatest need.",
  },
  {
    title: "Capturing the spatial variability of HIV epidemics in South Africa and Tanzania using routine healthcare facility data",
    authors: "Cuadros D.F., et al.",
    journal: "International Journal of Health Geographics",
    year: 2018,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Spatial Methods"],
    imageUrl: "/Images/Publications/publication-35.png",
    summary: "Leveraging clinic-reported HIV test data, this study mapped subnational HIV prevalence trends in South Africa and Tanzania, revealing fine-scale spatial clusters of high transmission not captured in national surveys. The analysis revealed temporal shifts in hot- and cold-spots that corresponded with ART expansion and programmatic changes. The research demonstrated that routine health-facility data, when geospatially analyzed, can provide timely surveillance to guide resource allocation and intervention planning at the district level. This approach offers a cost-effective method for continuous HIV surveillance using existing healthcare system data. The study argues that routine facility data can complement traditional survey-based surveillance and provide more frequent updates on epidemic patterns for program planning.",
  },
  {
    title: "Targeting the right interventions to the right people and places: the role of geospatial analysis in HIV programme planning",
    authors: "Meter-Rath K., McGillen J.B., Cuadros D.F., et al.",
    journal: "AIDS",
    year: 2018,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Spatial Methods"],
    imageUrl: "/Images/Publications/publication-36.png",
    summary: "This methodological paper outlines using geospatial tools—cluster detection, spatial regression, and resource mapping—to optimize HIV program planning. Case studies in sub-Saharan Africa demonstrate how identifying transmission hotspots and service gaps enables prioritization of PrEP, voluntary medical male circumcision, and ART deployment. The framework emphasizes linking spatial analyses with demographic risk factors to identify subpopulations benefitting most from targeted interventions, improving program cost-effectiveness and impact. The study provides practical guidance for program managers on incorporating geographic intelligence into HIV program design and implementation. It demonstrates how spatial analysis can enhance traditional epidemiological approaches to achieve more efficient and effective HIV prevention and treatment programs.",
  },

  // 9. Hepatitis
  {
    title: "Spatial epidemiology of hepatitis C virus infection in Egypt: Analyses and implications",
    authors: "Cuadros D.F., Branscum A.J., Miller F.D., Abu-Raddad L.J.",
    journal: "BMC Infectious Diseases",
    year: 2014,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Hepatitis"],
    imageUrl: "/Images/Publications/publication-37.png",
    summary: "This comprehensive spatial analysis mapped hepatitis C virus infection patterns across Egypt, utilizing national seroprevalence data to identify geographic hotspots and burden distribution. The study revealed northern rural Egypt as a major HCV hotspot, with prevalence rates significantly higher than national averages. Spatial regression analysis implicated unsafe healthcare practices and socioeconomic deprivation as key risk factors associated with high-burden areas. The research demonstrated substantial geographic heterogeneity in HCV distribution across the country. Findings supported targeted public health interventions in high-burden regions and informed national HCV elimination strategies. The study recommended enhanced surveillance, targeted harm-reduction programs, and improved infection-control measures in hotspot regions. This work provided crucial epidemiological evidence for Egypt's national hepatitis C elimination program.",
  },
  {
    title: "The epidemiology of hepatitis C virus exposure in Egypt: Opportunities for prevention and evaluation",
    authors: "Miller F.D., Hassani S.A., Elzabany M.S., Cuadros D.F.",
    journal: "BMC Public Health",
    year: 2015,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Hepatitis"],
    imageUrl: "/Images/Publications/publication-38.png",
    summary: "Analyzing seroprevalence surveys, this study documented widespread HCV exposure in Egypt—up to 12% in older cohorts—with spatial mapping revealing northeast rural clusters as areas of highest burden. The research examined both historical and contemporary transmission patterns, identifying healthcare-associated transmission as a major driver of the epidemic. Spatial analysis revealed significant geographic heterogeneity in exposure patterns across the country. The study recommended expanded screening programs, harm reduction including needle safety initiatives, and treatment scale-up in hotspot regions. This work contributed to understanding Egypt's HCV epidemic dynamics and supported development of the national elimination program. The findings highlighted the importance of geographic targeting for both prevention and treatment interventions to achieve elimination goals.",
  },

  // 10. Substance Use
  {
    title: "Narrative minireview of the spatial epidemiology of substance use disorder in the United States: Who is at risk and where?",
    authors: "Cuadros D.F., Branscum A.J., Moreno M.A., MacKinnon N.J.",
    journal: "PLOS ONE",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Substance Use"],
    imageUrl: "/Images/Publications/publication-39.png",
    summary: "This comprehensive review examines geospatial trends in U.S. substance use disorder over decades, describing three epidemic waves—heroin (1970s–1999), prescription opioids, and synthetic opioids—with shifting geographic foci. Using spatial cluster analyses, the research identifies high-risk hotspots, notably Appalachia, rural Midwest, New England, and select western counties. Risk factors include socioeconomic deprivation, low healthcare access, and demographic vulnerabilities. The authors advocate for location-specific prevention policies, enhanced real-time geospatial surveillance, and addressing equity gaps in harm reduction to preempt emerging hotspots. This work provides a comprehensive framework for understanding how substance use epidemics evolve geographically and informs evidence-based approaches to prevention and intervention targeting.",
  },
  {
    title: "The Evolving Landscape of Substance Use Disorder Mortality in the United States: A Spatiotemporal Analysis of Emerging Hotspots and Vulnerable Populations (2005–2020)",
    authors: "Escobar R., et al.",
    journal: "Nature Medicine",
    year: 2024,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Substance Use"],
    imageUrl: "/Images/Publications/publication-40.png",
    summary: "This comprehensive study mapped county-level substance use disorder mortality across the contiguous U.S. (2005–2020) using spatial scan statistics, identifying 27 significant hotspots that shifted from the West to the East after 2016. Mortality rates within clusters reached approximately 28.4/100,000 for White residents versus 14.8 outside clusters, and 33.2/100,000 for Black residents versus 13.4 elsewhere. Notably, clusters in Black populations appeared later in the epidemic timeline. Urban clusters exhibited higher mortality (1.30 per 10,000/year) than rural ones (1.03). The study calls for region-specific, equity-focused interventions and real-time surveillance to tackle evolving substance use disorder hotspots and address disparities across demographic groups and geographic regions.",
  },
  {
    title: "Epidemiological and Geospatial Profile of the Prescription Opioid Crisis in Ohio, United States",
    authors: "Hernandez A., et al.",
    journal: "Scientific Reports",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Substance Use"],
    imageUrl: "/Images/Publications/publication-41.png",
    summary: "Analyzing Ohio overdose data (2010–2017), this study mapped prescription opioid–related deaths, identifying 12 spatiotemporal hotspots (e.g., Dayton, Cincinnati) where mortality was nearly 3× higher than surrounding areas. Demographic analysis showed white men aged 30–39 had the highest rates, while Black men exhibited faster growth trends in overdose deaths. The research revealed significant geographic clustering of overdose mortality that evolved over time. The study advocates for hotspot-specific public health interventions like naloxone distribution and treatment expansion in identified high-burden areas. This work demonstrates how spatial analysis can identify priority areas for overdose prevention and response efforts, supporting evidence-based resource allocation and targeted intervention strategies to address the prescription opioid crisis.",
  },
  {
    title: "Spatial clustering of food insecurity and its impact on depression in South Africa",
    authors: "Tomita A., Cuadros D.F., et al.",
    journal: "Scientific Reports",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Substance Use"],
    imageUrl: "/Images/Publications/publication-42.png",
    summary: "This study used SaTScan to identify food insecurity hotspots in South Africa (2008–2015), finding that among 8,801 individuals without baseline depression, living in a food insecurity hotspot increased the risk of developing depression by 11% (aRR = 1.11) after adjusting for socioeconomic factors. The research highlighted a \"food security paradox\" of mental health risk in agriculturally productive areas, demonstrating complex relationships between food access and mental health outcomes. Spatial clustering revealed geographic areas where food insecurity and depression co-occurred at higher rates than expected. The study supports place-based mental health interventions integrated with efforts to alleviate food insecurity, demonstrating how geographic targeting can address interconnected social and health challenges.",
  },
]

const uniqueTags = ["All Topics", ...Array.from(new Set(allPublications.flatMap(pub => pub.tags)))]

const featuredPresentations = [
  {
    year: 2024,
    title: "Evolution of HIV Transmission Networks in Rural South Africa, 25th International AIDS Conference",
  },
  { year: 2023, title: "Progress Toward UNAIDS 95-95-95 Targets in Zimbabwe, ICASA 2023" },
  { year: 2022, title: "Collision of HIV and NCD Epidemics, 24th International AIDS Conference" },
  { year: 2018, title: "Geographical HIV Hotspots and Epidemic Spread, CROI" },
  { year: 2017, title: "The HIV Epidemic in SSA: From Social Networks to Maps, Disease Modeling Symposium" },
]

const ongoingProjects = [
  {
    title: "Changing Face of HIV Epidemic",
    funder: "NIH",
    period: "2023–2027",
    role: "Co-I",
    amount: "$388k",
    description: "Investigating the spatial evolution of HIV risk in marginalized populations.",
  },
  {
    title: "Precision Public Health RTRI",
    funder: "NIH",
    period: "2023–2027",
    role: "Co-I",
    amount: "$270k",
    description: "AI-driven dashboards for real-time epidemiological tracking in urban settings.",
  },
]

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("All Topics")

  const filteredPublications = useMemo(() => {
    return allPublications.filter(pub => {
      const matchesSearch = 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesTag = selectedTag === "All Topics" || pub.tags.includes(selectedTag)
      
      return matchesSearch && matchesTag
    })
  }, [searchQuery, selectedTag])

  return (
    <div className="min-h-screen bg-site-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-deep-navy via-teal to-vibrant-gold dark:from-slate-100 dark:via-teal-400 dark:to-yellow-400 mb-4">
            Research Publications
          </h1>
          <p className="text-lg font-serif text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            A comprehensive collection of peer-reviewed research spanning global health epidemiology, spatial analytics, and public health interventions.
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by title, author, or journal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-sans bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-sans">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by topic:</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {uniqueTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className={`font-sans text-xs transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:hover:bg-teal-600"
                    : "text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-teal-50 dark:hover:bg-slate-800"
                }`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 font-sans">
            Selected publications, for a full list of publications please visit my{" "}
            <a 
              href="https://scholar.google.com/citations?user=zMoJ8n4AAAAJ&hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold underline transition-colors"
            >
              Google Scholar
            </a>
          </p>
        </motion.div>

        {/* Publications List */}
        <motion.div layout className="space-y-6 max-w-6xl mx-auto">
          <AnimatePresence>
            {filteredPublications.map((pub, index) => (
              <motion.div
                key={pub.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="w-full"
              >
                <Card className="h-full flex flex-col md:flex-row items-center overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-xl dark:hover:shadow-2xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg shadow-md">
                  <div className="w-full md:w-1/3 h-64 md:h-48 relative overflow-hidden">
                    <Image
                      src={pub.imageUrl}
                      alt={pub.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <div className="w-full md:w-2/3 p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {pub.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="font-sans text-xs bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 border-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-xl font-bold font-sans text-slate-900 dark:text-slate-100 mb-3 leading-tight hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        {pub.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-serif text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
                        {pub.authors} ({pub.year})
                      </CardDescription>
                      <div className="text-sm font-serif italic text-slate-600 dark:text-slate-400 mb-4">
                        {pub.journal}
                      </div>
                      {pub.summary && (
                        <div className="text-sm font-serif text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                          {pub.summary}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-end mt-auto pt-2">
                      <Button 
                        asChild 
                        variant="link" 
                        className="px-0 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold font-sans flex-shrink-0"
                      >
                        <a href={pub.links[0].href} target="_blank" rel="noopener noreferrer">
                          Read Paper <LinkIcon className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results message */}
        {filteredPublications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold font-sans text-slate-900 dark:text-slate-100 mb-2">No publications found</h3>
            <p className="text-slate-600 dark:text-slate-400 font-serif">
              Try adjusting your search terms or filter criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

