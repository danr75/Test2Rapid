import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// Define MindMap specific types directly in this file
export interface MindMapNode {
  id: string;
  label: string;
  type: 'central' | 'subtopic' | 'topic' | 'question';
  group?: number;
  parentId?: string | null;
  // D3 simulation will add these:
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface MindMapLink {
  source: string | MindMapNode; // After simulation, D3 replaces string IDs with node objects if configured
  target: string | MindMapNode; // Same as source
  // You can add other link properties here, e.g., type, strength
}

// Type for nodes after D3 simulation has processed them (includes x, y, etc.)
export type MindMapNodeWithPositions = MindMapNode & d3.SimulationNodeDatum;

// Props for the MindMap component
interface MindMapProps {
  nodes: MindMapNode[]; // Use the clean MindMapNode type
  links: MindMapLink[]; // Use the clean MindMapLink type
  centralTopic: string;
  subThemeTitles?: string[];
  onTopicClick?: (id: string, label: string) => void;
}

const MindMap: React.FC<MindMapProps> = ({ nodes, links, centralTopic, subThemeTitles, onTopicClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const simulationRef = useRef<any>(null);
  const zoomRef = useRef<any>(null);

  // Update dimensions using ResizeObserver
  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const observer = new ResizeObserver(entries => {
      if (entries && entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions(prevDimensions => {
          // Only update if dimensions actually changed to avoid potential loops
          if (prevDimensions.width !== width || prevDimensions.height !== height) {
            return { width, height };
          }
          return prevDimensions;
        });
      }
    });
    observer.observe(currentContainer);
    return () => {
      // Check currentContainer again for cleanup as it might have changed
      if (currentContainer) { 
        observer.unobserve(currentContainer);
      }
    };
  }, []); // Empty dependency array ensures this runs once to set up the observer

  // Create the mind map visualization
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    // Clear previous visualization
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // If there are no nodes yet, show the central topic
    if (nodes.length === 0) {
      const g = svg.append('g')
        .attr('transform', `translate(${dimensions.width / 2}, ${dimensions.height / 2})`);
      
      // Central circle
      g.append('circle')
        .attr('r', 60)
        .attr('fill', '#4F46E5')
        .attr('opacity', 0.2);
      
      // Central topic text
      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('fill', '#4F46E5')
        .text(centralTopic.length > 25 ? centralTopic.substring(0, 22) + '...' : centralTopic);
      
      return;
    }

    // Prepare node and link data, incorporating subthemes
    // Prepare node and link data. Start with copies from props.
    let processedNodes = [...nodes];
    let processedLinks = [...links];

    // Identify IDs of any subtopic nodes from the *current* props (before filtering)
    // These are the ones we need to ensure are fully removed if subThemeTitles changes.
    const oldSubTopicNodeIds = nodes.filter(n => n.type === 'subtopic').map(n => n.id);

    // Filter out all subtopic nodes from processedNodes. New ones will be added if subThemeTitles is present.
    processedNodes = processedNodes.filter(node => node.type !== 'subtopic');

    // Filter out all question nodes as well, as they should not be displayed in this view.
    processedNodes = processedNodes.filter(node => node.type !== 'question');
    
    // Add new subtopic nodes if subThemeTitles is present
    if (subThemeTitles && subThemeTitles.length > 0) {
      const subtopicNodes = subThemeTitles.map((title, index) => ({
        id: `subtheme-${index}`,
        label: title,
        type: 'subtopic' as const,
        group: 1, 
        parentId: 'central'
      }));
      processedNodes.push(...subtopicNodes);

      // Links for these new subtopics will be added after all node processing is final
    }

    // Now that processedNodes is final (only central + current subthemes),
    // create a set of valid node IDs for efficient link filtering.
    const finalNodeIds = new Set(processedNodes.map(n => n.id));

    // DIAGNOSTIC: Temporarily, only create links for current subthemes.
    processedLinks = []; // Start with an empty array
    if (subThemeTitles && subThemeTitles.length > 0) {
      const newSubtopicLinks = subThemeTitles.map((_, index) => ({
        source: 'central', // Links from central to each subtheme
        target: `subtheme-${index}`,
      }));
      processedLinks.push(...newSubtopicLinks);
    }
    // No deduplication needed here as we are generating a fresh, small set of links.

    // At this point, processedNodes contains only central + current subthemes
    // and processedLinks contains only links between these nodes, after filtering and deduplication.

    // const nodeData = processedNodes; // These are now the definitive data for the simulation
    // const linkData = processedLinks;

    // If after processing, there are no nodes, render placeholder or central topic
    // Use processedNodes and processedLinks directly now, renamed to nodeData and linkData for convenience in D3 setup
    const nodeData = processedNodes; 
    const linkData = processedLinks;

