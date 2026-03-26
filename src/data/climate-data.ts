// Global temperature anomaly data (NOAA/NASA GISS)
export const temperatureData = [
  { year: 1880, anomaly: -0.16 },
  { year: 1890, anomaly: -0.35 },
  { year: 1900, anomaly: -0.08 },
  { year: 1910, anomaly: -0.42 },
  { year: 1920, anomaly: -0.27 },
  { year: 1930, anomaly: -0.14 },
  { year: 1940, anomaly: 0.04 },
  { year: 1950, anomaly: -0.16 },
  { year: 1960, anomaly: -0.01 },
  { year: 1970, anomaly: -0.01 },
  { year: 1975, anomaly: -0.07 },
  { year: 1980, anomaly: 0.18 },
  { year: 1985, anomaly: 0.12 },
  { year: 1990, anomaly: 0.39 },
  { year: 1995, anomaly: 0.46 },
  { year: 2000, anomaly: 0.39 },
  { year: 2005, anomaly: 0.67 },
  { year: 2010, anomaly: 0.72 },
  { year: 2015, anomaly: 0.87 },
  { year: 2016, anomaly: 1.01 },
  { year: 2017, anomaly: 0.92 },
  { year: 2018, anomaly: 0.85 },
  { year: 2019, anomaly: 0.98 },
  { year: 2020, anomaly: 1.02 },
  { year: 2021, anomaly: 0.85 },
  { year: 2022, anomaly: 0.89 },
  { year: 2023, anomaly: 1.17 },
  { year: 2024, anomaly: 1.29 },
];

// Regional temperature impact
export const regionalData = [
  { region: "Arctic", change: 3.1, color: "#60a5fa" },
  { region: "Europe", change: 1.8, color: "#a78bfa" },
  { region: "N. America", change: 1.5, color: "#f472b6" },
  { region: "Asia", change: 1.4, color: "#fb923c" },
  { region: "Africa", change: 1.2, color: "#facc15" },
  { region: "S. America", change: 1.0, color: "#4ade80" },
  { region: "Oceania", change: 0.9, color: "#22d3ee" },
  { region: "Antarctica", change: 2.5, color: "#c4b5fd" },
];

// CO2 concentration data (Mauna Loa)
export const co2Data = [
  { year: 1960, ppm: 317 },
  { year: 1965, ppm: 320 },
  { year: 1970, ppm: 326 },
  { year: 1975, ppm: 331 },
  { year: 1980, ppm: 339 },
  { year: 1985, ppm: 346 },
  { year: 1990, ppm: 354 },
  { year: 1995, ppm: 361 },
  { year: 2000, ppm: 369 },
  { year: 2005, ppm: 380 },
  { year: 2010, ppm: 390 },
  { year: 2015, ppm: 401 },
  { year: 2016, ppm: 404 },
  { year: 2017, ppm: 407 },
  { year: 2018, ppm: 409 },
  { year: 2019, ppm: 412 },
  { year: 2020, ppm: 414 },
  { year: 2021, ppm: 417 },
  { year: 2022, ppm: 421 },
  { year: 2023, ppm: 424 },
  { year: 2024, ppm: 427 },
];

// Chapter definitions
export interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  headline: string;
  color: string;
  bgGradient: string;
  narrativeBlocks: string[];
  stats: { label: string; value: string }[];
}

