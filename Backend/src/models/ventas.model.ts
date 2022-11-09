import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Vendedor} from './vendedor.model';
import {Cliente} from './cliente.model';

@model()
export class Ventas extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  NroFactura: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @belongsTo(() => Vendedor, {name: 'susVentas'})
  vendedorId: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @hasOne(() => Cliente)
  cliente: Cliente;

  constructor(data?: Partial<Ventas>) {
    super(data);
  }
}

export interface VentasRelations {
  // describe navigational properties here
}

export type VentasWithRelations = Ventas & VentasRelations;
