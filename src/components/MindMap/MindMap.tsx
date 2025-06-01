import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  label: string;
  group?: number;
}

interface Link {
  source: string;
  target: string;
}

interface MindMapProps {
  nodes: Node[];
  links: Link[];
  centralTopic: string;
}

const MindMap: React.FC<MindMapProps> = ({ nodes, links, centralTopic }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions when the container size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

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

    // Create a proper mind map with nodes and links
    const g = svg.append('g');

    // Add zoom functionality
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    // Create the force simulation
    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2));

    // Prepare the data
    const nodeData = nodes.map(node => ({ ...node }));
    const linkData = links.map(link => ({ ...link }));

    // Add central topic node if it doesn't exist
    if (!nodeData.find(n => n.id === 'central')) {
      nodeData.unshift({ id: 'central', label: centralTopic, group: 0 });
      // Connect all nodes to central node if they don't have connections
      nodeData.forEach(node => {
        if (node.id !== 'central' && !linkData.some(link => link.target === node.id)) {
          linkData.push({ source: 'central', target: node.id });
        }
      });
    }

    // Create the links
    const link = g.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(linkData)
      .join('line')
      .attr('stroke-width', 2);

    // Create the nodes
    const node = g.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('g')
      .data(nodeData)
      .join('g')
      .call(drag(simulation) as any);

    // Add circles to nodes
    node.append('circle')
      .attr('r', d => d.id === 'central' ? 40 : 25)
      .attr('fill', d => {
        const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
        return d.id === 'central' ? '#4F46E5' : colors[Math.abs(d.id.charCodeAt(0)) % colors.length];
      })
      .attr('opacity', d => d.id === 'central' ? 0.8 : 0.7);

    // Add labels to nodes
    node.append('text')
      .attr('x', 0)
      .attr('y', d => d.id === 'central' ? 0 : 30)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', d => d.id === 'central' ? 'middle' : 'text-before-edge')
      .style('font-size', d => d.id === 'central' ? '12px' : '10px')
      .style('font-weight', d => d.id === 'central' ? 'bold' : 'normal')
      .style('fill', '#333')
      .text(d => d.label.length > 20 ? d.label.substring(0, 17) + '...' : d.label);

    // Add title for tooltip on hover
    node.append('title')
      .text(d => d.label);

    // Update positions on simulation tick
    simulation.nodes(nodeData as any).on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    simulation.force('link', d3.forceLink(linkData as any).id((d: any) => d.id).distance(100));

    // Add a subtle animation when new nodes are added
    node.filter((d, i) => i === nodeData.length - 1)
      .select('circle')
      .attr('r', 0)
      .transition()
      .duration(500)
      .attr('r', d => d.id === 'central' ? 40 : 25);

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

  }, [nodes, links, centralTopic, dimensions]);

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
