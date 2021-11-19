import { Owner } from './Owner'
export interface Farm {
  id: number,
  name: string
  geometry: any
  area: number
  centroid: number[]
  creation_date?: Date
  owner_id: Owner
}

export const BuildFarm = (farm): Farm => {
  const farmObject: Farm = {
    id: farm.id,
    name: farm.name || '',
    geometry: farm.geometry || [],
    area: farm.area || null,
    centroid: farm.centroid || [],
    creation_date: farm.creation_date || new Date(),
    owner_id: farm.owner_id
  };
  return farmObject;
  }