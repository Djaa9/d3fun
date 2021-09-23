import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ForceLink, SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import { updateSourceFile } from 'typescript';

interface Factor extends SimulationNodeDatum {
  description: string;
  selected: boolean;
}

interface Link extends SimulationLinkDatum<Factor> {
  source: string;
  target: string;
}

interface NodeWrapper {
  nodes: Factor[];
  links: Link[];
}

var graph: NodeWrapper = { 
  nodes: [
  {description: "Problemformulering", selected: true, },
  {description: "faktor1", selected: true},
  {description: "faktor2", selected: true},
  {description: "faktor3", selected: true},
  {description: "faktor4", selected: true},
  {description: "faktor5", selected: true},
  {description: "faktor6", selected: true},
  {description: "faktor7", selected: true},
  {description: "faktor8", selected: true},
  {description: "faktor9", selected: true},
  {description: "faktor10", selected: true},
  {description: "faktor11", selected: true},
  {description: "faktor12", selected: true},
  {description: "faktor13", selected: true},
],
links: []
};

graph.nodes.forEach((n) => {
  if(n !== graph.nodes[0])
  graph.links.push({source: graph.nodes[0].description, target: n.description}); 
})

function Graph() {

  var canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);

  useEffect(() => {
    if(!canvasRef.current) return

    // Get canvas
    var canvas = d3.select<HTMLCanvasElement, HTMLCanvasElement>(canvasRef.current as HTMLCanvasElement);
    var width = parseInt(canvas.attr("width"), 10);
    var height = parseInt(canvas.attr("height"), 10);
    var r = 20;
    var ctx = canvas.node()?.getContext("2d");

    function update() {
      if(!ctx) return

      ctx.clearRect(0, 0, width, height);
      
      ctx.beginPath();
      ctx.globalAlpha = 0.5;
      graph.links.forEach(drawLink);
      ctx.stroke();

      ctx.beginPath();
      ctx.globalAlpha = 0.2;
      ctx.fillText("asd", 12, 12);
      graph.nodes.forEach(drawNode);
      ctx.fill();
    }

    // Setup simulation
    var simulation = d3.forceSimulation()
    .force("collide", d3.forceCollide().radius(10))     // Pushes nodes apart
    .force("charge", d3.forceManyBody().strength(-420))    
    .force("radial", d3.forceRadial(500, width / 2, height / 2))
    .force("center", d3.forceCenter(width/2, height/2))  
    .force("link", d3.forceLink().id((d: any) => d.description)) // Adds description as index for links
    .on("tick", update)

    // Center problemdefinition
    graph.nodes[0].fx = width/2;
    graph.nodes[0].fy = height/2;

    // ???
    simulation.nodes(graph.nodes)    
    .force<ForceLink<Factor, Link>>("link")?.links(graph.links)
  
    function drawNode(d: Factor){
      if(!d.x || !d.y) return 
      ctx?.moveTo(d.x, d.y);
      ctx?.arc(d.x, d.y, r, 0, 2* Math.PI);
    }

    function drawLink(l: any){
      if(!l.source.x || !l.source.y) return 
      ctx?.moveTo(l.source.x, l.source.y);
      ctx?.lineTo(l.target.x, l.target.y);
    }
  },[canvasRef])

  const add = () => {
    const factor = `faktor${Math.random()}`;
    graph.nodes.push({description: factor, selected: true},)
    graph.links.push({source: "Problemformulering", target: factor},)
  }

  return (
    <>
    <div>
      <canvas ref={canvasRef} id="network" width="1000px" height="1000px"></canvas>
    </div>
    <button onClick={add}> add</button>
    </>
  );
}

export default Graph;
