export interface TattooVision {
  // Step 1: Basics
  mainSubject: string;
  placement: string;
  size: string;
  style: 'black-grey' | 'color' | '';

  // Step 2: Mood
  selectedMoods: string[];

  // Step 3: Background
  backgroundStyle: string;

  // Step 4: Details
  pose: string;
  expression: string;
  lighting: string;
  addedElements: string;
  textScript: string;
  personalMeaning: string;
}

export const initialVision: TattooVision = {
  mainSubject: '',
  placement: '',
  size: '',
  style: '',
  selectedMoods: [],
  backgroundStyle: '',
  pose: '',
  expression: '',
  lighting: '',
  addedElements: '',
  textScript: '',
  personalMeaning: '',
};

export const placements = [
  { value: 'inner-forearm', label: 'Inner Forearm', size: '3–5 inches tall', bestFor: 'Portraits, single subjects, medium detail', shape: 'Vertical/oval' },
  { value: 'outer-forearm', label: 'Outer Forearm', size: '4–6 inches tall', bestFor: 'Ships, animals, scenic pieces', shape: 'Vertical/wraparound' },
  { value: 'upper-arm', label: 'Upper Arm / Bicep', size: '5–8 inches', bestFor: 'Warriors, lions, detailed portraits', shape: 'Square/round' },
  { value: 'half-sleeve', label: 'Half Sleeve', size: 'Shoulder to elbow', bestFor: 'Multi-element compositions, storytelling', shape: 'Wraparound flow' },
  { value: 'chest', label: 'Chest Panel', size: '6–10 inches', bestFor: 'Eagles, lions, religious imagery', shape: 'Horizontal/curved' },
  { value: 'full-back', label: 'Full Back', size: '12–18 inches+', bestFor: 'Epic scenes, angels, large portraits', shape: 'Vertical canvas' },
  { value: 'thigh', label: 'Thigh', size: '6–12 inches', bestFor: 'Portraits, animals, detailed scenes', shape: 'Tall vertical' },
  { value: 'calf', label: 'Calf', size: '5–8 inches', bestFor: 'Ships, jellyfish, vertical subjects', shape: 'Vertical oval' },
  { value: 'ribs', label: 'Ribs', size: '6–10 inches', bestFor: 'Script, flowing designs, roses', shape: 'Long vertical' },
];

export const moodCategories = [
  {
    name: 'Powerful & Strong',
    moods: ['Fierce', 'Intense', 'Commanding', 'Dominant', 'Warrior', 'Unstoppable', 'Raw Power', 'Primal'],
    bestFor: 'Lions, wolves, warriors, eagles, bears',
  },
  {
    name: 'Peaceful & Spiritual',
    moods: ['Serene', 'Ethereal', 'Divine', 'Sacred', 'Tranquil', 'Heavenly', 'Blessed', 'Calm'],
    bestFor: 'Angels, doves, religious imagery, portraits, memorial pieces',
  },
  {
    name: 'Dark & Mysterious',
    moods: ['Gothic', 'Haunting', 'Ominous', 'Shadowy', 'Mysterious', 'Macabre', 'Brooding', 'Sinister'],
    bestFor: 'Skulls, reapers, ravens, dark portraits, horror themes',
  },
  {
    name: 'Elegant & Beautiful',
    moods: ['Graceful', 'Delicate', 'Refined', 'Romantic', 'Soft', 'Flowing', 'Timeless', 'Classic'],
    bestFor: 'Florals, feminine portraits, butterflies, nature scenes',
  },
  {
    name: 'Wild & Untamed',
    moods: ['Free', 'Adventurous', 'Rebellious', 'Rugged', 'Storm-Swept', 'Untamed', 'Bold', 'Fearless'],
    bestFor: 'Ships, ocean scenes, wolves, nautical themes, wilderness',
  },
  {
    name: 'Stoic & Timeless',
    moods: ['Noble', 'Dignified', 'Ancient', 'Weathered', 'Wise', 'Enduring', 'Classical', 'Heroic'],
    bestFor: 'Spartans, Greek statues, samurai, historical warriors',
  },
];

export const backgroundStyles = [
  { value: 'clean', label: 'Clean / No Background', description: 'Subject stands alone with no added elements. Skin becomes the background.', bestFor: 'Portraits, single animals, minimalist designs' },
  { value: 'smoke', label: 'Smoke / Mist', description: 'Soft, atmospheric wisps that fade into skin. Creates depth and mystery.', bestFor: 'Skulls, warriors, dark themes, portraits' },
  { value: 'clouds', label: 'Clouds / Sky', description: 'Heavenly, divine feeling. Can be dramatic storm clouds or peaceful.', bestFor: 'Angels, doves, religious, memorial' },
  { value: 'geometric', label: 'Geometric Shapes', description: 'Triangles, circles, sacred geometry. Modern and structured.', bestFor: 'Animals, nature, spiritual symbols' },
  { value: 'nature', label: 'Nature Scene', description: 'Forest silhouettes, mountains, moon, trees. Adds context and story.', bestFor: 'Wolves, bears, wildlife, outdoors themes' },
  { value: 'floral', label: 'Floral Frame', description: 'Roses, peonies, leaves surrounding the subject. Elegant border.', bestFor: 'Portraits, skulls, feminine pieces' },
  { value: 'ocean', label: 'Ocean / Water', description: 'Waves, water texture, spray. Dynamic and powerful.', bestFor: 'Ships, sea creatures, nautical themes' },
  { value: 'dark-fade', label: 'Dark Fade / Vignette', description: 'Heavy black shading that fades outward. Dramatic spotlight effect.', bestFor: 'Portraits, animals, dramatic pieces' },
];
