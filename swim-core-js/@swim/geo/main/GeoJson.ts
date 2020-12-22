// Copyright 2015-2020 Swim inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {GeoShape} from "./GeoShape";
import {GeoPoint} from "./GeoPoint";
import {GeoCurve} from "./GeoCurve";
import {GeoSegment} from "./GeoSegment";
import {GeoSpline} from "./GeoSpline";
import {GeoPath} from "./GeoPath";
import {GeoSet} from "./GeoSet";

export type GeoJson = GeoJsonGeometry
                    | GeoJsonFeature
                    | GeoJsonFeatureCollection;

export type GeoJsonGeometry = GeoJsonPoint
                            | GeoJsonMultiPoint
                            | GeoJsonLineString
                            | GeoJsonMultiLineString
                            | GeoJsonPolygon
                            | GeoJsonMultiPolygon
                            | GeoJsonGeometryCollection;

export type GeoJsonObjectType = GeoJsonGeometryType
                              | "Feature"
                              | "FeatureCollection";

export type GeoJsonGeometryType = "Point"
                                | "MultiPoint"
                                | "LineString"
                                | "MultiLineString"
                                | "Polygon"
                                | "MultiPolygon"
                                | "GeometryCollection";

export type GeoJsonBbox = [number, number, number, number]
                        | [number, number, number, number, number, number];

export interface GeoJsonObject {
  type: GeoJsonObjectType;
  bbox?: GeoJsonBbox;
}

export interface GeoJsonGeometryObject extends GeoJsonObject {
  type: GeoJsonGeometryType;
}

export type GeoJsonPosition = [number, number] | [number, number, number];

export interface GeoJsonPoint extends GeoJsonGeometryObject {
  readonly type: "Point";
  coordinates: GeoJsonPosition;
}

export interface GeoJsonMultiPoint extends GeoJsonGeometryObject {
  readonly type: "MultiPoint";
  coordinates: GeoJsonPosition[];
}

export interface GeoJsonLineString extends GeoJsonGeometryObject {
  readonly type: "LineString";
  coordinates: GeoJsonPosition[];
}

export interface GeoJsonMultiLineString extends GeoJsonGeometryObject {
  readonly type: "MultiLineString";
  coordinates: GeoJsonPosition[][];
}

export interface GeoJsonPolygon extends GeoJsonGeometryObject {
  readonly type: "Polygon";
  coordinates: GeoJsonPosition[][];
}

export interface GeoJsonMultiPolygon extends GeoJsonGeometryObject {
  readonly type: "MultiPolygon";
  coordinates: GeoJsonPosition[][][];
}

export interface GeoJsonGeometryCollection extends GeoJsonGeometryObject {
  readonly type: "GeometryCollection";
  geometries: GeoJsonGeometry[];
}

export type GeoJsonProperties = {[name: string]: unknown};

export interface GeoJsonFeature<G extends GeoJsonGeometry = GeoJsonGeometry, P = GeoJsonProperties> extends GeoJsonObject {
  type: "Feature";
  geometry: G | null;
  properties: P | null;
  id?: string | number;
}

export interface GeoJsonFeatureCollection<G extends GeoJsonGeometry = GeoJsonGeometry, P = GeoJsonProperties> extends GeoJsonObject {
  type: "FeatureCollection";
  features: GeoJsonFeature<G, P>[];
}

export interface GeoJsonFactory {
  is(value: unknown): value is GeoJson;
  toShape(geometry: GeoJsonGeometry): GeoShape;
  toShape(feature: GeoJsonFeature): GeoShape | null;
  toShape(collection: GeoJsonFeatureCollection): Array<GeoShape | null>;
  toShape(object: GeoJson): GeoShape | null | Array<GeoShape | null>;
}
export const GeoJson = {} as GeoJsonFactory;

GeoJson.is = function (value: unknown): value is GeoJson {
  return GeoJsonGeometry.is(value)
      || GeoJsonFeature.is(value)
      || GeoJsonFeatureCollection.is(value);
};

