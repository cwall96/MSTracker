import React from "react";
import { View } from "react-native";
import Svg, {
  Path,
  Line,
  Circle,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { scaleLinear, scalePoint } from "d3-scale";
import { max, min } from "d3-array";
import { line as d3Line, curveCatmullRom, curveLinear } from "d3-shape";

/**
 * A lightweight replacement for react-native-chart-kit LineChart that supports per‑dot colouring.
 *
 * @example
 * <CustomLineChart
 *   data={[1, 3, 2, 5]}
 *   labels={["01‑06", "02‑06", "03‑06", "04‑06"]}
 *   dotColors={["#000", "#FF0000", "#000", "#000"]}
 *   width={Dimensions.get("window").width - 40}
 *   height={300}
 *   backgroundGradientFrom="#FFA388"
 *   backgroundGradientTo="#FFE1DB"
 *   segments={6}
 *   bezier
 * />
 */
export default function CustomLineChart({
  data,
  labels,
  width,
  height,
  segments = 4,
  dotColors = [],
  strokeColor = "#000",
  strokeWidth = 2,
  showDots = true,
  fromZero = true,
  bezier = false,
  backgroundGradientFrom = "#fff",
  backgroundGradientTo = "#fff",
}) {
  // Guard against empty data
  if (!data || data.length === 0 || !labels || labels.length !== data.length) {
    return null;
  }

  // ──────────────────────────────────────────────────────────────
  //  Layout maths
  // ──────────────────────────────────────────────────────────────
  const margins = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartW = width - margins.left - margins.right;
  const chartH = height - margins.top - margins.bottom;

  const yMax = max(data.filter(v => v !== null && v !== undefined));
  const yMinRaw = min(data.filter(v => v !== null && v !== undefined));
  const yMin = fromZero ? 0 : yMinRaw;

  const scaleY = scaleLinear().domain([yMin, yMax]).range([chartH, 0]).nice();

  const scaleX = scalePoint()
    .domain(labels.map((_, idx) => idx.toString()))
    .range([0, chartW])
    .padding(0.5);

  // Path for the line
  const generator = d3Line()
    .defined((d) => d !== null && d !== undefined)
    .curve(bezier ? curveCatmullRom.alpha(0.5) : curveLinear)
    .x((_, i) => scaleX(i.toString()))
    .y((d) => scaleY(d));

  const linePath = generator(data);

  // Gridlines (horizontal only, like chart‑kit)
  const gridYs = new Array(segments + 1).fill(0).map((_, i) =>
    scaleY(yMin + ((yMax - yMin) * i) / segments)
  );

  // Default dot colours fall back to strokeColour
  const dots = data.map((d, i) => {
    if (d === null || d === undefined) return null;
    const cx = scaleX(i.toString());
    const cy = scaleY(d);
    return (
      <Circle
        key={`dot-${i}`}
        cx={cx}
        cy={cy}
        r={4}
        fill={dotColors[i] || strokeColor}
      />
    );
  });

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        {/* Gradient background */}
        <Defs>
          <LinearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={backgroundGradientFrom} />
            <Stop offset="100%" stopColor={backgroundGradientTo} />
          </LinearGradient>
        </Defs>
        <Path d={`M0 0 H${width} V${height} H0 Z`} fill="url(#bgGrad)" />

        <Svg x={margins.left} y={margins.top}>
          {/* Gridlines */}
          {gridYs.map((y, i) => (
            <Line
              key={`grid-${i}`}
              x1={0}
              x2={chartW}
              y1={y}
              y2={y}
              stroke="#e5e5e5"
              strokeWidth={1}
            />
          ))}

          {/* Line path */}
          <Path
            d={linePath}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />

          {/* Dots */}
          {showDots && dots}
        </Svg>

        {/* X‑axis labels */}
        {labels.map((label, i) => (
          <SvgText
            key={`label-${i}`}
            x={margins.left + scaleX(i.toString())}
            y={height - margins.bottom / 2}
            fontSize={10}
            textAnchor="middle"
          >
            {label}
          </SvgText>
        ))}

        {/* Y‑axis labels (left) */}
        {gridYs.map((y, i) => (
          <SvgText
            key={`ylabel-${i}`}
            x={margins.left - 6}
            y={margins.top + y + 3}
            fontSize={10}
            textAnchor="end"
          >
            {Math.round(scaleY.invert(y))}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}
