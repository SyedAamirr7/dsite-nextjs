'use client';

import { useState, useEffect, useCallback } from 'react';
import Script from 'next/script';
import AcpPage from '@/components/AcpPage';
import SettingsConfigTabs from '@/components/SettingsConfigTabs';
import { useTranslation } from '@/hooks/useTranslation';
import { useWebsiteId } from '@/context/WebsiteContext';
import { apiFetch, parseResponseJson } from '@/lib/api';

/** Maps frontend content item id to backend Section_Content_Table value. */
const CONTENT_ID_TO_SECTION_TABLE: Record<string, string> = {
  'slides': 'slider',
  'about': 'about',
  'services': 'service',
  'projects': 'project',
  'products': 'product',
  'portfolio': 'portfolio',
  'why-choose': 'why_choose',
  'news': 'news',
  'branches': 'branch',
  'showreel': 'showreel',
  'gallery': 'gallery',
  'clients': 'client',
  'download-apply': 'app',
  'workers': 'team',
  'work': 'career',
  'partners': 'partner',
  'plans': 'plans',
  'contact': 'contact',
  'restaurant': 'restaurant',
  'find-restaurant': 'find_restaurant',
  // legacy / alternate keys
  'content-marketing': 'content-marketing',
  'inbox': 'inbox',
  'scene-visual': 'scene-visual',
  'pages': 'page',
};

interface SectionFromApi {
  ID: number;
  Section_Content_Table: string;
  Status: number;
}

function handleSiteContentSubmit(e: React.FormEvent) {
  e.preventDefault();
  // Status is saved on toggle; form submit kept for layout consistency.
}

const pathProps = {
  fill: 'none' as const,
  stroke: '#656565',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeMiterlimit: 10,
  strokeWidth: 1.5,
};

