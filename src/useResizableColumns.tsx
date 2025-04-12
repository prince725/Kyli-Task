import { useRef, useEffect } from "react"

export const useResizableColumns = () => {
  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    const table = tableRef.current
    if (!table) return

    const ths = table.querySelectorAll("th")
    ths.forEach((th, i) => {
      const resizer = document.createElement("div")
      resizer.className = "resizer"
      th.style.position = "relative"
      resizer.style.cssText = `
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 4px;
        cursor: col-resize;
        user-select: none;
      `
      th.appendChild(resizer)

      let x = 0
      let w = 0

      const onMouseDown = (e: MouseEvent) => {
        x = e.clientX
        w = th.offsetWidth

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
      }

      const onMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - x
        th.style.width = `${w + dx}px`
      }

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
      }

      resizer.addEventListener("mousedown", onMouseDown)
    })
  }, [])

  return { tableRef }
}