    if (nodeData.length === 0 && centralTopic) {
        const placeholderG = svg.append('g')
          .attr('transform', `translate(${dimensions.width / 2}, ${dimensions.height / 2})`);
        placeholderG.append('text').attr('text-anchor', 'middle').text(centralTopic);
        return;
    }
    if (nodeData.length === 0) {
        // Truly empty, perhaps show a generic message if centralTopic is also missing
        return;
    }

    // Create a proper mind map with nodes and links
    const g = svg.append('g');

    // Helper function to calculate node dimensions based on type and canvas size
    const getNodeDimensions = (node: any, canvasHeight: number, canvasWidth: number) => {
      let baseHeightPercentage = 0.12; // Default for question nodes
      let minHeight = 60;
      let aspectRatio = 2.5;
      let maxHeightCap = 100;
      let maxWidthCap = 350;

      if (node.id === 'central') {
        baseHeightPercentage = 0.20; 
        minHeight = 80; 
        aspectRatio = 3.0; 
        maxHeightCap = 150;
        maxWidthCap = 400;
      } else if (node.type === 'topic' || node.type === 'subtopic') {
        baseHeightPercentage = 0.15; 
        minHeight = 70;
        aspectRatio = 2.8;
        maxHeightCap = 110;
        maxWidthCap = 350;
      } else { // Question nodes (default case)
        maxHeightCap = 90;
        maxWidthCap = 320;
      }

      let height = Math.max(minHeight, canvasHeight * baseHeightPercentage);
      height = Math.min(height, canvasHeight * 0.3, maxHeightCap);

      let width = height * aspectRatio;
      width = Math.min(width, canvasWidth * 0.5, maxWidthCap);

      return { width, height };
    };

    // Add zoom functionality (logic from previous centering task)
    const k = 0.6; 
    const targetX = dimensions.width / 2; 
    const targetY = dimensions.height / 2; 
    const initialTransform = d3.zoomIdentity
      .translate(dimensions.width / 2, dimensions.height / 2)
      .scale(k)
      .translate(-targetX, -targetY);
    const zoom = d3.zoom()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    zoomRef.current = zoom;
    svg.call(zoom as any);
    svg.call(zoom.transform as any, initialTransform);

    // Pin central node to the center of the SVG
    const centralNode = nodeData.find(n => n.id === 'central');
    if (centralNode) {
      centralNode.fx = dimensions.width / 2;
      centralNode.fy = dimensions.height / 2;
    }

    // Define D3 forces
    const linkDistance = 220;
    const linkForce = d3.forceLink(linkData as any)
      .id((d: any) => d.id)
      .distance(linkDistance) // Adjusted distance
      .strength(0.7);

