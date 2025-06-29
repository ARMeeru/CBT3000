import { buzzwords } from '../data/translations';

export class BuzzwordGenerator {
  private static instance: BuzzwordGenerator;
  
  static getInstance(): BuzzwordGenerator {
    if (!BuzzwordGenerator.instance) {
      BuzzwordGenerator.instance = new BuzzwordGenerator();
    }
    return BuzzwordGenerator.instance;
  }

  private templates = [
    "We need to {verb} our {noun} to {verb} {adjective} {noun}",
    "Let's {verb} a {adjective} {noun} that will {verb} our {noun}",
    "Our {adjective} {noun} will {verb} the {noun} and {verb} {adjective} results",
    "By {verb}ing our {noun}, we can {verb} {adjective} {noun} across the {noun}",
    "This {adjective} {noun} will {verb} our ability to {verb} {adjective} {noun}",
    "We should {verb} our {noun} to create a more {adjective} {noun}",
    "Let's {verb} {adjective} {noun} to {verb} our competitive {noun}",
    "Our {noun} needs to {verb} {adjective} {noun} for maximum {noun}",
    "We must {verb} our {adjective} {noun} to {verb} market {noun}",
    "This initiative will {verb} our {noun} and {verb} {adjective} outcomes"
  ];

  private verbs = [
    "leverage", "optimize", "streamline", "enhance", "maximize", "revolutionize",
    "transform", "innovate", "disrupt", "scale", "integrate", "orchestrate",
    "synthesize", "monetize", "amplify", "accelerate", "cultivate", "architect",
    "engineer", "facilitate", "operationalize", "strategize", "visualize"
  ];

  private nouns = [
    "synergies", "paradigms", "ecosystems", "solutions", "platforms", "frameworks",
    "methodologies", "strategies", "initiatives", "deliverables", "capabilities",
    "competencies", "opportunities", "workflows", "processes", "outcomes",
    "touchpoints", "stakeholders", "bandwidth", "mindshare", "market share",
    "value proposition", "ROI", "KPIs", "metrics", "analytics", "insights"
  ];

  private adjectives = [
    "robust", "scalable", "dynamic", "strategic", "holistic", "comprehensive",
    "innovative", "disruptive", "cutting-edge", "next-generation", "world-class",
    "mission-critical", "best-in-class", "value-driven", "results-oriented",
    "customer-centric", "data-driven", "agile", "lean", "efficient", "seamless",
    "intuitive", "turnkey", "enterprise-grade", "future-proof", "game-changing"
  ];

  generatePhrase(): string {
    const template = this.getRandomItem(this.templates);
    
    return template
      .replace(/{verb}/g, () => this.getRandomItem(this.verbs))
      .replace(/{noun}/g, () => this.getRandomItem(this.nouns))
      .replace(/{adjective}/g, () => this.getRandomItem(this.adjectives));
  }

  generateBuzzwordList(count: number = 5): string[] {
    const allBuzzwords = [...this.verbs, ...this.nouns, ...this.adjectives, ...buzzwords];
    const shuffled = [...allBuzzwords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}