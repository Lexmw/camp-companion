import {Entity, model, property} from '@loopback/repository';

@model()
export class Campsites extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  userID: number;

  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'object',
    required: true,
  })
  coordinates: object;

  @property({
    type: 'string',
    required: true,
  })
  notes: string;

  @property({
    type: 'string',
  })
  datesOfStay?: string;

  constructor(data?: Partial<Campsites>) {
    super(data);
  }
}

export interface CampsitesRelations {
  // describe navigational properties here
}

export type CampsitesWithRelations = Campsites & CampsitesRelations;