GeoJson.toShape = function (object: GeoJson): GeoShape | null | Array<GeoShape | null> {
  if (object.type === "Point") {
    return GeoJsonPoint.toShape(object);
  } else if (object.type === "MultiPoint") {
    return GeoJsonMultiPoint.toShape(object);
  } else if (object.type === "LineString") {
    return GeoJsonLineString.toShape(object);
  } else if (object.type === "MultiLineString") {
    return GeoJsonMultiLineString.toShape(object);
  } else if (object.type === "Polygon") {
    return GeoJsonPolygon.toShape(object);
  } else if (object.type === "MultiPolygon") {
    return GeoJsonMultiPolygon.toShape(object);
  } else if (object.type === "GeometryCollection") {
    return GeoJsonGeometryCollection.toShape(object);
  } else if (object.type === "Feature") {
    return GeoJsonFeature.toShape(object);
  } else if (object.type === "FeatureCollection") {
    return GeoJsonFeatureCollection.toShapes(object);
  } else {
    throw new TypeError("" + object);
  }
} as typeof GeoJson.toShape;

export interface GeoJsonGeometryFactory {
  is(value: unknown): value is GeoJsonGeometry;
  toShape(geometry: GeoJsonGeometry): GeoShape;
}
export const GeoJsonGeometry = {} as GeoJsonGeometryFactory;

GeoJsonGeometry.is = function (value: unknown): value is GeoJsonGeometry {
  if (typeof value === "object" && value !== null) {
    const object = value as GeoJsonGeometry;
    return (object.type === "Point"
         || object.type === "MultiPoint"
         || object.type === "LineString"
         || object.type === "MultiLineString"
         || object.type === "Polygon"
         || object.type === "MultiPolygon")
        && Array.isArray(object.coordinates)
        || object.type === "GeometryCollection"
        && Array.isArray(object.geometries);
  }
  return false;
};

GeoJsonGeometry.toShape = function (geometry: GeoJsonGeometry): GeoShape {
  if (geometry.type === "Point") {
    return GeoJsonPoint.toShape(geometry);
  } else if (geometry.type === "MultiPoint") {
    return GeoJsonMultiPoint.toShape(geometry);
  } else if (geometry.type === "LineString") {
    return GeoJsonLineString.toShape(geometry);
  } else if (geometry.type === "MultiLineString") {
    return GeoJsonMultiLineString.toShape(geometry);
  } else if (geometry.type === "Polygon") {
    return GeoJsonPolygon.toShape(geometry);
  } else if (geometry.type === "MultiPolygon") {
    return GeoJsonMultiPolygon.toShape(geometry);
  } else if (geometry.type === "GeometryCollection") {
    return GeoJsonGeometryCollection.toShape(geometry);
  } else {
    throw new TypeError("" + geometry);
  }
};

export interface GeoJsonPointFactory {
  is(value: unknown): value is GeoJsonPoint;
  toShape(geometry: GeoJsonPoint): GeoPoint;
}
export const GeoJsonPoint = {} as GeoJsonPointFactory;

GeoJsonPoint.is = function (value: unknown): value is GeoJsonPoint {
  if (typeof value === "object" && value !== null) {
    const object = value as GeoJsonPoint;
    return object.type === "Point"
        && Array.isArray(object.coordinates);
  }
  return false;
};

GeoJsonPoint.toShape = function (geometry: GeoJsonPoint): GeoPoint {
  const position = geometry.coordinates;
  return new GeoPoint(position[0], position[1]);
};

export interface GeoJsonMultiPointFactory {
  is(value: unknown): value is GeoJsonMultiPoint;
  toShape(geometry: GeoJsonMultiPoint): GeoSet<GeoPoint>;
}
export const GeoJsonMultiPoint = {} as GeoJsonMultiPointFactory;

GeoJsonMultiPoint.is = function (value: unknown): value is GeoJsonMultiPoint {
  if (typeof value === "object" && value !== null) {
    const object = value as GeoJsonMultiPoint;
    return object.type === "MultiPoint"
        && Array.isArray(object.coordinates);
  }
  return false;
};

GeoJsonMultiPoint.toShape = function (geometry: GeoJsonMultiPoint): GeoSet<GeoPoint> {
  const positions = geometry.coordinates;
  const n = positions.length;
  const shapes = new Array<GeoPoint>(n);
  for (let i = 0; i < n; i += 1) {
    const position = positions[i];
    shapes[i] = new GeoPoint(position[0], position[1]);
  }
  return new GeoSet(shapes);
};

