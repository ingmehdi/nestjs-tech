import { Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import express from "express";
import { AppService } from "./app.service";

@Controller("cats/*")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Res() res: express.Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: express.Response) {
    res.status(HttpStatus.OK).json([]);
  }
}
