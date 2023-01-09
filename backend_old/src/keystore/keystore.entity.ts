import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Keystore {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: string;

  @ApiProperty()
  @Column()
  key: string;
}
