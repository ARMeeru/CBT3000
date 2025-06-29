import { Translation } from '../types';

export const translations: Translation[] = [
  // Core translations from the brief
  { corporate: "Let's circle back", honest: "I wasn't listening and need time to Google this" },
  { corporate: "Think outside the box", honest: "Fix this impossible problem with no resources" },
  { corporate: "Wear many hats", honest: "Do 5 jobs for the price of 0.8" },
  { corporate: "Touch base", honest: "Interrupt your actual work" },
  { corporate: "Low-hanging fruit", honest: "The easy stuff we should have done months ago" },
  { corporate: "Move the needle", honest: "Show me numbers so I can take credit" },
  { corporate: "Synergize", honest: "Make this someone else's problem" },
  { corporate: "Circle back offline", honest: "Let's pretend this meeting never happened" },
  { corporate: "Streamline processes", honest: "Fire people and make others work harder" },
  { corporate: "Leverage our core competencies", honest: "Do what we've always done but sound fancy" },
  
  // Honest → Corporate translations from the PRD
  { honest: "This is stupid", corporate: "I'd love to explore alternative approaches" },
  { honest: "You're incompetent", corporate: "I see an opportunity for skill development" },
  { honest: "That won't work", corporate: "Let's workshop some creative solutions" },
  { honest: "I don't know", corporate: "Let me circle back with stakeholders" },
  { honest: "You're wasting time", corporate: "Perhaps we could optimize our bandwidth allocation" },
  { honest: "This is impossible", corporate: "This presents some interesting challenges" },
  { honest: "You're wrong", corporate: "I have a different perspective on this" },
  { honest: "I hate this job", corporate: "I'm passionate about exploring new opportunities" },
  { honest: "This meeting is pointless", corporate: "Let's ensure we're maximizing our collaborative time" },
  { honest: "You're lying", corporate: "I'd appreciate additional context on that data point" },
  { honest: "I'm confused", corporate: "Could you help me understand the strategic rationale?" },
  { honest: "This is broken", corporate: "I see an opportunity for process improvement" },
  { honest: "Nobody cares", corporate: "We should validate stakeholder engagement levels" },
  { honest: "You're late", corporate: "I want to respect everyone's time commitments" },
  { honest: "This is boring", corporate: "I'd love to explore more dynamic approaches" },
  { honest: "You messed up", corporate: "Let's identify learnings from this experience" },
  { honest: "I'm not doing that", corporate: "Let me assess the resource allocation for that initiative" },
  { honest: "This is a waste of money", corporate: "We should evaluate the ROI on this investment" },
  { honest: "You're annoying", corporate: "I appreciate your enthusiasm and attention to detail" },
  { honest: "I forgot", corporate: "Let me prioritize that in my action items" },
  
  // Additional corporate classics
  { corporate: "Best practice", honest: "The only way we know how to do it" },
  { corporate: "Ideate", honest: "Think of ideas we'll never implement" },
  { corporate: "At the end of the day", honest: "When I run out of buzzwords" },
  { corporate: "Game changer", honest: "This week's overhyped initiative" },
  { corporate: "Take it to the next level", honest: "Make it more complicated" },
  { corporate: "Drill down", honest: "Ask you to do the work I should do" },
  { corporate: "Reach out", honest: "Bother someone via email" },
  { corporate: "Value-add", honest: "Justify my existence" },
  { corporate: "Deep dive", honest: "Pretend to analyze something thoroughly" },
  { corporate: "Paradigm shift", honest: "We're changing direction again" },
  { corporate: "Deliverables", honest: "Stuff you need to finish" },
  { corporate: "Bandwidth", honest: "Time you don't actually have" },
  { corporate: "Stakeholder", honest: "Person who can ruin your project" },
  { corporate: "Action items", honest: "Your weekend plans" },
  { corporate: "Table this", honest: "Forget about it forever" },
  { corporate: "Push the envelope", honest: "Break things and blame others" },
  { corporate: "Win-win", honest: "I win, you think you win" },
  { corporate: "Scalable solution", honest: "We'll worry about it breaking later" },
  { corporate: "Innovation", honest: "Copying what competitors did last year" },
  { corporate: "Digital transformation", honest: "Expensive consultants telling us to use computers" },
  { corporate: "Agile methodology", honest: "Changing requirements every five minutes" },
  { corporate: "Growth hacking", honest: "Spamming people creatively" },
  { corporate: "Disruptive", honest: "Annoying" },
  { corporate: "Pivot", honest: "Admit our original idea was terrible" },
  { corporate: "Optimize", honest: "Make worse in the name of efficiency" },
  { corporate: "Strategic alignment", honest: "Make everyone pretend to agree" },
  { corporate: "Market penetration", honest: "Bothering potential customers aggressively" },
  { corporate: "Customer journey", honest: "The maze we make people navigate" },
  { corporate: "Thought leadership", honest: "Posting obvious insights on LinkedIn" },
];

