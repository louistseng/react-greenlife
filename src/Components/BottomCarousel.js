import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';

import "../bottomCarousel.css";


const BottomCarousel = ({ slides, searchData, loading }) => {

    let linkBt = [];
    let mediaBt = [];
    let nameBt = [];
    let dateBt = [];
    let statusBt = [];
    for (var i = 0; i < searchData.length; i++) {
        linkBt.push(searchData[i].guid)
        mediaBt.push(searchData[i].picPath ? searchData[i].picPath : "../../images/blankLeef.png")
        nameBt.push(searchData[i].title)
        dateBt.push(formatDate(searchData[i].startDatetime))
        statusBt.push(searchData[i].status)
    }


    const mediaByIndex = index => mediaBt[index % mediaBt.length];
    const linkByIndex = index => linkBt[index % linkBt.length];
    const nameByIndex = index => nameBt[index % nameBt.length];
    const dateByIndex = index => dateBt[index % dateBt.length];
    const statusByIndex = index => statusBt[index % statusBt.length];


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

    useEffect(() => {
        //延遲載入Lazy-loading
        let options = {
            root: null,
            rootMargin: '300px',
            threshold: 0.1
        }

        const lazyLoadImages = (entries, observer) => {

            entries.map(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.getAttribute('data-src');
                    // entry.target.visibility = "visible"
                }
                return null

            })
        }


        let observer = new IntersectionObserver(lazyLoadImages, options);
        let observTargets = document.querySelectorAll('.lazy-load');

        observTargets.forEach(target => observer.observe(target))
    })





    const display = (
        <>
            {searchData.length === 0
                ?

                <div className="embla-bottom">
                    <div className="embla__viewport">
                        <p>查無搜尋結果</p>
                    </div>
                </div>
                :
                <div className="embla__viewport" >
                    <div className="embla__container-bottom">
                        {slides.map((index) => (
                            <div className="embla__slide" key={index}>
                                <div className="embla__slide__inner">
                                    <Link as={Link} to={`/searchEvent/eventDetail?${linkByIndex(index)}`}>
                                        <img
                                            className={statusByIndex(index) === "已結束" ? "embla__slide__img lazy-load mask-filter" : "embla__slide__img lazy-load"}
                                            data-src={mediaByIndex(index)}
                                            src={"../../images/blankLeef.png"}
                                            alt={nameByIndex(index)}
                                            title={nameByIndex(index)}
                                        />
                                        {statusByIndex(index) === "已結束" && <div className="expired-mask">活動已結束</div>}

                                    </Link>
                                </div>

                                <div className="d-block dec-wrapper">
                                    <p className="date">{dateByIndex(index)}</p>
                                    <p className="carousel-name-text">{nameByIndex(index)}</p>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            }
        </>
    )


    return (
        <>




            <div className="embla-bottom">
                {loading
                    ?
                    <Loader loading={loading} />
                    :

                    display
                }
                {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                    <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}

            </div>




        </>
    );
};

export default BottomCarousel;
