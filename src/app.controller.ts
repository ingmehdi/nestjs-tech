import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { HttpExceptionFilter } from "./http-exception.filter";
import { CreateCatDto } from "./cat.dto";

@Controller("cats")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  create(@Body() createDto: CreateCatDto) {
    throw new ForbiddenException();
  }

  @Get()
  async findAll() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: "This is a custom message",
      },
      HttpStatus.FORBIDDEN,
      {
        cause: "error",
      },
    );
  }
}
