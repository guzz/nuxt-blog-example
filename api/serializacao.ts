
import { StrapiResponseData, StrapiPagination, StrapiResponseAttributes } from '~~/api/types';

export const transformarDados = (result: any, getPagination?: boolean): any => {
  const primeiraKey: string = Object.keys(result)[0]
  const dados: StrapiResponseData = result[primeiraKey]
  return transformarObjeto(dados, getPagination)
}

export const transformarObjeto = (obj: StrapiResponseData | StrapiResponseAttributes, getPagination?: boolean): any => {
  if ('data' in obj) {
    if (Array.isArray(obj.data)) {
      if (getPagination) {
        const pagination: StrapiPagination = obj.meta?.pagination
        return pagination
      }
      const data: StrapiResponseData[] = obj.data.map((o: StrapiResponseData) => transformarObjeto(o))
      return data
    } else if (typeof obj.data === 'object') {
      const novoObjeto = {
        id: obj.data.id
      }
      Object.keys(obj.data.attributes).forEach((attr: string): void => transformarKey(attr, obj.data, novoObjeto))
      return novoObjeto
    }
  } if ('attributes' in obj) {
    const novoObjeto = {
      id: obj.id
    }
    Object.keys(obj.attributes).forEach((attr: string): void => transformarKey(attr, obj, novoObjeto))
    return novoObjeto
  } else {
    const novoObjeto = {}
    Object.keys(obj).forEach((attr: string): void => transformarKey(attr, obj, novoObjeto))
    return novoObjeto
  }
}

export const transformarKey = (attr: string, obj: any, novoObjeto: any): void => {
  if (!attr.includes('__') && obj.attributes) {
    const value = obj.attributes[attr]
    executarCenariosParaKeys(attr, value, novoObjeto)
  } else if (!obj.attributes) {
    const value = obj[attr]
    executarCenariosParaKeys(attr, value, novoObjeto)
  }
}

const executarCenariosParaKeys = (attr: string, value: any, novoObjeto: any): void => {
  if (Array.isArray(value)) {
    novoObjeto[attr] = value.map(o => transformarObjeto(o))
  } else if (typeof value === 'object') {
    novoObjeto[attr] = transformarObjeto(value)
  } else {
    novoObjeto[attr] = value
  }
}