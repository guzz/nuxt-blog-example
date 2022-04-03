import { gql } from "@apollo/client/core"

export const BUSCAR_ARTIGOS = gql`
  query buscarArtigos($locale: I18NLocaleCode) {
    artigos(locale: $locale) {
        data {
            id
            attributes {
                urlized
                titulo
                resumo
                createdAt
                publishedAt
                updatedAt
                categorias {
                  data {
                    attributes {
                      titulo
                    }
                  }
                }
            }
        }
        meta {
            pagination {
                page
                pageSize
                total
                pageCount
            }
        }
    }
  }
`

export const BUSCAR_ARTIGO_POR_URLIZED = gql`
  query buscarArtigosPorUrlized($urlized: String, $locale: I18NLocaleCode) {
    artigos(filters: { urlized: { eq: $urlized } }, locale: $locale) {
      data {
        id
        attributes {
          urlized
          titulo
          resumo
          createdAt
          publishedAt
          updatedAt
          conteudo {
            __typename
            ...on ComponentConteudoBlocoDeTexto {
              texto
            }
          }
          categorias {
            data {
              id
              attributes {
                titulo
              }
            }
          }
        }
      }
    }
  }
`

export const BUSCAR_ARTIGO_POR_ID = gql`
  query buscarArtigosPorId($id: ID, $locale: I18NLocaleCode) {
    artigo(id: $id, locale: $locale) {
      data {
        id
        attributes {
          urlized
          titulo
          resumo
          createdAt
          publishedAt
          updatedAt
          conteudo {
            __typename
            ...on ComponentConteudoBlocoDeTexto {
              texto
            }
          }
          categorias {
            data {
              id
              attributes {
                titulo
              }
            }
          }
        }
      }
    }
  }
`

export const CONTEUDO_HOME = gql`
  query conteudoHome($locale: I18NLocaleCode) {
    home(locale: $locale) {
      data {
        attributes {
          titulo
          descricao
        }
      }
    }
  }
`