    const simulation = d3.forceSimulation(nodeData as any) // nodeData now includes subthemes
      .force('charge', d3.forceManyBody().strength(-1000)) 
      .force('link', linkForce)
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collide', d3.forceCollide().radius((d: any) => {
        const { width: nodeWidth, height: nodeHeight } = getNodeDimensions(d, dimensions.height, dimensions.width);
        return Math.max(nodeWidth, nodeHeight) / 2 + 20; 
      }).strength(0.9));
    simulationRef.current = simulation;

    // Create the links
    const linkElements = g.selectAll<SVGLineElement, MindMapLink>('.link')
      .data(linkData, (d: MindMapLink): string => `${d.source as string}-${d.target as string}`)
      .join('line')
      .attr('stroke', '#6C63FF')
      .attr('stroke-opacity', 0.8)
      .attr('stroke-width', 3)
      .attr('stroke-linecap', 'round')
      .style('filter', 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))');
    // Create the node groups
    const nodeElements = g.selectAll<SVGGElement, MindMapNodeWithPositions>('.node')
      .data(nodeData, (d: MindMapNodeWithPositions): string => d.id) // Use d.id as the key for object constancy
      .join('g')
      .attr('class', 'node') // General class for nodes
      .call(drag(simulation) as any)
      .on('click', (event: MouseEvent, d: MindMapNodeWithPositions) => { 
        // Call onTopicClick only for 'topic' type nodes, excluding 'central'
        if (onTopicClick && d.id !== 'central' && d.type === 'topic') { 
          onTopicClick(d.id, d.label);
        }

        // Zoom and center on the clicked node, if it has valid coordinates
        if (typeof d.x === 'number' && typeof d.y === 'number') {
          const k = 1.2; // Zoom factor
          const x = dimensions.width / 2 - d.x * k;
          const y = dimensions.height / 2 - d.y * k;
          
          if (svgRef.current && zoomRef.current) {
            d3.select(svgRef.current).transition().duration(750).call(
              zoomRef.current.transform as any,
              d3.zoomIdentity.translate(x, y).scale(k)
            );
          }
        } else {
          console.warn('Clicked node does not have valid x/y coordinates for zoom:', d);
        }
      })
      .attr('cursor', (d: any) => (d.id === 'central' || d.type === 'question') ? 'default' : 'pointer'); // Set cursor based on type

    // Add rounded rectangles for nodes
    nodeElements.append('rect')
      .attr('width', (d: any) => getNodeDimensions(d, dimensions.height, dimensions.width).width)
      .attr('height', (d: any) => getNodeDimensions(d, dimensions.height, dimensions.width).height)
      .attr('rx', (d: any) => getNodeDimensions(d, dimensions.height, dimensions.width).height * 0.2) 
      .attr('ry', (d: any) => getNodeDimensions(d, dimensions.height, dimensions.width).height * 0.2)
      .attr('x', (d: any) => -getNodeDimensions(d, dimensions.height, dimensions.width).width / 2)
      .attr('y', (d: any) => -getNodeDimensions(d, dimensions.height, dimensions.width).height / 2)
      .attr('fill', (d: any) => {
        if (d.id === 'central') return '#4F46E5'; 
        if (d.type === 'topic') return '#10B981'; 
        if (d.type === 'subtopic') return '#8B5CF6'; 
        return '#F59E0B'; // Default for questions or other types
      })
      .attr('opacity', 0.95) 
      .attr('stroke', '#FFFFFF') 
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))');

    // Add foreign object for HTML-based text
    nodeElements.append('foreignObject')
      .attr('width', d => getNodeDimensions(d, dimensions.height, dimensions.width).width)
      .attr('height', d => getNodeDimensions(d, dimensions.height, dimensions.width).height)
      .attr('x', d => -getNodeDimensions(d, dimensions.height, dimensions.width).width / 2)
      .attr('y', d => -getNodeDimensions(d, dimensions.height, dimensions.width).height / 2)
      .style('pointer-events', 'none')
      .append('xhtml:div')
      .style('width', '100%')
      .style('height', '100%')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('justify-content', 'center')
      .style('text-align', 'center')
      .style('font-size', (d: any) => {
        const { height: nodeHeight } = getNodeDimensions(d, dimensions.height, dimensions.width);
        return Math.max(12, Math.min(20, nodeHeight * 0.18)) + 'px'; // Increased responsive font size
      })
      .style('font-weight', 'bold')
      .style('color', 'white')
      .style('overflow', 'hidden')
      .style('padding', '5px') // Increased padding
      .html(function(d: any) {
        const words = d.label.split(' ');
        let displayText = d.label;
        if (words.length > 5) {
          displayText = words.slice(0, 5).join(' ') + '...';
        }
        return displayText;
      });

    // Add title for tooltip on hover
    nodeElements.append('title')
      .text(d => d.label);

    // Set up the tick function for simulation
    const ticked = () => {
      linkElements
        .attr('x1', (d: d3.SimulationLinkDatum<MindMapNodeWithPositions>) => (d.source as MindMapNodeWithPositions).x!)
        .attr('y1', (d: d3.SimulationLinkDatum<MindMapNodeWithPositions>) => (d.source as MindMapNodeWithPositions).y!)
        .attr('x2', (d: d3.SimulationLinkDatum<MindMapNodeWithPositions>) => (d.target as MindMapNodeWithPositions).x!)
        .attr('y2', (d: d3.SimulationLinkDatum<MindMapNodeWithPositions>) => (d.target as MindMapNodeWithPositions).y!);

      nodeElements.attr('transform', (d: MindMapNodeWithPositions) => `translate(${d.x},${d.y})`);
    };
    
    simulation.nodes(nodeData as any).on('tick', ticked);

    // Commenting out old animation that targets 'circle'
    /*
    nodeElements.filter((d, i) => i === nodeData.length - 1)
      .select('rect') // If we wanted to animate rects
      .attr('width', 0)
      .attr('height', 0)
      .transition()
      .duration(500)
      .attr('width', d => getNodeDimensions(d, dimensions.height, dimensions.width).width)
      .attr('height', d => getNodeDimensions(d, dimensions.height, dimensions.width).height);
    */

    // Helper function for drag behavior
    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

  }, [nodes, links, centralTopic, subThemeTitles, dimensions]);

  return (
    <div className="card p-0 overflow-hidden shadow-md border border-gray-200">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="text-xl font-semibold text-primary">Knowledge Mind Map</h3>
        <p className="text-sm text-gray-500">
          This mind map grows as you answer questions correctly
        </p>
      </div>
      <div 
        ref={containerRef} 
        className="bg-white p-4 h-96 flex items-center justify-center"
      >
        {nodes.length === 0 && !centralTopic ? (
          <div className="text-center text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>Your mind map will appear here as you answer questions correctly</p>
          </div>
        ) : (
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            className="overflow-visible"
          ></svg>
        )}
      </div>
    </div>
  );
};

export default MindMap;
