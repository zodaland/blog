import { IsOptional, IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class InputMail {
    @IsNotEmpty()
    @Matches(/^[a-zA-Zㄱ-ㅎ가-힣0-9.,~!?'" \[\]\-*]+$/)
    subject: string;

    @IsOptional()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z가-힣0-9 ]+$/)
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^[a-zA-Zㄱ-ㅎ가-힣0-9.,~!?'" \[\]\-*]+$/)
    content: string;
}