export interface GeoJsonLineStringFactory {
  is(value: unknown): value is GeoJsonLineString;
  toShape(geometry: GeoJsonLineString): GeoSpline;
}
export const GeoJsonLineString = {} as GeoJsonLineStringFactory;

GeoJsonLineString.is = function (value: unknown): value is GeoJsonLineString {
  if (typeof value === "object" && value !== null) {
    const object = value as GeoJsonLineString;
    return object.type === "LineString"
        && Array.isArray(object.coordinates);
  }
  return false;
};

GeoJsonLineString.toShape = function (geometry: GeoJsonLineString): GeoSpline {
  const lineString = geometry.coordinates;
  const n = lineString.length;
  if (n > 0) {
    const curves = new Array<GeoCurve>(n - 1);
    let position = lineString[0];
    let lng = position[0];
    let lat = position[1];
    for (let i = 1; i < n; i += 1) {
      position = lineString[i];
      curves[i - 1] = new GeoSegment(lng, lat, (lng = position[0], lng), (lat = position[1], lat));
    }
    return new GeoSpline(curves, false);
  } else {
    return GeoSpline.empty();
  }
};

export interface GeoJsonMultiLineStringFactory {
  is(value: unknown): value is GeoJsonMultiLineString;
  toShape(geometry: GeoJsonMultiLineString): GeoSet<GeoSpline>;
}
export const GeoJsonMultiLineString = {} as GeoJsonMultiLineStringFactory;

GeoJsonMultiLineString.is = function (value: unknown): value is GeoJsonMultiLineString {
  if (typeof value === "object" && value !== null) {
    const object = value as GeoJsonMultiLineString;
    return object.type === "MultiLineString"
        && Array.isArray(object.coordinates);
  }
  return false;
};

GeoJsonMultiLineString.toShape = function (geometry: GeoJsonMultiLineString): GeoSet<GeoSpline> {
  const multiLineString = geometry.coordinates;
  const n = multiLineString.length;
  const shapes = new Array<GeoSpline>(n);
  for (let i = 0; i < n; i += 1) {
    const lineString = multiLineString[i];
    const m = lineString.length;
    if (m > 0) {
      const curves = new Array<GeoCurve>(m - 1);
      let position = lineString[0];
      let lng = position[0];
      let lat = position[1];
      for (let j = 1; j < m; j += 1) {
        position = lineString[j];
        curves[j - 1] = new GeoSegment(lng, lat, (lng = position[0], lng), (lat = position[1], lat));
      }
      shapes[i] = new GeoSpline(curves, false);
    } else {
      shapes[i] = GeoSpline.empty();
    }
  }
  return new GeoSet(shapes);
};

export interface GeoJsonPolygonFactory {
  is(value: unknown): value is GeoJsonPolygon;
  toShape(geometry: GeoJsonPolygon): GeoPath;
}
export const GeoJsonPolygon = {} as GeoJsonPolygonFactory;

GeoJsonPolygon.is = function (value: unknown): value is GeoJsonPolygon {
  if (typeof value === "object" && value !== null) {
    const object = value as GeoJsonPolygon;
    return object.type === "Polygon"
        && Array.isArray(object.coordinates);
  }
  return false;
};

GeoJsonPolygon.toShape = function (geometry: GeoJsonPolygon): GeoPath {
  const polygons = geometry.coordinates;
  const n = polygons.length;
  const splines = new Array<GeoSpline>(n);
  for (let i = 0; i < n; i += 1) {
    const polygon = polygons[i];
    const m = polygon.length;
    if (m > 0) {
      const curves = new Array<GeoCurve>(m - 1);
      let position = polygon[0];
      let lng = position[0];
      let lat = position[1];
      for (let j = 1; j < m; j += 1) {
        position = polygon[j];
        curves[j - 1] = new GeoSegment(lng, lat, (lng = position[0], lng), (lat = position[1], lat));
      }
      splines[i] = new GeoSpline(curves, true);
    } else {
      splines[i] = GeoSpline.empty();
    }
  }
  return new GeoPath(splines);
};

export interface GeoJsonMultiPolygonFactory {
  is(value: unknown): value is GeoJsonMultiPolygon;
  toShape(geometry: GeoJsonMultiPolygon): GeoSet<GeoPath>;
}
export const GeoJsonMultiPolygon = {} as GeoJsonMultiPolygonFactory;

