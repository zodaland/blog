import {
    Length,
    IsOptional,
    IsInt,
    IsNotEmpty,
    Matches,
    IsString,
    IsBoolean,
} from 'class-validator';

export class CommentDto {
    @IsOptional()
    @IsInt()
    id: number;

    @Matches(/^[0-9a-zA-Z가-힣]*$/)
    @Length(0, 10)
    name: string;

    @IsNotEmpty()
    @Matches(/^[-0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ!.,();~?\/ \n]+$/)
    comment: string;

    @Length(0, 30)
    password: string;

    @IsBoolean()
    private: boolean;

    @IsNotEmpty()
    @IsString()
    @Length(14, 14)
    date: string;

    @IsNotEmpty()
    @IsInt()
    boardId: number;
}
