import { Ref } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { BUSCAR_ARTIGOS, BUSCAR_ARTIGO_POR_URLIZED, CONTEUDO_HOME } from '~~/api/queries'
import { StrapiPagination } from '~~/api/types'
import { HomeModel, ArtigoModel } from './types'
import { transformarDados } from '~~/api/serializacao'
import { ApolloError } from '@apollo/client'

const useI18n = () => {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$i18n
}

export const buscarArtigos = (): {
  loading: Ref<boolean>,
  data: Readonly<Ref<Readonly<ArtigoModel>>>,
  pagination: Readonly<Ref<Readonly<StrapiPagination>>>,
  error: Ref<ApolloError>
} => {
  const { currentLocale } = useI18n()
  const { loading, result, error } = useQuery(BUSCAR_ARTIGOS, {
    locale: currentLocale.value
  })
  const data = useResult(result, null, data => transformarDados(data))
  const pagination = useResult(result, null, data => transformarDados(data, true))
  return { loading, data, pagination, error }
}

export const buscarArtigoPorUrlized = (urlized: string): {
  loading: Ref<boolean>,
  data: Readonly<Ref<Readonly<ArtigoModel>>>,
  error: Ref<ApolloError>
} => {
  const { currentLocale } = useI18n()
  const { loading, result, error } = useQuery(BUSCAR_ARTIGO_POR_URLIZED, {
    urlized,
    locale: currentLocale.value
  })
  const data = useResult(result, null, data => transformarDados(data)[0])
  return { loading, data, error }
}

export const conteudoHome = (): {
  loading: Ref<boolean>,
  data: Readonly<Ref<Readonly<HomeModel>>>,
  error: Ref<ApolloError>
} => {
  const { currentLocale } = useI18n()
  const { loading, result, error } = useQuery(CONTEUDO_HOME, {
    locale: currentLocale.value
  })
  const data = useResult(result, null, data => transformarDados(data))
  return { loading, data, error }
}