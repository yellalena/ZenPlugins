import { convertAccount } from '../../converters'

const accounts = {
  // зарплатные карты
  'Зарплатная карта': [
    [
      {
        cardAccountId: 149216921,
        cards: [
          {
            'cardId': 149216922,
            'account': {
              'cardAccountId': 149216922,
              'mainCreditLimit': 0.0,
              'isOwner': true,
              'programType': {
                'programTypeId': 16,
                'name': 'Зарплатная карта'
              },
              'accountType': 2,
              'tariffNameIndex': '84',
              'currency': {
                'currencyId': 1,
                'name': 'Российский рубль',
                'nameIso': 'RUR'
              },
              'office': {
                'officeId': 1,
                'briefName': 'Головной офис',
                'branch': {
                  'branchId': 1,
                  'briefName': 'Москва',
                  'bic': '044525555',
                  'corrAccount': '30101810400000000555',
                  'bank': {
                    'bankGroup': {
                      'bankGroupId': 1,
                      'name': 'Банковская группа Промсвязьбанк'
                    },
                    'bankId': 1,
                    'briefName': 'ПАО "Промсвязьбанк"',
                    'contactPhoneMoscow': '8 (495) 787-33-33',
                    'contactPhoneRussia': '8 (800) 333-03-03',
                    'bic': '044525555',
                    'inn': '7744000912',
                    'displayMember': '044525555',
                    'name': 'Публичное акционерное общество "Промсвязьбанк"',
                    'correspondenceAccount': '30101810400000000555'
                  }
                },
                'address': '109052 г.Москва, ул.Смирновская, д.10, стр.22'
              },
              'accountingBranch': {
                'branchId': 1,
                'briefName': 'Москва',
                'bic': '044525555',
                'corrAccount': '30101810400000000555',
                'bank': {
                  'bankGroup': {
                    'bankGroupId': 1,
                    'name': 'Банковская группа Промсвязьбанк'
                  },
                  'bankId': 1,
                  'briefName': 'ПАО "Промсвязьбанк"',
                  'contactPhoneMoscow': '8 (495) 787-33-33',
                  'contactPhoneRussia': '8 (800) 333-03-03',
                  'bic': '044525555',
                  'inn': '7744000912',
                  'displayMember': '044525555',
                  'name': 'Публичное акционерное общество "Промсвязьбанк"',
                  'correspondenceAccount': '30101810400000000555'
                }
              },
              'name': 'Our MIR Cards',
              'availableBalance': 0.0,
              'status': 2,
              'entityIdentifier': {
                'entityType': 209,
                'identifier': '149216922'
              }
            },
            'cardNumber': '220003..8163',
            'state': 255,
            'changePinCodeStatus': 1,
            'smallImageSrc': '/res/i/ci/B3CF33C2FFA3A34E2E54F00692195438.png',
            'largeImageSrc': '/res/i/ci/B3CF33C2FFA3A34E2E54F00692195438.png',
            'themeColor': '#959CAB',
            'isSmsNotificationActive': true,
            'is3DSecureActive': true,
            'isOwner': true,
            'productionDate': '2018-10-30T00:00:00Z',
            'expireDate': '2022-10-31T00:00:00Z',
            'name': 'Our MIR Cards',
            'type': 5,
            'cardProduct': {
              'cardProductId': 27,
              'name': 'МИР Классическая Привилегия Плюс'
            },
            'entityIdentifier': {
              'entityType': 207,
              'identifier': '149216922'
            },
            'tariffNameIndex': '84'
          }
        ],
        mainCreditLimit: 0.0,
        isOwner: true,
        programType: {
          'programTypeId': 16,
          'name': 'Зарплатная карта'
        },
        accountType: 2,
        tariffNameIndex: '84',
        currency: {
          'currencyId': 1,
          'name': 'Российский рубль',
          'nameIso': 'RUR'
        },
        office: {
          'officeId': 1,
          'briefName': 'Головной офис',
          'branch': {
            'branchId': 1,
            'briefName': 'Москва',
            'bic': '044525555',
            'corrAccount': '30101810400000000555',
            'bank': {
              'bankGroup': {
                'bankGroupId': 1,
                'name': 'Банковская группа Промсвязьбанк'
              },
              'bankId': 1,
              'briefName': 'ПАО "Промсвязьбанк"',
              'contactPhoneMoscow': '8 (495) 787-33-33',
              'contactPhoneRussia': '8 (800) 333-03-03',
              'bic': '044525555',
              'inn': '7744000912',
              'displayMember': '044525555',
              'name': 'Публичное акционерное общество "Промсвязьбанк"',
              'correspondenceAccount': '30101810400000000555'
            }
          },
          'address': '109052 г.Москва, ул.Смирновская, д.10, стр.22'
        },
        accountingBranch: {
          'branchId': 1,
          'briefName': 'Москва',
          'bic': '044525555',
          'corrAccount': '30101810400000000555',
          'bank': {
            'bankGroup': {
              'bankGroupId': 1,
              'name': 'Банковская группа Промсвязьбанк'
            },
            'bankId': 1,
            'briefName': 'ПАО "Промсвязьбанк"',
            'contactPhoneMoscow': '8 (495) 787-33-33',
            'contactPhoneRussia': '8 (800) 333-03-03',
            'bic': '044525555',
            'inn': '7744000912',
            'displayMember': '044525555',
            'name': 'Публичное акционерное общество "Промсвязьбанк"',
            'correspondenceAccount': '30101810400000000555'
          }
        },
        name: '40817810851008796880',
        availableBalance: 0.0,
        status: 2,
        entityIdentifier: {
          'entityType': 209,
          'identifier': '149216921'
        }
      },
      {
        _type: 2,
        'available': 0,
        'creditLimit': 0,
        'id': '149216921',
        'instrument': 'RUB',
        'syncID': ['8163'],
        'title': '40817810851008796880',
        'type': 'ccard'
      }
    ]
  ],

  'Накопительные счета': [
    [
      {
        accountId: 28321950,
        contract: {
          contractId: 15460392,
          brand: {
            brandId: 1006094
          },
          clientLabel: 'Права',
          request: {
            requestId: 1031544564
          },
          office: {
            officeId: 536,
            code: 23,
            briefName: 'ОО "Томский"',
            branch: {
              branchId: 5,
              code: 4,
              briefName: 'Сибирский',
              bic: '045004816',
              corrAccount: '30101810500000000816',
              bank: {
                bankGroup: {
                  bankGroupId: 1,
                  name: 'Банковская группа Промсвязьбанк'
                },
                bankId: 1,
                briefName: 'ПАО "Промсвязьбанк"',
                contactPhoneMoscow: '8 (495) 787-33-33',
                contactPhoneRussia: '8 (800) 333-03-03',
                bic: '044525555',
                inn: '7744000912',
                displayMember: '044525555',
                name: 'Публичное акционерное общество "Промсвязьбанк"',
                correspondenceAccount: '30101810400000000555'
              }
            },
            address: '634009, Томская, область, г. Томск, Ленина проспект, д. 82б'
          },
          number: '1031544564',
          name: 'Накопительный счет "Доходный"',
          beginDate: '2019-09-26T00:00:00Z',
          status: 2,
          entityIdentifier: {
            entityType: 5,
            identifier: '15460392'
          }
        },
        accountType: 1,
        currency: {
          currencyId: 1,
          name: 'Российский рубль',
          nameIso: 'RUR'
        },
        office: {
          officeId: 536,
          code: 23,
          briefName: 'ОО "Томский"',
          branch:
              {
                branchId: 5,
                code: 4,
                briefName: 'Сибирский',
                bic: '045004816',
                corrAccount: '30101810500000000816',
                bank: {
                  bankGroup: {
                    bankGroupId: 1,
                    name: 'Банковская группа Промсвязьбанк'
                  },
                  bankId: 1,
                  briefName: 'ПАО "Промсвязьбанк"',
                  contactPhoneMoscow: '8 (495) 787-33-33',
                  contactPhoneRussia: '8 (800) 333-03-03',
                  bic: '044525555',
                  inn: '7744000912',
                  displayMember: '044525555',
                  name: 'Публичное акционерное общество "Промсвязьбанк"',
                  correspondenceAccount: '30101810400000000555'
                }
              },
          address: '634009, Томская, область, г. Томск, Ленина проспект, д. 82б'
        },
        accountingBranch: {
          branchId: 1,
          briefName: 'Москва',
          bic: '044525555',
          corrAccount: '30101810400000000555',
          bank: {
            bankGroup: {
              bankGroupId: 1,
              name: 'Банковская группа Промсвязьбанк'
            },
            bankId: 1,
            briefName: 'ПАО "Промсвязьбанк"',
            contactPhoneMoscow: '8 (495) 787-33-33',
            contactPhoneRussia: '8 (800) 333-03-03',
            bic: '044525555',
            inn: '7744000912',
            displayMember: '044525555',
            name: 'Публичное акционерное общество "Промсвязьбанк"',
            correspondenceAccount: '30101810400000000555'
          }
        },
        number: '40817810140002917648',
        name: 'Накопительный счет Доходный',
        clientLabel: 'Права',
        balance: 1000,
        availableBalance: 1000,
        isWithReplenishment: true,
        isWithSubtraction: true,
        openDate: '2019-09-26T00:00:00Z',
        status: 2,
        entityIdentifier: {
          entityType: 5,
          identifier: '28321950'
        }
      },
      {
        '_type': 1,
        'balance': 1000,
        'id': '28321950',
        'instrument': 'RUB',
        'syncID': '7648',
        'title': 'Права',
        'type': 'checking'
      }
    ]
  ]
}

describe('convertAccount', () => {
  Object.keys(accounts).forEach(type => {
    for (let i = 0; i < accounts[type].length; i++) {
      it(`should convert '${type}' #${i}`, () => {
        expect(
          convertAccount(accounts[type][i][0], accounts[accounts[type][i][0].account])
        ).toEqual(
          accounts[type][i][1]
        )
      })
    }
  })
})

xdescribe('convertOneTransaction', () => {
  const type = 'ImportedCredit'
  const i = 0
  it('should convert transaction ' + i, () => {
    expect(
      convertAccount(accounts[type][i][0])
    ).toEqual(
      accounts[type][i][1]
    )
  })
})
