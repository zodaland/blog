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

    @IsNotEmpty()
    @Matches(/^[0-9a-zA-Z가-힣]+$/)
    @Length(1, 20)
    name: string;

    @IsNotEmpty()
    @Matches(/^[-0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ!.,();]+$/)
    comment: string;

    @IsNotEmpty()
    @Length(4, 30)
    password: string;

    @IsOptional()
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
