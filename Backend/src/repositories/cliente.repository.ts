import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Ventas} from '../models';
import {VentasRepository} from './ventas.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly ventas: HasOneRepositoryFactory<Ventas, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Cliente, dataSource);
    this.ventas = this.createHasOneRepositoryFactoryFor('ventas', ventasRepositoryGetter);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
  }
}