function ContentIcon({ type }: { type: string }) {
  const c = 'a';
  if (type === 'slides') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="27.142" height="19.949" viewBox="0 0 27.142 19.949">
        <g transform="translate(-112.25 -9.001)">
          <g transform="translate(113 9.751)">
            <g transform="translate(-6.49 -0.751)">
              <path className={c} d="M3.642,13.712A3.527,3.527,0,0,1,0,9.884V3.827A3.53,3.53,0,0,1,3.642,0Z" transform="translate(6.49 3.488)" {...pathProps} />
            </g>
            <g transform="translate(22 2.749)">
              <path className={c} d="M0,13.712A3.527,3.527,0,0,0,3.642,9.884V3.827A3.53,3.53,0,0,0,0,0Z" transform="translate(0 0)" {...pathProps} />
            </g>
            <g transform="translate(2.51 -0.751)">
              <path className={c} d="M18.46,5.149V13.3c0,3.02-1.89,5.15-4.91,5.15H4.9c-3.02,0-4.9-2.13-4.9-5.15V5.149C0,2.129,1.89,0,4.9,0h8.65C16.57,0,18.46,2.129,18.46,5.149Z" transform="translate(0.75 0.751)" {...pathProps} />
              <path className={c} d="M0,4.14,1.529,2.527a1.4,1.4,0,0,1,2.032-.008l.885.9a1.433,1.433,0,0,0,2.131-.094L8.806.617a1.687,1.687,0,0,1,2.515-.1L13.4,2.655" transform="translate(3.281 10.292)" {...pathProps} />
              <path className={c} d="M3.507,1.754A1.754,1.754,0,1,1,1.753,0,1.755,1.755,0,0,1,3.507,1.754Z" transform="translate(4.806 5.38)" {...pathProps} />
            </g>
          </g>
        </g>
      </svg>
    );
  }
  if (type === 'branches') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(3.5 2)">
          <path className={c} d="M0,7.652A7.678,7.678,0,1,1,15.357,7.7v.087a11.338,11.338,0,0,1-3.478,7.3,20.183,20.183,0,0,1-3.591,2.957.93.93,0,0,1-1.217,0,19.817,19.817,0,0,1-5.052-4.73A9.826,9.826,0,0,1,0,7.678Z" transform="translate(0.739 0.739)" {...pathProps} />
          <circle className={c} cx="2.461" cy="2.461" r="2.461" transform="translate(5.957 6.078)" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'content-marketing') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(4 4)">
          <path className={c} d="M10.871,12.892a12.254,12.254,0,0,1-.252,1.759A1.728,1.728,0,0,1,8.98,16a1.963,1.963,0,0,1-1.143-.471L4.07,12.469h-2.1A1.832,1.832,0,0,1,.14,10.644a25.623,25.623,0,0,1,0-5.35A1.883,1.883,0,0,1,1.971,3.532h2.1L7.759.525A2.264,2.264,0,0,1,8.98,0a1.729,1.729,0,0,1,1.639,1.349,13.9,13.9,0,0,1,.252,1.76A93.092,93.092,0,0,1,10.871,12.892Z" {...pathProps} />
          <path className={c} d="M0,0A9.312,9.312,0,0,1,1.538,5.3,9.308,9.308,0,0,1,0,10.6" transform="translate(14.717 2.574)" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'inbox') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(2 3.5)">
          <path className={c} d="M11.314,0,7.048,3.434a2.223,2.223,0,0,1-2.746,0L0,0" transform="translate(3.954 5.561)" {...pathProps} />
          <path className={c} d="M4.888,0h9.428A4.957,4.957,0,0,1,17.9,1.59a5.017,5.017,0,0,1,1.326,3.7v6.528a5.017,5.017,0,0,1-1.326,3.7,4.957,4.957,0,0,1-3.58,1.59H4.888C1.968,17.116,0,14.741,0,11.822V5.294C0,2.375,1.968,0,4.888,0Z" transform="translate(0 0)" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'our-products') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(1.5 1.5)">
          <path className={c} d="M19.169,13.482c0,3.578-2.109,5.687-5.687,5.687H5.7c-3.587,0-5.7-2.109-5.7-5.687v-7.8C0,2.109,1.314,0,4.893,0h2A2.282,2.282,0,0,1,8.717.913L9.63,2.127a2.291,2.291,0,0,0,1.826.913h2.83c3.587,0,4.911,1.826,4.911,5.477Z" transform="translate(0.776 0.776)" {...pathProps} />
          <path className={c} d="M0,.456H9.593" transform="translate(5.559 12.533)" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'scene-visual') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(2 2)">
          <path className={c} d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" {...pathProps} />
          <path className={c} d="M5.16,3.969A14.915,14.915,0,0,1,1.432,6.512a3.983,3.983,0,0,1-.664.214.5.5,0,0,1-.459-.27,5.24,5.24,0,0,1-.166-.689A16.6,16.6,0,0,1,0,3.364,15.624,15.624,0,0,1,.158.879C.186.723.268.364.292.306A.5.5,0,0,1,.518.06.494.494,0,0,1,.768,0a3.49,3.49,0,0,1,.575.178A14.782,14.782,0,0,1,5.15,2.746c.068.073.255.269.286.309a.5.5,0,0,1,.011.6C5.414,3.7,5.223,3.9,5.16,3.969Z" transform="translate(7.89 6.498)" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'download-apply') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(2 3)">
          <path className={c} d="M12.041.5H0" transform="translate(10.622 0.395) rotate(90)" {...pathProps} />
          <path className={c} d="M0,0,2.928,2.916,0,5.832" transform="translate(13.038 9.508) rotate(90)" {...pathProps} />
          <path className={c} d="M0,4.617V3.684A3.684,3.684,0,0,1,3.685,0H8.569a3.675,3.675,0,0,1,3.675,3.675v11.14A3.685,3.685,0,0,1,8.559,18.5H3.674A3.675,3.675,0,0,1,0,14.825v-.942" transform="translate(19.372 5.128) rotate(90)" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'gallery') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="27.142" height="19.949" viewBox="0 0 27.142 19.949">
        <g transform="translate(-112.25 -9.001)">
          <g transform="translate(113 9.751)">
            <g transform="translate(-6.49 -0.751)">
              <path className={c} d="M3.642,13.712A3.527,3.527,0,0,1,0,9.884V3.827A3.53,3.53,0,0,1,3.642,0Z" transform="translate(6.49 3.488)" {...pathProps} />
            </g>
            <g transform="translate(22 2.749)">
              <path className={c} d="M0,13.712A3.527,3.527,0,0,0,3.642,9.884V3.827A3.53,3.53,0,0,0,0,0Z" transform="translate(0 0)" {...pathProps} />
            </g>
            <g transform="translate(2.51 -0.751)">
              <path className={c} d="M18.46,5.149V13.3c0,3.02-1.89,5.15-4.91,5.15H4.9c-3.02,0-4.9-2.13-4.9-5.15V5.149C0,2.129,1.89,0,4.9,0h8.65C16.57,0,18.46,2.129,18.46,5.149Z" transform="translate(0.75 0.751)" {...pathProps} />
              <path className={c} d="M0,4.14,1.529,2.527a1.4,1.4,0,0,1,2.032-.008l.885.9a1.433,1.433,0,0,0,2.131-.094L8.806.617a1.687,1.687,0,0,1,2.515-.1L13.4,2.655" transform="translate(3.281 10.292)" {...pathProps} />
              <path className={c} d="M3.507,1.754A1.754,1.754,0,1,1,1.753,0,1.755,1.755,0,0,1,3.507,1.754Z" transform="translate(4.806 5.38)" {...pathProps} />
            </g>
          </g>
        </g>
      </svg>
    );
  }
  if (type === 'workers') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(2 1.5)">
          <path className={c} d="M0,4.989,2.993,1.1,6.407,3.78,9.336,0" transform="translate(5.245 8.293)" {...pathProps} />
          <circle className={c} cx="1.922" cy="1.922" r="1.922" transform="translate(16.073 0.778)" {...pathProps} />
          <path className={c} d="M12.146,0H4.879C1.867,0,0,2.133,0,5.144v8.082c0,3.011,1.831,5.135,4.879,5.135h8.6c3.011,0,4.879-2.124,4.879-5.135V6.188" transform="translate(0.778 1.62)" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'news') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(3 2)">
          <path className={c} d="M7.22.5H0" transform="translate(5.496 13.723)" {...pathProps} />
          <path className={c} d="M7.22.5H0" transform="translate(5.496 9.537)" {...pathProps} />
          <path className={c} d="M2.755.5H0" transform="translate(5.496 5.36)" {...pathProps} />
          <path className={c} d="M12.158,0,4.469,0A4.251,4.251,0,0,0,0,4.607v9.2A4.254,4.254,0,0,0,4.506,18.41l7.689,0a4.252,4.252,0,0,0,4.47-4.6v-9.2A4.255,4.255,0,0,0,12.158,0Z" transform="translate(0.751 0.75)" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'our-projects') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(2 2)">
          <path className={c} d="M.476,0V6.86" transform="translate(4.895 8.202)" {...pathProps} />
          <path className={c} d="M.476,0V10.143" transform="translate(9.562 4.919)" {...pathProps} />
          <path className={c} d="M.476,0V3.235" transform="translate(14.152 11.827)" {...pathProps} />
          <path className={c} d="M14.686,0H5.314C2.048,0,0,2.312,0,5.585v8.83C0,17.688,2.038,20,5.314,20h9.371C17.962,20,20,17.688,20,14.415V5.585C20,2.312,17.962,0,14.686,0Z" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'partners') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(2 2.5)">
          <path className={c} d="M0,6.594A3.3,3.3,0,0,0,3.3,3.3,3.3,3.3,0,0,0,0,0" transform="translate(14.02 1.819)" {...pathProps} />
          <path className={c} d="M0,0A10.9,10.9,0,0,1,1.617.233,2.664,2.664,0,0,1,3.562,1.346a1.568,1.568,0,0,1,0,1.345A2.683,2.683,0,0,1,1.617,3.809" transform="translate(15.536 11.996)" {...pathProps} />
          <path className={c} d="M6.841,0c3.69,0,6.842.559,6.842,2.792S10.551,5.6,6.841,5.6C3.151,5.6,0,5.046,0,2.812S3.131,0,6.841,0Z" transform="translate(0.75 12.706)" {...pathProps} />
          <path className={c} d="M4.384,8.769A4.385,4.385,0,1,1,8.769,4.384,4.369,4.369,0,0,1,4.384,8.769Z" transform="translate(3.207 0.75)" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'services') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(2 2)">
          <path className={c} d="M2.449,0H5.716A2.459,2.459,0,0,1,8.163,2.47V5.764a2.46,2.46,0,0,1-2.448,2.47H2.449A2.46,2.46,0,0,1,0,5.764V2.47A2.46,2.46,0,0,1,2.449,0Z" transform="translate(11.837 0)" {...pathProps} />
          <path className={c} d="M2.449,0H5.714A2.46,2.46,0,0,1,8.163,2.47V5.764a2.46,2.46,0,0,1-2.449,2.47H2.449A2.46,2.46,0,0,1,0,5.764V2.47A2.46,2.46,0,0,1,2.449,0Z" transform="translate(0 0)" {...pathProps} />
          <path className={c} d="M2.449,0H5.714A2.46,2.46,0,0,1,8.163,2.471V5.764a2.46,2.46,0,0,1-2.449,2.47H2.449A2.46,2.46,0,0,1,0,5.764V2.471A2.46,2.46,0,0,1,2.449,0Z" transform="translate(0 11.766)" {...pathProps} />
          <path className={c} d="M2.449,0H5.716A2.46,2.46,0,0,1,8.163,2.471V5.764a2.459,2.459,0,0,1-2.448,2.47H2.449A2.46,2.46,0,0,1,0,5.764V2.471A2.46,2.46,0,0,1,2.449,0Z" transform="translate(11.837 11.766)" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'work') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform="translate(1 3.5)">
          <path className={c} d="M0,5.8A2.9,2.9,0,1,0,0,0" transform="translate(16.595 1.629)" {...pathProps} />
          <path className={c} d="M0,0A9.435,9.435,0,0,1,1.423.206a2.337,2.337,0,0,1,1.712.978,1.381,1.381,0,0,1,0,1.184,2.361,2.361,0,0,1-1.712.984" transform="translate(17.929 10.585)" {...pathProps} />
          <path className={c} d="M2.9,5.8A2.9,2.9,0,1,1,2.9,0" transform="translate(2.388 1.629)" {...pathProps} />
          <path className={c} d="M3.268,0A9.435,9.435,0,0,0,1.845.206a2.334,2.334,0,0,0-1.711.978,1.375,1.375,0,0,0,0,1.184,2.358,2.358,0,0,0,1.711.984" transform="translate(0.688 10.585)" {...pathProps} />
          <path className={c} d="M6.021,0c3.247,0,6.021.491,6.021,2.458S9.286,4.933,6.021,4.933C2.773,4.933,0,4.441,0,2.475S2.756,0,6.021,0Z" transform="translate(4.917 11.21)" {...pathProps} />
          <path className={c} d="M3.858,7.717A3.859,3.859,0,1,1,7.716,3.858,3.845,3.845,0,0,1,3.858,7.717Z" transform="translate(7.08 0.688)" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'pages') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="21.399" height="19.874" viewBox="0 0 21.399 19.874">
        <g transform="translate(-83.5 -5.42)">
          <g transform="translate(84.25 6.17)">
            <g transform="translate(6.25 -0.741)">
              <path className={c} d="M8.7,0H3.3A52.1,52.1,0,0,1,8.7.114c1.028.011-.189,2.743-.094,7.15-.074.737.033,1.865,0,2.966A30.088,30.088,0,0,0,8.7,15.174c0,.009-.014-.056.307,0a5.329,5.329,0,0,0,.8.048A3.224,3.224,0,0,0,12.9,11.978v-7.6Z" transform="translate(0.75 0.76)" {...pathProps} />
              <path className={c} d="M0,0V2.413A2.135,2.135,0,0,0,2.13,4.548c1.092,0,2.21,0,2.285,0" transform="translate(9.23 0.75)" {...pathProps} />
            </g>
            <g transform="translate(-0.75 -0.741)">
              <path className={c} d="M10.487,0H3.834A3.82,3.82,0,0,0,0,3.729V14.442a3.827,3.827,0,0,0,3.834,3.911h7.989a3.887,3.887,0,0,0,3.729-3.911V5.276Z" transform="translate(0.75 0.762)" {...pathProps} />
              <path className={c} d="M0,0V2.909A2.574,2.574,0,0,0,2.568,5.484c1.317,0,2.664,0,2.755,0" transform="translate(10.974 0.75)" {...pathProps} />
              <path className={c} d="M5.4.5H0" transform="translate(5.387 13.058)" {...pathProps} />
              <path className={c} d="M3.356.5H0" transform="translate(5.386 8.106)" {...pathProps} />
            </g>
          </g>
        </g>
      </svg>
    );
  }
  if (type === 'plans') {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="#656565">
        <g>
          <path className={c} d="M4 9L20 9M8 9V20M6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20Z" {...pathProps} />
        </g>
      </svg>
    );
  }
  if (type === 'about') {
    return (
      <svg viewBox="0 -0.5 25 25" fill="none" width="26" height="26" xmlns="http://www.w3.org/2000/svg" stroke="#656565">
        <g><path fillRule="evenodd" clipRule="evenodd" className={c} d="M3.5 7V17C3.5 18.1046 4.39543 19 5.5 19H19.5C20.6046 19 21.5 18.1046 21.5 17V7C21.5 5.89543 20.6046 5 19.5 5H5.5C4.39543 5 3.5 5.89543 3.5 7Z" {...pathProps} /><path className={c} d="M15.5 10H18.5" {...pathProps} /><path className={c} d="M15.5 13H18.5" {...pathProps} /><path fillRule="evenodd" clipRule="evenodd" className={c} d="M11.5 10C11.5 11.1046 10.6046 12 9.5 12C8.39543 12 7.5 11.1046 7.5 10C7.5 8.89543 8.39543 8 9.5 8C10.0304 8 10.5391 8.21071 10.9142 8.58579C11.2893 8.96086 11.5 9.46957 11.5 10Z" {...pathProps} /><path className={c} d="M5.5 16C8.283 12.863 11.552 13.849 13.5 16" {...pathProps} /></g>
      </svg>
    );
  }
  if (type === 'portfolio') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(2 2)"><path className={c} d="M.476,0V6.86" transform="translate(4.895 8.202)" {...pathProps} /><path className={c} d="M.476,0V10.143" transform="translate(9.562 4.919)" {...pathProps} /><path className={c} d="M.476,0V3.235" transform="translate(14.152 11.827)" {...pathProps} /><path className={c} d="M14.686,0H5.314C2.048,0,0,2.312,0,5.585v8.83C0,17.688,2.038,20,5.314,20h9.371C17.962,20,20,17.688,20,14.415V5.585C20,2.312,17.962,0,14.686,0Z" {...pathProps} /></g></svg>
    );
  }
  if (type === 'why-choose') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(4 4)"><path className={c} d="M10.871,12.892a12.254,12.254,0,0,1-.252,1.759A1.728,1.728,0,0,1,8.98,16a1.963,1.963,0,0,1-1.143-.471L4.07,12.469h-2.1A1.832,1.832,0,0,1,.14,10.644a25.623,25.623,0,0,1,0-5.35A1.883,1.883,0,0,1,1.971,3.532h2.1L7.759.525A2.264,2.264,0,0,1,8.98,0a1.729,1.729,0,0,1,1.639,1.349,13.9,13.9,0,0,1,.252,1.76A93.092,93.092,0,0,1,10.871,12.892Z" {...pathProps} /><path className={c} d="M0,0A9.312,9.312,0,0,1,1.538,5.3,9.308,9.308,0,0,1,0,10.6" transform="translate(14.717 2.574)" {...pathProps} /></g></svg>
    );
  }
  if (type === 'showreel') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(2 2)"><path className={c} d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" {...pathProps} /><path className={c} d="M8,5v6l5-3Z" transform="translate(2 2)" {...pathProps} /></g></svg>
    );
  }
  if (type === 'clients') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(2 2.5)"><path className={c} d="M0,6.594A3.3,3.3,0,0,0,3.3,3.3,3.3,3.3,0,0,0,0,0" transform="translate(14.02 1.819)" {...pathProps} /><path className={c} d="M0,0A10.9,10.9,0,0,1,1.617.233,2.664,2.664,0,0,1,3.562,1.346a1.568,1.568,0,0,1,0,1.345A2.683,2.683,0,0,1,1.617,3.809" transform="translate(15.536 11.996)" {...pathProps} /><path className={c} d="M6.841,0c3.69,0,6.842.559,6.842,2.792S10.551,5.6,6.841,5.6C3.151,5.6,0,5.046,0,2.812S3.131,0,6.841,0Z" transform="translate(0.75 12.706)" {...pathProps} /><path className={c} d="M4.384,8.769A4.385,4.385,0,1,1,8.769,4.384,4.369,4.369,0,0,1,4.384,8.769Z" transform="translate(3.207 0.75)" {...pathProps} /></g></svg>
    );
  }
  if (type === 'contact') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(2 3.5)"><path className={c} d="M11.314,0,7.048,3.434a2.223,2.223,0,0,1-2.746,0L0,0" transform="translate(3.954 5.561)" {...pathProps} /><path className={c} d="M4.888,0h9.428A4.957,4.957,0,0,1,17.9,1.59a5.017,5.017,0,0,1,1.326,3.7v6.528a5.017,5.017,0,0,1-1.326,3.7,4.957,4.957,0,0,1-3.58,1.59H4.888C1.968,17.116,0,14.741,0,11.822V5.294C0,2.375,1.968,0,4.888,0Z" transform="translate(0 0)" {...pathProps} /></g></svg>
    );
  }
  if (type === 'restaurant') {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#656565"><g><path className={c} d="M3.5 11V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284C20.5 19.6569 20.5 17.7712 20.5 14V11" {...pathProps} /><path className={c} d="M9.4998 2H14.4998L15.1515 8.51737C15.338 10.382 13.8737 12 11.9998 12C10.1259 12 8.6616 10.382 8.84806 8.51737L9.4998 2Z" {...pathProps} /></g></svg>
    );
  }
  if (type === 'find-restaurant') {
    return (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg" stroke="#656565"><g><path className={c} d="M12 14H13C14.1 14 15 13.1 15 12V2H6C4.5 2 3.19001 2.82999 2.51001 4.04999" {...pathProps} /><path className={c} d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12" {...pathProps} /></g></svg>
    );
  }
  return null;
}

