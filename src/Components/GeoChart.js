import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import useResizeObserver from "../useResizeObserver";
import './css/GeoChart.css';


function GeoChart({ data, property, countyId, onChange }) {

   const cityId= 'cityId'; 

  //精簡geojson檔
  var simplify = require('simplify-geojson')
  var simplified = simplify(data, 0.003)

  //定義 & 選取 ref = svg\ wrapperRef的DOM節點
  const svgRef = useRef();
  const wrapperRef = useRef();

  //抓取地圖尺寸
  const dimensions = useResizeObserver(wrapperRef);
  
  //頁面刷新 & 每當變數更新時做的動作
  useEffect(() => {

    const svg = select(svgRef.current);
    //抓取縣市數據的最大與最小值
    // const minProp = min(simplified.features, feature => feature.properties[property]);
    // const maxProp = max(simplified.features, feature => feature.properties[property]);
    //定義顏色
    // const colorScale = scaleLinear()
    //   .domain([minProp, maxProp])
    //   .range(["#B6EBF5", "#0077B4"]);
    //定義大小
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    //用橫麥卡托的方式投影2D
    const projection = geoMercator()
      .fitSize([width, height], simplified)

    //根據投影定義Path
    const pathGenerator = geoPath().projection(projection);

    //渲染SVG
    svg
      .selectAll(".country")
      .data(simplified.features)
      .join("path")
      //滑鼠事件發生時 改變的CSS
      .on("mouseover", function (d) {
        d3.select('.countyValue')
          .classed("countyValueHovered", function (e) {
            let matchId = e.COUNTYID
            let id = d.properties.COUNTYID
            return id.match(matchId);
          })
      })
      .on("mouseout", () => {
        d3.select('.countyValue')
          .classed("countyValueHovered", false)
      })
      .classed('country', true)
      .transition()
      //給定顏色
      // .attr("fill", feature => colorScale(feature.properties[property]))
      // .attr("stroke", "#004c73")
      .attr("stroke", "#004c73")
      .style("fill",function() {
        return "hsl(" + Math.random() * 1080 + ",56%,82%)";
        })
      //給定路徑Path
      .attr("d", feature => pathGenerator(feature))
      .attr('id', feature => { return feature.properties[countyId]; })


      svg.selectAll(".country").on('click', function(d, i) {
        onChange(i.properties[cityId]);
    });

    // render text
  }, [data, dimensions, property]);


  var d3 = require("d3");
  var ƒ = require('d3-utils/get')


  return (
    <>

      <div style={{ display: "flex" }}>
        <div className="taiwanMap" ref={wrapperRef} style={{ position: "relative" }}>
          <svg ref={svgRef} className="taiwanMapSize" ></svg>
        </div>
      </div>
    </>
  );
}

export default GeoChart;