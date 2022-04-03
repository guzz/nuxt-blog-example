export interface HomeModel {
  titulo: string,
  descricao: string
}

export interface ArtigoModel {
  id: string,
  titulo: string,
  resumo: string,
  urlized: string,
  createdAt: Date,
  publishedAt: Date,
  updatedAt: Date,
  conteudo: any[],
  tags: TagModel[],
}

export interface TagModel {
  titulo: string,
}