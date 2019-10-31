import { defaultsDeep } from 'lodash'
import { fetch } from '../../common/network'

const baseUrl = 'https://ibank.asb.by'
var querystring = require('querystring')

async function fetchUrl (url, options, predicate = () => true, error = (message) => console.assert(false, message)) {
  options = defaultsDeep(
    options,
    {
      sanitizeRequestLog: { headers: { Cookie: true } },
      sanitizeResponseLog: { headers: { 'set-cookie': true } }
    }
  )
  options.method = options.method ? options.method : 'POST'
  options.stringify = querystring.stringify

  const response = await fetch(baseUrl + url, options)
  if (predicate) {
    validateResponse(response, response => predicate(response), error)
  }
  let err = response.body.match(/<p id ="status_message" class="error">(.[^/]*)</i)
  if (err && err.indexOf('СМС-код отправлен на номер телефона') === 0) {
    throw new TemporaryError(err[1])
  }
  return response
}

function validateResponse (response, predicate, error) {
  if (!predicate || !predicate(response)) {
    error('non-successful response')
  }
}

export async function login (prefs) {
  if (prefs.viaSMS !== 'false') {
    return loginSMS(prefs)
  }
  return loginCodes(prefs)
}

export async function loginCodes (prefs) {
  if (!prefs.codes0 || !/^\s*(?:\d{4}[\s+]+){9}\d{4}\s*$/.test(prefs.codes0)) {
    throw new InvalidPreferencesError('Неправильно введены коды 1-10! Необходимо ввести 10 четырехзначных кодов через пробел или +.')
  }
  if (!prefs.codes1 || !/^\s*(?:\d{4}[\s+]+){9}\d{4}\s*$/.test(prefs.codes1)) {
    throw new InvalidPreferencesError('Неправильно введены коды 11-20! Необходимо ввести 10 четырехзначных кодов через пробел или +.')
  }
  if (!prefs.codes2 || !/^\s*(?:\d{4}[\s+]+){9}\d{4}\s*$/.test(prefs.codes2)) {
    throw new InvalidPreferencesError('Неправильно введены коды 21-30! Необходимо ввести 10 четырехзначных кодов через пробел или +.')
  }
  if (!prefs.codes3 || !/^\s*(?:\d{4}[\s+]+){9}\d{4}\s*$/.test(prefs.codes3)) {
    throw new InvalidPreferencesError('Неправильно введены коды 31-40! Необходимо ввести 10 четырехзначных кодов через пробел или +.')
  }
  var res = await fetchUrl('/wps/portal/ibank/', {
    method: 'GET'
  }, response => response.success, message => new Error('Сайт не доступен'))

  let url = res.body.match(/<form[^>]+action="([^"]*)"[^>]*name="LoginForm1"/i)
  res = await fetchUrl(res.headers['content-location'] + url[1], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {
      bbIbUseridField: prefs.login,
      bbIbPasswordField: prefs.password,
      bbIbLoginAction: 'in-action',
      bbibCodeSMSField: 0,
      bbibUnblockAction: '',
      bbibChangePwdByBlockedClientAction_sendSMS: ''
    },
    sanitizeRequestLog: { body: { bbIbUseridField: true, bbIbPasswordField: true } }
  }, response => response.success, message => new Error(''))

  let codenum = res.body.match(/Введите[^>]*>код [N№]\s*(\d+)/i)
  codenum = codenum[1] - 1 // Потому что у нас коды с 0 нумеруются
  var col = Math.floor(codenum / 10)
  var idx = codenum % 10
  var codes = prefs['codes' + col]
  if (!codes) {
    throw new InvalidPreferencesError('Не введены коды ' + (col + 1) + '1-' + (col + 2) + '0')
  }
  let code = codes.split(/\D+/g)[idx]

  url = res.body.match(/<form[^>]+action="([^"]*)"[^>]*name="LoginForm1"/i)
  res = await fetchUrl(res.headers['content-location'] + url[1], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {
      cancelindicator: false,
      bbIbCodevalueField: code,
      bbIbLoginAction: 'in-action',
      bbIbCancelAction: '',
      field_1: res.body.match(/<input[^>]+name="field_1" value="(.[^"]*)" \/>/i)[1],
      field_2: res.body.match(/<input[^>]+name="field_2" value="(.[^"]*)" \/>/i)[1],
      field_3: res.body.match(/<input[^>]+name="field_3" value="(.[^"]*)" \/>/i)[1],
      field_4: res.body.match(/<input[^>]+name="field_4" value="(.[^"]*)" \/>/i)[1],
      field_5: res.body.match(/<input[^>]+name="field_5" value="(.[^"]*)" \/>/i)[1],
      code_number_expire_time: true
    },
    sanitizeRequestLog: { body: { bbIbCodevalueField: true } }
  }, response => response.success, message => new Error(''))

  return res
}

