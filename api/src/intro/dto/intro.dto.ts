import { IsNotEmpty } from 'class-validator';

export class Intro {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    introduce: string;
}
