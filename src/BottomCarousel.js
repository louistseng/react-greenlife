import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./CarouselButton";
import { useEmblaCarousel } from "embla-carousel/react";
import { Link } from 'react-router-dom';

import "./bottomCarousel.css";


const BottomCarousel = ({ slides, searchData, SLIDE_COUNTBt }) => {


    let linkBt = [];
    let mediaBt = [];
    let nameBt = [];
    let dateBt = [];
    for (const element of searchData) {
        linkBt.push(element.activityGuid)
        mediaBt.push(element.activityPicPath)
        nameBt.push(element.activityTitle)
        dateBt.push(formatDate(element.activityStartDatetime))
    }
    // console.log(href)

    const mediaByIndex = index => mediaBt[index % mediaBt.length];
    const linkByIndex = index => linkBt[index % linkBt.length];
    const nameByIndex = index => nameBt[index % nameBt.length];
    const dateByIndex = index => dateBt[index % dateBt.length];


    const [viewportRef, embla] = useEmblaCarousel({ loop: true });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);




    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('/');
    }

    useEffect(() => {
        if (!embla) return;
        embla.on("select", onSelect);
        onSelect();
    }, [embla, onSelect, searchData]);



    return (
        <>
            {searchData.length === 0
                ?
                <div className="embla-bottom">
                    <div className="embla__viewport">
                        <p>查無搜尋結果</p>
                    </div>
                </div>
                :

                <div className="embla-bottom">
                    <div className="embla__viewport" ref={viewportRef}>
                        <div className="embla__container-bottom">
                            {slides.map((index) => (
                                <div className="embla__slide" key={index}>
                                    <div className="embla__slide__inner">
                                        <Link as={Link} to={`/searchEvent/eventDetail?${linkByIndex(index)}`} title="前往連結">
                                            <img
                                                className="embla__slide__img"
                                                src={mediaByIndex(index)}
                                                alt={nameByIndex("0" + index)}
                                                title={nameByIndex(index)}
                                            />
                                        </Link>
                                    </div>
                                    <div className="d-block dec-wrapper">
                                        <p className="carousel-name-text">{nameByIndex(index)}</p>
                                        <p>{dateByIndex(index)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                    <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}

                </div>

            }


        </>
    );
};

export default BottomCarousel;