export async function loginSMS (prefs) {
  var res = await fetchUrl('/wps/portal/ibank/', {
    method: 'GET'
  }, response => response.success, message => new Error('Сайт не доступен'))

  let url = res.body.match(/<form[^>]+action="([^"]*)"[^>]*name="LoginForm1"/i)
  res = await fetchUrl(res.headers['content-location'] + url[1], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {
      bbIbUseridField: prefs.login,
      bbIbPasswordField: prefs.password,
      bbIbLoginAction: 'in-action',
      bbibCodeSMSField: 1,
      bbibUnblockAction: '',
      bbibChangePwdByBlockedClientAction_sendSMS: ''
    },
    sanitizeRequestLog: { body: { bbIbUseridField: true, bbIbPasswordField: true } }
  }, response => response.success, message => new Error(''))

  let sms = await ZenMoney.readLine('Введите код из смс', {
    time: 120000
  })
  if (sms === '') {
    throw new TemporaryError('Не введён код из смс. Подключите синхронизацию ещё раз.')
  }

  url = res.body.match(/<form[^>]+action="([^"]*)"[^>]*name="LoginForm1"/i)
  res = await fetchUrl(res.headers['content-location'] + url[1], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {
      cancelindicator: false,
      bbIbCodeSmsvalueField: sms,
      bbIbLoginAction: 'in-action',
      bbIbCancelAction: '',
      field_1: res.body.match(/<input[^>]+name="field_1" value="(.[^"]*)" \/>/i)[1],
      field_2: res.body.match(/<input[^>]+name="field_2" value="(.[^"]*)" \/>/i)[1],
      field_7: res.body.match(/<input[^>]+name="field_7" value="(.[^"]*)" \/>/i)[1],
      field_5: res.body.match(/<input[^>]+name="field_5" value="(.[^"]*)" \/>/i)[1]
    },
    sanitizeRequestLog: { body: { bbIbCodeSmsvalueField: true } }
  }, response => response.success, message => new Error(''))

  return res
}

export async function fetchURLAccounts (loginRequest) {
  console.log('>>> Загрузка страницы счетов...')
  let url = loginRequest.body.match(/href="\/([^"]+)">\s*Счета/i)
  let res = await fetchUrl('/' + url[1], {
    method: 'GET'
  }, response => response.success, message => new Error(''))

  let urlCards = res.body.match(/<a\s*href="([^"]+)".*Счета с карточкой.*<\/a>/i)
  let urlDeposits = res.body.match(/<a\s*href="([^"]+)".*Депозиты.*<\/a>/i)
  return {
    cards: urlCards[1],
    deposits: urlDeposits[1]
  }
}

function strDecoder (str) {
  if (str === null) { return null }
  var str2 = str.split(';')
  var res = ''
  str2.forEach(function (s) {
    let left = s.replace(/&.[0-9]{4}/i, '')

    res += left + String.fromCharCode(s.replace(left + '&#', ''))
  })

  return res
}

export async function fetchDeposits (url) {
  console.log('>>> Загрузка депозитов...')
  let res = await fetchUrl(url, {
    method: 'GET'
  }, response => response.success, message => new Error(''))

  let regex = /<td class="tdNoPadding" ><div.[^>]*><span.[^>]*>(.*?)<\/span><span.[^>]*>(.*?)<\/span><\/div><\/td><td class="tdNoPadding" ><div.[^>]*>(.*?)<\/div><\/td><td class="tdNoPadding" ><div.[^>]*><span.[^>]*>(.*?)<\/span><\/div><\/td><td class="tdNoPadding" ><div.[^>]*>(.*?)<\/div><\/td>.*?X<\/a><div.[^>]*>(.*?)<\/div><\/div><\/div><\/td>/ig
  let m

  var deposits = []
  while ((m = regex.exec(res.body.replace(/\r?\n|\r/g, ''))) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }
    deposits.push({
      id: (m[1] + m[2]).replace(/\s/g, ''),
      name: strDecoder(m[3]),
      balance: m[4],
      currency: m[5],
      details: strDecoder(m[6]),
      type: 'deposit'
    })
  }
  return deposits
}

