import { InputNode, InputLink, ResponsiveNetwork, ComputedNode, NetworkProps } from '@nivo/network'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const nodes: InputNode[] = [
      {
        "id": "1",
        "depth": 1,
        "color": "rgb(244, 117, 96)"
    },
    {
        "id": "2",
        "depth": 1,
        "color": "rgb(97, 205, 187)"
    },
    {
        "id": "3",
        "depth": 1,
        "color": "rgb(97, 205, 187)"
    },
    {
        "id": "4",
        "depth": 1,
        "color": "rgb(97, 205, 187)"
    },
    {
        "id": "5",
        "depth": 1,
        "color": "rgb(97, 205, 187)"
    },
    {
        "id": "6",
        "depth": 1,
        "color": "rgb(97, 205, 187)"
    },
    {
        "id": "7",
        "depth": 0,
        "color": "rgb(97, 205, 187)"
      },
    ];
    const links: InputLink[] = [
      {
        "source": "1",
        "target": "2"
      },
      {
        "source": "1",
        "target": "3"
      }, 
      {
        "source": "1",
        "target": "4"
      }, 
      {
        "source": "1",
        "target": "5"
      }, 
      {
        "source": "1",
        "target": "6"
      }, 
      {
        "source": "1",
        "target": "7"
      }, 
    ];

    nodes.forEach((n) => {n.radius = 50})

    const layers: NetworkProps["layers"] = [
        (props) => ("props")
    ]

export const NivoGraph = () => {

    const handleClick = (node: ComputedNode, event: React.MouseEvent<SVGCircleElement>) => {
        console.log(node);
    }
    
    return(
    <ResponsiveNetwork
        nodes={nodes}
        links={links}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        repulsivity={2000}
        iterations={60}
        nodeColor={function(e){return e.color}}
        linkDistance={100}
        nodeBorderWidth={1}
        nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
        linkThickness={function(e){return 2*(2-e.source.depth)}}
        isInteractive
        onClick={(node, event) => handleClick(node, event)}
        // layers={layers}
    />)
    };