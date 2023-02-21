
import React, { useEffect, useState } from 'react'
import './css/DownloadCarou.scss'
import useWindowSize from '../utils/Resize';

const DownloadCarouselFlip = (props) => {
    const width = useWindowSize();
    const { children, computer, mobile, infiniteLoop, sigleWidth } = props
    const [show, setShow] = useState(width < 462 ? mobile : computer)
    const [length, setLength] = useState(children.length)
    const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? length < show ? 0 : show : 0)

    const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show)
    const [transitionEnabled, setTransitionEnabled] = useState(true)

    const [touchPosition, setTouchPosition] = useState(null)


    useEffect(() => {
        setShow(width < 462 ? mobile : computer)
    }, [width, computer])

    // 子dom的數量
    useEffect(() => {
        setLength(children.length)
        setIsRepeating(infiniteLoop && children.length > show)

    }, [children, infiniteLoop, show])

    useEffect(() => {
        if (isRepeating) {
            if (currentIndex === show || currentIndex === length) {
                setTransitionEnabled(true)
            }
        }
    }, [currentIndex, isRepeating, show, length])

    const next = () => {

        if (isRepeating || currentIndex <= (length - show)) {
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
                    ((isRepeating || currentIndex) > 0 && show !== children.length) &&
                    <button tabIndex={0} onClick={prev} className="left-arrow">
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
                            transform: width < 462 ? `translateX(-${currentIndex * (sigleWidth)}px)` : show === children.length ? `translateX(0)` : `translateX(-${currentIndex * (100 / show)}%)`,
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
                    <button tabIndex={0} onClick={next} className="right-arrow">
                        &gt;
                    </button>
                }
            </div>
        </div>
    )
}

export default DownloadCarouselFlip
