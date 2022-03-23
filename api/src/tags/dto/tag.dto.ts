import { IsNotEmpty, Matches } from 'class-validator';

export class InputTag {
    @IsNotEmpty()
    @Matches(/^[a-zA-Z가-힣.]+$/)
    name: string;
}