export const chapters: Chapter[] = [
  {
    id: 1,
    slug: "overview",
    title: "Chapter One",
    subtitle: "The Overview",
    headline: "Our Planet Is Warming",
    color: "#3b82f6",
    bgGradient: "from-[#050a15] to-[#0a1628]",
    narrativeBlocks: [
      "Since the industrial revolution, human activity has released billions of tonnes of greenhouse gases into the atmosphere. The result is unmistakable: our planet's average temperature has risen by 1.1°C above pre-industrial levels.",
      "The last decade was the warmest on record. Ice sheets in Greenland and Antarctica are losing mass six times faster than in the 1990s. Sea ice extent has declined by 13% per decade since satellite records began in 1979.",
      "This isn't a distant future scenario — it's happening now. Every fraction of a degree matters, and the pace of change is accelerating.",
    ],
    stats: [
      { label: "Temperature Rise Since 1880", value: "1.1°C" },
      { label: "Ice Loss Acceleration", value: "6×" },
      { label: "Sea Ice Decline Per Decade", value: "13%" },
    ],
  },
  {
    id: 2,
    slug: "weather",
    title: "Chapter Two",
    subtitle: "Extreme Weather",
    headline: "Weather Is Getting Wilder",
    color: "#8b5cf6",
    bgGradient: "from-[#0a1628] to-[#1a0a28]",
    narrativeBlocks: [
      "As our atmosphere warms, it holds more moisture — about 7% more for every degree Celsius of warming. This supercharges storms, making heavy rainfall events significantly more intense.",
      "Heatwaves that once occurred every 50 years now happen roughly every decade. Wildfires burn twice the area they did 30 years ago. Hurricanes are intensifying faster, with rapid intensification events becoming increasingly common.",
      "The economic toll is staggering. Weather-related disasters caused over $300 billion in damages in 2023 alone, disproportionately affecting the most vulnerable communities.",
    ],
    stats: [
      { label: "More Moisture Per °C", value: "7%" },
      { label: "Increase in Extreme Events", value: "50%" },
      { label: "Annual Disaster Cost", value: "$300B" },
    ],
  },
  {
    id: 3,
    slug: "oceans",
    title: "Chapter Three",
    subtitle: "Oceans in Crisis",
    headline: "The Ocean Is Changing",
    color: "#06b6d4",
    bgGradient: "from-[#1a0a28] to-[#0a1e2e]",
    narrativeBlocks: [
      "Our oceans have absorbed over 90% of the excess heat trapped by greenhouse gases. This thermal energy is reshaping marine ecosystems, from surface waters to the deep ocean.",
      "Coral reefs — home to 25% of all marine species — face mass bleaching events. Since 2016, the Great Barrier Reef has experienced multiple bleaching events, with some areas losing over half their coral cover.",
      "Sea levels have risen over 20 centimeters since 1900, and the rate is accelerating. By 2100, hundreds of millions of people living in coastal areas could face flooding and displacement.",
    ],
    stats: [
      { label: "Heat Absorbed by Oceans", value: "90%" },
      { label: "Sea Level Rise Since 1900", value: "20cm" },
      { label: "Marine Species in Reef Systems", value: "25%" },
    ],
  },
  {
    id: 4,
    slug: "solutions",
    title: "Chapter Four",
    subtitle: "Solutions",
    headline: "Hope Through Innovation",
    color: "#22c55e",
    bgGradient: "from-[#0a1e2e] to-[#0a2818]",
    narrativeBlocks: [
      "Renewable energy is now the cheapest source of new electricity generation in most of the world. Solar costs have plummeted 89% since 2010, and wind power capacity has quadrupled.",
      "Carbon capture technology is advancing rapidly. Direct air capture plants, enhanced weathering, and nature-based solutions like reforestation are all scaling up to remove CO₂ from the atmosphere.",
      "Electric vehicles, green hydrogen, sustainable agriculture, and circular economy principles are transforming entire industries. The clean energy transition represents the greatest economic opportunity of our generation.",
    ],
    stats: [
      { label: "Solar Cost Reduction Since 2010", value: "89%" },
      { label: "Wind Capacity Growth", value: "4×" },
      { label: "Clean Energy Jobs Created", value: "14M" },
    ],
  },
  {
    id: 5,
    slug: "action",
    title: "Chapter Five",
    subtitle: "Your Role",
    headline: "Every Action Counts",
    color: "#f59e0b",
    bgGradient: "from-[#0a2818] to-[#2a1a08]",
    narrativeBlocks: [
      "Systemic change requires collective action, but individual choices matter too. Every tonne of CO₂ not emitted makes a measurable difference in limiting warming.",
      "Reduce your carbon footprint through transportation choices, energy efficiency, diet shifts, and conscious consumption. Support policies and companies aligned with climate goals.",
      "We have the technology, the knowledge, and the resources. What we need now is the will to act — together, decisively, and with urgency. The story of our climate is still being written, and you are one of its authors.",
    ],
    stats: [
      { label: "Years to Act Decisively", value: "<7" },
      { label: "People Who Can Make a Difference", value: "8B" },
      { label: "Future Worth Protecting", value: "1" },
    ],
  },
];
