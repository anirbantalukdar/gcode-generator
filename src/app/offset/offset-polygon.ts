export interface Vector {
    x: number;
    y: number;
};

export interface  Edge {
    index: number;
    inwardNormal: Vector;
    outwardNormal: Vector;
    vertex1: Vector;
    vertex2: Vector;
};

export interface OffsetEdge {
    vertex1: Vector;
    vertex2: Vector;
}

export interface Polygon {
    edges: Edge[];
    offsetEdges?: OffsetEdge[];
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    vertices: Vector[];
};

function inwardEdgeNormal(vertex1: Vector, vertex2: Vector) : Vector {
    const dx = vertex2.x - vertex1.x;
    const dy = vertex2.y - vertex2.x;

    const edgeLength = Math.sqrt(dx*dx + dy* dy);
    return {
        x: -dy/edgeLength,
        y: dx/edgeLength
    };
}

function outwardEdgeNormal(vertex1: Vector, vertex2: Vector): Vector{
    let n = inwardEdgeNormal(vertex1, vertex2);
    return {
        x: -n.x,
        y: -n.y
    };
}

