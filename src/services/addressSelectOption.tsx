"use server";

export interface TDivision {
  id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface TCities {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
}

export interface TArea {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
}

export async function getRegion() {
  const response = await fetch("https://bdapi.vercel.app/api/v.1/division");
  const { data } = await response.json();
  return data;
}

export async function getCity(divisionId: string) {
  const response = await fetch(
    `https://bdapi.vercel.app/api/v.1/district/${divisionId}`,
  );
  const { data } = await response.json();
  return data;
}

export async function getArea(districtId: string) {
  const response = await fetch(
    `https://bdapi.vercel.app/api/v.1/upazilla/${districtId}`,
  );
  const { data } = await response.json();
  return data;
}