const CONTENT_ITEMS: Array<{ id: string; nameKey: string; subtitleKey?: string; sortable: boolean; icon: string }> = [
  { id: 'slides', nameKey: 'siteContent.slider', sortable: true, icon: 'slides' },
  { id: 'about', nameKey: 'siteContent.aboutUs', sortable: true, icon: 'about' },
  { id: 'services', nameKey: 'sidebar.services', sortable: true, icon: 'services' },
  { id: 'projects', nameKey: 'projects.ourProjects', sortable: true, icon: 'our-projects' },
  { id: 'products', nameKey: 'products.ourProducts', sortable: true, icon: 'our-products' },
  { id: 'portfolio', nameKey: 'siteContent.portfolio', sortable: true, icon: 'portfolio' },
  { id: 'why-choose', nameKey: 'sidebar.contentMarketing', subtitleKey: 'sidebar.contentMarketing', sortable: true, icon: 'why-choose' },
  { id: 'news', nameKey: 'sidebar.news', sortable: true, icon: 'news' },
  { id: 'branches', nameKey: 'sidebar.branches', sortable: true, icon: 'branches' },
  { id: 'showreel', nameKey: 'sidebar.sceneVisual', subtitleKey: 'sidebar.sceneVisual', sortable: true, icon: 'showreel' },
  { id: 'gallery', nameKey: 'sidebar.galleryImages', sortable: true, icon: 'gallery' },
  { id: 'clients', nameKey: 'sidebar.clients', sortable: true, icon: 'clients' },
  { id: 'download-apply', nameKey: 'sidebar.downloadApp', sortable: true, icon: 'download-apply' },
  { id: 'workers', nameKey: 'sidebar.team', sortable: true, icon: 'workers' },
  { id: 'work', nameKey: 'workers.work', sortable: true, icon: 'work' },
  { id: 'partners', nameKey: 'sidebar.partners', sortable: true, icon: 'partners' },
  { id: 'plans', nameKey: 'sidebar.plans', sortable: true, icon: 'plans' },
  { id: 'contact', nameKey: 'siteContent.contactUs', subtitleKey: 'siteContent.contactUs', sortable: true, icon: 'contact' },
  { id: 'restaurant', nameKey: 'siteContent.restaurant', sortable: true, icon: 'restaurant' },
  { id: 'find-restaurant', nameKey: 'siteContent.findRestaurant', sortable: true, icon: 'find-restaurant' },
];

