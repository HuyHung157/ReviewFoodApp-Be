import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  description: string;
}