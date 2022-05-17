import { Controller, Delete, Get, Post, Put, Body, Param, Query, UploadedFile, ParseIntPipe, BadRequestException , InternalServerErrorException, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { BoardService } from './board.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { InputBoard } from './dto';
import { InputTag } from '../tags/dto';

import { Board } from './board.entity';
import { Tag } from '../tags/tag.entity';

import { ICount } from './interfaces';

import { plainToClass } from 'class-transformer';

@Controller('board')
export class BoardController {
    constructor (private readonly boardService: BoardService) {}

    @Get('category')
    async getCategoryAll(): Promise<string[]> {
        try {
            return await this.boardService.getCategoryAll();
        } catch {
            throw new InternalServerErrorException();
        }
    }
    @Get('posts')
    async getBoardIdAll(): Promise<Board[]> {
        try {
            return await this.boardService.getBoardIdAll();
        } catch {
            throw new InternalServerErrorException();
        }
    }
    @Get('search')
    async getBoardForKeyword(@Query('keyword') keyword: string): Promise<Board[]> {
        try {
            return await this.boardService.getBoardForKeyword(keyword);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
    @Get(':category/count')
    async getCategoryCount(@Param('category') category: string,  @Query('tags') tags: string|undefined): Promise<ICount> {
        try {
            const parsedTags: string[]|null = tags ? JSON.parse(tags) : null;
            const count: number = await this.boardService.getCategoryCount(category, parsedTags);
            return { count };
        } catch {
            throw new InternalServerErrorException();
        }
    }
    @Get(':category/:id')
    async getOne(@Param('category') category: string, @Param('id', ParseIntPipe) id: number): Promise<Board> {
        let result: Board;
        try {
            result = await this.boardService.getOne(category, id);
        } catch {
            throw new InternalServerErrorException();
        }
        if (!result) throw new BadRequestException();
        
        return result;
    }
    @Get(':category/page/:page/offset/:offset')
    async getMore(@Param('category') category: string, @Param('page', ParseIntPipe) page: number, @Param('offset', ParseIntPipe) offset: number, @Query('tags') tags: string|undefined): Promise<Board[]> {
        if (offset < 1) throw new BadRequestException();
        try {
            const parsedTags: string[]|null = tags ? JSON.parse(tags) : null;
            return await this.boardService.getMore(category, page, offset, parsedTags);
        } catch {
            throw new InternalServerErrorException();
        }
    }
    @Get()
    async getAFewBoardOfAllCategory(): Promise<Board[]> {
        try {
            return await this.boardService.getAFewBoardOfAllCategory();
        } catch {
            throw new InternalServerErrorException();
        }
    }
    @UseGuards(JwtAuthGuard)
    @Get(':category/count/all')
    async getCategoryCountAll(@Param('category') category: string): Promise<ICount> {
        try {
            const count: number = await this.boardService.getCategoryCountAll(category);
            return { count };
        } catch {
            throw new InternalServerErrorException();
        }
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    async setBoard(@Body('board') plainBoard: InputBoard, @Body('tags') plainTags: InputTag[]): Promise<boolean> {
        try {
            const board: Board = plainToClass(Board, plainBoard);
            const tags: Tag[] = plainTags.map((tag: InputTag) => plainToClass(Tag, tag));
            await this.boardService.upsertBoard(board, tags);
            return true;
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        try {
            await this.boardService.deleteBoard(id);
            return true;
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('summary/:category/page/:page/offset/:offset')
    async getAllBoard(@Param('category') category: string, @Param('page', ParseIntPipe) page: number, @Param('offset', ParseIntPipe) offset: number): Promise<Board[]> {
        if (offset < 1) {
            throw new BadRequestException();
        }
        try {
            const boards: Board[] = await this.boardService.getSummaryBoards(category, page, offset);
            return boards;
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
    @UseGuards(JwtAuthGuard)
    @Post('image')
    @UseInterceptors(FileInterceptor('file'))
    async tempUploadBoardImage(@UploadedFile() file: Express.Multer.File): Promise<string> {
        try {
            return await this.boardService.tempUploadBoardImage(file);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
}
