import {inject} from '@loopback/core';
import {DefaultCrudRepository,} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {Campsites, CampsitesRelations} from '../models';

export class CampsitesRepository extends DefaultCrudRepository<
  Campsites,
  typeof Campsites.prototype.id,
  CampsitesRelations
> {

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource
  ) {
    super(Campsites, dataSource);
  }
}
