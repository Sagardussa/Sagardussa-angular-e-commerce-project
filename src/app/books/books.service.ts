import { Injectable } from '@angular/core';

@Injectable()
export class BooksService {

  constructor() { }

  getBooks() {
    return [
      {
        name: "clean code",
        author: "Robert C. Martin",
        image: "https://m.media-amazon.com/images/I/51E2055ZGUL._SL1000_.jpg",
        amount: 700
      },
      {
        name: "Java Concurrency in Practice",
        author: "Goetz",
        image: "https://m.media-amazon.com/images/I/91nHBcsAMxL._SL1500_.jpg",
        amount: 500

      },
      {
        name: "Journey to Angular Development",
        author: " Sukesh Marla ",
        image: "https://m.media-amazon.com/images/I/61vhsCS3V0L._SL1233_.jpg",
        amount: 900
      },
      {
        name: "clean code",
        author: "Robert C. Martin",
        image: "https://m.media-amazon.com/images/I/51E2055ZGUL._SL1000_.jpg",
        amount: 700
      },
      {
        name: "Java Concurrency in Practice",
        author: "Goetz",
        image: "https://m.media-amazon.com/images/I/91nHBcsAMxL._SL1500_.jpg",
        amount: 500
      },
      {
        name: "Journey to Angular Development",
        author: " Sukesh Marla ",
        image: "https://m.media-amazon.com/images/I/61vhsCS3V0L._SL1233_.jpg",
        amount: 900
      }
    ]
  }

}
