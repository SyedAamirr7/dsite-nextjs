'use client';

import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useWebsiteId } from '@/context/WebsiteContext';
import { apiFetch, parseResponseJson } from '@/lib/api';

/** Sidebar nav item key -> backend Section_Content_Table. Only show item when this section exists and Status === 1. */
const SIDEBAR_SECTION_TABLE: Record<string, string> = {
  'presentation-slides': 'slider',
  'about': 'about',
  'pages': 'page',
  'services': 'service',
  'products': 'product',
  'projects': 'project',
  'workers': 'team',
  'gallery': 'gallery',
  'news': 'news',
  'visual': 'showreel',
  'branchs': 'branch',
  'clients': 'client',
  'marketing': 'why_choose',
  'downloadapp': 'app',
  'ads': 'ads',
  'restaurants': 'restaurant',
  'restaurantOrders': 'find_restaurant',
  'teams': 'team',
  'jobs': 'career',
  'partners': 'partner',
  'plans': 'plans',
  'inbox': 'contact',
};

interface SidebarProps {
  activeItem?: string;
}

interface SectionFromApi {
  Section_Content_Table: string;
  Status: number;
}

export default function Sidebar({ activeItem = 'home' }: SidebarProps) {
  const { t } = useTranslation();
  const websiteId = useWebsiteId();
  const [sections, setSections] = useState<SectionFromApi[]>([]);

  useEffect(() => {
    let cancelled = false;
    const fetchSections = async () => {
      try {
        const res = await apiFetch(
          `/api/acp/settings/sections?websiteId=${encodeURIComponent(websiteId)}`
        );
        const data = await parseResponseJson<SectionFromApi[]>(res);
        if (!cancelled && Array.isArray(data)) {
          setSections(data);
        }
      } catch {
        if (!cancelled) setSections([]);
      }
    };
    fetchSections();

    const onVisible = () => {
      if (document.visibilityState === 'visible') fetchSections();
    };
    const onSectionsUpdated = () => fetchSections();
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('acp-sections-updated', onSectionsUpdated);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('acp-sections-updated', onSectionsUpdated);
    };
  }, [websiteId]);

  const enabledSectionTables = useMemo(() => {
    const set = new Set<string>();
    sections.forEach((s) => {
      if (s.Status === 1) set.add(s.Section_Content_Table);
    });
    return set;
  }, [sections]);

  const show = (itemKey: string) => {
    const table = SIDEBAR_SECTION_TABLE[itemKey];
    return table ? enabledSectionTables.has(table) : true;
  };

  return (
    <div id="sidebar-wrapper">
      <ul className="sidebar-nav nav flex-column">
        <div className="logo text-center mb-4 d-flex flex-column align-items-center">
          <Link href="/acp/home" title={t('sidebar.homePage')} className="d-inline-flex justify-content-center align-items-center">
            <img src="/assets/img/logo.svg" className="img-fluid" alt="logo" />
          </Link>
          <p className="text-center mb-0 logo-text">{t('sidebar.siteControlPanel')}</p>
          <a
            href="#menu-toggle"
            className="menu-toggle"
            role="button"
            aria-label={t('nav.closeMenu') ?? 'Close menu'}
            data-react-menu-toggle
            onClick={(e) => {
              e.preventDefault();
              const wrapper = document.getElementById('wrapper');
              if (wrapper) wrapper.classList.toggle('toggled');
            }}
          >
            <i className="fas fa-times"></i>
          </a>
        </div>

        <li>
          <Link href="/acp/home" className={`nav-link ${activeItem === 'home' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(2.5 2)">
                  <path className="a" d="M6.657,18.771V15.7a1.426,1.426,0,0,1,1.424-1.419h2.886A1.426,1.426,0,0,1,12.4,15.7h0v3.076A1.225,1.225,0,0,0,13.6,20h1.924A3.456,3.456,0,0,0,19,16.562h0V7.838a2.439,2.439,0,0,0-.962-1.9L11.458.685a3.18,3.18,0,0,0-3.944,0L.962,5.943A2.42,2.42,0,0,0,0,7.847v8.714A3.456,3.456,0,0,0,3.473,20H5.4a1.235,1.235,0,0,0,1.241-1.229h0" />
                </g>
              </svg>
            </span>
            {t('sidebar.home')}
          </Link>
        </li>

        <li>
          <Link href="/acp/settings/site-information" className={`nav-link ${['site-information', 'site-content', 'design', 'administrators', 'pixel', 'forms', 'domain', 'subscriptions'].includes(activeItem) ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(2.5 1.5)">
                  <path className="a" d="M17.528,5.346l-.622-1.08a1.913,1.913,0,0,0-2.609-.7h0a1.9,1.9,0,0,1-2.609-.677,1.831,1.831,0,0,1-.256-.915h0A1.913,1.913,0,0,0,9.519,0H8.265a1.9,1.9,0,0,0-1.9,1.913h0A1.913,1.913,0,0,1,4.448,3.8a1.831,1.831,0,0,1-.915-.256h0a1.913,1.913,0,0,0-2.609.7l-.668,1.1a1.913,1.913,0,0,0,.7,2.609h0a1.913,1.913,0,0,1,.957,1.657,1.913,1.913,0,0,1-.957,1.657h0a1.9,1.9,0,0,0-.7,2.6h0l.632,1.089A1.913,1.913,0,0,0,3.5,15.7h0a1.895,1.895,0,0,1,2.6.7,1.831,1.831,0,0,1,.256.915h0a1.913,1.913,0,0,0,1.913,1.913H9.519a1.913,1.913,0,0,0,1.913-1.9h0a1.9,1.9,0,0,1,1.913-1.913,1.95,1.95,0,0,1,.915.256h0a1.913,1.913,0,0,0,2.609-.7h0l.659-1.1a1.9,1.9,0,0,0-.7-2.609h0a1.9,1.9,0,0,1-.7-2.609,1.876,1.876,0,0,1,.7-.7h0a1.913,1.913,0,0,0,.7-2.6h0Z" transform="translate(0.779 0.778)" />
                  <circle className="a" cx="2.636" cy="2.636" r="2.636" transform="translate(7.039 7.753)" />
                </g>
              </svg>
            </span>
            {t('sidebar.settings')}
          </Link>
        </li>
        <li className="dropdown-divider"></li>
        {show('presentation-slides') && (
        <li>
          <Link href="/acp/presentation-slides" className={`nav-link ${activeItem === 'presentation-slides' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="27.142" height="19.949" viewBox="0 0 27.142 19.949">
                <g id="Group_9767" data-name="Group 9767" transform="translate(-112.25 -9.001)">
                  <g id="Iconly_Light_Image" data-name="Iconly/Light/Image" transform="translate(113 9.751)">
                    <g id="Image" transform="translate(-6.49 -0.751)">
                      <path id="Stroke_1" data-name="Stroke 1" d="M3.642,13.712A3.527,3.527,0,0,1,0,9.884V3.827A3.53,3.53,0,0,1,3.642,0Z" transform="translate(6.49 3.488)" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                    </g>
                    <g id="Image-2" data-name="Image" transform="translate(22 2.749)">
                      <path id="Stroke_1-2" data-name="Stroke 1" d="M0,13.712A3.527,3.527,0,0,0,3.642,9.884V3.827A3.53,3.53,0,0,0,0,0Z" transform="translate(0 0)" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                    </g>
                    <g id="Image-3" data-name="Image" transform="translate(2.51 -0.751)">
                      <path id="Stroke_1-3" data-name="Stroke 1" d="M18.46,5.149V13.3c0,3.02-1.89,5.15-4.91,5.15H4.9c-3.02,0-4.9-2.13-4.9-5.15V5.149C0,2.129,1.89,0,4.9,0h8.65C16.57,0,18.46,2.129,18.46,5.149Z" transform="translate(0.75 0.751)" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                      <path id="Stroke_3" data-name="Stroke 3" d="M0,4.14,1.529,2.527a1.4,1.4,0,0,1,2.032-.008l.885.9a1.433,1.433,0,0,0,2.131-.094L8.806.617a1.687,1.687,0,0,1,2.515-.1L13.4,2.655" transform="translate(3.281 10.292)" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                      <path id="Stroke_5" data-name="Stroke 5" d="M3.507,1.754A1.754,1.754,0,1,1,1.753,0,1.755,1.755,0,0,1,3.507,1.754Z" transform="translate(4.806 5.38)" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            {t('sidebar.presentationSlides')}
          </Link>
        </li>
        )}
        {show('about') && (
        <li>
          <Link href="/acp/about" className={`nav-link ${activeItem === 'about' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg viewBox="0 -0.5 25 25" fill="none" width="26" height="26" xmlns="http://www.w3.org/2000/svg" stroke="#656565">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path fillRule="evenodd" clipRule="evenodd" className="a" d="M3.5 7V17C3.5 18.1046 4.39543 19 5.5 19H19.5C20.6046 19 21.5 18.1046 21.5 17V7C21.5 5.89543 20.6046 5 19.5 5H5.5C4.39543 5 3.5 5.89543 3.5 7Z" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M15.5 10H18.5" stroke="#656565" strokeWidth="1.5" strokeLinecap="round"></path>
                  <path className="a" d="M15.5 13H18.5" stroke="#656565" strokeWidth="1.5" strokeLinecap="round"></path>
                  <path fillRule="evenodd" clipRule="evenodd" className="a" d="M11.5 10C11.5 11.1046 10.6046 12 9.5 12C8.39543 12 7.5 11.1046 7.5 10C7.5 8.89543 8.39543 8 9.5 8C10.0304 8 10.5391 8.21071 10.9142 8.58579C11.2893 8.96086 11.5 9.46957 11.5 10Z" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M5.5 16C8.283 12.863 11.552 13.849 13.5 16" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </span>
            <span>{t('sidebar.aboutUs')}</span>
          </Link>
        </li>
        )}
        {show('pages') && (
        <li>
          <Link href="/acp/pages" className={`nav-link ${activeItem === 'pages' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="21.399" height="19.874" viewBox="0 0 21.399 19.874">
                <g id="Group_9768" data-name="Group 9768" transform="translate(-83.5 -5.42)">
                  <g id="Iconly_Light_Paper" data-name="Iconly/Light/Paper" transform="translate(84.25 6.17)">
                    <g id="Paper" transform="translate(6.25 -0.741)">
                      <path id="Stroke_1" data-name="Stroke 1" d="M8.7,0H3.3A52.1,52.1,0,0,1,8.7.114c1.028.011-.189,2.743-.094,7.15-.074.737.033,1.865,0,2.966A30.088,30.088,0,0,0,8.7,15.174c0,.009-.014-.056.307,0a5.329,5.329,0,0,0,.8.048A3.224,3.224,0,0,0,12.9,11.978v-7.6Z" transform="translate(0.75 0.76)" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                      <path id="Stroke_3" data-name="Stroke 3" d="M0,0V2.413A2.135,2.135,0,0,0,2.13,4.548c1.092,0,2.21,0,2.285,0" transform="translate(9.23 0.75)" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                    </g>
                    <g id="Paper-2" data-name="Paper" transform="translate(-0.75 -0.741)">
                      <path id="Stroke_1-2" data-name="Stroke 1" d="M10.487,0H3.834A3.82,3.82,0,0,0,0,3.729V14.442a3.827,3.827,0,0,0,3.834,3.911h7.989a3.887,3.887,0,0,0,3.729-3.911V5.276Z" transform="translate(0.75 0.762)" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                      <path id="Stroke_3-2" data-name="Stroke 3" d="M0,0V2.909A2.574,2.574,0,0,0,2.568,5.484c1.317,0,2.664,0,2.755,0" transform="translate(10.974 0.75)" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                      <path id="Stroke_5" data-name="Stroke 5" d="M5.4.5H0" transform="translate(5.387 13.058)" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                      <path id="Stroke_7" data-name="Stroke 7" d="M3.356.5H0" transform="translate(5.386 8.106)" fill="none" stroke="#656565" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            {t('sidebar.pages')}
          </Link>
        </li>
        )}
        {show('services') && (
        <li>
          <Link href="/acp/services" className={`nav-link ${activeItem === 'services' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(2 2)">
                  <path className="a" d="M2.449,0H5.716A2.459,2.459,0,0,1,8.163,2.47V5.764a2.46,2.46,0,0,1-2.448,2.47H2.449A2.46,2.46,0,0,1,0,5.764V2.47A2.46,2.46,0,0,1,2.449,0Z" transform="translate(11.837 0)" />
                  <path className="a" d="M2.449,0H5.714A2.46,2.46,0,0,1,8.163,2.47V5.764a2.46,2.46,0,0,1-2.449,2.47H2.449A2.46,2.46,0,0,1,0,5.764V2.47A2.46,2.46,0,0,1,2.449,0Z" transform="translate(0 0)" />
                  <path className="a" d="M2.449,0H5.714A2.46,2.46,0,0,1,8.163,2.471V5.764a2.46,2.46,0,0,1-2.449,2.47H2.449A2.46,2.46,0,0,1,0,5.764V2.471A2.46,2.46,0,0,1,2.449,0Z" transform="translate(0 11.766)" />
                  <path className="a" d="M2.449,0H5.716A2.46,2.46,0,0,1,8.163,2.471V5.764a2.459,2.459,0,0,1-2.448,2.47H2.449A2.46,2.46,0,0,1,0,5.764V2.471A2.46,2.46,0,0,1,2.449,0Z" transform="translate(11.837 11.766)" />
                </g>
              </svg>
            </span>
            {t('sidebar.services')}
          </Link>
        </li>
        )}
        {show('products') && (
        <li>
          <Link href="/acp/products" className={`nav-link ${activeItem === 'products' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(1.5 1.5)">
                  <path className="a" d="M19.169,13.482c0,3.578-2.109,5.687-5.687,5.687H5.7c-3.587,0-5.7-2.109-5.7-5.687v-7.8C0,2.109,1.314,0,4.893,0h2A2.282,2.282,0,0,1,8.717.913L9.63,2.127a2.291,2.291,0,0,0,1.826.913h2.83c3.587,0,4.911,1.826,4.911,5.477Z" transform="translate(0.776 0.776)" />
                  <path className="a" d="M0,.456H9.593" transform="translate(5.559 12.533)" />
                </g>
              </svg>
            </span>
            {t('sidebar.products')}
          </Link>
        </li>
        )}
        {show('projects') && (
        <li>
          <Link href="/acp/projects" className={`nav-link ${activeItem === 'projects' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(2 2)">
                  <path className="a" d="M.476,0V6.86" transform="translate(4.895 8.202)" />
                  <path className="a" d="M.476,0V10.143" transform="translate(9.562 4.919)" />
                  <path className="a" d="M.476,0V3.235" transform="translate(14.152 11.827)" />
                  <path className="a" d="M14.686,0H5.314C2.048,0,0,2.312,0,5.585v8.83C0,17.688,2.038,20,5.314,20h9.371C17.962,20,20,17.688,20,14.415V5.585C20,2.312,17.962,0,14.686,0Z" />
                </g>
              </svg>
            </span>
            {t('sidebar.projects')}
          </Link>
        </li>
        )}
        {show('workers') && (
        <li>
          <Link href="/acp/workers" className={`nav-link ${activeItem === 'workers' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(2 1.5)">
                  <path className="a" d="M0,4.989,2.993,1.1,6.407,3.78,9.336,0" transform="translate(5.245 8.293)" />
                  <circle className="a" cx="1.922" cy="1.922" r="1.922" transform="translate(16.073 0.778)" />
                  <path className="a" d="M12.146,0H4.879C1.867,0,0,2.133,0,5.144v8.082c0,3.011,1.831,5.135,4.879,5.135h8.6c3.011,0,4.879-2.124,4.879-5.135V6.188" transform="translate(0.778 1.62)" />
                </g>
              </svg>
            </span>
            {t('sidebar.workers')}
          </Link>
        </li>
        )}
        {show('gallery') && (
        <li>
          <Link href="/acp/gallery" className={`nav-link ${activeItem === 'gallery' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(2 2)">
                  <path className="a" d="M13.553,0H4.9C1.889,0,0,2.134,0,5.154V13.3c0,3.02,1.881,5.154,4.9,5.154h8.648c3.024,0,4.905-2.134,4.905-5.154V5.154C18.457,2.134,16.576,0,13.553,0Z" transform="translate(0.75 0.75)" />
                  <path className="a" d="M3.691,1.846A1.846,1.846,0,1,1,1.845,0,1.847,1.847,0,0,1,3.691,1.846Z" transform="translate(5.012 4.939)" />
                  <path className="a" d="M17.457,2.929a22.809,22.809,0,0,0-3-2.593A2.345,2.345,0,0,0,11.3,1.1c-.765.991-1.243,2.324-2.4,2.949-1.423.771-2.259-.472-3.446-.97-1.325-.555-2.331.443-3.105,1.4S.788,6.389,0,7.339" transform="translate(1.75 10.022)" />
                </g>
              </svg>
            </span>
            {t('sidebar.galleryImages')}
          </Link>
        </li>
        )}
        {show('news') && (
        <li>
          <Link href="/acp/news" className={`nav-link ${activeItem === 'news' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(3 2)">
                  <path className="a" d="M7.22.5H0" transform="translate(5.496 13.723)" />
                  <path className="a" d="M7.22.5H0" transform="translate(5.496 9.537)" />
                  <path className="a" d="M2.755.5H0" transform="translate(5.496 5.36)" />
                  <path className="a" d="M12.158,0,4.469,0A4.251,4.251,0,0,0,0,4.607v9.2A4.254,4.254,0,0,0,4.506,18.41l7.689,0a4.252,4.252,0,0,0,4.47-4.6v-9.2A4.255,4.255,0,0,0,12.158,0Z" transform="translate(0.751 0.75)" />
                </g>
              </svg>
            </span>
            {t('sidebar.news')}
          </Link>
        </li>
        )}
        {show('visual') && (
        <li>
          <Link href="/acp/visual" className={`nav-link ${activeItem === 'visual' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(2 2)">
                  <path className="a" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" />
                  <path className="a" d="M5.16,3.969A14.915,14.915,0,0,1,1.432,6.512a3.983,3.983,0,0,1-.664.214.5.5,0,0,1-.459-.27,5.24,5.24,0,0,1-.166-.689A16.6,16.6,0,0,1,0,3.364,15.624,15.624,0,0,1,.158.879C.186.723.268.364.292.306A.5.5,0,0,1,.518.06.494.494,0,0,1,.768,0a3.49,3.49,0,0,1,.575.178A14.782,14.782,0,0,1,5.15,2.746c.068.073.255.269.286.309a.5.5,0,0,1,.011.6C5.414,3.7,5.223,3.9,5.16,3.969Z" transform="translate(7.89 6.498)" />
                </g>
              </svg>
            </span>
            {t('sidebar.sceneVisual')}
          </Link>
        </li>
        )}
        {show('branchs') && (
        <li>
          <Link href="/acp/branchs" className={`nav-link ${activeItem === 'branchs' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(3.5 2)">
                  <path className="a" d="M0,7.652A7.678,7.678,0,1,1,15.357,7.7v.087a11.338,11.338,0,0,1-3.478,7.3,20.183,20.183,0,0,1-3.591,2.957.93.93,0,0,1-1.217,0,19.817,19.817,0,0,1-5.052-4.73A9.826,9.826,0,0,1,0,7.678Z" transform="translate(0.739 0.739)" />
                  <circle className="a" cx="2.461" cy="2.461" r="2.461" transform="translate(5.957 6.078)" />
                </g>
              </svg>
            </span>
            {t('sidebar.branches')}
          </Link>
        </li>
        )}
        {show('clients') && (
        <li>
          <Link href="/acp/clients" className={`nav-link ${activeItem === 'clients' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(1 3.5)">
                  <path className="a" d="M0,5.8A2.9,2.9,0,1,0,0,0" transform="translate(16.595 1.629)" />
                  <path className="a" d="M0,0A9.435,9.435,0,0,1,1.423.206a2.337,2.337,0,0,1,1.712.978,1.381,1.381,0,0,1,0,1.184,2.361,2.361,0,0,1-1.712.984" transform="translate(17.929 10.585)" />
                  <path className="a" d="M2.9,5.8A2.9,2.9,0,1,1,2.9,0" transform="translate(2.388 1.629)" />
                  <path className="a" d="M3.268,0A9.435,9.435,0,0,0,1.845.206a2.334,2.334,0,0,0-1.711.978,1.375,1.375,0,0,0,0,1.184,2.358,2.358,0,0,0,1.711.984" transform="translate(0.688 10.585)" />
                  <path className="a" d="M6.021,0c3.247,0,6.021.491,6.021,2.458S9.286,4.933,6.021,4.933C2.773,4.933,0,4.441,0,2.475S2.756,0,6.021,0Z" transform="translate(4.917 11.21)" />
                  <path className="a" d="M3.858,7.717A3.859,3.859,0,1,1,7.716,3.858,3.845,3.845,0,0,1,3.858,7.717Z" transform="translate(7.08 0.688)" />
                </g>
              </svg>
            </span>
            {t('sidebar.clients')}
          </Link>
        </li>
        )}
        {show('marketing') && (
        <li>
          <Link href="/acp/marketing" className={`nav-link ${activeItem === 'marketing' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(4 4)">
                  <path className="a" d="M10.871,12.892a12.254,12.254,0,0,1-.252,1.759A1.728,1.728,0,0,1,8.98,16a1.963,1.963,0,0,1-1.143-.471L4.07,12.469h-2.1A1.832,1.832,0,0,1,.14,10.644a25.623,25.623,0,0,1,0-5.35A1.883,1.883,0,0,1,1.971,3.532h2.1L7.759.525A2.264,2.264,0,0,1,8.98,0a1.729,1.729,0,0,1,1.639,1.349,13.9,13.9,0,0,1,.252,1.76A93.092,93.092,0,0,1,10.871,12.892Z" />
                  <path className="a" d="M0,0A9.312,9.312,0,0,1,1.538,5.3,9.308,9.308,0,0,1,0,10.6" transform="translate(14.717 2.574)" />
                </g>
              </svg>
            </span>
            {t('sidebar.contentMarketing')}
          </Link>
        </li>
        )}
        {show('downloadapp') && (
        <li>
          <Link href="/acp/downloadapp" className={`nav-link ${activeItem === 'downloadapp' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(2 3)">
                  <path className="a" d="M12.041.5H0" transform="translate(10.622 0.395) rotate(90)" />
                  <path className="a" d="M0,0,2.928,2.916,0,5.832" transform="translate(13.038 9.508) rotate(90)" />
                  <path className="a" d="M0,4.617V3.684A3.684,3.684,0,0,1,3.685,0H8.569a3.675,3.675,0,0,1,3.675,3.675v11.14A3.685,3.685,0,0,1,8.559,18.5H3.674A3.675,3.675,0,0,1,0,14.825v-.942" transform="translate(19.372 5.128) rotate(90)" />
                </g>
              </svg>
            </span>
            {t('sidebar.downloadApp')}
          </Link>
        </li>
        )}
        {show('ads') && (
        <li>
          <Link href="/acp/ads" className={`nav-link ${activeItem === 'ads' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#656565" className="bi bi-badge-ad svgEdit" stroke="#656565" strokeWidth="0.00016">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="m3.7 11 .47-1.542h2.004L6.644 11h1.261L5.901 5.001H4.513L2.5 11h1.2zm1.503-4.852.734 2.426H4.416l.734-2.426h.053zm4.759.128c-1.059 0-1.753.765-1.753 2.043v.695c0 1.279.685 2.043 1.74 2.043.677 0 1.222-.33 1.367-.804h.057V11h1.138V4.685h-1.16v2.36h-.053c-.18-.475-.68-.77-1.336-.77zm.387.923c.58 0 1.002.44 1.002 1.138v.602c0 .76-.396 1.2-.984 1.2-.598 0-.972-.449-.972-1.248v-.453c0-.795.37-1.24.954-1.24z"></path>
                  <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"></path>
                </g>
              </svg>
            </span>
            {t('sidebar.ads')}
          </Link>
        </li>
        )}
        {show('restaurants') && (
        <li>
          <Link href="/acp/restaurants" className={`nav-link ${activeItem === 'restaurants' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#656565">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path className="a" d="M3.5 11V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284C20.5 19.6569 20.5 17.7712 20.5 14V11" stroke="#656565" strokeWidth="1.5"></path>
                  <path className="a" d="M9.4998 2H14.4998L15.1515 8.51737C15.338 10.382 13.8737 12 11.9998 12C10.1259 12 8.6616 10.382 8.84806 8.51737L9.4998 2Z" stroke="#656565" strokeWidth="1.5"></path>
                  <path className="a" d="M3.32975 5.35133C3.50783 4.46093 3.59687 4.01573 3.77791 3.65484C4.15938 2.89439 4.84579 2.33168 5.66628 2.10675C6.05567 2 6.50969 2 7.41771 2H9.50002L8.77549 9.24527C8.61911 10.8091 7.30318 12 5.73155 12C3.8011 12 2.35324 10.2339 2.73183 8.34093L3.32975 5.35133Z" stroke="#656565" strokeWidth="1.5"></path>
                  <path d="M20.6703 5.35133C20.4922 4.46093 20.4031 4.01573 20.2221 3.65484C19.8406 2.89439 19.1542 2.33168 18.3337 2.10675C17.9443 2 17.4903 2 16.5823 2H14.5L15.2245 9.24527C15.3809 10.8091 16.6968 12 18.2685 12C20.1989 12 21.6468 10.2339 21.2682 8.34093L20.6703 5.35133Z" stroke="#656565" strokeWidth="1.5"></path>
                  <path d="M9.5 21.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5V21.5" stroke="#656565" strokeWidth="1.5" strokeLinecap="round"></path>
                </g>
              </svg>
            </span>
            {t('sidebar.restaurants')}
          </Link>
        </li>
        )}
        {show('restaurantOrders') && (
        <li>
          <Link href="/acp/restaurantOrders" className={`nav-link ${activeItem === 'restaurantOrders' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg" stroke="#656565">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path className="a" d="M12 14H13C14.1 14 15 13.1 15 12V2H6C4.5 2 3.19001 2.82999 2.51001 4.04999" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M2 8H8" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M2 11H6" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M2 14H4" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </span>
            {t('siteContent.findRestaurant')}
          </Link>
        </li>
        )}
        {show('teams') && (
        <li>
          <Link href="/acp/teams" className={`nav-link ${activeItem === 'teams' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg fill="#656565" height="24" width="24" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" stroke="#656565" className="svgEdit">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g><g><g>
                    <path d="M234.923,223.979c0-26.752-18.112-49.941-44.053-56.427l-32.021-8l-1.344-5.355c8.299-9.173,14.208-20.885,16.661-33.045 c5.696-2.944,9.813-8.533,10.667-15.253l2.304-18.56c0.704-5.632-1.024-11.307-4.757-15.573 c-1.152-1.301-2.475-2.453-3.883-3.413l0.533-11.328l1.941-1.941c5.504-5.845,12.949-18.325,1.173-36.331 C176.555,10.197,165.035,0,141.952,0c-6.805,0-22.144,0-37.035,9.323C61.013,10.88,55.851,34.539,55.851,52.395 c0,3.52,0.64,10.112,1.237,15.616c-1.579,1.003-3.029,2.24-4.288,3.669c-3.797,4.309-5.547,10.005-4.821,15.659l2.304,18.56 c0.875,6.955,5.291,12.715,11.797,15.552c2.389,11.627,7.979,22.891,15.765,31.829l-1.557,6.272l-32.021,8 C18.347,174.037,0.213,197.248,0.213,224c0,2.837,1.109,5.568,3.115,7.552s4.715,3.115,7.552,3.115l213.376-0.021 C230.144,234.645,234.923,229.867,234.923,223.979z M23.104,213.312c3.669-12.16,13.504-21.845,26.389-25.088l38.229-9.557 c3.819-0.96,6.805-3.947,7.765-7.765l4.544-18.197c0.939-3.755-0.235-7.723-3.072-10.368 c-8.299-7.808-13.803-19.221-14.699-30.528c-0.448-5.525-5.184-8.597-10.752-8.597l-2.752-16.981c3.072,0,5.973-1.301,8-3.605 c2.027-2.283,2.965-5.333,2.581-8.384c-0.811-6.443-2.112-18.091-2.112-21.845c0-11.051,0-21.483,31.189-21.803 c2.176-0.021,4.309-0.704,6.101-1.984c10.155-7.275,21.845-7.275,27.456-7.275c11.029,0,18.325,2.965,22.336,9.088 c4.331,6.635,2.56,8.512,1.365,9.813l-4.629,4.629c-1.877,1.877-2.987,4.373-3.115,7.019L156.8,75.093 c-0.128,2.901,0.213,4.928,2.197,7.04c2.005,2.112,4.053,2.539,6.955,2.56l-1.365,17.344c-5.568,0-10.176,4.267-10.624,9.813 c-0.939,11.499-6.848,23.424-15.424,31.125c-2.923,2.624-4.181,6.677-3.221,10.517l4.352,17.429 c0.96,3.819,3.925,6.827,7.765,7.765l38.229,9.557c12.843,3.221,22.656,12.907,26.325,25.088L23.104,213.312z"></path>
                    <path d="M467.733,167.509l-32.021-8l-1.344-5.355c8.299-9.173,14.208-20.864,16.64-33.024c5.696-2.923,9.835-8.533,10.688-15.253 L464,87.317c0.704-5.611-1.024-11.285-4.757-15.552c-1.173-1.323-2.496-2.475-3.904-3.435l0.533-11.307l1.963-1.963 c5.504-5.845,12.949-18.325,1.152-36.331C453.376,10.197,441.877,0,418.816,0c-6.784,0-22.123,0-37.013,9.323 c-43.904,1.557-49.067,25.216-49.067,43.072c0,3.52,0.64,10.112,1.237,15.616c-1.579,1.003-3.008,2.219-4.267,3.648 c-3.797,4.267-5.568,9.984-4.864,15.68l2.325,18.56c0.875,6.955,5.291,12.715,11.797,15.552 c2.389,11.627,7.957,22.891,15.744,31.829l-1.557,6.272l-32.021,8c-25.92,6.485-44.032,29.696-44.032,56.448 c0,2.837,1.109,5.568,3.115,7.552c2.005,1.984,4.715,3.115,7.552,3.115l213.355-0.064c5.888,0,10.667-4.779,10.667-10.667 C511.787,197.184,493.675,173.995,467.733,167.509z M299.989,213.312c3.669-12.16,13.483-21.845,26.325-25.088l38.229-9.557 c3.819-0.939,6.805-3.925,7.765-7.744l4.565-18.197c0.939-3.755-0.235-7.723-3.072-10.368 c-8.299-7.787-13.781-19.2-14.699-30.528c-0.448-5.547-5.184-8.619-10.752-8.619L345.6,86.229c3.072,0,5.973-1.301,8-3.605 c2.027-2.283,2.965-5.333,2.581-8.384c-0.811-6.443-2.112-18.091-2.112-21.845c0-11.051,0-21.483,31.189-21.803 c2.176-0.021,4.309-0.704,6.101-1.984c10.155-7.275,21.845-7.275,27.456-7.275c16.384,0,20.864,6.848,22.357,9.088 c4.331,6.635,2.56,8.512,1.365,9.792l-4.651,4.629c-1.877,1.877-2.987,4.395-3.115,7.04l-1.131,23.211 c-0.128,2.901,0.213,4.928,2.219,7.04c1.984,2.112,4.053,2.539,6.955,2.56l-1.387,17.344c-5.568,0-10.176,4.288-10.624,9.835 c-0.917,11.477-6.827,23.403-15.403,31.104c-2.923,2.624-4.181,6.677-3.221,10.517l4.352,17.429 c0.96,3.819,3.925,6.827,7.765,7.765l38.229,9.557c12.843,3.221,22.656,12.907,26.325,25.088L299.989,213.312z"></path>
                    <path d="M387.328,259.136l-42.667,42.667c-4.16,4.16-4.16,10.923,0,15.083c2.091,2.069,4.821,3.115,7.552,3.115 c2.731,0,5.461-1.045,7.531-3.115l42.667-42.667c4.16-4.16,4.16-10.923,0-15.083 C398.251,254.976,391.488,254.976,387.328,259.136z"></path>
                    <path d="M318.869,444.885l-32.021-8l-1.344-5.355c8.299-9.173,14.208-20.885,16.661-33.045 c5.696-2.944,9.813-8.533,10.667-15.253l2.304-18.56c0.704-5.632-1.024-11.307-4.757-15.573 c-1.152-1.301-2.475-2.453-3.883-3.413l0.533-11.328l1.941-1.941c5.504-5.845,12.949-18.325,1.173-36.331 c-5.589-8.555-17.109-18.752-40.192-18.752c-6.805,0-22.144,0-37.035,9.323c-43.904,1.557-49.067,25.216-49.067,43.072 c0,3.52,0.64,10.112,1.237,15.616c-1.579,1.003-3.029,2.24-4.288,3.669c-3.797,4.309-5.547,10.005-4.821,15.659l2.304,18.56 c0.875,6.955,5.291,12.715,11.797,15.552c2.389,11.627,7.979,22.891,15.765,31.829l-1.557,6.272l-32.021,8 c-25.92,6.485-44.053,29.696-44.053,56.448c0,2.837,1.109,5.568,3.115,7.552S136.043,512,138.88,512l213.376-0.021 c5.888,0,10.667-4.779,10.667-10.667C362.923,474.56,344.811,451.371,318.869,444.885z M151.104,490.645 c3.669-12.16,13.504-21.845,26.389-25.088L215.723,456c3.819-0.96,6.805-3.947,7.765-7.765l4.544-18.197 c0.939-3.755-0.235-7.723-3.072-10.368c-8.299-7.808-13.803-19.221-14.699-30.528c-0.448-5.525-5.184-8.597-10.752-8.597 l-2.752-16.981c3.072,0,5.973-1.301,8-3.605c2.027-2.283,2.965-5.333,2.581-8.384c-0.811-6.443-2.112-18.091-2.112-21.845 c0-11.051,0-21.483,31.189-21.803c2.176-0.021,4.309-0.704,6.101-1.984c10.155-7.275,21.845-7.275,27.456-7.275 c11.029,0,18.325,2.965,22.336,9.088c4.331,6.635,2.56,8.512,1.365,9.813l-4.629,4.629c-1.877,1.877-2.987,4.373-3.115,7.019 l-1.131,23.211c-0.128,2.901,0.213,4.928,2.197,7.04c2.005,2.112,4.053,2.539,6.955,2.56l-1.365,17.344 c-5.568,0-10.176,4.267-10.624,9.813c-0.939,11.499-6.848,23.424-15.424,31.125c-2.923,2.624-4.181,6.677-3.221,10.517 l4.352,17.429c0.96,3.819,3.925,6.827,7.765,7.765l38.229,9.557c12.843,3.221,22.656,12.907,26.325,25.088L151.104,490.645z"></path>
                    <path d="M149.547,320c2.731,0,5.461-1.045,7.531-3.115c4.16-4.16,4.16-10.923,0-15.083l-42.667-42.667 c-4.16-4.16-10.923-4.16-15.083,0c-4.16,4.16-4.16,10.923,0,15.083l42.667,42.667C144.085,318.955,146.816,320,149.547,320z"></path>
                  </g></g></g>
                </g>
              </svg>
            </span>
            <span>{t('sidebar.team')}</span>
          </Link>
        </li>
        )}
        {show('jobs') && (
        <li>
          <Link href="/acp/jobs" className={`nav-link ${activeItem === 'jobs' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg" stroke="#656565">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path className="a" d="M7.99995 22H15.9999C20.0199 22 20.7399 20.39 20.9499 18.43L21.6999 10.43C21.9699 7.99 21.2699 6 16.9999 6H6.99995C2.72995 6 2.02995 7.99 2.29995 10.43L3.04995 18.43C3.25995 20.39 3.97995 22 7.99995 22Z" stroke="#656565" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M8 6V5.2C8 3.43 8 2 11.2 2H12.8C16 2 16 3.43 16 5.2V6" stroke="#656565" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M14 13V14C14 14.01 14 14.01 14 14.02C14 15.11 13.99 16 12 16C10.02 16 10 15.12 10 14.03V13C10 12 10 12 11 12H13C14 12 14 12 14 13Z" stroke="#656565" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M21.65 11C19.34 12.68 16.7 13.68 14 14.02" stroke="#656565" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className="a" d="M2.62 11.27C4.87 12.81 7.41 13.74 10 14.03" stroke="#656565" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </span>
            <span>{t('sidebar.jobs')}</span>
          </Link>
        </li>
        )}
        {show('partners') && (
        <li>
          <Link href="/acp/partners" className={`nav-link ${activeItem === 'partners' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(2 2.5)">
                  <path className="a" d="M0,6.594A3.3,3.3,0,0,0,3.3,3.3,3.3,3.3,0,0,0,0,0" transform="translate(14.02 1.819)" />
                  <path className="a" d="M0,0A10.9,10.9,0,0,1,1.617.233,2.664,2.664,0,0,1,3.562,1.346a1.568,1.568,0,0,1,0,1.345A2.683,2.683,0,0,1,1.617,3.809" transform="translate(15.536 11.996)" />
                  <path className="a" d="M6.841,0c3.69,0,6.842.559,6.842,2.792S10.551,5.6,6.841,5.6C3.151,5.6,0,5.046,0,2.812S3.131,0,6.841,0Z" transform="translate(0.75 12.706)" />
                  <path className="a" d="M4.384,8.769A4.385,4.385,0,1,1,8.769,4.384,4.369,4.369,0,0,1,4.384,8.769Z" transform="translate(3.207 0.75)" />
                </g>
              </svg>
            </span>
            {t('sidebar.partners')}
          </Link>
        </li>
        )}
        {show('plans') && (
        <li>
          <Link href="/acp/plans" className={`nav-link ${activeItem === 'plans' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="#656565">
                <g>
                  <path className="a" d="M4 9L20 9M8 9V20M6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20Z" stroke="#656565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </span>
            <span>{t('sidebar.plans')}</span>
          </Link>
        </li>
        )}
        {show('inbox') && (
        <li>
          <Link href="/acp/inbox" className={`nav-link ${activeItem === 'inbox' ? 'active' : ''}`}>
            <span className="icon ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g transform="translate(2 3.5)">
                  <path className="a" d="M11.314,0,7.048,3.434a2.223,2.223,0,0,1-2.746,0L0,0" transform="translate(3.954 5.561)" />
                  <path className="a" d="M4.888,0h9.428A4.957,4.957,0,0,1,17.9,1.59a5.017,5.017,0,0,1,1.326,3.7v6.528a5.017,5.017,0,0,1-1.326,3.7,4.957,4.957,0,0,1-3.58,1.59H4.888C1.968,17.116,0,14.741,0,11.822V5.294C0,2.375,1.968,0,4.888,0Z" transform="translate(0 0)" />
                </g>
              </svg>
            </span>
            {t('siteContent.contactUs')}
          </Link>
        </li>
        )}
      </ul>
    </div>
  );
}