export async function fetchCards (url) {
  console.log('>>> Загрузка картсчетов...')
  let res = await fetchUrl(url, {
    method: 'GET'
  }, response => response.success, message => new Error(''))

  var html = res.body.replace(/\r?\n|\r/g, '')
  let formRegex = /<form id="viewns.*action="(.[^"]*)".*name="javax\.faces\.encodedURL" value="(.[^"]*).*id="javax\.faces\.ViewState" value="(.[^"]*)"/ig
  let formData = formRegex.exec(html)
  let formAction = formData[1]
  let formEncodedURL = formData[2]
  let formViewState = formData[3]

  let cardNums = []
  let cardNumRegex = /<div title="(.[^"]*)" class=".[a-zA-Z_]*"><\/div><\/td><td class="tdNumber"><div class="cellLable">(.[0-9*]*)<\/div>/ig
  let c
  while ((c = cardNumRegex.exec(html)) !== null) {
    if (c.index === cardNumRegex.lastIndex) {
      cardNumRegex.lastIndex++
    }
    cardNums.push({
      name: c[1],
      num: c[2]
    })
  }
  console.log(cardNums)

  let cardActions = []
  let cardActionRegex = /<\/td><td class="tdHiddenButton"><a href="#" onclick="return myfaces.oam.submitForm\((.[^)]*)\);/ig
  let a
  while ((a = cardActionRegex.exec(html)) !== null) {
    if (a.index === cardActionRegex.lastIndex) {
      cardActionRegex.lastIndex++
    }
    cardActions.push(a[1])
  }

  var cards = []
  let regex = /cellLable">(.[^>]*)<\/div><\/td><td class="tdBalance"><div class="cellLable"><nobr>(.[^<]*)<\/nobr> (.[A-Zа-я0-9. ]*)<\/div><\/td><td class="tdNoPaddingDefault"><div title="" class="cellLable"><\/div><\/td><td class="tdHiddenButton"><a href="#" onclick="return myfaces\.oam\.submitForm\((.[^)]*)\);/ig
  let m
  var i = 0
  while ((m = regex.exec(html)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }
    cards.push({
      id: m[1],
      balance: m[2],
      currency: m[3],
      cardNum: cardNums[i].num,
      cardName: cardNums[i].name,
      type: 'card',
      transactionsData: {
        action: formAction,
        encodedURL: formEncodedURL,
        additional: cardActions[i].match(/'(.[^']*)'/ig),
        viewState: formViewState
      }
    })
    i++
  }
  return cards
}

export async function fetchCardsTransactions (acc) {
  console.log('>>> Загрузка транзакций по ' + acc.title)

  let body = {
    'javax.faces.encodedURL': acc.raw.transactionsData.encodedURL,
    'accountNumber': acc.raw.transactionsData.additional[3].replace(/'/g, ''),
    'javax.faces.ViewState': acc.raw.transactionsData.viewState
  }
  body[acc.raw.transactionsData.additional[0].replace(/'/g, '') + ':acctIdSelField'] = acc.raw.id
  body[acc.raw.transactionsData.additional[0].replace(/'/g, '') + '_SUBMIT'] = 1
  body[acc.raw.transactionsData.additional[0].replace(/'/g, '') + ':_idcl'] = acc.raw.transactionsData.additional[1].replace(/'/g, '')
  let res = await fetchUrl(acc.raw.transactionsData.action, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  }, response => response.success, message => new Error(''))

  let regex = /<tr class='(.[^']*)'>.[^']*">(.[0-9.]*) (.[0-9:]*)<.[^']*">(.[+-]*)<\/span.[^']*">(.[0-9 .]*)<\/span.[^']*">(.[A-Z]*)<\/span.[^']*">(.[0-9 .]*)<\/span.[^']*">(.[A-Z]*)<\/span.[^а-я]*Наименование операции: (.[^<]*)<\/span.[^а-я]*(Точка|Наименование\/MCC-код точки) обслуживания: (.[^<]*)/ig
  let m

  var transactions = []
  while ((m = regex.exec(res.body.replace(/\r?\n|\r/g, ''))) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }
    transactions.push({
      accountID: acc.id,
      status: m[1],
      date: m[2],
      time: m[3],
      debitFlag: m[4],
      operationSum: m[5], // В валюте операции
      operationCurrency: m[6],
      inAccountSum: m[7], // В валюте счета
      inAccountCurrency: m[8],
      comment: m[9],
      place: m[11]
    })
  }
  console.log(`>>> Загружено ${transactions.length} операций.`)
  return transactions
}
