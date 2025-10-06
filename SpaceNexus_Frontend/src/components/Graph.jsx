import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import './Graph.css';

const rootStyles = getComputedStyle(document.documentElement);

const colorPalette = [
    rootStyles.getPropertyValue("--color-cosmic-purple").trim(),
    rootStyles.getPropertyValue("--color-supernova-orange").trim(),
    rootStyles.getPropertyValue("--color-nebula-red").trim(),
    rootStyles.getPropertyValue("--color-stellar-blue").trim(),
    rootStyles.getPropertyValue("--color-electric-blue").trim(),
    rootStyles.getPropertyValue("--color-solar-gold").trim()
];

export function Graph({ selectedNode, setSelectedNode, data }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function updateSize() {
            if (wrapperRef.current) {
                const { clientWidth, clientHeight } = wrapperRef.current;
                setDimensions({ width: clientWidth, height: clientHeight });
            }
        }

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        if (!data || !dimensions.width || !dimensions.height) return;

        const { nodes, links } = data;
        const { width, height } = dimensions;

        const svg = d3.select(svgRef.current)
            .attr('viewBox', [0, 0, width, height])
            .attr("preserveAspectRatio", "xMidYMid meet");

        svg.selectAll('*').remove();

        const container = svg.append("g");

        const minWeight = d3.min(nodes, d => d.weight || 1);
        const maxWeight = d3.max(nodes, d => d.weight || 1);

        const radiusScale = d3.scaleSqrt()
            .domain([minWeight, maxWeight])
            .range([10, 40]);

        const colorScale = d3.scaleQuantize()
            .domain([minWeight, maxWeight])
            .range(colorPalette);

        console.log(colorScale)

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-150))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide().radius(d => radiusScale(d.weight) + 5));

        const link = container.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('class', 'link');

        const node = container.append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(nodes)
            .join('g')
            .attr('class', 'node')
            .call(drag(simulation));
        node.append('title')
            .text(d => d.title);

        node.append('circle')
            .attr('r', d => radiusScale(d.weight))
            .attr('fill', d => colorScale(d.weight))
            .style('filter', 'drop-shadow(0px 0px 3px white)');

        node.append('text')
            .text(d => {
                const maxLength = 20;
                if (d.title.length > maxLength) {
                    return d.title.substring(0, maxLength) + '...';
                }
                return d.title;
            })
            .attr('x', d => radiusScale(d.weight) + 6)
            .attr('y', 5)
            .attr('pointer-events', 'none')
            .style('font-size', '0.8rem');

        svg.call(
            d3.zoom()
                .scaleExtent([0.5, 5])
                .on("zoom", (event) => {
                    container.attr("transform", event.transform);
                })
        );

        node.on('click', (event, d) => {
            setSelectedNode(d);
            event.stopPropagation();
        });

        svg.on('click', () => {
            setSelectedNode(null);
        });

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });

        return () => {
            simulation.stop();
            svg.selectAll('*').remove();
        };

        function drag(simulation) {
            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }
            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
            return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
        }

    }, [data, dimensions, setSelectedNode]);

    useEffect(() => {
        if (!data) return;
        const svg = d3.select(svgRef.current);
        const nodeSel = svg.selectAll('.node');
        const linkSel = svg.selectAll('.link');

        const getId = v => (v && typeof v === 'object' ? v.id : v);

        if (!selectedNode) {
            nodeSel.classed('highlighted', false).classed('faded', false);
            linkSel.classed('highlighted', false).classed('faded', false);
            return;
        }

        const linked = new Set([selectedNode.id]);
        (data.links || []).forEach(l => {
            const s = getId(l.source);
            const t = getId(l.target);
            if (s === selectedNode.id) linked.add(t);
            if (t === selectedNode.id) linked.add(s);
        });

        nodeSel
            .classed('highlighted', d => linked.has(d.id))
            .classed('faded', d => !linked.has(d.id));

        linkSel
            .classed('highlighted', l => {
                const s = getId(l.source);
                const t = getId(l.target);
                return s === selectedNode.id || t === selectedNode.id;
            })
            .classed('faded', l => {
                const s = getId(l.source);
                const t = getId(l.target);
                return !(s === selectedNode.id || t === selectedNode.id);
            });
    }, [selectedNode, data]);

    return (
        <div ref={wrapperRef} style={{ display: "flex", position: "relative", width: "100vw", height: "100vh" }} >
            <svg ref={svgRef}></svg>
        </div>
    );
}