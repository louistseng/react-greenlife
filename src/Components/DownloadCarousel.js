
import React, { useEffect, useState } from 'react'
import './css/DownloadCarou.scss'

const DownloadCarousel = (props) => {

    const { children, show, infiniteLoop, visual } = props
    const [length, setLength] = useState(children.length)
    const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? length < show ? 0 : show : 0)

    const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show)
    const [transitionEnabled, setTransitionEnabled] = useState(true)

    const [touchPosition, setTouchPosition] = useState(null)

    // 子dom的數量
    useEffect(() => {
        // console.log(currentIndex)
        // console.log(currentIndex * (100 / show))
        setLength(children.length)
        setIsRepeating(infiniteLoop && children.length > show)
        if (length > show) {
            setCurrentIndex(show)
        }

    }, [children, infiniteLoop, show, visual])

    useEffect(() => {
        if (isRepeating) {
            if (currentIndex === show || currentIndex === length) {
                setTransitionEnabled(true)
            }
        }
    }, [currentIndex, isRepeating, show, length])

    const next = () => {
        if (isRepeating || currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)

        }
        if (currentIndex === length + show) {
            setCurrentIndex(show)
        }
    }

    const prev = () => {
        if (isRepeating || currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)

        }
        if (currentIndex === 0) {
            setCurrentIndex(show)
        }
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if (touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }

    const handleTransitionEnd = () => {
        if (isRepeating) {
            if (currentIndex === 0) {
                setTransitionEnabled(false)
                setCurrentIndex(length)
            } else if (currentIndex === length + show) {
                setTransitionEnabled(false)
                setCurrentIndex(show)
            }
        }
    }

    const renderExtraPrev = () => {

        let output = []
        for (let index = 0; index < show; index++) {
            output.push(children[length - 1 - index])
        }
        output.reverse()
        return output
    }

    const renderExtraNext = () => {

        let output = []
        for (let index = 0; index < show; index++) {
            output.push(children[index])
        }
        return output
    }

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">

                {
                    (isRepeating || currentIndex > 0) &&
                    <button tabIndex={0} onClick={prev} className={props.arrowStyle ? `left-arrow${props.arrowStyle}` : "left-arrow"}>
                        &lt;
                    </button>
                }
                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={length < show ? `carousel-content justify-content-center show-${show}` : `carousel-content show-${show}`}
                        style={{
                            transform: window.screen.width < 462 ? `translateX(-${currentIndex * (props.arrowStyle ? 91 : 265)}px)` : `translateX(-${currentIndex * (99 / show)}%)`,
                            transition: !transitionEnabled ? 'none' : undefined,
                        }}
                        onTransitionEnd={() => handleTransitionEnd()}
                    >
                        {
                            (length > show && isRepeating) &&
                            renderExtraPrev()
                        }
                        {children}
                        {
                            (length > show && isRepeating) &&
                            renderExtraNext()
                        }
                    </div>
                </div>

                {
                    (isRepeating || currentIndex < (length - show)) &&
                    <button tabIndex={0} onClick={next} className={props.arrowStyle ? `right-arrow${props.arrowStyle}` : "right-arrow"}>
                        &gt;
                    </button>
                }
            </div>
        </div>
    )
}

export default DownloadCarousel
