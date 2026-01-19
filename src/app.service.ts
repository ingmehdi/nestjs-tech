import { Injectable } from "@nestjs/common";
import { Cat } from "./cat.dto";

@Injectable()
export class AppService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
