import React, { useState, useEffect, useCallback } from "react";

import { useEmblaCarousel } from 'embla-carousel/react';
import DownloadCarousel from '../Components/DownloadCarousel';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';

import "../carousel.css";

const EmblaCarousel = ({ slides, activityTypeId, SSL }) => {

    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'


    const [loading, setLoading] = useState(true)

    const [SLIDE_COUNT, setSLIDE_COUNT] = useState(0)
    const slidesTop = Array.from(Array(SLIDE_COUNT).keys());

    const [viewportRef, embla] = useEmblaCarousel({ loop: true });
    // const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    // const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    // const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    // const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

    const onSelect = useCallback(() => {
        if (!embla) return;
        // setPrevBtnEnabled(embla.canScrollPrev());
        // setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    const [searchData, setSearchData] = useState([]);



    let link = [];
    let media = [];
    let nameRec = [];
    let dateRec = [];
    for (var i = 0; i < searchData.length; i++) {
        link.push(searchData[i].guid)
        media.push(searchData[i].picPath)
        nameRec.push(searchData[i].title)
        dateRec.push(formatDate(searchData[i].startDatetime))
    }


    const mediaByIndex = index => media[index % media.length];
    const linkByIndex = index => link[index % link.length];
    const nameByIndex = index => nameRec[index % nameRec.length];
    const dateByIndex = index => dateRec[index % dateRec.length];

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('/');
    }


    const [count] = useState("10");

    useEffect(() => {

        const uri = `${SSL}//${domain}/api/api/Activity/GetByType`;
        fetch(uri, {
            method: 'POST',
            body: JSON.stringify({
                TypeId: activityTypeId,
                Count: count
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setLoading(false)
                if (result.isSucess) {
                    setSearchData(result.resultObject);
                    setSLIDE_COUNT(result.resultObject.length)
                }
            });

        if (!embla) return;
        embla.on("select", onSelect);
        onSelect();
    }, [embla, onSelect, SSL, activityTypeId, count, domain]);

    return (
        <>
            {searchData.length > 0 &&
                <div>
                    <h1 className="green-eventTitle">熱門推薦活動</h1>
                    <div className="embla">
                        <Loader loading={loading} />
                        <div className="embla__viewport-top" ref={viewportRef}>
                            <div className="embla__container">
                                <DownloadCarousel show={3} infiniteLoop arrowStyle={"-event"}>
                                    {slidesTop.map((index) => (
                                        <div className="embla__slide-top" key={index}>
                                            <div className="embla__slide__inner-top">
                                                <Link as={Link} to={`/searchEvent/eventDetail?${linkByIndex(index)}`} tabIndex={0}>
                                                    <img
                                                        className="embla__slide__img-top"
                                                        src={mediaByIndex(index)}
                                                        alt={nameByIndex(index)}
                                                        title={nameByIndex(index)}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="d-block dec-wrapper">
                                                <p className="date">{dateByIndex(index)}</p>
                                                <p className="carousel-name-text">{nameByIndex(index)}</p>

                                            </div>
                                        </div>
                                    ))}
                                </DownloadCarousel>
                            </div>
                        </div>

                        {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}

                    </div>
                </div>
            }
        </>
    );
};

export default EmblaCarousel;