GeoJsonMultiPolygon.is = function (value: unknown): value is GeoJsonMultiPolygon {
  if (typeof value === "object" && value !== null) {
    const object = value as GeoJsonMultiPolygon;
    return object.type === "MultiPolygon"
        && Array.isArray(object.coordinates);
  }
  return false;
};

GeoJsonMultiPolygon.toShape = function (geometry: GeoJsonMultiPolygon): GeoSet<GeoPath> {
  const multiPolygon = geometry.coordinates;
  const n = multiPolygon.length;
  const shapes = new Array<GeoPath>(n);
  for (let i = 0; i < n; i += 1) {
    const polygons = multiPolygon[i];
    const m = polygons.length;
    const splines = new Array<GeoSpline>(m);
    for (let j = 0; j < m; j += 1) {
      const polygon = polygons[j];
      const o = polygon.length;
      if (o > 0) {
        const curves = new Array<GeoCurve>(o - 1);
        let position = polygon[0];
        let lng = position[0];
        let lat = position[1];
        for (let k = 1; k < o; k += 1) {
          position = polygon[k];
          curves[k - 1] = new GeoSegment(lng, lat, (lng = position[0], lng), (lat = position[1], lat));
        }
        splines[j] = new GeoSpline(curves, true);
      } else {
        splines[j] = GeoSpline.empty();
      }
    }
    shapes[i] = new GeoPath(splines);
  }
  return new GeoSet(shapes);
};

export interface GeoJsonGeometryCollectionFactory {
  is(value: unknown): value is GeoJsonGeometryCollection;
  toShape(geometry: GeoJsonGeometryCollection): GeoSet;
}
export const GeoJsonGeometryCollection = {} as GeoJsonGeometryCollectionFactory;

GeoJsonGeometryCollection.is = function (value: unknown): value is GeoJsonGeometryCollection {
  if (typeof value === "object" && value !== null) {
    const object = value as GeoJsonGeometryCollection;
    return object.type === "GeometryCollection"
        && Array.isArray(object.geometries);
  }
  return false;
};

GeoJsonGeometryCollection.toShape = function (geometry: GeoJsonGeometryCollection): GeoSet {
  const geometries = geometry.geometries;
  const n = geometries.length;
  const shapes = new Array<GeoShape>(n);
  for (let i = 0; i < n; i += 1) {
    shapes[i] = GeoJsonGeometry.toShape(geometries[i]);
  }
  return new GeoSet(shapes);
};

export interface GeoJsonFeatureFactory {
  is(value: unknown): value is GeoJsonFeature;
  toShape(feature: GeoJsonFeature): GeoShape | null;
}
export const GeoJsonFeature = {} as GeoJsonFeatureFactory;

GeoJsonFeature.is = function (value: unknown): value is GeoJsonFeature {
  if (typeof value === "object" && value !== null) {
    const object = value as GeoJsonFeature;
    return object.type === "Feature"
        && GeoJsonGeometry.is(object.geometry)
        && typeof object.properties === "object";
  }
  return false;
};

GeoJsonFeature.toShape = function (feature: GeoJsonFeature): GeoShape | null {
  const geometry = feature.geometry;
  return geometry !== null ? GeoJsonGeometry.toShape(geometry) : null;
};

export interface GeoJsonFeatureCollectionFactory {
  is(value: unknown): value is GeoJsonFeatureCollection;
  toShapes(collection: GeoJsonFeatureCollection): Array<GeoShape | null>;
}
export const GeoJsonFeatureCollection = {} as GeoJsonFeatureCollectionFactory;

GeoJsonFeatureCollection.is = function (value: unknown): value is GeoJsonFeatureCollection {
  if (typeof value === "object" && value !== null) {
    const object = value as GeoJsonFeatureCollection;
    return object.type === "FeatureCollection"
        && Array.isArray(object.features);
  }
  return false;
};

GeoJsonFeatureCollection.toShapes = function (collection: GeoJsonFeatureCollection): Array<GeoShape | null> {
  const features = collection.features;
  const n = features.length;
  const shapes = new Array<GeoShape | null>(n);
  for (let i = 0; i < n; i += 1) {
    shapes[i] = GeoJsonFeature.toShape(features[i]);
  }
  return shapes;
};
