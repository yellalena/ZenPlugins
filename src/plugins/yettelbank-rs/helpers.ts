import { FetchResponse } from '../../common/network'
import { TemporaryUnavailableError } from '../../errors'
import * as fs from 'fs'
import * as path from 'path'

export function mergeCookies (currentCookieHeader: string, newCookieHeaders: string): string {
  const parseCookies = (cookieString: string): Record<string, string> => {
    return cookieString.split(/,|;/).map(cookie => cookie.trim()).filter(cookie => cookie.includes('='))
      .reduce<Record<string, string>>((acc, cookie) => {
      const [name, value] = cookie.split('=')
      acc[name.trim()] = value.trim()
      return acc
    }, {})
  }

  const cookies1 = parseCookies(currentCookieHeader)
  const cookies2 = parseCookies(newCookieHeaders)

  const mergedCookies = { ...cookies1, ...cookies2 }

  return Object.entries(mergedCookies)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ')
}

export function setCookies (response: FetchResponse): void {
  const headers = response.headers as Record<string, unknown>
  const newSetCookie = headers['set-cookie'] as string
  if (newSetCookie === null || newSetCookie === '') {
    return
  }
  const currentSetCookie = ZenMoney.getData('cookies', '') as string
  ZenMoney.setData('cookies', mergeCookies(currentSetCookie, newSetCookie))
  ZenMoney.saveData()
}

export function getCookies (): string {
  return ZenMoney.getData('cookies', '') as string
}

export function checkResponseAndSetCookies (response: FetchResponse): void {
  checkResponseSuccess(response)
  setCookies(response)
}

export function checkResponseSuccess (response: FetchResponse): void {
  if (response.status !== 200) {
    throw new TemporaryUnavailableError()
  }
}

export const loadHtmlFile = (fileName: string): string => {
  const filePath = path.join(__dirname, fileName)
  try {
    const htmlString = fs.readFileSync(filePath, 'utf-8')
    return htmlString
  } catch (error) {
    console.error('Error reading HTML file:', error)
    return ''
  }
}
