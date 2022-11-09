import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {Ventas} from './ventas.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  Marca: string;

  @property({
    type: 'string',
    required: true,
  })
  Placa: string;

  @property({
    type: 'string',
    required: true,
  })
  Color: string;

  @property({
    type: 'string',
    required: true,
  })
  Modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  SerieChasis: string;

  @property({
    type: 'string',
    required: true,
  })
  SerieMotor: string;

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;

  @property({
    type: 'number',
    required: true,
  })
  Existencia: number;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  @belongsTo(() => Ventas)
  ventasId: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
