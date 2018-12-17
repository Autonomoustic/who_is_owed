reconcileAccounts = balances => {
  const owed = Object.entries(balances).filter(([name, money]) => money < 0)
  const owers = Object.entries(balances).filter(([name, money]) => money > 0)
  const payments = []
  while (owed.length > 0) {
    const currentOwed = owed.pop()
    const [owedName, owedMoney] = currentOwed
    for (const ower of owers) {
      const [owerName, owerMoney] = ower
      if (owerMoney >= Math.abs(owedMoney)) {
        payments.push(`${owerName} pays ${owedName} -> ${owedMoney}`)
        ower[1] -= owedMoney
        break
      } else {
        payments.push(`${owerName} pays ${owedName} -> ${owerMoney}`)
        currentOwed[1] -= owerMoney
        owers.shift()
      }
    }
  }
  return payments
}