const PER_PAGE = 20;

export default function SiteContentPage() {
  const { t } = useTranslation();
  const websiteId = useWebsiteId();
  const [currentPage, setCurrentPage] = useState(1);
  const [sections, setSections] = useState<SectionFromApi[]>([]);
  const [sectionsLoading, setSectionsLoading] = useState(true);
  const [toggleBusy, setToggleBusy] = useState<string | null>(null);

  const sectionByContentTable = sections.reduce<Record<string, SectionFromApi>>((acc, s) => {
    acc[s.Section_Content_Table] = s;
    return acc;
  }, {});

  const fetchSections = useCallback(async () => {
    setSectionsLoading(true);
    try {
      const res = await apiFetch(
        `/api/acp/settings/sections?websiteId=${encodeURIComponent(websiteId)}`
      );
      const data = await parseResponseJson<SectionFromApi[]>(res);
      setSections(Array.isArray(data) ? data : []);
    } catch {
      setSections([]);
    } finally {
      setSectionsLoading(false);
    }
  }, [websiteId]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleStatusChange = useCallback(
    async (itemId: string, sectionId: number, nextChecked: boolean) => {
      const status = nextChecked ? 1 : 0;
      setToggleBusy(itemId);
      try {
        const res = await apiFetch('/api/acp/settings/section_status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ websiteId, id: sectionId, status }),
        });
        const data = await parseResponseJson<{ success?: boolean }>(res);
        if (res.ok && data?.success) {
          setSections((prev) =>
            prev.map((s) => (s.ID === sectionId ? { ...s, Status: status } : s))
          );
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('acp-sections-updated'));
          }
        }
      } finally {
        setToggleBusy(null);
      }
    },
    [websiteId]
  );

  const totalPages = Math.max(1, Math.ceil(CONTENT_ITEMS.length / PER_PAGE));
  const start = (currentPage - 1) * PER_PAGE;
  const paginatedItems = CONTENT_ITEMS.slice(start, start + PER_PAGE);

  return (
    <>
      <AcpPage pageTitle={t('settings.siteContent')} activeItem="site-content">
        <SettingsConfigTabs activeTab="site-content" />
        <div className="row">
                <div className="col-lg-12">
                  <form action="#!" method="post" className="needs-validation" noValidate onSubmit={handleSiteContentSubmit}>
                    <div className="card">
                      <div className="card-body pt-5">
                        <div className="table-responsive sections-website site-content-table-wrap">
                          <table id="site-content-table" className="table table-hover sortable-tb sortable-1">
                            <thead>
                              <tr>
                                <th scope="col" style={{ width: 48, minWidth: 48, maxWidth: 48 }}></th>
                                <th scope="col" style={{ width: 48, minWidth: 48, maxWidth: 48 }}></th>
                                <th scope="col">{t('settings.siteContent')}</th>
                                <th scope="col">{t('common.status')}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {paginatedItems.map((item, index) => {
                                const contentTable = CONTENT_ID_TO_SECTION_TABLE[item.id] ?? item.id;
                                const section = sectionByContentTable[contentTable];
                                const checked = section ? section.Status === 1 : false;
                                const disabled = sectionsLoading || !section || toggleBusy === item.id;
                                return (
                                <tr key={item.id}>
                                  <td className="align-middle text-muted text-center" style={{ width: 48, minWidth: 48, maxWidth: 48 }}>
                                    {(currentPage - 1) * PER_PAGE + index + 1}
                                  </td>
                                  <td className="align-middle text-center" style={{ width: 48, minWidth: 48, maxWidth: 48 }}>
                                    {item.sortable ? (
                                      <span
                                        role="button"
                                        tabIndex={0}
                                        className="drag-handle ui-sortable-handle d-inline-flex"
                                        onClick={(e) => e.preventDefault()}
                                        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                        aria-label="Drag to reorder"
                                      >
                                        <img src="/assets/img/sort.svg" alt="" />
                                      </span>
                                    ) : null}
                                  </td>
                                  <td className="content-cell-one-line align-middle">
                                    <span className="icon mr-2 d-inline-flex align-items-center">
                                      <ContentIcon type={item.icon} />
                                    </span>
                                    <span>
                                      {t(item.nameKey)}
                                      <small className="content_subtitle">({t(item.subtitleKey ?? item.nameKey)})</small>
                                    </span>
                                  </td>
                                  <td className="align-middle">
                                    {item.id === 'slides' ? (
                                      <span className="text-muted">—</span>
                                    ) : (
                                    <label className="label-switch switch-success mb-0">
                                      <input
                                        type="checkbox"
                                        className="switch switch-bootstrap status"
                                        name={`content-${item.id}`}
                                        checked={checked}
                                        disabled={disabled}
                                        value="1"
                                        onChange={(e) => {
                                          if (section) {
                                            handleStatusChange(item.id, section.ID, e.target.checked);
                                          }
                                        }}
                                      />
                                      <span className="lable" />
                                    </label>
                                    )}
                                  </td>
                                </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {totalPages > 1 && (
                        <nav className="mt-4 d-flex justify-content-end" aria-label="Content pagination">
                          <ul className="pagination mb-0 rounded overflow-hidden border">
                            <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                              <button
                                type="button"
                                className="page-link border-0 rounded-0"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage <= 1}
                                aria-label={t('common.previous')}
                              >
                                {t('common.previous')}
                              </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button
                                  type="button"
                                  className="page-link border-0 rounded-0"
                                  onClick={() => setCurrentPage(page)}
                                  aria-current={currentPage === page ? 'page' : undefined}
                                >
                                  {page}
                                </button>
                              </li>
                            ))}
                            <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                              <button
                                type="button"
                                className="page-link border-0 rounded-0"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage >= totalPages}
                                aria-label={t('common.next')}
                              >
                                {t('common.next')}
                              </button>
                            </li>
                          </ul>
                        </nav>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4" dir="ltr">
                      <button type="submit" className="btn btn-primary px-5">
                        {t('common.save')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
      </AcpPage>

      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" strategy="beforeInteractive" />
      <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.datatables.net/1.10.25/js/dataTables.bootstrap4.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.datatables.net/rowreorder/1.2.8/js/dataTables.rowReorder.min.js" strategy="lazyOnload" />
      <Script src="/assets/js/custom.js" strategy="lazyOnload" />
      <Script src="/assets/js/filter-domains.js" strategy="lazyOnload" />
      <Script src="/assets/js/language-switcher.js" strategy="lazyOnload" />
    </>
  );
}
