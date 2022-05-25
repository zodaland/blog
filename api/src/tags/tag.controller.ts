import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { InputTag } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get()
    async getTagAll(): Promise<string[]> {
        return await this.tagService.getTagAll();
    }

    @Get(':category')
    async getCategoryTags(@Param('category') category: string): Promise<string[]> {
        return await this.tagService.getCategoryTags(category);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async setTag(@Body() tag: InputTag): Promise<boolean> {
        await this.tagService.setTag(tag);
        return true;
    }
}
