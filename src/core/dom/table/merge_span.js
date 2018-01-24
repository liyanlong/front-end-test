/**
 * 合并行单元格
 * @param {HTMLTableElement} el
 * @throws {TypeError}
 * 
 * @return {table}
 */
export function mergeRowspan (el) {
  
  if (!(el instanceof HTMLTableElement)) {
    throw TypeError('要求传入Table元素')
  }
  const cloneEl = el.cloneNode(true)
  const rows = el.rows
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells
    for (let j = i + 1; j < rows.length; j++) {
      const nextCells = rows[j].cells
      let seed = 0
      for (let k = 0; k < cells.length; k++) {
        if (cells[k].innerHTML === nextCells[k].innerHTML) {
          cloneEl.rows[i].cells[k].rowSpan += 1
          cloneEl.rows[j].removeChild(cloneEl.rows[j].cells[k - seed])
          seed++
        }
      }
    }
  }
  el.innerHTML = cloneEl.innerHTML
  return el
}

export function mergeColspan (el) {
  if (!(el instanceof HTMLTableElement)) {
    throw TypeError('要求传入Table元素')
  }
  const cloneEl = el.cloneNode(true)
  const rows = el.rows
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells
    const cloneCells = cloneEl.rows[i].cells
    for (let j = 0; j < cells.length; j++) {
      let seed = 0
      for (let k = j + 1; k < cells.length; k++) {
        if (cells[j].innerHTML === cells[k].innerHTML) {
          cloneCells[j].colSpan += 1
          cloneEl.rows[i].removeChild(cloneCells[k - seed])
          seed++
        }
      }
    }
  }
  el.innerHTML = cloneEl.innerHTML
  return el
}