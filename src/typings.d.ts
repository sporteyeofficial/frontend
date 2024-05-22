declare module 'bad-words' {
  class Filter {
    constructor(options?: { list?: string[]; placeHolder?: string });
    clean(text: string): string;
    isProfane(text: string): boolean;
    addWords(...words: string[]): void;
    removeWords(...words: string[]): void;
  }

  export = Filter;
}

declare module "naughty-words";