export const buzzwords = [
  "synergy", "paradigm", "ecosystem", "disruption", "innovation", "optimization",
  "leverage", "scalable", "robust", "dynamic", "strategic", "holistic",
  "comprehensive", "integrated", "streamlined", "cutting-edge", "next-generation",
  "world-class", "best-in-class", "mission-critical", "value-driven", "results-oriented",
  "customer-centric", "data-driven", "agile", "lean", "efficient", "effective",
  "seamless", "intuitive", "user-friendly", "turnkey", "end-to-end", "full-service",
  "enterprise", "solution", "platform", "framework", "methodology", "approach",
  "strategy", "vision", "roadmap", "blueprint", "architecture", "infrastructure"
];

export const bingoWords = [
  "Synergy", "Paradigm", "Leverage", "Circle back", "Touch base", "Think outside the box",
  "Low-hanging fruit", "Move the needle", "Game changer", "Best practice", "Deep dive",
  "Drill down", "Take offline", "Bandwidth", "Stakeholder", "Deliverables", "Action items",
  "Value-add", "Win-win", "Push envelope", "Table this", "Ideate", "Pivot", "Disruptive",
  "Innovation", "Optimize", "Streamline", "Strategic", "Holistic", "Robust", "Dynamic",
  "Scalable", "Agile", "Lean", "Customer-centric", "Data-driven", "Results-oriented",
  "Mission-critical", "World-class", "Next-gen", "Cutting-edge", "End-to-end", "Turnkey",
  "Enterprise", "Platform", "Framework", "Roadmap", "Blueprint", "Infrastructure"
];

// Easter egg translations - special hidden translations for specific terms
export const easterEggs: Translation[] = [
  { corporate: "Corporate Buzzword Translator 3000", honest: "The hero we need but don't deserve" },
  { corporate: "AI", honest: "Autocomplete with delusions of grandeur" },
  { corporate: "Machine Learning", honest: "Statistics with a marketing budget" },
  { corporate: "Blockchain", honest: "A very slow database with trust issues" },
  { corporate: "The Cloud", honest: "Someone else's computer" },
  { corporate: "Big Data", honest: "Regular data with an ego problem" },
  { corporate: "Growth Hacker", honest: "Marketer who learned to code 'Hello World'" },
  { corporate: "Ninja", honest: "Person who disappears when you need them most" },
  { corporate: "Rockstar", honest: "Developer who thinks they're too cool for documentation" },
  { corporate: "Guru", honest: "Someone who Googles things slightly faster than you" },
  { corporate: "Unicorn", honest: "Mythical creature that burns investor money" },
  { corporate: "Disruptor", honest: "Person who breaks things and calls it innovation" },
  { corporate: "Thought Leader", honest: "LinkedIn influencer with a thesaurus" },
  { corporate: "Digital Native", honest: "Person who can't remember life before WiFi" },
  { corporate: "Evangelist", honest: "Salesperson with religious fervor" },
  { corporate: "10x Engineer", honest: "Developer who creates 10x more bugs" },
  { honest: "I quit", corporate: "I'm pursuing other opportunities to maximize my potential" },
  { honest: "You're fired", corporate: "We're restructuring your role for optimal efficiency" },
  { honest: "This company is doomed", corporate: "We're navigating some exciting market challenges" },
  { honest: "The CEO is clueless", corporate: "Leadership is exploring innovative strategic directions" },
];

// Witty error messages and loading states
export const wittyMessages = {
  loading: [
    "Translating corporate nonsense...",
    "Decoding the synergy matrix...",
    "Optimizing buzzword algorithms...",
    "Leveraging linguistic paradigms...",
    "Streamlining communication processes...",
    "Disrupting traditional translation methods...",
    "Ideating semantic solutions...",
    "Circling back on language patterns...",
    "Deep diving into corporate speak...",
    "Pivoting linguistic frameworks..."
  ],
  errors: [
    "Error 404: Synergy not found",
    "Oops! Our paradigm shifted unexpectedly",
    "Translation failed - not enough buzzwords detected",
    "System error: Ran out of corporate speak",
    "Warning: Bullshit levels exceeded maximum capacity",
    "Error: Unable to leverage core competencies",
    "Translation timeout - too much authentic communication detected",
    "System overload: Excessive honesty in input",
    "Error 500: Internal synergy malfunction",
    "Warning: Authenticity levels dangerously high"
  ],
  empty: [
    "Awaiting corporate wisdom...",
    "Ready to decode your buzzwords",
    "Standing by for synergy translation",
    "Prepared to optimize your communication",
    "Ready to streamline your messaging",
    "Waiting for paradigm-shifting input",
    "Standing by to leverage your thoughts",
    "Ready to circle back on your ideas"
  ]
};
