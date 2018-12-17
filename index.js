data = [
  {
    Title: 'Lunch',
    Spend: {
      Kelly: 5.50,
      Sam: 10,
      Ola: 15,
      Tommen: 10,
      Sandy: 5
    },
    Total: 45.5,
    Payer: 'Tommen'
  },
  {
    Title: 'Movie',
    Spend: {
      Kelly: 10,
      Sam: 10,
      Ola: 10,
      Tommen: 10,
      Sandy: 10
    },
    Total: 50,
    Payer: 'Kelly'
  }
]

function payer (stuff, name) {
  return stuff.filter(occasion => occasion.Payer === name)
}

function personSpend (stuff, name) {
  return stuff.map(occasion => occasion.Spend[name]).reduce((a, b) => a + b)
}

// given some bills and a name of payer
// find all events that match the payer
// subtract what the payer owes and reduce the rest.
function moneyOwed (stuff, name) {
  if (
    (typeof (stuff) === 'object' && stuff.length > 0) &&
    (typeof (name) === 'string' && name.length > 0)
  ) {
    const namePaid = payer(stuff, name)

    if (namePaid.length >= 1) {
      const payerPaid = namePaid.map(occasion => occasion.Total).reduce((a, b) => a + b)

      const payerOwes = personSpend(stuff, name)

      const payerOwed = (payerPaid - payerOwes).toFixed(2)

      if (payerOwed > 0) {
        return `${name} is owed £${payerOwed}`
      } else if (payerOwed === 0) {
        return `${name} is owed nothing`
      } else if (payerOwed < 0) {
        return `${name} owes £${payerOwed}`
      }
    } else if (namePaid.length === 0) {
      return `${name} is owed nothing`
    }
  } else {
    return `Missing data`
  }
}

function howMuchDoIOwe (stuff, person1, person2) {
  if (
    (typeof (stuff) === 'object' && stuff.length > 0) &&
    (typeof (person1) === 'string' && person1.length > 0) &&
    (typeof (person2) === 'string' && person2.length > 0)
  ) {
    // find where person1 has paid
    // of which, find where person2 has spent
    // calculate how much is owed
    const person1Paid = payer(stuff, person1)

    if (person1Paid.length >= 1) {
      const person2OwesPerson1 = personSpend(person1Paid, person2)

      const person2Paid = payer(stuff, person2)

      if (person2Paid.length >= 1) {
        const person1OwesPerson2 = personSpend(person2Paid, person1)

        const moneyOwed = (person2OwesPerson1 - person1OwesPerson2).toFixed(2)

        if (moneyOwed > 0) {
          return `${person2} owes ${person1} £${moneyOwed}`
        } else {
          return `${person2} owes ${person1} nothing`
        }
      } else {
        const moneyOwed = (person1OwesPerson2 - person2OwesPerson1).toFixed(2)

        if (moneyOwed > 0) {
          return `${person2} owes ${person1} £${moneyOwed}`
        } else {
          return `${person2} owes ${person1} nothing`
        }
      }
    } else {
      return `${person2} owes ${person1} nothing`
    }
  } else {
    return `Missing data`
  }
}

function settleBalance (stuff) {
  // find out what each individual owes
  if (
    typeof (stuff) === 'object' && stuff.length > 0
  ) {
    // returns {Kelly: 15.5, Sam: 20, Ola: 25, Tommen: 20, Sandy: 15}
    const whoIsOwed = owed(stuff)

    const totalSpend = getSpend(stuff)

    console.log(whoIsOwed)
    if (totalSpend) {
      // split between people
      console.log(totalSpend)

      // find who is owed money
    } else {
      return 'error'
    }
  } else {
    return 'Missing data'
  }
}

function owed (stuff) {
  let whoIsOwed = {}

  stuff.map(occasion => {
    const whoPaid = occasion.Payer

    const total = occasion.Total

    whoIsOwed[whoPaid] = whoIsOwed[whoPaid] ? whoIsOwed[whoPaid] + total : total
  })
  return whoIsOwed
}

function getSpend (stuff) {
  const allSpend = stuff.map(ocassion => ocassion.Spend)

  const totalSpend = {}

  const eachSpend = allSpend.map(eachSpend => {
    return Object.keys(eachSpend).reduce((accum, key) => {
      accum[key] = accum[key] ? accum[key] + eachSpend[key] : eachSpend[key]
      return accum
    }, totalSpend)
  })

  return totalSpend
}
