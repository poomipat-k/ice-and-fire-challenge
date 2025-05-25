// export class Book {
//   url: string;
//   name: string;
//   isbn: string;
//   authors: string[];
//   numberOfPages: number;
//   publisher: string;
//   country: string;
//   mediaType: string;
//   released: Date | string;
//   characters: string[];
//   povCharacters: string[];

//   constructor(
//     url: string,
//     name: string,
//     isbn: string,
//     authors: string[],
//     numberOfPages: number,
//     publisher: string,
//     country: string,
//     mediaType: string,
//     released: string,
//     characters: string[],
//     povCharacters: string[]
//   ) {
//     this.url = url;
//     this.name = name;
//     this.isbn = isbn;
//     this.authors = authors;
//     this.numberOfPages = numberOfPages;
//     this.publisher = publisher;
//     this.country = country;
//     this.mediaType = mediaType;
//     const date = new Date(released);
//     if (date.getDate() > 0) {
//       this.released = date;
//       console.log('==date:', date);
//     } else {
//       this.released = '';
//     }
//     this.characters = characters;
//     this.povCharacters = povCharacters;
//   }
// }
