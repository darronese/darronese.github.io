export type Fact = {
  token: string;
  logit: number;
  detail: string;
  eos?: boolean;
};

// "Training data" for the about section: each fact is a candidate next token.
// `logit` is the raw score; the section softmaxes these with the temperature slider,
// so a higher logit = picked more often
export const facts: Fact[] = [
  {
    token: 'a Radiohead fan',
    logit: 3.0,
    detail: 'name 5 radiohead songs...',
  },
  {
    token: 'still waiting on The Winds of Winter',
    logit: 2.7,
    detail: 'it\'s coming out soon i swear',
  },
  {
    token: 'lisan al-gaib',
    logit: 2.5,
    detail: 'jk i wish i had mentat brain compute',
  },
  {
    token: 'one letter away from Darrow',
    logit: 2.3,
    detail: 'Pierce Brown release Red God please',
  },
  {
    token: 'a Berserk fan (before 2021)',
    logit: 2.1,
    detail: 'please read falcon of the millenium empire',
  },
  {
    token: 'a Walking Dead fan',
    logit: 1.8,
    detail: 'i\'m rick grimes',
  },
  {
    token: 'the LeetCode Club founder',
    logit: 1.3,
    detail: 'Started it and grew it to 100+ members: curricula, mock interviews, industry panels.',
  },
  {
    token: '<eos>',
    logit: 0.3,
    detail: 'The model decided it was done talking. Reset to sample again.',
    eos: true,
  },
];
