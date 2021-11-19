export interface Owner {
  id: number;
  name: string
  document: string
  document_type: 'CPF' | 'CNPJ'
  creation_date?: Date
}

export const BuildOwner = (owner): Owner => {
  const ownerObject: Owner = {
    id: owner.id,
    name: owner.name || '',
    document: owner.document || '',
    document_type: owner.document_type || '',
    creation_date: owner.creation_date || new Date(),
  };
  return ownerObject;
  }