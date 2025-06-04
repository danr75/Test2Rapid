import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  label: string;
  group?: number;
  type?: 'topic' | 'question' | 'subtopic';
  expanded?: boolean;
  parentId?: string;
}

interface Link {
  source: string;
  target: string;
}

interface MindMapProps {
  nodes: Node[];
  links: Link[];
  centralTopic: string;
  onTopicClick?: (topicId: string, topicLabel: string) => void;
}

const MindMap: React.FC<MindMapProps> = ({ nodes, links, centralTopic, onTopicClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const simulationRef = useRef<any>(null);
  const zoomRef = useRef<any>(null);

  // Update dimensions when the container size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const newDimensions = {
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        };
        
        setDimensions(newDimensions);
        
        // If we have a simulation running, update its center force
        if (simulationRef.current) {
          simulationRef.current
            .force('center', d3.forceCenter(newDimensions.width / 2, newDimensions.height / 2))
            .alpha(0.3)
            .restart();
        }
        
        // If we have zoom behavior, reset to center
        if (zoomRef.current && svgRef.current) {
          const svg = d3.select(svgRef.current);
          svg.call(zoomRef.current.transform, d3.zoomIdentity.translate(
            newDimensions.width / 2 - newDimensions.width / 4, 
            newDimensions.height / 2 - newDimensions.height / 4
          ));
        }
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
    
    // Store zoom reference for resize handling
    zoomRef.current = zoom;

    // Initial zoom to center
    svg.call(zoom as any);
    
    // Apply initial transform - need to cast to any to avoid TypeScript errors
    const initialTransform = d3.zoomIdentity.translate(
      dimensions.width / 2 - dimensions.width / 4,
      dimensions.height / 2 - dimensions.height / 4
    );
    (zoom.transform as any)(svg, initialTransform);

    // Prepare the data
    const nodeData = nodes.map(node => ({ ...node }));
    const linkData = links.map(link => ({ ...link }));
    
    // Create the simulation with improved forces for better spacing
    const simulation = d3.forceSimulation(nodeData as any)
      .force('charge', d3.forceManyBody().strength(-800)) // Stronger repulsion
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2));
      
    // Store simulation reference for resize handling
    simulationRef.current = simulation;
    
    // Add the link force separately to avoid timing issues
    const linkForce = d3.forceLink(linkData as any)
      .id((d: any) => d.id)
      .distance(200) // Increase distance between nodes
      .strength(0.7); // Slightly reduce strength for more natural layout
    
    // Add collision force to prevent node overlap - adjusted for wider rectangular nodes
    simulation.force('collision', d3.forceCollide().radius((d: any) => {
      if (d.id === 'central') return 100; // Larger collision area for central node
      if (d.type === 'topic' || d.type === 'subtopic') return 85; // Medium collision area for topics
      return 70; // Smaller collision area for questions
    }));
    
    simulation.force('link', linkForce);

    // Add central topic node if it doesn't exist
    if (!nodeData.find(n => n.id === 'central')) {
      nodeData.unshift({ 
        id: 'central', 
        label: centralTopic, 
        group: 0,
        type: 'topic' // Mark as a topic node
      });
      // Connect all nodes to central node if they don't have connections
      nodeData.forEach(node => {
        if (node.id !== 'central' && !linkData.some(link => link.target === node.id)) {
          linkData.push({ source: 'central', target: node.id });
        }
      });
    }

    // Create the links
    const link = g.append('g')
      .selectAll('line')
      .data(linkData)
      .join('line')
      .attr('stroke', '#6C63FF') // More visible purple color
      .attr('stroke-opacity', 0.8) // Higher opacity
      .attr('stroke-width', 3) // Thicker lines
      .attr('stroke-linecap', 'round') // Rounded ends
      .style('filter', 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))'); // Subtle shadow

    // Create the nodes
    const node = g.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('g')
      .data(nodeData)
      .join('g')
      .call(drag(simulation) as any)
      .on('click', function(event, d: any) {
        if (onTopicClick && (d.type === 'topic' || d.type === 'subtopic')) {
          onTopicClick(d.id, d.label);
        }
      });

    // Add rounded rectangles for nodes
    node.append('rect')
      .attr('width', d => {
        // Width based on node type
        if (d.id === 'central') return 140;
        if (d.type === 'topic' || d.type === 'subtopic') return 120;
        return 100;
      })
      .attr('height', d => {
        // Height based on node type
        if (d.id === 'central') return 40;
        if (d.type === 'topic' || d.type === 'subtopic') return 35;
        return 30;
      })
      .attr('rx', 15) // Rounded corners
      .attr('ry', 15) // Rounded corners
      .attr('x', d => {
        // Center the rectangle horizontally
        if (d.id === 'central') return -70;
        if (d.type === 'topic' || d.type === 'subtopic') return -60;
        return -50;
      })
      .attr('y', d => {
        // Center the rectangle vertically
        if (d.id === 'central') return -20;
        if (d.type === 'topic' || d.type === 'subtopic') return -17.5;
        return -15;
      })
      .attr('fill', d => {
        // Use app color palette
        if (d.id === 'central') return '#4F46E5'; // Primary indigo
        if (d.type === 'topic') return '#10B981'; // Green
        if (d.type === 'subtopic') return '#8B5CF6'; // Purple
        return '#F59E0B'; // Amber for question nodes
      })
      .attr('opacity', 0.9) // Higher opacity for better visibility
      .attr('cursor', d => (d.type === 'topic' || d.type === 'subtopic') ? 'pointer' : 'default')
      // Add subtle shadow for depth
      .style('filter', 'drop-shadow(0px 3px 3px rgba(0,0,0,0.2))');

    // Add foreign object for HTML-based text that wraps properly
    node.append('foreignObject')
      .attr('width', d => {
        // Match the width of the rectangle
        if (d.id === 'central') return 140;
        if (d.type === 'topic' || d.type === 'subtopic') return 120;
        return 100;
      })
      .attr('height', d => {
        // Match the height of the rectangle
        if (d.id === 'central') return 40;
        if (d.type === 'topic' || d.type === 'subtopic') return 35;
        return 30;
      })
      .attr('x', d => {
        // Position to match rectangle
        if (d.id === 'central') return -70;
        if (d.type === 'topic' || d.type === 'subtopic') return -60;
        return -50;
      })
      .attr('y', d => {
        // Position to match rectangle
        if (d.id === 'central') return -20;
        if (d.type === 'topic' || d.type === 'subtopic') return -17.5;
        return -15;
      })
      .style('pointer-events', 'none') // Prevent text from interfering with clicks
      .append('xhtml:div')
      .style('width', '100%')
      .style('height', '100%')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('justify-content', 'center')
      .style('text-align', 'center')
      .style('font-size', d => d.id === 'central' ? '13px' : '11px')
      .style('font-weight', 'bold')
      .style('color', 'white')
      .style('overflow', 'hidden')
      .style('padding', '2px')
      .html(function(d: any) {
        // Limit to max 5 words
        const words = d.label.split(' ');
        let displayText = '';
        
        if (words.length <= 5) {
          displayText = d.label;
        } else {
          displayText = words.slice(0, 5).join(' ') + '...';
        }
        
        return displayText;
      });

    // Add title for tooltip on hover
    node.append('title')
      .text(d => d.label);

    // Set up the tick function for simulation
    const ticked = () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    };
    
    // Apply the tick function to the simulation
    simulation.nodes(nodeData as any).on('tick', ticked);

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
