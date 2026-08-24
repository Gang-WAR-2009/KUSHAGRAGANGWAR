// ============================================================================
// SITE CONFIG
// ----------------------------------------------------------------------------
// This is the ONE file you need to edit to update your personal info.
// Everything here flows into Hero, About, and Contact automatically.
// ============================================================================

export const siteConfig = {
  name: 'Gangwar',

  // Shown in the browser tab and social share previews.
  siteTitle: 'Gangwar — Portfolio',
  siteDescription: 'Personal portfolio and project archive.',
  baseUrl: import.meta.env.BASE_URL,

  // ABOUT ME
  // Supports multiple paragraphs — just add more strings to the array.
  // Replace this placeholder with your real bio before shipping.
  about: [
    'Placeholder — replace this with a short introduction about who you are, what you build, and what you\u2019re curious about.',
    'Placeholder — add a second paragraph here about your interests, the kind of problems you like solving, or what you\u2019re currently learning.',
  ],

  // CONTACT LINKS
  // Used in the Contact section. Leave a value empty string to hide that link.
  links: {
    instagram: {
      label: 'Instagram',
      handle: '@yourhandle',
      url: 'https://instagram.com/yourhandle',
    },
    github: {
      label: 'GitHub',
      handle: 'github.com/yourhandle',
      url: 'https://github.com/yourhandle',
    },
    email: {
      label: 'Email',
      handle: 'you@example.com',
      url: 'mailto:you@example.com',
    },
  },
};
