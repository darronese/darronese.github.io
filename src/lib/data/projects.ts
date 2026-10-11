export type Status = 'Live' | 'WIP' | 'Merged' | 'Completed' | 'Archived';

export type Tag = {
  label: string;
  // any CSS color; falls back to the palette grey
  color?: string;
};

export type Project = {
  title: string;
  description: string;
  tags: Tag[];
  status: Status;
  repo?: string;
  // text on the repo button, defaults to "source"
  repoLabel?: string;
  demo?: string;
  image?: string;
  // optional bullet points shown under the description
  highlights?: string[];
};

export const statusColors: Record<Status, string> = {
  'Live': '#7bc149',
  'WIP': '#c1a349',
  'Merged': '#6749c1',
  'Completed': '#49c1b7',
  'Archived': '#848fa5',
};

export const projects: Project[] = [
  {
    title: 'metal_detector',
    description:
      'An interactive tool for looking at logits, one forward pass at a time. Run a small language model in your browser and see every token it considered, the probability it gave each one, and why it picked the one it did.',
    tags: [
      { label: 'TypeScript', color: '#4953c1' },
      { label: 'Transformers.js', color: '#c1a349' },
      { label: 'WebGPU', color: '#c14953' },
    ],
    status: 'Live',
    repo: 'https://github.com/darronese/metal_detector',
    demo: 'https://darronese.github.io/metal_detector/',
    image: '/projects/metal_detector.svg',
    highlights: [
      'Custom autoregressive generation loop with Transformers.js that captures vocabulary-wide logits across successive forward passes and picks tokens by greedy decoding',
      'Numerically stable softmax, top-k selection, and Shannon entropy to analyze next-token probability distributions across sequence positions',
      'Turned the theory i was learning in shovel into something visually appealing',
    ],
  },
  {
    title: 'shovel',
    description:
      "Digging for \"gold\", where gold is learning more about GPU inference and how to optimize it. Basis for my machine learning projects like metal_detector",
    tags: [
      { label: 'Python', color: '#adc149' },
      { label: 'PyTorch', color: '#c14953' },
    ],
    status: 'WIP',
    image: '/projects/shovel.svg',
  },
  {
    title: 'tModLoader',
    description:
      'Open-source contribution to tModLoader, the modding API for Terraria',
    tags: [
      { label: 'C#', color: '#7b49c1' },
      { label: 'Git', color: '#c17149' },
      { label: 'Open Source', color: '#49c1b7' },
    ],
    status: 'Merged',
    repo: 'https://github.com/tModLoader/tModLoader/pull/5273',
    repoLabel: 'view PR',
    image: '/projects/terraria.png',
    highlights: [
      'Actually kind of fun..',
    ],
  },
];
