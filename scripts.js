const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

amount.oninput = () => {
  let value = amount.value.replace(/\D/g, '')

  value = Number(value)/100

  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL (value){
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return value
}

form.onsubmit = (event) => {
  event.preventDefault()

  const newExepnse = {
    id : new Date().getTime(),
    expense : expense.value,
    category_id : category.value,
    category_name : category.options[category.selectedIndex].text,
    amount : amount.value,
    created_at : new Date(),
  }

  expenseAdd(newExpense)
}

function expenseAdd(newExpense){
  try {
    let expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")
    
    // Expense category icon
    let expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)
    
    // Expense info, Name and Category
    let expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    let expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    let expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name
    expenseInfo.append(expenseName, expenseCategory)


    // Expense amount
    let expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
                                                  .toUpperCase()
                                                  .replace("R$","")}`
    
    // Delete button
    let expenseDelete = document.createElement("img")
    expenseDelete.classList.add("remove-icon")
    expenseDelete.setAttribute("src", "./img/remove.svg")
    expenseDelete.setAttribute("alt", "Remove item")

    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseDelete)

    expenseList.appendChild(expenseItem)
    updateTotals()
  } catch (error) {
  }
}
}