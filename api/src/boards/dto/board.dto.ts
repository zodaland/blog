import { IsOptional, IsInt, IsString, IsBoolean, IsNotEmpty, Matches } from 'class-validator';

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
