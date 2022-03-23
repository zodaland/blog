import { IsOptional, IsInt, IsString, IsBoolean, IsNotEmpty, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class InputBoard {
    @IsOptional()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @Matches(/^[a-zA-Z]+$/)
    category: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsString()
    file: string;

    @IsNotEmpty()
    @Matches(/^[0-9]{8}$/)
    date: string;
    
    @IsOptional()
    @IsBoolean()
    private: boolean;
}