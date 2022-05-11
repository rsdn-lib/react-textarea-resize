import * as React from 'react'
import style from './styles.module.css'

const TextareaResize = () => {
  const wrapperRef = React.useRef() as React.RefObject<HTMLDivElement>
  const textareaRef = React.useRef() as React.RefObject<HTMLTextAreaElement>
  const resizeableRef = React.useRef() as React.RefObject<HTMLDivElement>
  React.useEffect(() => {
    if (resizeableRef.current) {
      let keyDown: number | null = null
      const resizeableMouseDown = () => {
        wrapperRef.current?.classList.add('resize')
        document.body.classList.add(style.unSelectable)
        keyDown = 1

        document.addEventListener('mousemove', documentMouseMove)
      }
      const documentMouseMove = (e: MouseEvent) => {
        if (keyDown === 1 && wrapperRef.current?.classList.contains('resize')) {
          if (textareaRef.current) {
            var Height = e.pageY - textareaRef.current?.offsetTop
            textareaRef.current.style.height = Height + 'px'
          }
        }
      }

      const documentMouseUp = () => {
        document.removeEventListener('mousemove', documentMouseMove)
        wrapperRef.current?.classList.remove('resize')
        document.body.classList.remove(style.unSelectable)
        keyDown = 0
      }
      resizeableRef.current.addEventListener('mousedown', resizeableMouseDown)
      document.addEventListener('mouseup', documentMouseUp)
      return () => {
        // eslint-disable-next-line no-unused-expressions
        resizeableRef.current?.removeEventListener(
          'mousedown',
          resizeableMouseDown
        )
        document.removeEventListener('mousemove', documentMouseMove)
        document.removeEventListener('mouseup', documentMouseUp)
      }
    }

    return () => {}
  }, [resizeableRef.current])

  return (
    <div className={style.txtArea} ref={wrapperRef}>
      <textarea ref={textareaRef} className={style.textarea} />
      <div ref={resizeableRef} className={style.resizable}>
        ...
      </div>
    </div>
  )
}

export default TextareaResize