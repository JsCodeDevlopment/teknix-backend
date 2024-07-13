import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class ProductModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image!: string;
}
