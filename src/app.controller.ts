import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ZodValidationPipe } from "./zod.pipe";
import { createCatSchema, type CreateCatDto } from "./cat.schema";
import { ValidationPipe } from "./validation.pipe";

@Controller("cats")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll() {
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

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    this.appService.create(createCatDto);
  }

  @Post()
  async createWithValidation(
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
  ) {
    this.appService.create(createCatDto);
  }
}
